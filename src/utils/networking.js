/**
 * NETWORKING UTILITIES
 * ====================
 * Robust fetch wrapper with retry logic and timeout handling.
 */

/**
 * Validates a response object
 * @param {Response} response 
 * @returns {boolean}
 */
const isValidResponse = (response) => {
    return response.ok && response.status >= 200 && response.status < 300;
};

/**
 * Sleep for a given number of milliseconds
 * @param {number} ms 
 * @returns {Promise<void>}
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch with retry logic (Exponential Backoff)
 * 
 * @param {string} url - URL to fetch
 * @param {object} options - Fetch options + retry options
 * @returns {Promise<Response>}
 */
export const fetchWithRetry = async (url, options = {}) => {
    const {
        retries = 3,
        backoff = 1000,
        backoffFactor = 2,
        timeout = 5000,
        ...fetchOptions
    } = options;

    let currentTry = 0;
    let currentBackoff = backoff;

    while (currentTry <= retries) {
        try {
            // Create a controller for timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(url, {
                ...fetchOptions,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (isValidResponse(response)) {
                return response;
            }

            // If server error (5xx), we might want to retry
            if (response.status >= 500) {
                throw new Error(`Server Error: ${response.status}`);
            }

            // Client errors (4xx) usually shouldn't be retried unless 429
            if (response.status === 429) {
                throw new Error(`Rate Limited: ${response.status}`);
            }

            // Other errors, return immediately
            return response;

        } catch (error) {
            currentTry++;

            // Should we retry or is it fatal?
            const isAbortError = error.name === 'AbortError';
            const isNetworkError = !error.response; // Rough check for network issues

            if (currentTry > retries) {
                throw error;
            }

            await sleep(currentBackoff);
            currentBackoff *= backoffFactor;
        }
    }
};

/**
 * Simple in-memory cache manager
 */
export class CacheManager {
    constructor(ttlMinutes = 60) {
        this.cache = new Map();
        this.ttl = ttlMinutes * 60 * 1000;
    }

    get(key) {
        if (!this.cache.has(key)) return null;

        const item = this.cache.get(key);
        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            return null;
        }

        return item.value;
    }

    set(key, value) {
        this.cache.set(key, {
            value,
            expiry: Date.now() + this.ttl
        });
    }

    clear() {
        this.cache.clear();
    }
}

// Global instance for simple usage
export const globalCache = new CacheManager();

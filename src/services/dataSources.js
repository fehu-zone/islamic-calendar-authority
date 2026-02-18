/**
 * DATA SOURCES SERVICE
 * ====================
 * Abstractions for fetching prayer times from various sources.
 */

import { fetchWithRetry, globalCache } from '../utils/networking.js';
import { calculatePrayerTimes } from '../prayer/calculator.js';
import { fetchDiyanetPrayerTimesForDate, TURKEY_CITY_CODES } from '../api/diyanet.js';

/**
 * Base class for prayer data sources
 */
class PrayerDataSource {
    /**
     * @param {string} name - Source name
     */
    constructor(name) {
        this.name = name;
    }

    /**
     * Get prayer times for a location and date
     * @param {Date} date 
     * @param {number} lat 
     * @param {number} lng 
     * @param {object} options 
     * @returns {Promise<object>} Standardized prayer times object
     */
    async getTimes(date, lat, lng, options = {}) {
        throw new Error('Method not implemented');
    }
}

/**
 * AlAdhan API Source
 * Primary source for global data
 */
export class AlAdhanSource extends PrayerDataSource {
    constructor() {
        super('AlAdhan API');
        this.baseUrl = 'https://api.aladhan.com/v1';
    }

    async getTimes(date, lat, lng, options = {}) {
        const { method = 13, school = 0 } = options;

        // Cache key based on params (day precision)
        const dateStr = date.toISOString().split('T')[0];
        const cacheKey = `aladhan_${lat.toFixed(2)}_${lng.toFixed(2)}_${method}_${dateStr}`;

        const cached = globalCache.get(cacheKey);
        if (cached) return cached;

        const dd = date.getDate().toString().padStart(2, '0');
        const mm = (date.getMonth() + 1).toString().padStart(2, '0');
        const yyyy = date.getFullYear();

        const url = `${this.baseUrl}/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=${method}&school=${school}`;

        try {
            const response = await fetchWithRetry(url, { retries: 2, timeout: 3000 });
            const data = await response.json();

            if (data.code !== 200) throw new Error(`API Error: ${data.status}`);

            const timings = data.data.timings;

            const result = {
                fajr: timings.Fajr,
                sunrise: timings.Sunrise,
                dhuhr: timings.Dhuhr,
                asr: timings.Asr,
                maghrib: timings.Maghrib,
                isha: timings.Isha,
                source: this.name,
                methodId: method,
                _meta: data.data.meta
            };

            globalCache.set(cacheKey, result);
            return result;

        } catch (error) {
            throw error;
        }
    }
}

const normalizeTurkishKey = (value) => {
    if (!value || typeof value !== 'string') return null;

    return value
        .toLowerCase()
        .replace(/\u0131/g, 'i') // dotless i
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
};

const resolveDiyanetDistrictCode = (options = {}) => {
    if (typeof options.districtCode === 'number') {
        return options.districtCode;
    }

    const district = normalizeTurkishKey(options.district);
    const city = normalizeTurkishKey(options.city);
    const province = normalizeTurkishKey(options.province);

    const combined = [];
    if (province && district) combined.push(`${province}_${district}`);
    if (city && district) combined.push(`${city}_${district}`);
    if (province && city) combined.push(`${province}_${city}`);

    const candidates = [...combined, district, city, province].filter(Boolean);

    for (const key of candidates) {
        if (TURKEY_CITY_CODES[key]) {
            return TURKEY_CITY_CODES[key];
        }
    }

    return null;
};

/**
 * Diyanet API Source
 * Primary source for Turkey when district information is available.
 */
export class DiyanetSource extends PrayerDataSource {
    constructor() {
        super('Diyanet API');
    }

    async getTimes(date, lat, lng, options = {}) {
        const districtCode = resolveDiyanetDistrictCode(options);

        if (!districtCode) {
            throw new Error('Diyanet source requires districtCode/city/province for Turkey.');
        }

        const dateStr = date.toISOString().split('T')[0];
        const cacheKey = `diyanet_${districtCode}_${dateStr}`;
        const cached = globalCache.get(cacheKey);
        if (cached) return cached;

        const times = await fetchDiyanetPrayerTimesForDate(districtCode, date);

        if (!times) {
            throw new Error(`Diyanet prayer times not found for ${dateStr}, district ${districtCode}.`);
        }

        const result = {
            fajr: times.fajr,
            sunrise: times.sunrise,
            dhuhr: times.dhuhr,
            asr: times.asr,
            maghrib: times.maghrib,
            isha: times.isha,
            source: this.name,
            methodId: 13,
            location: {
                latitude: lat,
                longitude: lng,
                districtCode
            },
            _meta: {
                districtCode,
                gregorianDate: times.gregorianDate,
                hijriDate: times.hijriDate
            }
        };

        globalCache.set(cacheKey, result);
        return result;
    }
}

/**
 * Internal Calculation Source
 * Used as fallback and validator (Reference Truth)
 */
export class InternalCalculationSource extends PrayerDataSource {
    constructor() {
        super('Internal Calculation');
    }

    async getTimes(date, lat, lng, options = {}) {
        // This is synchronous but wrapped in Promise to match interface
        return new Promise((resolve) => {
            const result = calculatePrayerTimes(date, lat, lng, {
                methodId: options.method || options.methodId || 13, // Default Diyanet if missing
                ...options
            });

            // Normalize structure to match API simple output
            const simplified = {
                fajr: result.fajr,
                sunrise: result.sunrise,
                dhuhr: result.dhuhr,
                asr: result.asr,
                maghrib: result.maghrib,
                isha: result.isha,
                source: this.name,
                methodId: result.methodId
            };

            resolve(simplified);
        });
    }
}

/**
 * Google Search Source (Placeholder / Mock)
 * Can be implemented with a scraper later if needed
 */
export class GoogleSearchSource extends PrayerDataSource {
    constructor() {
        super('Google Search');
    }

    async getTimes(date, lat, lng, options = {}) {
        // Implement scraping logic here if available
        // For now, throws error to signal "not available"
        throw new Error('Google Search source not configured');
    }
}

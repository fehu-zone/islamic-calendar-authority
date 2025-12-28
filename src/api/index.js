/**
 * API MODULE - INDEX
 * ==================
 * Unified API interface for prayer times from official sources.
 * 
 * Usage:
 * - Online: Use API functions for accurate, official times
 * - Offline: Falls back to local calculations
 */

// AlAdhan API (most comprehensive, global coverage)
export {
    fetchPrayerTimes,
    fetchMonthlyPrayerTimes,
    fetchRamadanCalendar,
    fetchMethods,
    ALADHAN_METHODS
} from './aladhan.js';

// Diyanet API (Turkey - most accurate for TR)
export {
    fetchDiyanetPrayerTimes,
    fetchDiyanetPrayerTimesForDate,
    fetchDiyanetToday,
    fetchDiyanetRamadan,
    fetchDiyanetCountries,
    fetchDiyanetCities,
    fetchDiyanetDistricts,
    TURKEY_CITY_CODES
} from './diyanet.js';

/**
 * Smart prayer times fetcher with fallback
 * 
 * Tries API first, falls back to local calculation if API fails
 * 
 * @param {Date} date - Date
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @param {object} options - Options
 * @returns {Promise<object>} Prayer times
 */
export const getPrayerTimes = async (date, latitude, longitude, options = {}) => {
    const { useApi = true, method = 13 } = options;

    if (useApi) {
        try {
            // Try API first
            const { fetchPrayerTimes } = await import('./aladhan.js');
            return await fetchPrayerTimes(date, latitude, longitude, { method });
        } catch (error) {
            console.warn('API failed, falling back to local calculation:', error.message);
        }
    }

    // Fallback to local calculation
    const { calculatePrayerTimes } = await import('../prayer/calculator.js');
    const { getMethodForCountry } = await import('../../methods.js');

    return calculatePrayerTimes(date, latitude, longitude, {
        methodId: method,
        ...options
    });
};

/**
 * Get Ramadan calendar with API support
 * 
 * @param {number} hijriYear - Hijri year
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @param {object} options - Options
 * @returns {Promise<Array>} Ramadan calendar
 */
export const getRamadanTimes = async (hijriYear, latitude, longitude, options = {}) => {
    const { useApi = true, method = 13 } = options;

    if (useApi) {
        try {
            const { fetchRamadanCalendar } = await import('./aladhan.js');
            return await fetchRamadanCalendar(hijriYear, latitude, longitude, { method });
        } catch (error) {
            console.warn('API failed for Ramadan calendar:', error.message);
        }
    }

    // Fallback to local calculation
    const { calculatePrayerTimesRange } = await import('../prayer/calculator.js');
    const { getRamadanStartDate, getRamadanDuration } = await import('../../core.js');

    // This requires knowing the Ramadan dates
    // For now, return empty array if API fails
    return [];
};

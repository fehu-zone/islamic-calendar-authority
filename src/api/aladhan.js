/**
 * ALADHAN API CLIENT
 * ==================
 * Client for the AlAdhan prayer times API.
 * This provides accurate prayer times with Diyanet-compatible offsets.
 * 
 * API Documentation: https://aladhan.com/prayer-times-api
 * 
 * Note: This module is OPTIONAL. The library works offline without it.
 * When used, it provides times that match official calendars more closely.
 */

const ALADHAN_BASE_URL = 'https://api.aladhan.com/v1';

/**
 * Fetch prayer times from AlAdhan API
 * 
 * @param {Date} date - Date to get times for
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @param {object} options - Options
 * @returns {Promise<object>} Prayer times
 * 
 * @example
 * const times = await fetchPrayerTimes(new Date('2026-02-19'), 41.0082, 28.9784, { method: 13 });
 */
export const fetchPrayerTimes = async (date, latitude, longitude, options = {}) => {
    const {
        method = 13, // Default Diyanet
        school = 0,  // 0 = Shafi, 1 = Hanafi
    } = options;

    // Format date as DD-MM-YYYY
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const dateStr = `${day}-${month}-${year}`;

    const url = `${ALADHAN_BASE_URL}/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=${method}&school=${school}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`AlAdhan API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.code !== 200) {
            throw new Error(`AlAdhan API returned error: ${data.status}`);
        }

        const timings = data.data.timings;
        const meta = data.data.meta;

        return {
            // Standard times
            imsak: timings.Imsak,
            fajr: timings.Fajr,
            sunrise: timings.Sunrise,
            dhuhr: timings.Dhuhr,
            asr: timings.Asr,
            maghrib: timings.Maghrib,
            isha: timings.Isha,

            // Additional times
            sunset: timings.Sunset,
            midnight: timings.Midnight,

            // Metadata
            date: data.data.date.gregorian.date,
            hijriDate: data.data.date.hijri.date,
            hijriMonth: data.data.date.hijri.month.en,
            hijriDay: data.data.date.hijri.day,

            // Method info
            method: {
                id: meta.method.id,
                name: meta.method.name,
                offsets: meta.offset
            },

            // Location
            location: {
                latitude: meta.latitude,
                longitude: meta.longitude,
                timezone: meta.timezone
            },

            // Source info
            source: 'AlAdhan API',
            _raw: data.data
        };
    } catch (error) {
        throw new Error(`Failed to fetch from AlAdhan: ${error.message}`);
    }
};

/**
 * Fetch prayer times for a month
 * 
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @param {object} options - Options
 * @returns {Promise<Array>} Array of daily prayer times
 */
export const fetchMonthlyPrayerTimes = async (year, month, latitude, longitude, options = {}) => {
    const { method = 13 } = options;

    const url = `${ALADHAN_BASE_URL}/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=${method}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`AlAdhan API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.code !== 200) {
            throw new Error(`AlAdhan API returned error: ${data.status}`);
        }

        return data.data.map(day => ({
            date: day.date.gregorian.date,
            hijriDate: day.date.hijri.date,
            imsak: day.timings.Imsak,
            fajr: day.timings.Fajr,
            sunrise: day.timings.Sunrise,
            dhuhr: day.timings.Dhuhr,
            asr: day.timings.Asr,
            maghrib: day.timings.Maghrib,
            isha: day.timings.Isha
        }));
    } catch (error) {
        throw new Error(`Failed to fetch monthly data: ${error.message}`);
    }
};

/**
 * Fetch Ramadan calendar from AlAdhan
 * 
 * @param {number} hijriYear - Hijri year (e.g., 1447)
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @param {object} options - Options
 * @returns {Promise<Array>} Ramadan prayer times
 */
export const fetchRamadanCalendar = async (hijriYear, latitude, longitude, options = {}) => {
    const { method = 13 } = options;

    // Ramadan is month 9 in Hijri calendar
    const url = `${ALADHAN_BASE_URL}/hijriCalendar/${hijriYear}/9?latitude=${latitude}&longitude=${longitude}&method=${method}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`AlAdhan API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.code !== 200) {
            throw new Error(`AlAdhan API returned error: ${data.status}`);
        }

        return data.data.map(day => ({
            ramadanDay: parseInt(day.date.hijri.day),
            gregorianDate: day.date.gregorian.date,
            weekday: day.date.gregorian.weekday.en,

            // Sahur/Iftar times
            sahur: day.timings.Imsak,  // Last time to eat
            imsak: day.timings.Fajr,    // Fajr adhan (start of fast)
            iftar: day.timings.Maghrib, // Break fast

            // All prayer times
            fajr: day.timings.Fajr,
            sunrise: day.timings.Sunrise,
            dhuhr: day.timings.Dhuhr,
            asr: day.timings.Asr,
            maghrib: day.timings.Maghrib,
            isha: day.timings.Isha
        }));
    } catch (error) {
        throw new Error(`Failed to fetch Ramadan calendar: ${error.message}`);
    }
};

/**
 * Get list of available calculation methods from AlAdhan
 * @returns {Promise<object>} Methods object
 */
export const fetchMethods = async () => {
    const url = `${ALADHAN_BASE_URL}/methods`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    } catch (error) {
        throw new Error(`Failed to fetch methods: ${error.message}`);
    }
};

/**
 * Method ID mapping for reference
 */
export const ALADHAN_METHODS = {
    KARACHI: 1,
    ISNA: 2,
    MWL: 3,
    UMM_AL_QURA: 4,
    EGYPT: 5,
    TEHRAN: 7,
    GULF: 8,
    KUWAIT: 9,
    QATAR: 10,
    SINGAPORE: 11,
    FRANCE: 12,
    DIYANET: 13,
    RUSSIA: 14,
    DUBAI: 16,
    JAKIM: 17,
    TUNISIA: 18,
    ALGERIA: 19,
    KEMENAG: 20,
    MOROCCO: 21,
    PORTUGAL: 22,
    JORDAN: 23
};

/**
 * ISLAMIC CALENDAR AUTHORITY
 * ==========================
 * Comprehensive Islamic calendar library with prayer times, Ramadan dates,
 * and Qibla calculation based on official religious authorities worldwide.
 * 
 * Zero external dependencies - pure JavaScript implementation.
 * 
 * @author Ramazan App Team
 * @license MIT
 * @version 1.0.0
 */

// ============================================
// RAMADAN & AUTHORITY DATA
// ============================================

// Resmi Otorite Verileri
export { AUTHORITIES, getAuthorityByCode, getAllAuthorities } from './data/authorities.js';

// Ramazan Tarihleri (Yıllık Güncelleme)
export {
    RAMADAN_DATES,
    getRamadanDatesForCountry,
    isDateInRamadan,
    getRamadanDayForDate
} from './data/ramadanDates.js';

// Hesaplama Metodları
export {
    CALCULATION_METHODS,
    METHOD_IDS,
    getMethodForCountry,
    getMethodName,
    getMethodShortName,
    getMethodAngles,
    getMethodsForUI,
    compareMethodAngles
} from './methods.js';

// Ana Fonksiyonlar (Ramadan)
export {
    getRamadanStartDate,
    getRamadanEndDate,
    getRamadanDuration,
    isRamadan,
    getRamadanDay,
    getAuthorityForCountry,
    getMethodIdForCountry,
    getRamadanCalendar,
    compareRamadanStartDates
} from './core.js';

// Ülke Yardımcıları
export {
    normalizeCountryName,
    getCountryCode,
    getCountryNameByCode,
    COUNTRY_ALIASES
} from './utils/countries.js';

// ============================================
// PRAYER TIMES
// ============================================

export {
    // Calculator functions
    calculatePrayerTimes,
    calculatePrayerTimesRange,
    calculateMonthlyPrayerTimes,
    getNextPrayer,

    // Astronomical utilities
    dateToJulian,
    julianCentury,
    solarDeclination,
    equationOfTime,
    hourAngle,

    // High latitude
    requiresHighLatAdjustment,
    getRecommendedHighLatMethod,
    HIGH_LAT_REGIONS,

    // Constants
    ASR_FACTOR,
    HIGH_LAT_METHOD,
    TIME_FORMAT
} from './src/prayer/index.js';

// ============================================
// QIBLA
// ============================================

export {
    calculateQiblaDirection,
    calculateDistanceToKaaba,
    getCompassDirection,
    getCompassDirectionFull,
    getCompassDirection16,
    applyMagneticDeclination,
    validateCoordinates,
    MAGNETIC_DECLINATION
} from './src/qibla/index.js';

// ============================================
// API (Online Data Sources)
// ============================================

export {
    fetchPrayerTimes,
    fetchMonthlyPrayerTimes,
    fetchRamadanCalendar,
    fetchMethods,
    ALADHAN_METHODS,
    getPrayerTimes,
    getRamadanTimes,
    // Diyanet API (Turkey)
    fetchDiyanetPrayerTimes,
    fetchDiyanetPrayerTimesForDate,
    fetchDiyanetToday,
    fetchDiyanetRamadan,
    TURKEY_CITY_CODES
} from './src/api/index.js';

// ============================================
// CONVENIENCE EXPORTS
// ============================================

/**
 * Get all Islamic data for a location
 * Convenience function combining prayer times and qibla
 * 
 * @param {Date} date - Date for calculations
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @param {string} country - Country code or name
 * @param {object} options - Additional options
 * @returns {object} Combined Islamic data
 */
export const getIslamicData = async (date, latitude, longitude, country, options = {}) => {
    // Dynamic imports to avoid circular dependencies
    const { calculatePrayerTimes } = await import('./src/prayer/index.js');
    const { calculateQiblaDirection } = await import('./src/qibla/index.js');
    const { getMethodForCountry } = await import('./methods.js');
    const { getCountryCode } = await import('./utils/countries.js');
    const { isRamadan, getRamadanDay, getAuthorityForCountry } = await import('./core.js');

    const countryCode = getCountryCode(country) || country;
    const methodId = options.methodId || getMethodForCountry(countryCode);

    const prayerTimes = calculatePrayerTimes(date, latitude, longitude, {
        methodId,
        ...options
    });

    const qibla = calculateQiblaDirection(latitude, longitude);

    return {
        prayerTimes,
        qibla,
        ramadan: {
            isRamadan: isRamadan(date, countryCode),
            day: getRamadanDay(date, countryCode)
        },
        authority: getAuthorityForCountry(countryCode),
        location: {
            latitude,
            longitude,
            countryCode
        },
        date: date.toISOString().split('T')[0]
    };
};

// ============================================
// VERSION
// ============================================

export const VERSION = '1.0.0';
export const LIBRARY_NAME = 'islamic-calendar-authority';

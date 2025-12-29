/**
 * CORE FUNCTIONS
 * ==============
 * Main library functions
 */

import { AUTHORITIES, getAuthorityByCode } from './data/authorities.js';
import { RAMADAN_DATES, getRamadanDatesForCountry, isDateInRamadan, getRamadanDayForDate } from './data/ramadanDates.js';
import { getCountryCode, normalizeCountryName } from './utils/countries.js';
import { getMethodForCountry } from './methods.js';

/**
 * Returns the Ramadan start date for a specific country
 * 
 * @param {number} hijriYear - Hijri year (e.g., 1447)
 * @param {string} country - Country name or code (e.g., 'Turkey', 'TR', 'turkiye')
 * @returns {Date|null} Ramadan start date
 * 
 * @example
 * getRamadanStartDate(1447, 'Turkey')  // -> Date(2026-02-19)
 * getRamadanStartDate(1447, 'SA')      // -> Date(2026-02-18)
 */
export const getRamadanStartDate = (hijriYear, country) => {
    const countryCode = getCountryCode(country) || country?.toUpperCase();
    const ramadanData = getRamadanDatesForCountry(hijriYear, countryCode);

    if (ramadanData?.start) {
        return new Date(ramadanData.start);
    }

    return null;
};

/**
 * Returns the Ramadan end date for a specific country
 * 
 * @param {number} hijriYear - Hijri year
 * @param {string} country - Country name or code
 * @returns {Date|null} Ramadan end date (last day of iftar)
 */
export const getRamadanEndDate = (hijriYear, country) => {
    const countryCode = getCountryCode(country) || country?.toUpperCase();
    const ramadanData = getRamadanDatesForCountry(hijriYear, countryCode);

    if (ramadanData?.end) {
        return new Date(ramadanData.end);
    }

    return null;
};

/**
 * Returns the Ramadan duration for a specific country
 * 
 * @param {number} hijriYear - Hijri year
 * @param {string} country - Country name or code
 * @returns {number} Number of days (29 or 30)
 */
export const getRamadanDuration = (hijriYear, country) => {
    const countryCode = getCountryCode(country) || country?.toUpperCase();
    const ramadanData = getRamadanDatesForCountry(hijriYear, countryCode);

    return ramadanData?.duration || 30;
};

/**
 * Checks if a specific date is within Ramadan
 * 
 * @param {Date} date - Date to check
 * @param {string} country - Country name or code
 * @returns {boolean}
 * 
 * @example
 * isRamadan(new Date('2026-02-20'), 'Turkey')  // -> true
 * isRamadan(new Date('2026-02-17'), 'Turkey')  // -> false
 */
export const isRamadan = (date, country) => {
    const countryCode = getCountryCode(country) || country?.toUpperCase();
    return isDateInRamadan(date, countryCode);
};

/**
 * Returns the Ramadan day for a specific date
 * 
 * @param {Date} date - Date
 * @param {string} country - Country name or code
 * @returns {number|null} Ramadan day (1-30) or null
 * 
 * @example
 * getRamadanDay(new Date('2026-02-19'), 'Turkey')  // -> 1
 * getRamadanDay(new Date('2026-03-10'), 'Turkey')  // -> 20
 */
export const getRamadanDay = (date, country) => {
    const countryCode = getCountryCode(country) || country?.toUpperCase();
    return getRamadanDayForDate(date, countryCode);
};

/**
 * Returns the official authority information for the country
 * 
 * @param {string} country - Country name or code
 * @returns {Object|null} Authority information
 * 
 * @example
 * getAuthorityForCountry('Turkey')
 * // -> { code: 'TR', name: 'Turkey', authority: 'Diyanet İşleri Başkanlığı', ... }
 */
export const getAuthorityForCountry = (country) => {
    const countryCode = getCountryCode(country) || country?.toUpperCase();
    return getAuthorityByCode(countryCode);
};

/**
 * Returns the calculation method ID for the country
 * 
 * @param {string} country - Country name or code
 * @returns {number} Method ID
 */
export const getMethodIdForCountry = (country) => {
    const countryCode = getCountryCode(country) || country?.toUpperCase();

    // Check authorities first
    const authority = getAuthorityByCode(countryCode);
    if (authority?.methodId) {
        return authority.methodId;
    }

    // Otherwise check methods.js
    return getMethodForCountry(countryCode);
};

/**
 * Returns Ramadan 30-day calendar data
 * 
 * @param {number} hijriYear - Hijri year
 * @param {string} country - Country name or code
 * @returns {Array} 30-day data [{day, date, gregorianDate, weekday}]
 */
export const getRamadanCalendar = (hijriYear, country) => {
    const startDate = getRamadanStartDate(hijriYear, country);
    const duration = getRamadanDuration(hijriYear, country);

    if (!startDate) return [];

    const calendar = [];

    for (let i = 0; i < duration; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        calendar.push({
            day: i + 1,
            date: date,
            gregorianDate: date.toISOString().split('T')[0],
            weekday: date.toLocaleDateString('tr-TR', { weekday: 'long' }),
            weekdayShort: date.toLocaleDateString('en-US', { weekday: 'short' }),
            formatted: date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' }),
        });
    }

    return calendar;
};

/**
 * Debugging: Compare the 1st day of Ramadan for all countries
 * 
 * @param {number} hijriYear - Hijri year
 * @returns {Array} Country comparison
 */
export const compareRamadanStartDates = (hijriYear) => {
    const yearData = RAMADAN_DATES[hijriYear];
    if (!yearData) return [];

    const comparison = [];

    for (const [code, data] of Object.entries(yearData)) {
        if (code === 'DEFAULT') continue;

        const authority = getAuthorityByCode(code);
        comparison.push({
            countryCode: code,
            countryName: authority?.name || code,
            startDate: data.start,
            source: data.source,
            authority: authority?.authorityShort || 'Unknown'
        });
    }

    // Sort by date
    comparison.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    return comparison;
};

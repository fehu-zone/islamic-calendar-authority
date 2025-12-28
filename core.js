/**
 * CORE FUNCTIONS
 * ==============
 * Ana kütüphane fonksiyonları
 */

import { AUTHORITIES, getAuthorityByCode } from './data/authorities.js';
import { RAMADAN_DATES, getRamadanDatesForCountry, isDateInRamadan, getRamadanDayForDate } from './data/ramadanDates.js';
import { getCountryCode, normalizeCountryName } from './utils/countries.js';
import { getMethodForCountry } from './methods.js';

/**
 * Belirli bir ülke için Ramazan başlangıç tarihini döndürür
 * 
 * @param {number} hijriYear - Hicri yıl (örn: 1447)
 * @param {string} country - Ülke adı veya kodu (örn: 'Turkey', 'TR', 'türkiye')
 * @returns {Date|null} Ramazan başlangıç tarihi
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
 * Belirli bir ülke için Ramazan bitiş tarihini döndürür
 * 
 * @param {number} hijriYear - Hicri yıl
 * @param {string} country - Ülke adı veya kodu
 * @returns {Date|null} Ramazan bitiş tarihi (son iftar günü)
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
 * Belirli bir ülke için Ramazan süresini döndürür
 * 
 * @param {number} hijriYear - Hicri yıl
 * @param {string} country - Ülke adı veya kodu
 * @returns {number} Gün sayısı (29 veya 30)
 */
export const getRamadanDuration = (hijriYear, country) => {
    const countryCode = getCountryCode(country) || country?.toUpperCase();
    const ramadanData = getRamadanDatesForCountry(hijriYear, countryCode);

    return ramadanData?.duration || 30;
};

/**
 * Belirli bir tarihin Ramazan olup olmadığını kontrol eder
 * 
 * @param {Date} date - Kontrol edilecek tarih
 * @param {string} country - Ülke adı veya kodu
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
 * Belirli bir tarih için Ramazan gününü döndürür
 * 
 * @param {Date} date - Tarih
 * @param {string} country - Ülke adı veya kodu
 * @returns {number|null} Ramazan günü (1-30) veya null
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
 * Ülke için resmi otorite bilgisini döndürür
 * 
 * @param {string} country - Ülke adı veya kodu
 * @returns {Object|null} Otorite bilgisi
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
 * Ülke için hesaplama metod ID'sini döndürür
 * 
 * @param {string} country - Ülke adı veya kodu
 * @returns {number} Method ID
 */
export const getMethodIdForCountry = (country) => {
    const countryCode = getCountryCode(country) || country?.toUpperCase();

    // Önce authorities'den bak
    const authority = getAuthorityByCode(countryCode);
    if (authority?.methodId) {
        return authority.methodId;
    }

    // Yoksa methods.js'den bak
    return getMethodForCountry(countryCode);
};

/**
 * Ramazan 30 günlük takvim verisini döndürür
 * 
 * @param {number} hijriYear - Hicri yıl
 * @param {string} country - Ülke adı veya kodu
 * @returns {Array} 30 günlük veri [{day, date, gregorianDate, weekday}]
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
 * Debugging: Tüm ülkelerin Ramazan 1. gününü karşılaştır
 * 
 * @param {number} hijriYear - Hicri yıl
 * @returns {Array} Ülke karşılaştırması
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

    // Tarihe göre sırala
    comparison.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    return comparison;
};

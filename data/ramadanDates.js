/**
 * RAMADAN DATES DATABASE
 * ======================
 * Annually updated official Ramadan start/end dates.
 * 
 * Source: Official announcements from each country's religious authorities
 * 
 * NOTE: This data is updated before Ramadan each year with official announcements.
 * For years not yet announced, astronomical prediction + historical offset is used.
 */

/**
 * Ramadan dates (Hijri Year -> Country Code -> Dates)
 * 
 * Format:
 * {
 *   start: 'YYYY-MM-DD',  // First sahur night (1st day of Ramadan)
 *   end: 'YYYY-MM-DD',    // Last day of iftar (29th/30th day of Ramadan)
 *   duration: 29 | 30,    // Ramadan duration (days)
 *   source: 'official' | 'astronomical' | 'estimated',
 *   announcedAt: 'YYYY-MM-DD' | null  // Official announcement date
 * }
 */
export const RAMADAN_DATES = {
    // HIJRI 1446 (2025)
    1446: {
        TR: {
            start: '2025-03-01',
            end: '2025-03-29',
            duration: 29,
            source: 'official',
            announcedAt: '2024-12-01',
            notes: 'Diyanet calendar'
        },
        SA: {
            start: '2025-02-28',
            end: '2025-03-29',
            duration: 30,
            source: 'official',
            announcedAt: null,
            notes: 'Umm Al-Qura calendar'
        },
        // Default astronomical for other countries
        DEFAULT: {
            start: '2025-02-28',
            end: '2025-03-29',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'Astronomical calculation'
        }
    },

    // HIJRI 1447 (2026) - TARGET YEAR
    1447: {
        // TURKEY - Diyanet Calendar
        // First Sahur: Night of Feb 18-19, First iftar: Feb 19
        TR: {
            start: '2026-02-19',  // Day 1 of Ramadan (First sahur night of 18-19)
            end: '2026-03-20',   // Day 30 of Ramadan or before Eid day 1
            duration: 30,
            source: 'official',  // Diyanet calendar (pre-calculated)
            announcedAt: null,   // No official announcement yet
            notes: 'Diyanet Affairs calculation. First sahur night of Feb 18.'
        },

        // SAUDI ARABIA - Umm Al-Qura
        // Usually starts same as Turkey or 1 day before
        SA: {
            start: '2026-02-18',  // Astronomik olarak 18 Şubat
            end: '2026-03-19',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'Umm Al-Qura astronomical calendar. May change with moon sighting.'
        },

        // PAKISTAN - Ruet-e-Hilal
        // Usually starts 1 day after Saudi Arabia
        PK: {
            start: '2026-02-19',
            end: '2026-03-20',
            duration: 30,
            source: 'estimated',
            announcedAt: null,
            notes: 'Historical pattern: Usually 1 day after Saudi. Confirmed by moon sighting.'
        },

        // INDIA
        IN: {
            start: '2026-02-19',
            end: '2026-03-20',
            duration: 30,
            source: 'estimated',
            announcedAt: null,
            notes: 'May vary region to region. North vs South might be different.'
        },

        // BANGLADESH
        BD: {
            start: '2026-02-19',
            end: '2026-03-20',
            duration: 30,
            source: 'estimated',
            announcedAt: null,
            notes: 'Usually same day as Pakistan.'
        },

        // INDONESIA
        ID: {
            start: '2026-02-19',
            end: '2026-03-20',
            duration: 30,
            source: 'estimated',
            announcedAt: null,
            notes: 'Waiting for Kemenag announcement.'
        },

        // MALAYSIA
        MY: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'estimated',
            announcedAt: null,
            notes: 'Same as Singapore and Brunei.'
        },

        // ABD (ISNA)
        US: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'ISNA calculation method.'
        },

        // KANADA
        CA: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'Same as the USA.'
        },

        // UNITED KINGDOM
        GB: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'Waiting for MCB announcement.'
        },

        // GERMANY
        DE: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'ZMD or DITIB announcement.'
        },

        // FRANCE
        FR: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'UOIF calendar.'
        },

        // EGYPT
        EG: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'estimated',
            announcedAt: null,
            notes: 'Dar al-Ifta moon sighting.'
        },

        // QATAR
        QA: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'Same as Saudi.'
        },

        // UAE
        AE: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'Same as Saudi.'
        },

        // DEFAULT (Astronomical)
        DEFAULT: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'Astronomical calculation. Local authority may announce differently.'
        }
    },

    // HIJRI 1448 (2027) - FUTURE
    1448: {
        DEFAULT: {
            start: '2027-02-07',  // Tahmini
            end: '2027-03-08',
            duration: 30,
            source: 'estimated',
            announcedAt: null,
            notes: 'Astronomical prediction. Official announcements pending.'
        }
    }
};

/**
 * Returns Ramadan dates for a specific year and country
 * @param {number} hijriYear - Hijri year (e.g., 1447)
 * @param {string} countryCode - ISO 2-letter country code (e.g., 'TR')
 * @returns {Object} Ramadan dates
 */
export const getRamadanDatesForCountry = (hijriYear, countryCode) => {
    const yearData = RAMADAN_DATES[hijriYear];
    if (!yearData) {
        return null;
    }

    const code = countryCode?.toUpperCase();

    // Look for country specific data first
    if (yearData[code]) {
        return yearData[code];
    }

    // Otherwise return default
    return yearData.DEFAULT || null;
};

/**
 * Checks if a specific date is within Ramadan
 * @param {Date} date - Date to check
 * @param {string} countryCode - Country code
 * @returns {boolean}
 */
export const isDateInRamadan = (date, countryCode = 'DEFAULT') => {
    // Check all years
    for (const [hijriYear, yearData] of Object.entries(RAMADAN_DATES)) {
        const countryData = yearData[countryCode?.toUpperCase()] || yearData.DEFAULT;
        if (countryData) {
            const start = new Date(countryData.start);
            const end = new Date(countryData.end);

            if (date >= start && date <= end) {
                return true;
            }
        }
    }
    return false;
};

/**
 * Returns the Ramadan day for a specific date (1-30)
 * @param {Date} date - Date
 * @param {string} countryCode - Country code
 * @returns {number|null} Ramadan day or null
 */
export const getRamadanDayForDate = (date, countryCode = 'DEFAULT') => {
    for (const [hijriYear, yearData] of Object.entries(RAMADAN_DATES)) {
        const countryData = yearData[countryCode?.toUpperCase()] || yearData.DEFAULT;
        if (countryData) {
            const start = new Date(countryData.start);
            const end = new Date(countryData.end);

            if (date >= start && date <= end) {
                const diffTime = date.getTime() - start.getTime();
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                return diffDays + 1; // 1-indexed
            }
        }
    }
    return null;
};

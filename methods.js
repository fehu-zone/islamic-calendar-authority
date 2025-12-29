/**
 * CALCULATION METHODS
 * ===================
 * Calculation method definitions for AlAdhan API and other sources
 * 
 * This file contains all 15 major calculation methods.
 * Fajr and Isha angles are defined for each method.
 */

/**
 * Method ID Constants
 * IDs compatible with AlAdhan API
 */
export const METHOD_IDS = {
    KARACHI: 1,         // University of Islamic Sciences, Karachi
    ISNA: 2,            // Islamic Society of North America
    MWL: 3,             // Muslim World League
    UMM_AL_QURA: 4,     // Umm Al-Qura University, Makkah
    EGYPT: 5,           // Egyptian General Authority of Survey
    MAKKAH: 6,          // Umm Al-Qura (alternative)
    TEHRAN: 7,          // Institute of Geophysics, University of Tehran
    GULF: 8,            // Gulf Region
    KUWAIT: 9,          // Kuwait
    QATAR: 10,          // Qatar
    SINGAPORE: 11,      // Majlis Ugama Islam Singapura
    FRANCE: 12,         // Union Des Organisations Islamiques De France
    DIYANET: 13,        // Presidency of Religious Affairs, Turkey
    RUSSIA: 14,         // Spiritual Administration of Muslims of Russia
    CUSTOM: 99,         // Custom angles
};

/**
 * Detailed Method Information
 * For each method:
 * - Fajr angle (degrees below horizon)
 * - Isha angle (degrees below horizon) or minutes
 * - Maghrib angle (only for Tehran method)
 * - Countries where used
 */
export const CALCULATION_METHODS = {
    [METHOD_IDS.KARACHI]: {
        id: 1,
        name: 'University of Islamic Sciences, Karachi',
        shortName: 'Karachi',
        fajrAngle: 18,
        ishaAngle: 18,
        maghribAngle: null,
        ishaMinutes: null,
        countries: ['PK', 'IN', 'BD', 'AF', 'NP'],
        region: 'South Asia',
        notes: 'Commonly used in South Asia. Uses 18° for Fajr and Isha.',
        source: 'https://www.moonsighting.com/fajr-isha.html'
    },

    [METHOD_IDS.ISNA]: {
        id: 2,
        name: 'Islamic Society of North America',
        shortName: 'ISNA',
        fajrAngle: 15,
        ishaAngle: 15,
        maghribAngle: null,
        ishaMinutes: null,
        countries: ['US', 'CA'],
        region: 'North America',
        notes: 'Standard for North America. Later Fajr, earlier Isha.',
        source: 'https://www.isna.net'
    },

    [METHOD_IDS.MWL]: {
        id: 3,
        name: 'Muslim World League',
        shortName: 'MWL',
        fajrAngle: 18,
        ishaAngle: 17,
        maghribAngle: null,
        ishaMinutes: null,
        countries: ['GB', 'DE', 'NL', 'BE', 'AT', 'CH', 'JO', 'PS', 'IQ', 'SY', 'LB', 'YE'],
        region: 'Europe / Middle East',
        notes: 'Commonly used in Europe and the Middle East. Used since 1986.',
        source: 'https://www.themwl.org'
    },

    [METHOD_IDS.UMM_AL_QURA]: {
        id: 4,
        name: 'Umm Al-Qura University, Makkah',
        shortName: 'Umm Al-Qura',
        fajrAngle: 18.5,
        ishaAngle: null,
        maghribAngle: null,
        ishaMinutes: 90, // 120 minutes during Ramadan
        countries: ['SA', 'BH'],
        region: 'Arabian Peninsula',
        notes: 'Official method of Saudi Arabia. Maghrib + 90 minutes for Isha.',
        source: 'https://www.ummulqura.org.sa'
    },

    [METHOD_IDS.EGYPT]: {
        id: 5,
        name: 'Egyptian General Authority of Survey',
        shortName: 'Egypt',
        fajrAngle: 19.5,
        ishaAngle: 17.5,
        maghribAngle: null,
        ishaMinutes: null,
        countries: ['EG', 'LY', 'SD', 'SO', 'DJ', 'ER'],
        region: 'North/East Africa',
        notes: 'For Egypt and surrounding areas. Provides one of the earliest Fajr times.',
        source: 'https://www.esa.gov.eg'
    },

    [METHOD_IDS.MAKKAH]: {
        id: 6,
        name: 'Umm Al-Qura (Makkah)',
        shortName: 'Makkah',
        fajrAngle: 18.5,
        ishaAngle: null,
        maghribAngle: null,
        ishaMinutes: 90,
        countries: [],
        region: 'Arabian Peninsula',
        notes: 'Same as Umm Al-Qura. For AlAdhan compatibility.',
        source: 'https://www.ummulqura.org.sa'
    },

    [METHOD_IDS.TEHRAN]: {
        id: 7,
        name: 'Institute of Geophysics, University of Tehran',
        shortName: 'Tehran',
        fajrAngle: 17.7,
        ishaAngle: 14,
        maghribAngle: 4.5, // Special angle for Maghrib
        ishaMinutes: null,
        countries: ['IR'],
        region: 'Iran',
        notes: 'Shia calculation method. Maghrib is 4.5° below the horizon.',
        source: 'https://geophysics.ut.ac.ir'
    },

    [METHOD_IDS.GULF]: {
        id: 8,
        name: 'Gulf Region',
        shortName: 'Gulf',
        fajrAngle: 19.5,
        ishaAngle: null,
        maghribAngle: null,
        ishaMinutes: 90,
        countries: ['OM'],
        region: 'Gulf States',
        notes: 'General Gulf region calculation.',
        source: null
    },

    [METHOD_IDS.KUWAIT]: {
        id: 9,
        name: 'Kuwait',
        shortName: 'Kuwait',
        fajrAngle: 18,
        ishaAngle: 17.5,
        maghribAngle: null,
        ishaMinutes: null,
        countries: ['KW'],
        region: 'Kuwait',
        notes: 'Kuwait specific calculation.',
        source: 'https://www.awqaf.gov.kw'
    },

    [METHOD_IDS.QATAR]: {
        id: 10,
        name: 'Qatar',
        shortName: 'Qatar',
        fajrAngle: 18,
        ishaAngle: null,
        maghribAngle: null,
        ishaMinutes: 90,
        countries: ['QA'],
        region: 'Qatar',
        notes: 'Qatar specific. Maghrib + 90 minutes for Isha.',
        source: 'https://www.awqaf.gov.qa'
    },

    [METHOD_IDS.SINGAPORE]: {
        id: 11,
        name: 'Majlis Ugama Islam Singapura',
        shortName: 'Singapore/MUIS',
        fajrAngle: 20,
        ishaAngle: 18,
        maghribAngle: null,
        ishaMinutes: null,
        countries: ['SG', 'MY', 'ID', 'BN', 'TH', 'PH'],
        region: 'Southeast Asia',
        notes: 'For Southeast Asia. Provides the earliest Fajr times.',
        source: 'https://www.muis.gov.sg'
    },

    [METHOD_IDS.FRANCE]: {
        id: 12,
        name: 'Union Des Organisations Islamiques De France',
        shortName: 'UOIF',
        fajrAngle: 12,
        ishaAngle: 12,
        maghribAngle: null,
        ishaMinutes: null,
        countries: ['FR'],
        region: 'France',
        notes: 'Specific calculation for France. Latest Fajr, earliest Isha.',
        source: 'https://www.uoif-online.com'
    },

    [METHOD_IDS.DIYANET]: {
        id: 13,
        name: 'Presidency of Religious Affairs',
        shortName: 'Diyanet',
        fajrAngle: 18,
        ishaAngle: 17,
        maghribAngle: null,
        ishaMinutes: null,
        asrSchool: 'shafi',  // Diyanet uses Shafi method for Asr
        countries: ['TR', 'TRNC'], // Turkey and TRNC
        region: 'Turkey',
        notes: 'Official Turkish calendar. Diyanet\'s own calculations. Uses Shafi method for Asr.',
        source: 'https://namazvakitleri.diyanet.gov.tr'
    },

    [METHOD_IDS.RUSSIA]: {
        id: 14,
        name: 'Spiritual Administration of Muslims of Russia',
        shortName: 'Russia/SAMR',
        fajrAngle: 16,
        ishaAngle: 15,
        maghribAngle: null,
        ishaMinutes: null,
        countries: ['RU', 'KZ', 'UZ', 'AZ', 'TM', 'KG', 'TJ'],
        region: 'Russia / Central Asia',
        notes: 'For Russia and Central Asia. Adapted for high latitudes.',
        source: 'https://www.dumrf.ru'
    },

    [METHOD_IDS.CUSTOM]: {
        id: 99,
        name: 'Custom',
        shortName: 'Custom',
        fajrAngle: 18,
        ishaAngle: 17,
        maghribAngle: null,
        ishaMinutes: null,
        countries: [],
        region: 'Custom',
        notes: 'User defined angles.',
        source: null
    }
};

/**
 * Returns method ID by country code
 * @param {string} countryCode - ISO 2-letter country code
 * @returns {number} Method ID
 */
export const getMethodForCountry = (countryCode) => {
    if (!countryCode) return METHOD_IDS.DIYANET;

    const code = countryCode.toUpperCase();

    for (const [methodId, methodInfo] of Object.entries(CALCULATION_METHODS)) {
        if (methodInfo.countries && methodInfo.countries.includes(code)) {
            return parseInt(methodId);
        }
    }

    // Default: Estimate by region
    // European countries -> MWL
    const europeanCountries = ['IT', 'ES', 'PT', 'GR', 'PL', 'RO', 'HU', 'CZ', 'SK', 'BG', 'HR', 'RS', 'BA', 'SI', 'AL', 'XK', 'MK', 'ME'];
    if (europeanCountries.includes(code)) {
        return METHOD_IDS.MWL;
    }

    // African countries -> Egypt or MWL
    const africanCountries = ['MA', 'DZ', 'TN', 'NG', 'SN', 'ML', 'NE', 'TD', 'ET', 'KE', 'TZ', 'UG', 'ZA'];
    if (africanCountries.includes(code)) {
        return METHOD_IDS.EGYPT;
    }

    // Gulf countries -> Umm Al-Qura
    const gulfCountries = ['AE', 'OM', 'YE'];
    if (gulfCountries.includes(code)) {
        return METHOD_IDS.UMM_AL_QURA;
    }

    // Default: Diyanet (most commonly used and balanced)
    return METHOD_IDS.DIYANET;
};

/**
 * Returns the method name from method ID
 * @param {number} methodId - Method ID
 * @returns {string} Method name
 */
export const getMethodName = (methodId) => {
    const method = CALCULATION_METHODS[methodId];
    return method?.name || 'Unknown Method';
};

/**
 * Returns the short name from method ID
 * @param {number} methodId - Method ID
 * @returns {string} Short name
 */
export const getMethodShortName = (methodId) => {
    const method = CALCULATION_METHODS[methodId];
    return method?.shortName || 'Unknown';
};

/**
 * Returns angle information from method ID
 * @param {number} methodId - Method ID
 * @returns {object} Angle information
 */
export const getMethodAngles = (methodId) => {
    const method = CALCULATION_METHODS[methodId];
    if (!method) return null;

    return {
        fajr: method.fajrAngle,
        isha: method.ishaAngle,
        ishaMinutes: method.ishaMinutes,
        maghrib: method.maghribAngle
    };
};

/**
 * Returns method list for UI
 * @returns {Array} Method list [{id, name, shortName}]
 */
export const getMethodsForUI = () => {
    return Object.values(CALCULATION_METHODS)
        .filter(m => m.id !== 99) // Exclude Custom
        .map(m => ({
            id: m.id,
            name: m.name,
            shortName: m.shortName,
            region: m.region
        }))
        .sort((a, b) => a.id - b.id);
};

/**
 * Calculates the difference between two methods
 * @param {number} methodId1 - First method ID
 * @param {number} methodId2 - Second method ID
 * @returns {object} Difference information
 */
export const compareMethodAngles = (methodId1, methodId2) => {
    const m1 = CALCULATION_METHODS[methodId1];
    const m2 = CALCULATION_METHODS[methodId2];

    if (!m1 || !m2) return null;

    return {
        method1: m1.shortName,
        method2: m2.shortName,
        fajrDiff: (m1.fajrAngle || 0) - (m2.fajrAngle || 0),
        ishaDiff: (m1.ishaAngle || 0) - (m2.ishaAngle || 0),
        notes: {
            fajr: (m1.fajrAngle || 0) > (m2.fajrAngle || 0)
                ? `${m1.shortName} earlier Fajr`
                : `${m2.shortName} earlier Fajr`,
            isha: (m1.ishaAngle || 0) > (m2.ishaAngle || 0)
                ? `${m1.shortName} later Isha`
                : `${m2.shortName} later Isha`
        }
    };
};

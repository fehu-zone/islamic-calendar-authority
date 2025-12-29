/**
 * OFFICIAL RELIGIOUS AUTHORITY DATA
 * =================================
 * Official religious authority and preferred calculation method for each country.
 * 
 * Source: Official religious institutions of each country
 */

export const AUTHORITIES = {
    // TURKEY
    TR: {
        code: 'TR',
        name: 'Turkey',
        nameLocal: 'Türkiye',
        authority: 'Diyanet İşleri Başkanlığı',
        authorityShort: 'Diyanet',
        methodId: 13,
        website: 'https://www.diyanet.gov.tr',
        timezone: 'Europe/Istanbul',
        // Diyanet publishes its own calendar, which can differ from astronomical calculations by 1 day
        usesLunarSighting: false, // Calculation based
        notes: 'Diyanet publishes official prayer times and religious calendars for Turkey.'
    },

    // SAUDI ARABIA
    SA: {
        code: 'SA',
        name: 'Saudi Arabia',
        nameLocal: 'المملكة العربية السعودية',
        authority: 'Umm Al-Qura Calendar Committee',
        authorityShort: 'Umm Al-Qura',
        methodId: 4,
        website: 'https://www.ummulqura.org.sa',
        timezone: 'Asia/Riyadh',
        usesLunarSighting: true, // Moon sighting based
        notes: 'Reference for Makkah and Madinah. Decides based on moon sighting.'
    },

    // EGYPT
    EG: {
        code: 'EG',
        name: 'Egypt',
        nameLocal: 'مصر',
        authority: 'Egyptian General Authority of Survey',
        authorityShort: 'EGA',
        methodId: 5,
        website: 'https://www.esa.gov.eg',
        timezone: 'Africa/Cairo',
        usesLunarSighting: true,
        notes: 'Egypt Dar al-Ifta decides based on moon sighting.'
    },

    // IRAN
    IR: {
        code: 'IR',
        name: 'Iran',
        nameLocal: 'ایران',
        authority: 'Institute of Geophysics, University of Tehran',
        authorityShort: 'Tehran',
        methodId: 7,
        website: 'https://geophysics.ut.ac.ir',
        timezone: 'Asia/Tehran',
        usesLunarSighting: false,
        notes: 'Uses Shia calculation angles.'
    },

    // PAKISTAN
    PK: {
        code: 'PK',
        name: 'Pakistan',
        nameLocal: 'پاکستان',
        authority: 'Central Ruet-e-Hilal Committee',
        authorityShort: 'Ruet-e-Hilal',
        methodId: 1,
        website: 'https://www.moonsighting.pk',
        timezone: 'Asia/Karachi',
        usesLunarSighting: true,
        notes: 'Decides by moon sighting. Usually starts 1 day after Saudi Arabia.'
    },

    // INDIA
    IN: {
        code: 'IN',
        name: 'India',
        nameLocal: 'भारत',
        authority: 'Central Hilal Committee of India',
        authorityShort: 'CHCI',
        methodId: 1,
        website: null,
        timezone: 'Asia/Kolkata',
        usesLunarSighting: true,
        notes: 'Local moon sighting. May vary from region to region.'
    },

    // BANGLADESH
    BD: {
        code: 'BD',
        name: 'Bangladesh',
        nameLocal: 'বাংলাদেশ',
        authority: 'Islamic Foundation Bangladesh',
        authorityShort: 'IFB',
        methodId: 1,
        website: 'https://islamicfoundation.gov.bd',
        timezone: 'Asia/Dhaka',
        usesLunarSighting: true,
        notes: 'Usually starts on the same day as Saudi Arabia or 1 day after.'
    },

    // INDONESIA
    ID: {
        code: 'ID',
        name: 'Indonesia',
        nameLocal: 'Indonesia',
        authority: 'Kementerian Agama (Ministry of Religious Affairs)',
        authorityShort: 'Kemenag',
        methodId: 11,
        website: 'https://kemenag.go.id',
        timezone: 'Asia/Jakarta',
        usesLunarSighting: true,
        notes: 'Worlds most populous Muslim population. Makes a joint moon sighting decision.'
    },

    // MALAYSIA
    MY: {
        code: 'MY',
        name: 'Malaysia',
        nameLocal: 'Malaysia',
        authority: 'JAKIM (Department of Islamic Development Malaysia)',
        authorityShort: 'JAKIM',
        methodId: 11,
        website: 'https://www.islam.gov.my',
        timezone: 'Asia/Kuala_Lumpur',
        usesLunarSighting: true,
        notes: 'Works in coordination with Singapore and Brunei.'
    },

    // USA
    US: {
        code: 'US',
        name: 'United States',
        nameLocal: 'United States',
        authority: 'Islamic Society of North America',
        authorityShort: 'ISNA',
        methodId: 2,
        website: 'https://www.isna.net',
        timezone: 'America/New_York',
        usesLunarSighting: false, // Hesaplama bazlı (Moonsighting.com bazıları)
        notes: 'ISNA uses calculation. Fiqh Council of North America decisions.'
    },

    // CANADA
    CA: {
        code: 'CA',
        name: 'Canada',
        nameLocal: 'Canada',
        authority: 'Islamic Society of North America - Canada',
        authorityShort: 'ISNA',
        methodId: 2,
        website: 'https://www.isnacanada.com',
        timezone: 'America/Toronto',
        usesLunarSighting: false,
        notes: 'Same methodology as the USA.'
    },

    // UNITED KINGDOM
    GB: {
        code: 'GB',
        name: 'United Kingdom',
        nameLocal: 'United Kingdom',
        authority: 'Muslim Council of Britain',
        authorityShort: 'MCB',
        methodId: 3,
        website: 'https://mcb.org.uk',
        timezone: 'Europe/London',
        usesLunarSighting: false,
        notes: 'Uses MWL method. Different communities may follow different days.'
    },

    // GERMANY
    DE: {
        code: 'DE',
        name: 'Germany',
        nameLocal: 'Deutschland',
        authority: 'Zentralrat der Muslime in Deutschland',
        authorityShort: 'ZMD',
        methodId: 3,
        website: 'https://zentralrat.de',
        timezone: 'Europe/Berlin',
        usesLunarSighting: false,
        notes: 'MWL method. DITIB (Diyanet Germany) may use a different calendar.'
    },

    // FRANCE
    FR: {
        code: 'FR',
        name: 'France',
        nameLocal: 'France',
        authority: 'UOIF (Union des Organisations Islamiques de France)',
        authorityShort: 'UOIF',
        methodId: 12,
        website: 'https://www.uoif-online.com',
        timezone: 'Europe/Paris',
        usesLunarSighting: false,
        notes: 'Special calculation method for France.'
    },

    // QATAR
    QA: {
        code: 'QA',
        name: 'Qatar',
        nameLocal: 'قطر',
        authority: 'Ministry of Awqaf and Islamic Affairs',
        authorityShort: 'Awqaf Qatar',
        methodId: 4,
        website: 'https://www.awqaf.gov.qa',
        timezone: 'Asia/Qatar',
        usesLunarSighting: true,
        notes: 'Usually starts on the same day as Saudi Arabia.'
    },

    // UAE
    AE: {
        code: 'AE',
        name: 'United Arab Emirates',
        nameLocal: 'الإمارات',
        authority: 'General Authority of Islamic Affairs and Endowments',
        authorityShort: 'Awqaf UAE',
        methodId: 4,
        website: 'https://www.awqaf.gov.ae',
        timezone: 'Asia/Dubai',
        usesLunarSighting: true,
        notes: 'Usually starts on the same day as Saudi Arabia.'
    },

    // KUWAIT
    KW: {
        code: 'KW',
        name: 'Kuwait',
        nameLocal: 'الكويت',
        authority: 'Ministry of Awqaf and Islamic Affairs',
        authorityShort: 'Awqaf Kuwait',
        methodId: 4,
        website: 'https://www.awqaf.gov.kw',
        timezone: 'Asia/Kuwait',
        usesLunarSighting: true,
        notes: 'Coordinated with Gulf countries.'
    },

    // MOROCCO
    MA: {
        code: 'MA',
        name: 'Morocco',
        nameLocal: 'المغرب',
        authority: 'Ministry of Habous and Islamic Affairs',
        authorityShort: 'Habous',
        methodId: 3,
        website: 'https://www.habous.gov.ma',
        timezone: 'Africa/Casablanca',
        usesLunarSighting: true,
        notes: 'Reference for North Africa. Own moon sighting.'
    },

    // ALGERIA
    DZ: {
        code: 'DZ',
        name: 'Algeria',
        nameLocal: 'الجزائر',
        authority: 'Ministry of Religious Affairs',
        authorityShort: 'MRA Algeria',
        methodId: 3,
        website: 'https://www.marw.dz',
        timezone: 'Africa/Algiers',
        usesLunarSighting: true,
        notes: 'Usually starts on the same day as Morocco.'
    },

    // RUSSIA
    RU: {
        code: 'RU',
        name: 'Russia',
        nameLocal: 'Россия',
        authority: 'Spiritual Administration of Muslims of Russia',
        authorityShort: 'SAMR',
        methodId: 14,
        website: 'https://www.dumrf.ru',
        timezone: 'Europe/Moscow',
        usesLunarSighting: false,
        notes: 'Special calculation for Russian Muslims.'
    },

    // BOSNIA AND HERZEGOVINA
    BA: {
        code: 'BA',
        name: 'Bosnia and Herzegovina',
        nameLocal: 'Bosna i Hercegovina',
        authority: 'Islamic Community in Bosnia and Herzegovina',
        authorityShort: 'Rijaset',
        methodId: 3,
        website: 'https://www.rijaset.ba',
        timezone: 'Europe/Sarajevo',
        usesLunarSighting: false,
        notes: 'Reference for the Balkans. May be coordinated with Turkey.'
    },

    // JORDAN
    JO: {
        code: 'JO',
        name: 'Jordan',
        nameLocal: 'الأردن',
        authority: 'Ministry of Awqaf and Islamic Affairs',
        authorityShort: 'Awqaf Jordan',
        methodId: 3,
        website: 'https://www.awqaf.gov.jo',
        timezone: 'Asia/Amman',
        usesLunarSighting: true,
        notes: 'Usually starts on the same day as Palestine.'
    },

    // NIGERIA
    NG: {
        code: 'NG',
        name: 'Nigeria',
        nameLocal: 'Nigeria',
        authority: 'Nigerian Supreme Council for Islamic Affairs',
        authorityShort: 'NSCIA',
        methodId: 3,
        website: null,
        timezone: 'Africa/Lagos',
        usesLunarSighting: true,
        notes: 'Africas most populous Muslim population.'
    }
};

/**
 * Returns authority information from country code
 * @param {string} countryCode - ISO 2-letter country code (TR, SA, US etc.)
 * @returns {Object|null} Authority information
 */
export const getAuthorityByCode = (countryCode) => {
    if (!countryCode) return null;
    return AUTHORITIES[countryCode.toUpperCase()] || null;
};

/**
 * Returns a list of all authorities
 * @returns {Array} Authority list
 */
export const getAllAuthorities = () => {
    return Object.values(AUTHORITIES);
};

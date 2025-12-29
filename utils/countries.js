/**
 * COUNTRY HELPERS
 * ===============
 * Country name normalization and aliases
 */

/**
 * Country aliases -> ISO code mapping
 * User can enter country name in any format
 */
export const COUNTRY_ALIASES = {
    // TURKEY
    'turkey': 'TR',
    'türkiye': 'TR',
    'turkiye': 'TR',
    'tr': 'TR',
    'tur': 'TR',

    // SAUDI ARABIA
    'saudi arabia': 'SA',
    'saudi': 'SA',
    'sa': 'SA',
    'sau': 'SA',
    'ksa': 'SA',
    'kingdom of saudi arabia': 'SA',
    'suudi arabistan': 'SA',

    // EGYPT
    'egypt': 'EG',
    'eg': 'EG',
    'egy': 'EG',
    'mısır': 'EG',
    'misir': 'EG',

    // IRAN
    'iran': 'IR',
    'ir': 'IR',
    'irn': 'IR',
    'islamic republic of iran': 'IR',

    // PAKISTAN
    'pakistan': 'PK',
    'pk': 'PK',
    'pak': 'PK',

    // INDIA
    'india': 'IN',
    'in': 'IN',
    'ind': 'IN',
    'hindistan': 'IN',

    // BANGLADESH
    'bangladesh': 'BD',
    'bd': 'BD',
    'bgd': 'BD',
    'bengaldeş': 'BD',

    // INDONESIA
    'indonesia': 'ID',
    'id': 'ID',
    'idn': 'ID',
    'endonezya': 'ID',

    // MALAYSIA
    'malaysia': 'MY',
    'my': 'MY',
    'mys': 'MY',
    'malezya': 'MY',

    // SINGAPORE
    'singapore': 'SG',
    'sg': 'SG',
    'sgp': 'SG',
    'singapur': 'SG',

    // USA
    'united states': 'US',
    'united states of america': 'US',
    'usa': 'US',
    'us': 'US',
    'america': 'US',
    'abd': 'US',
    'amerika': 'US',

    // CANADA
    'canada': 'CA',
    'ca': 'CA',
    'can': 'CA',
    'kanada': 'CA',

    // UNITED KINGDOM
    'united kingdom': 'GB',
    'uk': 'GB',
    'gb': 'GB',
    'gbr': 'GB',
    'britain': 'GB',
    'great britain': 'GB',
    'england': 'GB',
    'ingiltere': 'GB',

    // GERMANY
    'germany': 'DE',
    'de': 'DE',
    'deu': 'DE',
    'deutschland': 'DE',
    'almanya': 'DE',

    // FRANCE
    'france': 'FR',
    'fr': 'FR',
    'fra': 'FR',
    'fransa': 'FR',

    // NETHERLANDS
    'netherlands': 'NL',
    'nl': 'NL',
    'nld': 'NL',
    'holland': 'NL',
    'hollanda': 'NL',

    // BELGIUM
    'belgium': 'BE',
    'be': 'BE',
    'bel': 'BE',
    'belçika': 'BE',

    // SWITZERLAND
    'switzerland': 'CH',
    'ch': 'CH',
    'che': 'CH',
    'isviçre': 'CH',

    // QATAR
    'qatar': 'QA',
    'qa': 'QA',
    'qat': 'QA',
    'katar': 'QA',

    // UAE
    'united arab emirates': 'AE',
    'uae': 'AE',
    'ae': 'AE',
    'are': 'AE',
    'birlesik arap emirlikleri': 'AE',
    'birleşik arap emirlikleri': 'AE',
    'dubai': 'AE',
    'abu dhabi': 'AE',

    // KUWAIT
    'kuwait': 'KW',
    'kw': 'KW',
    'kwt': 'KW',
    'kuveyt': 'KW',

    // BAHRAIN
    'bahrain': 'BH',
    'bh': 'BH',
    'bhr': 'BH',
    'bahreyn': 'BH',

    // OMAN
    'oman': 'OM',
    'om': 'OM',
    'omn': 'OM',
    'umman': 'OM',

    // JORDAN
    'jordan': 'JO',
    'jo': 'JO',
    'jor': 'JO',
    'ürdün': 'JO',

    // PALESTINE
    'palestine': 'PS',
    'ps': 'PS',
    'pse': 'PS',
    'filistin': 'PS',

    // IRAQ
    'iraq': 'IQ',
    'iq': 'IQ',
    'irq': 'IQ',
    'irak': 'IQ',

    // SYRIA
    'syria': 'SY',
    'sy': 'SY',
    'syr': 'SY',
    'suriye': 'SY',

    // LEBANON
    'lebanon': 'LB',
    'lb': 'LB',
    'lbn': 'LB',
    'lübnan': 'LB',

    // MOROCCO
    'morocco': 'MA',
    'ma': 'MA',
    'mar': 'MA',
    'fas': 'MA',

    // ALGERIA
    'algeria': 'DZ',
    'dz': 'DZ',
    'dza': 'DZ',
    'cezayir': 'DZ',

    // TUNISIA
    'tunisia': 'TN',
    'tn': 'TN',
    'tun': 'TN',
    'tunus': 'TN',

    // LIBYA
    'libya': 'LY',
    'ly': 'LY',
    'lby': 'LY',

    // SUDAN
    'sudan': 'SD',
    'sd': 'SD',
    'sdn': 'SD',

    // RUSSIA
    'russia': 'RU',
    'ru': 'RU',
    'rus': 'RU',
    'russian federation': 'RU',
    'rusya': 'RU',

    // KAZAKHSTAN
    'kazakhstan': 'KZ',
    'kz': 'KZ',
    'kaz': 'KZ',
    'kazakistan': 'KZ',

    // UZBEKISTAN
    'uzbekistan': 'UZ',
    'uz': 'UZ',
    'uzb': 'UZ',
    'özbekistan': 'UZ',

    // AZERBAIJAN
    'azerbaijan': 'AZ',
    'az': 'AZ',
    'aze': 'AZ',
    'azerbaycan': 'AZ',

    // AFGHANISTAN
    'afghanistan': 'AF',
    'af': 'AF',
    'afg': 'AF',
    'afganistan': 'AF',

    // BOSNIA
    'bosnia': 'BA',
    'bosnia and herzegovina': 'BA',
    'ba': 'BA',
    'bih': 'BA',
    'bosna': 'BA',
    'bosna hersek': 'BA',

    // ALBANIA
    'albania': 'AL',
    'al': 'AL',
    'alb': 'AL',
    'arnavutluk': 'AL',

    // KOSOVO
    'kosovo': 'XK',
    'xk': 'XK',
    'kosova': 'XK',

    // NORTH MACEDONIA
    'north macedonia': 'MK',
    'macedonia': 'MK',
    'mk': 'MK',
    'mkd': 'MK',
    'makedonya': 'MK',

    // NIGERIA
    'nigeria': 'NG',
    'ng': 'NG',
    'nga': 'NG',
    'nijerya': 'NG',

    // SOUTH AFRICA
    'south africa': 'ZA',
    'za': 'ZA',
    'zaf': 'ZA',
    'güney afrika': 'ZA',

    // KENYA
    'kenya': 'KE',
    'ke': 'KE',
    'ken': 'KE',

    // SWEDEN
    'sweden': 'SE',
    'se': 'SE',
    'swe': 'SE',
    'isveç': 'SE',

    // NORWAY
    'norway': 'NO',
    'no': 'NO',
    'nor': 'NO',
    'norveç': 'NO',

    // DENMARK
    'denmark': 'DK',
    'dk': 'DK',
    'dnk': 'DK',
    'danimarka': 'DK',

    // FINLAND
    'finland': 'FI',
    'fi': 'FI',
    'fin': 'FI',
    'fillandiya': 'FI',

    // ITALY
    'italy': 'IT',
    'it': 'IT',
    'ita': 'IT',
    'italya': 'IT',

    // SPAIN
    'spain': 'ES',
    'es': 'ES',
    'esp': 'ES',
    'ispanya': 'ES',

    // PORTUGAL
    'portugal': 'PT',
    'pt': 'PT',
    'prt': 'PT',
    'portekiz': 'PT',

    // GREECE
    'greece': 'GR',
    'gr': 'GR',
    'grc': 'GR',
    'yunanistan': 'GR',

    // AUSTRALIA
    'australia': 'AU',
    'au': 'AU',
    'aus': 'AU',
    'avustralya': 'AU',

    // NEW ZEALAND
    'new zealand': 'NZ',
    'nz': 'NZ',
    'nzl': 'NZ',
    'yeni zelanda': 'NZ',
};

/**
 * Converts country name to ISO code
 * @param {string} countryName - Country name in any format
 * @returns {string|null} ISO 2-letter code or null
 */
export const getCountryCode = (countryName) => {
    if (!countryName) return null;

    const normalized = countryName.toLowerCase().trim();
    return COUNTRY_ALIASES[normalized] || null;
};

/**
 * Normalizes country name (lowercase, trim)
 * @param {string} countryName - Raw country name
 * @returns {string} Normalized country name
 */
export const normalizeCountryName = (countryName) => {
    if (!countryName) return '';
    return countryName.toLowerCase().trim();
};

/**
 * Returns country name from ISO code
 * @param {string} code - ISO 2-letter code
 * @returns {string|null} Country name in English
 */
export const getCountryNameByCode = (code) => {
    if (!code) return null;

    const upperCode = code.toUpperCase();

    // Reverse lookup
    for (const [name, isoCode] of Object.entries(COUNTRY_ALIASES)) {
        if (isoCode === upperCode && name.length > 2) {
            // Find the longest name (more descriptive)
            return name.charAt(0).toUpperCase() + name.slice(1);
        }
    }

    return null;
};

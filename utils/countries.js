/**
 * ÜKE YARDIMCILARI
 * ================
 * Ülke adı normalizasyonu ve alias'lar
 */

/**
 * Ülke alias'ları -> ISO kodu eşleştirmesi
 * Kullanıcı herhangi bir formatta ülke adı girebilir
 */
export const COUNTRY_ALIASES = {
    // TÜRKİYE
    'turkey': 'TR',
    'türkiye': 'TR',
    'turkiye': 'TR',
    'tr': 'TR',
    'tur': 'TR',

    // SUUDİ ARABİSTAN
    'saudi arabia': 'SA',
    'saudi': 'SA',
    'sa': 'SA',
    'sau': 'SA',
    'ksa': 'SA',
    'kingdom of saudi arabia': 'SA',
    'suudi arabistan': 'SA',

    // MISIR
    'egypt': 'EG',
    'eg': 'EG',
    'egy': 'EG',
    'mısır': 'EG',
    'misir': 'EG',

    // İRAN
    'iran': 'IR',
    'ir': 'IR',
    'irn': 'IR',
    'islamic republic of iran': 'IR',

    // PAKİSTAN
    'pakistan': 'PK',
    'pk': 'PK',
    'pak': 'PK',

    // HİNDİSTAN
    'india': 'IN',
    'in': 'IN',
    'ind': 'IN',
    'hindistan': 'IN',

    // BANGLADEŞ
    'bangladesh': 'BD',
    'bd': 'BD',
    'bgd': 'BD',
    'bengaldeş': 'BD',

    // ENDONEZYA
    'indonesia': 'ID',
    'id': 'ID',
    'idn': 'ID',
    'endonezya': 'ID',

    // MALEZYA
    'malaysia': 'MY',
    'my': 'MY',
    'mys': 'MY',
    'malezya': 'MY',

    // SİNGAPUR
    'singapore': 'SG',
    'sg': 'SG',
    'sgp': 'SG',
    'singapur': 'SG',

    // ABD
    'united states': 'US',
    'united states of america': 'US',
    'usa': 'US',
    'us': 'US',
    'america': 'US',
    'abd': 'US',
    'amerika': 'US',

    // KANADA
    'canada': 'CA',
    'ca': 'CA',
    'can': 'CA',
    'kanada': 'CA',

    // BİRLEŞİK KRALLIK
    'united kingdom': 'GB',
    'uk': 'GB',
    'gb': 'GB',
    'gbr': 'GB',
    'britain': 'GB',
    'great britain': 'GB',
    'england': 'GB',
    'ingiltere': 'GB',

    // ALMANYA
    'germany': 'DE',
    'de': 'DE',
    'deu': 'DE',
    'deutschland': 'DE',
    'almanya': 'DE',

    // FRANSA
    'france': 'FR',
    'fr': 'FR',
    'fra': 'FR',
    'fransa': 'FR',

    // HOLLANDA
    'netherlands': 'NL',
    'nl': 'NL',
    'nld': 'NL',
    'holland': 'NL',
    'hollanda': 'NL',

    // BELÇİKA
    'belgium': 'BE',
    'be': 'BE',
    'bel': 'BE',
    'belçika': 'BE',

    // İSVİÇRE
    'switzerland': 'CH',
    'ch': 'CH',
    'che': 'CH',
    'isviçre': 'CH',

    // KATAR
    'qatar': 'QA',
    'qa': 'QA',
    'qat': 'QA',
    'katar': 'QA',

    // BAE
    'united arab emirates': 'AE',
    'uae': 'AE',
    'ae': 'AE',
    'are': 'AE',
    'birlesik arap emirlikleri': 'AE',
    'birleşik arap emirlikleri': 'AE',
    'dubai': 'AE',
    'abu dhabi': 'AE',

    // KUVEYT
    'kuwait': 'KW',
    'kw': 'KW',
    'kwt': 'KW',
    'kuveyt': 'KW',

    // BAHREYN
    'bahrain': 'BH',
    'bh': 'BH',
    'bhr': 'BH',
    'bahreyn': 'BH',

    // UMMAN
    'oman': 'OM',
    'om': 'OM',
    'omn': 'OM',
    'umman': 'OM',

    // ÜRDÜN
    'jordan': 'JO',
    'jo': 'JO',
    'jor': 'JO',
    'ürdün': 'JO',

    // FİLİSTİN
    'palestine': 'PS',
    'ps': 'PS',
    'pse': 'PS',
    'filistin': 'PS',

    // IRAK
    'iraq': 'IQ',
    'iq': 'IQ',
    'irq': 'IQ',
    'irak': 'IQ',

    // SURİYE
    'syria': 'SY',
    'sy': 'SY',
    'syr': 'SY',
    'suriye': 'SY',

    // LÜBNAN
    'lebanon': 'LB',
    'lb': 'LB',
    'lbn': 'LB',
    'lübnan': 'LB',

    // FAS
    'morocco': 'MA',
    'ma': 'MA',
    'mar': 'MA',
    'fas': 'MA',

    // CEZAYİR
    'algeria': 'DZ',
    'dz': 'DZ',
    'dza': 'DZ',
    'cezayir': 'DZ',

    // TUNUS
    'tunisia': 'TN',
    'tn': 'TN',
    'tun': 'TN',
    'tunus': 'TN',

    // LİBYA
    'libya': 'LY',
    'ly': 'LY',
    'lby': 'LY',

    // SUDAN
    'sudan': 'SD',
    'sd': 'SD',
    'sdn': 'SD',

    // RUSYA
    'russia': 'RU',
    'ru': 'RU',
    'rus': 'RU',
    'russian federation': 'RU',
    'rusya': 'RU',

    // KAZAKİSTAN
    'kazakhstan': 'KZ',
    'kz': 'KZ',
    'kaz': 'KZ',
    'kazakistan': 'KZ',

    // ÖZBEKİSTAN
    'uzbekistan': 'UZ',
    'uz': 'UZ',
    'uzb': 'UZ',
    'özbekistan': 'UZ',

    // AZERBAYCAN
    'azerbaijan': 'AZ',
    'az': 'AZ',
    'aze': 'AZ',
    'azerbaycan': 'AZ',

    // AFGANİSTAN
    'afghanistan': 'AF',
    'af': 'AF',
    'afg': 'AF',
    'afganistan': 'AF',

    // BOSNA
    'bosnia': 'BA',
    'bosnia and herzegovina': 'BA',
    'ba': 'BA',
    'bih': 'BA',
    'bosna': 'BA',
    'bosna hersek': 'BA',

    // ARNAVUTLUK
    'albania': 'AL',
    'al': 'AL',
    'alb': 'AL',
    'arnavutluk': 'AL',

    // KOSOVA
    'kosovo': 'XK',
    'xk': 'XK',
    'kosova': 'XK',

    // KUZEY MAKEDONYA
    'north macedonia': 'MK',
    'macedonia': 'MK',
    'mk': 'MK',
    'mkd': 'MK',
    'makedonya': 'MK',

    // NİJERYA
    'nigeria': 'NG',
    'ng': 'NG',
    'nga': 'NG',
    'nijerya': 'NG',

    // GÜNEY AFRİKA
    'south africa': 'ZA',
    'za': 'ZA',
    'zaf': 'ZA',
    'güney afrika': 'ZA',

    // KENYA
    'kenya': 'KE',
    'ke': 'KE',
    'ken': 'KE',

    // İSVEÇ
    'sweden': 'SE',
    'se': 'SE',
    'swe': 'SE',
    'isveç': 'SE',

    // NORVEη
    'norway': 'NO',
    'no': 'NO',
    'nor': 'NO',
    'norveç': 'NO',

    // DANİMARKA
    'denmark': 'DK',
    'dk': 'DK',
    'dnk': 'DK',
    'danimarka': 'DK',

    // FİNLANDİYA
    'finland': 'FI',
    'fi': 'FI',
    'fin': 'FI',
    'fillandiya': 'FI',

    // İタLYA
    'italy': 'IT',
    'it': 'IT',
    'ita': 'IT',
    'italya': 'IT',

    // İSPANYA
    'spain': 'ES',
    'es': 'ES',
    'esp': 'ES',
    'ispanya': 'ES',

    // PORTEKİZ
    'portugal': 'PT',
    'pt': 'PT',
    'prt': 'PT',
    'portekiz': 'PT',

    // YUNANİSTAN
    'greece': 'GR',
    'gr': 'GR',
    'grc': 'GR',
    'yunanistan': 'GR',

    // AVUSTRALYA
    'australia': 'AU',
    'au': 'AU',
    'aus': 'AU',
    'avustralya': 'AU',

    // YENİ ZELANDA
    'new zealand': 'NZ',
    'nz': 'NZ',
    'nzl': 'NZ',
    'yeni zelanda': 'NZ',
};

/**
 * Ülke adını ISO koduna çevirir
 * @param {string} countryName - Herhangi bir formatta ülke adı
 * @returns {string|null} ISO 2 harfli kod veya null
 */
export const getCountryCode = (countryName) => {
    if (!countryName) return null;

    const normalized = countryName.toLowerCase().trim();
    return COUNTRY_ALIASES[normalized] || null;
};

/**
 * Ülke adını normalize eder (lowercase, trim)
 * @param {string} countryName - Ham ülke adı
 * @returns {string} Normalize edilmiş ülke adı
 */
export const normalizeCountryName = (countryName) => {
    if (!countryName) return '';
    return countryName.toLowerCase().trim();
};

/**
 * ISO kodundan ülke adını döndürür
 * @param {string} code - ISO 2 harfli kod
 * @returns {string|null} İngilizce ülke adı
 */
export const getCountryNameByCode = (code) => {
    if (!code) return null;

    const upperCode = code.toUpperCase();

    // Reverse lookup
    for (const [name, isoCode] of Object.entries(COUNTRY_ALIASES)) {
        if (isoCode === upperCode && name.length > 2) {
            // En uzun ismi bul (daha açıklayıcı)
            return name.charAt(0).toUpperCase() + name.slice(1);
        }
    }

    return null;
};

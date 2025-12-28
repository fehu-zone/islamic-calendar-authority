/**
 * DIYANET API CLIENT
 * ==================
 * Client for Diyanet İşleri Başkanlığı prayer times.
 * Uses ezanvakti.emushaf.net which wraps the official Diyanet API.
 * 
 * This is the most accurate source for Turkey as it provides
 * the exact same data as namazvakitleri.diyanet.gov.tr
 * 
 * API Documentation: https://ezanvakti.emushaf.net/
 * Rate Limit: 30 requests/5min, 200 requests/day
 * 
 * Note: Returns 30-day data, so monthly caching is recommended.
 */

const DIYANET_BASE_URL = 'https://ezanvakti.emushaf.net';

/**
 * Common Turkish cities with their Diyanet district codes
 * Code 9541 = İstanbul (Fatih)
 */
export const TURKEY_CITY_CODES = {
    // ==========================================
    // İSTANBUL İLÇELERİ
    // ==========================================
    istanbul: 9541,           // Fatih (merkez)
    istanbul_fatih: 9541,
    istanbul_sile: 9547,      // En doğu (Asya)
    istanbul_pendik: 9545,
    istanbul_kartal: 9542,
    istanbul_maltepe: 9544,
    istanbul_kadikoy: 9541,   // Fatih ile aynı
    istanbul_uskudar: 9541,
    istanbul_atasehir: 9541,
    istanbul_umraniye: 9541,
    istanbul_sancaktepe: 9546,
    istanbul_cekmekoy: 9539,
    istanbul_beykoz: 9541,
    istanbul_beylikduzu: 9536,
    istanbul_esenyurt: 9540,
    istanbul_avcilar: 17865,
    istanbul_kucukcekmece: 9543,
    istanbul_bakirkoy: 9541,
    istanbul_basaksehir: 17866,
    istanbul_buyukcekmece: 9537,
    istanbul_catalca: 9538,   // En batı
    istanbul_arnavutkoy: 9535,
    istanbul_silivri: 9541,

    // ==========================================
    // BÜYÜK ŞEHİRLER (İl Merkezleri)
    // ==========================================
    ankara: 9206,
    izmir: 9560,
    bursa: 9335,
    antalya: 9225,
    adana: 9146,
    konya: 9676,
    gaziantep: 9453,

    // ==========================================
    // ANADOLU İLLERİ
    // ==========================================
    // Karadeniz
    trabzon: 17874,
    samsun: 9824,
    bartin: 9296,
    zonguldak: 9963,
    rize: 17875,
    artvin: 17895,
    ordu: 9788,
    giresun: 9455,

    // Marmara
    kocaeli: 9654,
    sakarya: 9820,
    tekirdag: 9884,
    edirne: 9385,
    kirklareli: 9648,
    canakkale: 9343,
    balikesir: 9285,

    // Ege
    manisa: 9717,
    aydin: 9269,
    denizli: 9363,
    mugla: 9761,
    usak: 9924,
    afyon: 9156,
    kutahya: 9691,

    // Akdeniz
    mersin: 9743,
    hatay: 9479,
    adana: 9146,
    osmaniye: 9796,
    kahramanmaras: 9588,
    isparta: 9540,
    burdur: 9326,

    // İç Anadolu
    kayseri: 9609,
    eskisehir: 9400,
    konya: 9676,
    yozgat: 9958,
    kirikkale: 9638,
    aksaray: 9172,
    nigde: 9778,
    nevsehir: 9771,
    karaman: 9598,
    kirsehir: 9651,
    sivas: 9859,

    // Güneydoğu Anadolu
    diyarbakir: 9381,
    sanliurfa: 9839,
    gaziantep: 9453,
    sirnak: 17876,
    mardin: 9724,
    batman: 17867,
    siirt: 17877,
    adiyaman: 9150,
    kilis: 9644,

    // Doğu Anadolu
    van: 17928,
    erzurum: 9391,
    malatya: 9703,
    elazig: 9385,
    agri: 17896,
    kars: 17899,
    igdir: 17897,
    ardahan: 17894,
    mus: 17873,
    bitlis: 17869,
    bingol: 17868,
    hakkari: 17898,
    tunceli: 17878,
    erzincan: 9388
};

/**
 * Fetch countries list
 * @returns {Promise<Array>} List of countries
 */
export const fetchDiyanetCountries = async () => {
    const response = await fetch(`${DIYANET_BASE_URL}/ulkeler`);
    if (!response.ok) throw new Error(`Diyanet API error: ${response.status}`);
    return response.json();
};

/**
 * Fetch cities for a country
 * @param {number} countryCode - Country code (2 = Turkey)
 * @returns {Promise<Array>} List of cities
 */
export const fetchDiyanetCities = async (countryCode = 2) => {
    const response = await fetch(`${DIYANET_BASE_URL}/sehirler/${countryCode}`);
    if (!response.ok) throw new Error(`Diyanet API error: ${response.status}`);
    return response.json();
};

/**
 * Fetch districts for a city
 * @param {number} cityCode - City code (539 = İstanbul)
 * @returns {Promise<Array>} List of districts
 */
export const fetchDiyanetDistricts = async (cityCode) => {
    const response = await fetch(`${DIYANET_BASE_URL}/ilceler/${cityCode}`);
    if (!response.ok) throw new Error(`Diyanet API error: ${response.status}`);
    return response.json();
};

/**
 * Fetch prayer times for a district (30 days)
 * 
 * @param {number|string} districtCode - District code or city name from TURKEY_CITY_CODES
 * @returns {Promise<Array>} 30 days of prayer times
 * 
 * @example
 * // Using district code
 * const times = await fetchDiyanetPrayerTimes(9541); // Istanbul
 * 
 * // Using city name
 * const times = await fetchDiyanetPrayerTimes('istanbul');
 */
export const fetchDiyanetPrayerTimes = async (districtCode) => {
    // Handle city name lookup
    let code = districtCode;
    if (typeof districtCode === 'string') {
        const normalized = districtCode.toLowerCase().replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c');
        code = TURKEY_CITY_CODES[normalized];
        if (!code) {
            throw new Error(`Unknown city: ${districtCode}. Use district code or a known city from TURKEY_CITY_CODES.`);
        }
    }

    const response = await fetch(`${DIYANET_BASE_URL}/vakitler/${code}`);
    if (!response.ok) throw new Error(`Diyanet API error: ${response.status}`);

    const data = await response.json();

    // Transform to standard format
    return data.map(day => ({
        // Dates
        gregorianDate: day.MiladiTarihKisaIso8601?.split('.').reverse().join('-') || day.MiladiTarihKisa,
        gregorianDateFormatted: day.MiladiTarihUzun,
        hijriDate: day.HicriTarihKisa,
        hijriDateFormatted: day.HicriTarihUzun,

        // Prayer times (Diyanet official)
        imsak: day.Imsak,
        gunes: day.Gunes,
        ogle: day.Ogle,
        ikindi: day.Ikindi,
        aksam: day.Aksam,
        yatsi: day.Yatsi,

        // English aliases
        fajr: day.Imsak,
        sunrise: day.Gunes,
        dhuhr: day.Ogle,
        asr: day.Ikindi,
        maghrib: day.Aksam,
        isha: day.Yatsi,

        // Additional info
        moonPhaseUrl: day.AyinSekliURL,
        timezone: day.GreenwichOrtalamaZamani,

        // Raw data
        _raw: day
    }));
};

/**
 * Get prayer times for a specific date
 * 
 * @param {number|string} districtCode - District code or city name
 * @param {Date} date - Target date
 * @returns {Promise<object|null>} Prayer times for the date or null if not found
 */
export const fetchDiyanetPrayerTimesForDate = async (districtCode, date) => {
    const times = await fetchDiyanetPrayerTimes(districtCode);

    const targetDate = date.toISOString().split('T')[0];

    return times.find(day => {
        const dayDate = day.gregorianDate;
        return dayDate === targetDate;
    }) || null;
};

/**
 * Get today's prayer times for a city
 * 
 * @param {number|string} districtCode - District code or city name
 * @returns {Promise<object>} Today's prayer times
 * 
 * @example
 * const today = await fetchDiyanetToday('istanbul');
 * console.log(today.aksam); // İftar vakti
 */
export const fetchDiyanetToday = async (districtCode) => {
    const times = await fetchDiyanetPrayerTimes(districtCode);
    const today = new Date().toISOString().split('T')[0];

    const todayTimes = times.find(day => day.gregorianDate === today);

    if (!todayTimes) {
        throw new Error('Today\'s prayer times not found in the response.');
    }

    return todayTimes;
};

/**
 * Get Ramadan calendar from Diyanet for a city
 * 
 * Note: This returns the 30-day data which may include Ramadan days
 * depending on the current date.
 * 
 * @param {number|string} districtCode - District code or city name
 * @returns {Promise<Array>} Prayer times (may include Ramadan days)
 */
export const fetchDiyanetRamadan = async (districtCode) => {
    const times = await fetchDiyanetPrayerTimes(districtCode);

    // Filter for Ramadan (Hicri month 9)
    return times.filter(day => {
        const hijriDate = day.hijriDate;
        // Format: "1.9.1447" - month is second part
        const parts = hijriDate.split('.');
        return parts.length >= 2 && parts[1] === '9'; // Ramadan
    }).map((day, index) => ({
        ...day,
        ramadanDay: index + 1,
        sahur: day.imsak,
        iftar: day.aksam
    }));
};

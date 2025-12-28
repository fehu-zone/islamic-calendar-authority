/**
 * HESAPLAMA METODLARI
 * ===================
 * AlAdhan API ve diğer kaynaklar için hesaplama metod tanımları
 * 
 * Bu dosya tüm 15 majör hesaplama metodunu içerir.
 * Her metodun Fajr ve Isha açıları belirlenmiştir.
 */

/**
 * Metod ID Sabitleri
 * AlAdhan API ile uyumlu ID'ler
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
    DIYANET: 13,        // Diyanet İşleri Başkanlığı, Turkey
    RUSSIA: 14,         // Spiritual Administration of Muslims of Russia
    CUSTOM: 99,         // Custom angles
};

/**
 * Detaylı Metod Bilgileri
 * Her metod için:
 * - Fajr açısı (güneş ufuk altı derecesi)
 * - Isha açısı (güneş ufuk altı derecesi) veya dakika
 * - Maghrib açısı (sadece Tehran metodu için)
 * - Kullanılan ülkeler
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
        notes: 'Güney Asya için yaygın kullanım. Fajr ve Isha için 18° kullanır.',
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
        notes: 'Kuzey Amerika için standart. Daha geç Fajr, daha erken Isha.',
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
        notes: 'Avrupa ve Orta Doğu için yaygın. 1986\'dan beri kullanılıyor.',
        source: 'https://www.themwl.org'
    },

    [METHOD_IDS.UMM_AL_QURA]: {
        id: 4,
        name: 'Umm Al-Qura University, Makkah',
        shortName: 'Umm Al-Qura',
        fajrAngle: 18.5,
        ishaAngle: null,
        maghribAngle: null,
        ishaMinutes: 90, // Ramazan'da 120 dakika
        countries: ['SA', 'BH'],
        region: 'Arabian Peninsula',
        notes: 'Suudi Arabistan resmi metodu. Isha için Maghrib + 90 dakika.',
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
        notes: 'Mısır ve çevresi için. En erken Fajr vakitlerinden birini verir.',
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
        notes: 'Umm Al-Qura ile aynı. AlAdhan uyumluluğu için.',
        source: 'https://www.ummulqura.org.sa'
    },

    [METHOD_IDS.TEHRAN]: {
        id: 7,
        name: 'Institute of Geophysics, University of Tehran',
        shortName: 'Tehran',
        fajrAngle: 17.7,
        ishaAngle: 14,
        maghribAngle: 4.5, // Maghrib için özel açı
        ishaMinutes: null,
        countries: ['IR'],
        region: 'Iran',
        notes: 'Şii hesaplama metodu. Maghrib için güneş ufkun 4.5° altında.',
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
        notes: 'Genel körfez bölgesi hesaplaması.',
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
        notes: 'Kuveyt spesifik hesaplama.',
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
        notes: 'Katar spesifik. Isha için Maghrib + 90 dakika.',
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
        notes: 'Güneydoğu Asya için. En erken Fajr vakitlerini verir.',
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
        notes: 'Fransa için özel hesaplama. En geç Fajr, en erken Isha.',
        source: 'https://www.uoif-online.com'
    },

    [METHOD_IDS.DIYANET]: {
        id: 13,
        name: 'Diyanet İşleri Başkanlığı',
        shortName: 'Diyanet',
        fajrAngle: 18,
        ishaAngle: 17,
        maghribAngle: null,
        ishaMinutes: null,
        asrSchool: 'shafi',  // Diyanet uses Shafi method for Asr
        countries: ['TR', 'TRNC'], // Türkiye ve KKTC
        region: 'Turkey',
        notes: 'Türkiye resmi takvimi. Diyanet\'in kendi hesaplamaları. Asr için Şafi metodu kullanır.',
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
        notes: 'Rusya ve Orta Asya için. Yüksek enlemler için uyarlanmış.',
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
        notes: 'Kullanıcı tanımlı açılar.',
        source: null
    }
};

/**
 * Ülke koduna göre metod ID döndürür
 * @param {string} countryCode - ISO 2 harfli ülke kodu
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

    // Varsayılan: Bölgeye göre tahmin
    // Avrupa ülkeleri -> MWL
    const europeanCountries = ['IT', 'ES', 'PT', 'GR', 'PL', 'RO', 'HU', 'CZ', 'SK', 'BG', 'HR', 'RS', 'BA', 'SI', 'AL', 'XK', 'MK', 'ME'];
    if (europeanCountries.includes(code)) {
        return METHOD_IDS.MWL;
    }

    // Afrika ülkeleri -> Egypt veya MWL
    const africanCountries = ['MA', 'DZ', 'TN', 'NG', 'SN', 'ML', 'NE', 'TD', 'ET', 'KE', 'TZ', 'UG', 'ZA'];
    if (africanCountries.includes(code)) {
        return METHOD_IDS.EGYPT;
    }

    // Körfez ülkeleri -> Umm Al-Qura
    const gulfCountries = ['AE', 'OM', 'YE'];
    if (gulfCountries.includes(code)) {
        return METHOD_IDS.UMM_AL_QURA;
    }

    // Varsayılan: Diyanet (en yaygın kullanılan ve dengeli)
    return METHOD_IDS.DIYANET;
};

/**
 * Metod ID'den metod adını döndürür
 * @param {number} methodId - Metod ID
 * @returns {string} Metod adı
 */
export const getMethodName = (methodId) => {
    const method = CALCULATION_METHODS[methodId];
    return method?.name || 'Unknown Method';
};

/**
 * Metod ID'den kısa adı döndürür
 * @param {number} methodId - Metod ID
 * @returns {string} Kısa ad
 */
export const getMethodShortName = (methodId) => {
    const method = CALCULATION_METHODS[methodId];
    return method?.shortName || 'Unknown';
};

/**
 * Metod ID'den açı bilgilerini döndürür
 * @param {number} methodId - Metod ID
 * @returns {object} Açı bilgileri
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
 * UI için metod listesini döndürür
 * @returns {Array} Metod listesi [{id, name, shortName}]
 */
export const getMethodsForUI = () => {
    return Object.values(CALCULATION_METHODS)
        .filter(m => m.id !== 99) // Custom'ı hariç tut
        .map(m => ({
            id: m.id,
            name: m.name,
            shortName: m.shortName,
            region: m.region
        }))
        .sort((a, b) => a.id - b.id);
};

/**
 * İki metod arasındaki farkı hesaplar
 * @param {number} methodId1 - İlk metod ID
 * @param {number} methodId2 - İkinci metod ID
 * @returns {object} Fark bilgisi
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
                ? `${m1.shortName} daha erken Fajr`
                : `${m2.shortName} daha erken Fajr`,
            isha: (m1.ishaAngle || 0) > (m2.ishaAngle || 0)
                ? `${m1.shortName} daha geç Isha`
                : `${m2.shortName} daha geç Isha`
        }
    };
};

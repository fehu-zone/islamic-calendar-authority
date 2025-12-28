/**
 * RESMI DINI OTORITE VERILERI
 * ===========================
 * Her ülkenin resmi dini otoritesi ve tercih ettiği hesaplama metodu.
 * 
 * Kaynak: Her ülkenin resmi dini kurumları
 */

export const AUTHORITIES = {
    // TÜRKİYE
    TR: {
        code: 'TR',
        name: 'Turkey',
        nameLocal: 'Türkiye',
        authority: 'Diyanet İşleri Başkanlığı',
        authorityShort: 'Diyanet',
        methodId: 13,
        website: 'https://www.diyanet.gov.tr',
        timezone: 'Europe/Istanbul',
        // Diyanet kendi takvimini yayınlar, astronomik hesaplamadan genelde 1 gün farklı olabilir
        usesLunarSighting: false, // Hesaplama bazlı
        notes: 'Diyanet, Türkiye için resmi namaz vakitlerini ve dini takvimleri yayınlar.'
    },

    // SUUDİ ARABİSTAN
    SA: {
        code: 'SA',
        name: 'Saudi Arabia',
        nameLocal: 'المملكة العربية السعودية',
        authority: 'Umm Al-Qura Calendar Committee',
        authorityShort: 'Umm Al-Qura',
        methodId: 4,
        website: 'https://www.ummulqura.org.sa',
        timezone: 'Asia/Riyadh',
        usesLunarSighting: true, // Hilal gözlemi esas
        notes: 'Mekke ve Medine için referans. Hilal gözlemine göre karar verir.'
    },

    // MISIR
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
        notes: 'Mısır Dar al-Ifta hilal gözlemine göre karar verir.'
    },

    // İRAN
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
        notes: 'Şii hesaplama açıları kullanır.'
    },

    // PAKİSTAN
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
        notes: 'Hilal gözlemi ile karar verir. Genelde Suudi\'den 1 gün sonra başlar.'
    },

    // HİNDİSTAN
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
        notes: 'Yerel hilal gözlemi. Bölgeden bölgeye farklılık gösterebilir.'
    },

    // BANGLADEŞ
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
        notes: 'Genelde Suudi ile aynı gün veya 1 gün sonra başlar.'
    },

    // ENDONEZYA
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
        notes: 'Dünyanın en kalabalık Müslüman nüfusu. Ortak hilal kararı alır.'
    },

    // MALEZYA
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
        notes: 'Singapur ve Brunei ile koordineli çalışır.'
    },

    // ABD
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
        notes: 'ISNA hesaplama kullanır. Fiqh Council of North America kararları.'
    },

    // KANADA
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
        notes: 'ABD ile aynı metodoloji.'
    },

    // BİRLEŞİK KRALLIK
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
        notes: 'MWL metodu kullanır. Farklı cemaatler farklı günler takip edebilir.'
    },

    // ALMANYA
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
        notes: 'MWL metodu. DITIB (Diyanet Almanya) farklı takvim kullanabilir.'
    },

    // FRANSA
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
        notes: 'Fransa için özel hesaplama metodu.'
    },

    // KATAR
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
        notes: 'Suudi Arabistan ile genelde aynı günde başlar.'
    },

    // BAE
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
        notes: 'Suudi Arabistan ile genelde aynı günde başlar.'
    },

    // KUVEYT
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
        notes: 'Körfez ülkeleri ile koordineli.'
    },

    // FAS
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
        notes: 'Kuzey Afrika için referans. Kendi hilal gözlemi.'
    },

    // CEZAYİR
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
        notes: 'Genelde Fas ile aynı gün başlar.'
    },

    // RUSYA
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
        notes: 'Rusya Müslümanları için özel hesaplama.'
    },

    // BOSNA HERSEK
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
        notes: 'Balkanlar için referans. Türkiye ile koordineli olabilir.'
    },

    // ÜRDÜN
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
        notes: 'Filistin ile genelde aynı gün başlar.'
    },

    // NİJERYA
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
        notes: 'Afrika\'nın en kalabalık Müslüman nüfusu.'
    }
};

/**
 * Ülke kodundan otorite bilgisini döndürür
 * @param {string} countryCode - ISO 2 harfli ülke kodu (TR, SA, US vb.)
 * @returns {Object|null} Otorite bilgisi
 */
export const getAuthorityByCode = (countryCode) => {
    if (!countryCode) return null;
    return AUTHORITIES[countryCode.toUpperCase()] || null;
};

/**
 * Tüm otoritelerin listesini döndürür
 * @returns {Array} Otorite listesi
 */
export const getAllAuthorities = () => {
    return Object.values(AUTHORITIES);
};

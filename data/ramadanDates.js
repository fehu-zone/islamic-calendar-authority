/**
 * RAMAZAN TARİHLERİ VERİTABANI
 * ============================
 * Yıllık olarak güncellenen resmi Ramazan başlangıç/bitiş tarihleri.
 * 
 * Kaynak: Her ülkenin resmi dini otoritelerinin ilanları
 * 
 * NOT: Bu veriler her yıl Ramazan öncesinde resmi ilanlarla güncellenir.
 * Henüz ilan edilmemiş yıllar için astronomik tahmin + tarihsel offset kullanılır.
 */

/**
 * Ramazan tarihleri (Hicri Yıl -> Ülke Kodu -> Tarihler)
 * 
 * Format:
 * {
 *   start: 'YYYY-MM-DD',  // İlk sahur gecesi (Ramazan 1. gün)
 *   end: 'YYYY-MM-DD',    // Son iftar günü (Ramazan 29/30. gün)
 *   duration: 29 | 30,    // Ramazan süresi (gün)
 *   source: 'official' | 'astronomical' | 'estimated',
 *   announcedAt: 'YYYY-MM-DD' | null  // Resmi ilan tarihi
 * }
 */
export const RAMADAN_DATES = {
    // HİCRİ 1446 (2025)
    1446: {
        TR: {
            start: '2025-03-01',
            end: '2025-03-29',
            duration: 29,
            source: 'official',
            announcedAt: '2024-12-01',
            notes: 'Diyanet takvimi'
        },
        SA: {
            start: '2025-02-28',
            end: '2025-03-29',
            duration: 30,
            source: 'official',
            announcedAt: null,
            notes: 'Umm Al-Qura takvimi'
        },
        // Diğer ülkeler için varsayılan astronomik
        DEFAULT: {
            start: '2025-02-28',
            end: '2025-03-29',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'Astronomik hesaplama'
        }
    },

    // HİCRİ 1447 (2026) - HEDEF YIL
    1447: {
        // TÜRKİYE - Diyanet Takvimi
        // İlk Sahur: 18-19 Şubat gecesi, İlk iftar: 19 Şubat
        TR: {
            start: '2026-02-19',  // Ramazan 1. Gün (İlk sahur 18-19 gecesi)
            end: '2026-03-20',   // Ramazan 30. Gün veya Bayram 1. gün öncesi
            duration: 30,
            source: 'official',  // Diyanet takvimi (önceden hesaplanmış)
            announcedAt: null,   // Henüz resmi ilan yok
            notes: 'Diyanet İşleri Başkanlığı hesaplaması. İlk sahur 18 Şubat gecesi.'
        },

        // SUUDİ ARABİSTAN - Umm Al-Qura
        // Genelde Türkiye ile aynı veya 1 gün önce başlar
        SA: {
            start: '2026-02-18',  // Astronomik olarak 18 Şubat
            end: '2026-03-19',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'Umm Al-Qura astronomik takvimi. Hilal gözlemiyle değişebilir.'
        },

        // PAKİSTAN - Ruet-e-Hilal
        // Genelde Suudi'den 1 gün sonra başlar
        PK: {
            start: '2026-02-19',
            end: '2026-03-20',
            duration: 30,
            source: 'estimated',
            announcedAt: null,
            notes: 'Tarihsel pattern: Genelde Suudi\'den 1 gün sonra. Hilal gözlemiyle kesinleşir.'
        },

        // HİNDİSTAN
        IN: {
            start: '2026-02-19',
            end: '2026-03-20',
            duration: 30,
            source: 'estimated',
            announcedAt: null,
            notes: 'Bölgeden bölgeye değişebilir. Kuzey vs Güney farklı olabilir.'
        },

        // BANGLADEŞ
        BD: {
            start: '2026-02-19',
            end: '2026-03-20',
            duration: 30,
            source: 'estimated',
            announcedAt: null,
            notes: 'Pakistan ile genelde aynı gün.'
        },

        // ENDONEZYA
        ID: {
            start: '2026-02-19',
            end: '2026-03-20',
            duration: 30,
            source: 'estimated',
            announcedAt: null,
            notes: 'Kemenag ilanı bekleniyor.'
        },

        // MALEZYA
        MY: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'estimated',
            announcedAt: null,
            notes: 'Singapur ve Brunei ile aynı.'
        },

        // ABD (ISNA)
        US: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'ISNA hesaplama metodu.'
        },

        // KANADA
        CA: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'ABD ile aynı.'
        },

        // BİRLEŞİK KRALLIK
        GB: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'MCB ilanı bekleniyor.'
        },

        // ALMANYA
        DE: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'ZMD veya DITIB ilanı.'
        },

        // FRANSA
        FR: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'UOIF takvimi.'
        },

        // MISIR
        EG: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'estimated',
            announcedAt: null,
            notes: 'Dar al-Ifta hilal gözlemi.'
        },

        // KATAR
        QA: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'Suudi ile aynı.'
        },

        // BAE
        AE: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'Suudi ile aynı.'
        },

        // VARSAYILAN (Astronomik)
        DEFAULT: {
            start: '2026-02-18',
            end: '2026-03-19',
            duration: 30,
            source: 'astronomical',
            announcedAt: null,
            notes: 'Astronomik hesaplama. Yerel otorite farklı ilan edebilir.'
        }
    },

    // HİCRİ 1448 (2027) - GELECEK
    1448: {
        DEFAULT: {
            start: '2027-02-07',  // Tahmini
            end: '2027-03-08',
            duration: 30,
            source: 'estimated',
            announcedAt: null,
            notes: 'Astronomik tahmin. Resmi ilanlar bekleniyor.'
        }
    }
};

/**
 * Belirli bir yıl ve ülke için Ramazan tarihlerini döndürür
 * @param {number} hijriYear - Hicri yıl (örn: 1447)
 * @param {string} countryCode - ISO 2 harfli ülke kodu (örn: 'TR')
 * @returns {Object} Ramazan tarihleri
 */
export const getRamadanDatesForCountry = (hijriYear, countryCode) => {
    const yearData = RAMADAN_DATES[hijriYear];
    if (!yearData) {
        return null;
    }

    const code = countryCode?.toUpperCase();

    // Önce ülke spesifik veri ara
    if (yearData[code]) {
        return yearData[code];
    }

    // Yoksa varsayılan döndür
    return yearData.DEFAULT || null;
};

/**
 * Belirli bir tarihin Ramazan içinde olup olmadığını kontrol eder
 * @param {Date} date - Kontrol edilecek tarih
 * @param {string} countryCode - Ülke kodu
 * @returns {boolean}
 */
export const isDateInRamadan = (date, countryCode = 'DEFAULT') => {
    // Tüm yılları kontrol et
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
 * Belirli bir tarih için Ramazan gününü döndürür (1-30)
 * @param {Date} date - Tarih
 * @param {string} countryCode - Ülke kodu
 * @returns {number|null} Ramazan günü veya null
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

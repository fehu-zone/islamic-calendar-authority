/**
 * GLOBAL ACCURACY VALIDATION SCRIPT
 * ================================
 * Compares dictionary calculations with official/standard times
 * across different regions and methodologies.
 */

import { calculatePrayerTimes } from '../src/prayer/calculator.js';
import { METHOD_IDS } from '../methods.js';

/**
 * Validation Data for Feb 19, 2026 (Ramadan Day 1, 1447 AH)
 * Data includes coordinates, expected times, and calculation methods.
 */
const VALIDATION_DATA = {
    // --- TURKEY (Presidency of Religious Affairs / Diyanet) ---
    istanbul: {
        name: 'Istanbul, TR',
        methodId: METHOD_IDS.DIYANET,
        timezone: 3,
        coords: [41.0082, 28.9784],
        official: { fajr: '06:22', sunrise: '07:47', dhuhr: '13:23', asr: '16:20', maghrib: '18:49', isha: '20:09' }
    },
    ankara: {
        name: 'Ankara, TR',
        methodId: METHOD_IDS.DIYANET,
        timezone: 3,
        coords: [39.9334, 32.8597],
        official: { fajr: '06:06', sunrise: '07:30', dhuhr: '13:07', asr: '16:06', maghrib: '18:35', isha: '19:54' }
    },
    edirne: {
        name: 'Edirne, TR',
        methodId: METHOD_IDS.DIYANET,
        timezone: 3,
        coords: [41.6771, 26.5557],
        official: { fajr: '06:31', sunrise: '07:57', dhuhr: '13:33', asr: '16:28', maghrib: '18:58', isha: '20:19' }
    },

    // --- SAUDI ARABIA (Umm Al-Qura University) ---
    makkah: {
        name: 'Makkah, SA',
        methodId: METHOD_IDS.UMM_AL_QURA,
        timezone: 3,
        coords: [21.4225, 39.8262],
        official: { fajr: '05:31', sunrise: '06:50', dhuhr: '12:35', asr: '15:53', maghrib: '18:20', isha: '19:50' }
    },

    // --- NORTH AMERICA (ISNA) ---
    new_york: {
        name: 'New York, US',
        methodId: METHOD_IDS.ISNA,
        timezone: -5,
        coords: [40.7128, -74.0060],
        official: { fajr: '05:22', sunrise: '06:44', dhuhr: '12:08', asr: '15:02', maghrib: '17:33', isha: '18:55' }
    },

    // --- EUROPE (Muslim World League) ---
    london: {
        name: 'London, UK',
        methodId: METHOD_IDS.MWL,
        timezone: 0,
        coords: [51.5074, -0.1278],
        official: { fajr: '05:25', sunrise: '07:09', dhuhr: '12:13', asr: '14:52', maghrib: '17:18', isha: '18:56' }
    }
};

// Parse time string to minutes for comparison
const timeToMinutes = (t) => {
    if (!t || t === '--:--') return 0;
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
};

// Calculate difference in minutes
const timeDiff = (calc, official) => {
    return timeToMinutes(calc) - timeToMinutes(official);
};

console.log('='.repeat(85));
console.log('GLOBAL ACCURACY VALIDATION - Feb 19, 2026 (Ramadan Day 1, 1447 AH)');
console.log('='.repeat(85));
console.log('');

const date = new Date('2026-02-19');
let totalTests = 0;
let passedTests = 0;
const maxDiff = 2; // Maximum acceptable difference in minutes

console.log('Location'.padEnd(15) + 'Prayer'.padEnd(10) + 'Calculated'.padEnd(12) + 'Official'.padEnd(10) + 'Diff'.padEnd(8) + 'Status');
console.log('-'.repeat(65));

for (const [key, data] of Object.entries(VALIDATION_DATA)) {
    const [lat, lng] = data.coords;

    const calc = calculatePrayerTimes(date, lat, lng, {
        methodId: data.methodId,
        timezone: data.timezone
    });

    const prayers = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
    let first = true;

    for (const prayer of prayers) {
        const officialTime = data.official[prayer];
        const calcTime = calc[prayer];

        const diff = timeDiff(calcTime, officialTime);
        totalTests++;

        const passed = Math.abs(diff) <= maxDiff;
        if (passed) passedTests++;

        const status = passed ? '✅' : '❌';
        const diffStr = diff > 0 ? `+${diff}` : `${diff}`;

        console.log(
            (first ? data.name : '').padEnd(15) +
            prayer.padEnd(10) +
            calcTime.padEnd(12) +
            officialTime.padEnd(10) +
            diffStr.padEnd(8) +
            status
        );
        first = false;
    }
    console.log('-'.repeat(65));
}

console.log('');
console.log('='.repeat(85));
console.log(`SUMMARY: ${passedTests}/${totalTests} tests passed (${(passedTests / totalTests * 100).toFixed(1)}%)`);
console.log(`Tolerance: ±${maxDiff} minutes`);
console.log('='.repeat(85));
console.log('Note: Minor differences are expected due to varying astronomical algorithms.');

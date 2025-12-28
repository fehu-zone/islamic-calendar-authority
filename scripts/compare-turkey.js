/**
 * TURKEY CITIES COMPARISON TEST
 * =============================
 * Compare library calculations with official Diyanet times
 * for 13 cities across different regions of Turkey
 */

import { calculatePrayerTimes } from '../src/prayer/calculator.js';
import { METHOD_IDS } from '../methods.js';

// Official Diyanet times for Feb 19, 2026 (Ramadan Day 1)
const DIYANET_TIMES = {
    istanbul: {
        coords: [41.0082, 28.9784],
        times: { fajr: '06:22', sunrise: '07:47', dhuhr: '13:23', asr: '16:20', maghrib: '18:49', isha: '20:09' }
    },
    adana: {
        coords: [36.9914, 35.3308],
        times: { fajr: '05:56', sunrise: '07:16', dhuhr: '12:58', asr: '16:00', maghrib: '18:29', isha: '19:44' }
    },
    ankara: {
        coords: [39.9334, 32.8597],
        times: { fajr: '06:06', sunrise: '07:30', dhuhr: '13:07', asr: '16:06', maghrib: '18:35', isha: '19:54' }
    },
    bartin: {
        coords: [41.6344, 32.3375],
        times: { fajr: '06:08', sunrise: '07:34', dhuhr: '13:10', asr: '16:05', maghrib: '18:35', isha: '19:56' }
    },
    bursa: {
        coords: [40.1885, 29.0610],
        times: { fajr: '06:21', sunrise: '07:45', dhuhr: '13:23', asr: '16:21', maghrib: '18:50', isha: '20:09' }
    },
    yozgat: {
        coords: [39.8181, 34.8147],
        times: { fajr: '05:58', sunrise: '07:22', dhuhr: '13:00', asr: '15:58', maghrib: '18:28', isha: '19:46' }
    },
    mugla: {
        coords: [37.2153, 28.3636],
        times: { fajr: '06:24', sunrise: '07:44', dhuhr: '13:25', asr: '16:28', maghrib: '18:57', isha: '20:12' }
    },
    sirnak: {
        coords: [37.5164, 42.4611],
        times: { fajr: '05:28', sunrise: '06:48', dhuhr: '12:29', asr: '15:31', maghrib: '18:00', isha: '19:15' }
    },
    trabzon: {
        coords: [41.0027, 39.7168],
        times: { fajr: '05:39', sunrise: '07:04', dhuhr: '12:40', asr: '15:37', maghrib: '18:06', isha: '19:26' }
    },
    gaziantep: {
        coords: [37.0662, 37.3833],
        times: { fajr: '05:48', sunrise: '07:08', dhuhr: '12:49', asr: '15:52', maghrib: '18:21', isha: '19:36' }
    },
    agri: {
        coords: [39.7191, 43.0503],
        times: { fajr: '05:25', sunrise: '06:49', dhuhr: '12:27', asr: '15:26', maghrib: '17:55', isha: '19:13' }
    },
    kars: {
        coords: [40.6013, 43.0975],
        times: { fajr: '05:25', sunrise: '06:50', dhuhr: '12:27', asr: '15:24', maghrib: '17:53', isha: '19:13' }
    },
    edirne: {
        coords: [41.6771, 26.5557],
        times: { fajr: '06:31', sunrise: '07:57', dhuhr: '13:33', asr: '16:28', maghrib: '18:58', isha: '20:19' }
    }
};

// Parse time string to minutes for comparison
const timeToMinutes = (t) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
};

// Calculate difference in minutes
const timeDiff = (calc, official) => {
    return timeToMinutes(calc) - timeToMinutes(official);
};

console.log('='.repeat(80));
console.log('TURKEY CITIES COMPARISON - Feb 19, 2026 (Ramadan Day 1)');
console.log('='.repeat(80));
console.log('');

const date = new Date('2026-02-19');
let totalTests = 0;
let passedTests = 0;
const maxDiff = 2; // Maximum acceptable difference in minutes

const results = [];

for (const [city, data] of Object.entries(DIYANET_TIMES)) {
    const [lat, lng] = data.coords;
    const official = data.times;

    const calc = calculatePrayerTimes(date, lat, lng, {
        methodId: METHOD_IDS.DIYANET,
        timezone: 3
    });

    const cityResult = {
        city: city.toUpperCase(),
        prayers: {}
    };

    const prayers = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

    for (const prayer of prayers) {
        const diff = timeDiff(calc[prayer], official[prayer]);
        totalTests++;

        const passed = Math.abs(diff) <= maxDiff;
        if (passed) passedTests++;

        cityResult.prayers[prayer] = {
            calc: calc[prayer],
            official: official[prayer],
            diff,
            passed
        };
    }

    results.push(cityResult);
}

// Print results table
console.log('City'.padEnd(12) + 'Prayer'.padEnd(10) + 'Calculated'.padEnd(12) + 'Diyanet'.padEnd(10) + 'Diff'.padEnd(8) + 'Status');
console.log('-'.repeat(60));

for (const result of results) {
    let first = true;
    for (const [prayer, data] of Object.entries(result.prayers)) {
        const status = data.passed ? '✅' : '❌';
        const diffStr = data.diff > 0 ? `+${data.diff}` : `${data.diff}`;

        console.log(
            (first ? result.city : '').padEnd(12) +
            prayer.padEnd(10) +
            data.calc.padEnd(12) +
            data.official.padEnd(10) +
            diffStr.padEnd(8) +
            status
        );
        first = false;
    }
    console.log('-'.repeat(60));
}

console.log('');
console.log('='.repeat(80));
console.log(`SUMMARY: ${passedTests}/${totalTests} tests passed (${(passedTests / totalTests * 100).toFixed(1)}%)`);
console.log(`Tolerance: ±${maxDiff} minutes`);
console.log('='.repeat(80));

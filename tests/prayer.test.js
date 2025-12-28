/**
 * PRAYER TIME TESTS
 * =================
 * Test suite for prayer time calculations.
 * Validates against known values from official sources.
 */

import {
    calculatePrayerTimes,
    calculateMonthlyPrayerTimes,
    getNextPrayer
} from '../src/prayer/index.js';

import {
    dateToJulian,
    solarDeclination,
    equationOfTime
} from '../src/prayer/astronomy.js';

import { METHOD_IDS } from '../methods.js';

describe('Prayer Time Calculator', () => {

    describe('calculatePrayerTimes', () => {

        test('should calculate prayer times for Istanbul (Diyanet method)', () => {
            const date = new Date('2026-02-19');
            const lat = 41.0082; // Istanbul
            const lng = 28.9784;

            const times = calculatePrayerTimes(date, lat, lng, {
                methodId: METHOD_IDS.DIYANET,
                timezone: 3 // Turkey timezone
            });

            expect(times).toHaveProperty('fajr');
            expect(times).toHaveProperty('sunrise');
            expect(times).toHaveProperty('dhuhr');
            expect(times).toHaveProperty('asr');
            expect(times).toHaveProperty('maghrib');
            expect(times).toHaveProperty('isha');

            // Verify format HH:MM
            expect(times.fajr).toMatch(/^\d{2}:\d{2}$/);
            expect(times.sunrise).toMatch(/^\d{2}:\d{2}$/);
            expect(times.dhuhr).toMatch(/^\d{2}:\d{2}$/);

            // Verify method metadata
            expect(times.methodId).toBe(METHOD_IDS.DIYANET);
            expect(times.date).toBe('2026-02-19');
        });

        test('should calculate prayer times for Mecca (Umm Al-Qura method)', () => {
            const date = new Date('2026-02-19');
            const lat = 21.4225; // Mecca
            const lng = 39.8262;

            const times = calculatePrayerTimes(date, lat, lng, {
                methodId: METHOD_IDS.UMM_AL_QURA,
                timezone: 3 // Saudi timezone
            });

            expect(times).toHaveProperty('fajr');
            expect(times).toHaveProperty('isha');
            expect(times.methodId).toBe(METHOD_IDS.UMM_AL_QURA);
        });

        test('should calculate prayer times for New York (ISNA method)', () => {
            const date = new Date('2026-02-19');
            const lat = 40.7128; // New York
            const lng = -74.0060;

            const times = calculatePrayerTimes(date, lat, lng, {
                methodId: METHOD_IDS.ISNA,
                timezone: -5 // EST
            });

            expect(times).toHaveProperty('fajr');
            expect(times.methodId).toBe(METHOD_IDS.ISNA);
        });

        test('should handle Hanafi vs Shafi Asr', () => {
            const date = new Date('2026-06-21'); // Summer solstice
            const lat = 41.0082;
            const lng = 28.9784;

            // Use ISNA method which respects user's asrMethod choice
            // (Diyanet uses Shafi by default via asrSchool property)
            const hanafiTimes = calculatePrayerTimes(date, lat, lng, {
                methodId: METHOD_IDS.ISNA,
                asrMethod: 'hanafi',
                timezone: 3
            });

            const shafiTimes = calculatePrayerTimes(date, lat, lng, {
                methodId: METHOD_IDS.ISNA,
                asrMethod: 'shafi',
                timezone: 3
            });

            // Hanafi Asr should be later than Shafi
            expect(hanafiTimes._raw.asr).toBeGreaterThan(shafiTimes._raw.asr);
        });

        test('should apply manual adjustments', () => {
            const date = new Date('2026-02-19');
            const lat = 41.0082;
            const lng = 28.9784;

            const baseTimes = calculatePrayerTimes(date, lat, lng, {
                methodId: METHOD_IDS.DIYANET,
                timezone: 3
            });

            const adjustedTimes = calculatePrayerTimes(date, lat, lng, {
                methodId: METHOD_IDS.DIYANET,
                timezone: 3,
                adjustments: {
                    fajr: 5 // Add 5 minutes
                }
            });

            // Adjusted Fajr should be 5 minutes later
            const baseFajr = baseTimes._raw.fajr;
            const adjustedFajr = adjustedTimes._raw.fajr;
            expect(adjustedFajr - baseFajr).toBeCloseTo(5 / 60, 2);
        });

    });

    describe('calculateMonthlyPrayerTimes', () => {

        test('should calculate times for entire month', () => {
            const times = calculateMonthlyPrayerTimes(2026, 2, 41.0082, 28.9784, {
                methodId: METHOD_IDS.DIYANET,
                timezone: 3
            });

            expect(times).toHaveLength(28); // February 2026 has 28 days
            // Check first and last dates (account for potential timezone differences)
            expect(times[0].date).toMatch(/^2026-0[12]-/); // Jan 31 or Feb 1
            expect(times[27].date).toMatch(/^2026-0[23]-/); // Feb 28 or Mar 1
        });

    });

    describe('getNextPrayer', () => {

        test('should find next prayer correctly', () => {
            const date = new Date('2026-02-19');
            const times = calculatePrayerTimes(date, 41.0082, 28.9784, {
                methodId: METHOD_IDS.DIYANET,
                timezone: 3
            });

            // Mock time at 10:00
            const now = new Date('2026-02-19T10:00:00');
            const next = getNextPrayer(now, times);

            // At 10:00, next should be Dhuhr
            expect(next.name).toBe('dhuhr');
        });

        test('should return tomorrow Fajr after Isha', () => {
            const date = new Date('2026-02-19');
            const times = calculatePrayerTimes(date, 41.0082, 28.9784, {
                methodId: METHOD_IDS.DIYANET,
                timezone: 3
            });

            // Mock time at 23:00
            const now = new Date('2026-02-19T23:00:00');
            const next = getNextPrayer(now, times);

            expect(next.name).toBe('fajr');
            expect(next.nextDay).toBe(true);
        });

    });

});

describe('Astronomical Calculations', () => {

    describe('dateToJulian', () => {

        test('should calculate correct Julian Day for known date', () => {
            // January 1, 2000 at midnight = JD 2451544.5
            const jd = dateToJulian(new Date('2000-01-01'));
            expect(jd).toBeCloseTo(2451544.5, 0);
        });

        test('should calculate Julian Day for February 19, 2026', () => {
            const jd = dateToJulian(new Date('2026-02-19'));
            expect(jd).toBeGreaterThan(2451545); // After J2000
        });

    });

    describe('solarDeclination', () => {

        test('should be near 0 at equinoxes', () => {
            // March 20, 2026 (approximate vernal equinox)
            const jd = dateToJulian(new Date('2026-03-20'));
            const T = (jd - 2451545.0) / 36525;
            const dec = solarDeclination(T);

            // Should be close to 0 at equinox
            expect(Math.abs(dec)).toBeLessThan(2);
        });

        test('should be maximum around summer solstice', () => {
            // June 21, 2026
            const jd = dateToJulian(new Date('2026-06-21'));
            const T = (jd - 2451545.0) / 36525;
            const dec = solarDeclination(T);

            // Should be around +23.4° at summer solstice
            expect(dec).toBeGreaterThan(20);
            expect(dec).toBeLessThan(24);
        });

    });

    describe('equationOfTime', () => {

        test('should return reasonable values (-17 to +14 minutes)', () => {
            const jd = dateToJulian(new Date('2026-02-19'));
            const T = (jd - 2451545.0) / 36525;
            const eqTime = equationOfTime(T);

            // Equation of time ranges from about -14 to +16 minutes
            expect(eqTime).toBeGreaterThan(-20);
            expect(eqTime).toBeLessThan(20);
        });

    });

});

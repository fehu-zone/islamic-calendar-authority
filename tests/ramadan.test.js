/**
 * RAMADAN DATE TESTS
 * ==================
 * Test suite for Ramadan date functions.
 */

import {
    getRamadanStartDate,
    getRamadanEndDate,
    getRamadanDuration,
    isRamadan,
    getRamadanDay,
    getAuthorityForCountry,
    getRamadanCalendar,
    compareRamadanStartDates
} from '../core.js';

import {
    getMethodForCountry,
    METHOD_IDS
} from '../methods.js';

import { getCountryCode } from '../utils/countries.js';

describe('Ramadan Functions', () => {

    describe('getRamadanStartDate', () => {

        test('should return correct start date for Turkey 1447', () => {
            const start = getRamadanStartDate(1447, 'Turkey');
            expect(start).toBeInstanceOf(Date);
            expect(start.toISOString().split('T')[0]).toBe('2026-02-19');
        });

        test('should return correct start date for Saudi Arabia 1447', () => {
            const start = getRamadanStartDate(1447, 'SA');
            expect(start).toBeInstanceOf(Date);
            expect(start.toISOString().split('T')[0]).toBe('2026-02-18');
        });

        test('should work with country code', () => {
            const start = getRamadanStartDate(1447, 'TR');
            expect(start.toISOString().split('T')[0]).toBe('2026-02-19');
        });

        test('should work with lowercase country name', () => {
            const start = getRamadanStartDate(1447, 'turkey');
            expect(start.toISOString().split('T')[0]).toBe('2026-02-19');
        });

        test('should work with Turkish country name', () => {
            const start = getRamadanStartDate(1447, 'türkiye');
            expect(start.toISOString().split('T')[0]).toBe('2026-02-19');
        });

        test('should return null for unknown year', () => {
            const start = getRamadanStartDate(1500, 'TR');
            expect(start).toBeNull();
        });

    });

    describe('getRamadanEndDate', () => {

        test('should return correct end date for Turkey 1447', () => {
            const end = getRamadanEndDate(1447, 'Turkey');
            expect(end).toBeInstanceOf(Date);
            expect(end.toISOString().split('T')[0]).toBe('2026-03-20');
        });

    });

    describe('getRamadanDuration', () => {

        test('should return 30 days for Turkey 1447', () => {
            const duration = getRamadanDuration(1447, 'TR');
            expect(duration).toBe(30);
        });

        test('should return 29 days for Turkey 1446', () => {
            const duration = getRamadanDuration(1446, 'TR');
            expect(duration).toBe(29);
        });

    });

    describe('isRamadan', () => {

        test('should return true for date in Ramadan', () => {
            const date = new Date('2026-02-25');
            expect(isRamadan(date, 'TR')).toBe(true);
        });

        test('should return false for date before Ramadan', () => {
            const date = new Date('2026-02-10');
            expect(isRamadan(date, 'TR')).toBe(false);
        });

        test('should return false for date after Ramadan', () => {
            const date = new Date('2026-03-25');
            expect(isRamadan(date, 'TR')).toBe(false);
        });

    });

    describe('getRamadanDay', () => {

        test('should return 1 for first day of Ramadan', () => {
            const date = new Date('2026-02-19');
            expect(getRamadanDay(date, 'TR')).toBe(1);
        });

        test('should return correct day in middle of Ramadan', () => {
            const date = new Date('2026-03-10');
            // March 10 is day 20 for Turkey (started Feb 19)
            expect(getRamadanDay(date, 'TR')).toBe(20);
        });

        test('should return null for date outside Ramadan', () => {
            const date = new Date('2026-01-15');
            expect(getRamadanDay(date, 'TR')).toBeNull();
        });

    });

    describe('getAuthorityForCountry', () => {

        test('should return Diyanet for Turkey', () => {
            const authority = getAuthorityForCountry('Turkey');
            expect(authority).not.toBeNull();
            expect(authority.authorityShort).toBe('Diyanet');
            expect(authority.methodId).toBe(13);
        });

        test('should return Umm Al-Qura for Saudi Arabia', () => {
            const authority = getAuthorityForCountry('SA');
            expect(authority.authorityShort).toBe('Umm Al-Qura');
            expect(authority.methodId).toBe(4);
        });

        test('should return ISNA for USA', () => {
            const authority = getAuthorityForCountry('US');
            expect(authority.authorityShort).toBe('ISNA');
        });

    });

    describe('getRamadanCalendar', () => {

        test('should generate 30-day calendar for Turkey 1447', () => {
            const calendar = getRamadanCalendar(1447, 'TR');
            expect(calendar).toHaveLength(30);
            expect(calendar[0].day).toBe(1);
            expect(calendar[0].gregorianDate).toBe('2026-02-19');
            expect(calendar[29].day).toBe(30);
        });

        test('should include weekday information', () => {
            const calendar = getRamadanCalendar(1447, 'TR');
            expect(calendar[0]).toHaveProperty('weekday');
            expect(calendar[0]).toHaveProperty('weekdayShort');
        });

    });

    describe('compareRamadanStartDates', () => {

        test('should list countries sorted by start date', () => {
            const comparison = compareRamadanStartDates(1447);
            expect(comparison.length).toBeGreaterThan(0);

            // Should be sorted by date
            for (let i = 1; i < comparison.length; i++) {
                const prev = new Date(comparison[i - 1].startDate);
                const curr = new Date(comparison[i].startDate);
                expect(curr >= prev).toBe(true);
            }
        });

    });

});

describe('Country Utilities', () => {

    describe('getCountryCode', () => {

        test('should convert Turkey to TR', () => {
            expect(getCountryCode('turkey')).toBe('TR');
            expect(getCountryCode('Turkey')).toBe('TR');
            expect(getCountryCode('TURKEY')).toBe('TR');
        });

        test('should convert Türkiye to TR', () => {
            expect(getCountryCode('türkiye')).toBe('TR');
        });

        test('should convert USA variations to US', () => {
            expect(getCountryCode('usa')).toBe('US');
            expect(getCountryCode('united states')).toBe('US');
            expect(getCountryCode('america')).toBe('US');
        });

        test('should return null for unknown country', () => {
            expect(getCountryCode('unknown')).toBeNull();
        });

    });

    describe('getMethodForCountry', () => {

        test('should return Diyanet for Turkey', () => {
            expect(getMethodForCountry('TR')).toBe(METHOD_IDS.DIYANET);
        });

        test('should return ISNA for USA', () => {
            expect(getMethodForCountry('US')).toBe(METHOD_IDS.ISNA);
        });

        test('should return Umm Al-Qura for Saudi Arabia', () => {
            expect(getMethodForCountry('SA')).toBe(METHOD_IDS.UMM_AL_QURA);
        });

        test('should return Singapore for Indonesia', () => {
            expect(getMethodForCountry('ID')).toBe(METHOD_IDS.SINGAPORE);
        });

    });

});

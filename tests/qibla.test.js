/**
 * QIBLA CALCULATION TESTS
 * =======================
 * Test suite for Qibla direction calculations.
 */

import {
    calculateQiblaDirection,
    calculateDistanceToKaaba,
    getCompassDirection,
    validateCoordinates,
    applyMagneticDeclination
} from '../src/qibla/index.js';

describe('Qibla Calculator', () => {

    describe('calculateQiblaDirection', () => {

        test('should calculate Qibla for Istanbul', () => {
            const qibla = calculateQiblaDirection(41.0082, 28.9784);

            expect(qibla).toHaveProperty('direction');
            expect(qibla).toHaveProperty('compass');
            expect(qibla).toHaveProperty('distance');

            // Istanbul Qibla should be approximately 152° (SSE)
            expect(qibla.direction).toBeGreaterThan(145);
            expect(qibla.direction).toBeLessThan(160);
            expect(qibla.compass).toBe('SE');
        });

        test('should calculate Qibla for New York', () => {
            const qibla = calculateQiblaDirection(40.7128, -74.0060);

            // New York Qibla should be approximately 58° (ENE)
            expect(qibla.direction).toBeGreaterThan(50);
            expect(qibla.direction).toBeLessThan(70);
        });

        test('should calculate Qibla for Jakarta', () => {
            const qibla = calculateQiblaDirection(-6.2088, 106.8456);

            // Jakarta Qibla should be approximately 295° (WNW)
            expect(qibla.direction).toBeGreaterThan(285);
            expect(qibla.direction).toBeLessThan(305);
        });

        test('should calculate Qibla for London', () => {
            const qibla = calculateQiblaDirection(51.5074, -0.1278);

            // London Qibla should be approximately 119° (ESE)
            expect(qibla.direction).toBeGreaterThan(110);
            expect(qibla.direction).toBeLessThan(130);
        });

        test('should calculate Qibla for Tokyo', () => {
            const qibla = calculateQiblaDirection(35.6762, 139.6503);

            // Tokyo Qibla should be approximately 293° (WNW)
            expect(qibla.direction).toBeGreaterThan(280);
            expect(qibla.direction).toBeLessThan(300);
        });

        test('should handle being at Kaaba location', () => {
            const qibla = calculateQiblaDirection(21.4225, 39.8262);

            // Very close to Kaaba
            expect(qibla.distance).toBeLessThan(1);
        });

        test('should throw error for invalid latitude', () => {
            expect(() => calculateQiblaDirection(100, 0)).toThrow();
            expect(() => calculateQiblaDirection(-100, 0)).toThrow();
        });

        test('should throw error for invalid longitude', () => {
            expect(() => calculateQiblaDirection(0, 200)).toThrow();
            expect(() => calculateQiblaDirection(0, -200)).toThrow();
        });

    });

    describe('calculateDistanceToKaaba', () => {

        test('should calculate distance from Istanbul to Kaaba', () => {
            const distance = calculateDistanceToKaaba(41.0082, 28.9784);

            // Istanbul to Mecca is approximately 2200-2300 km
            expect(distance).toBeGreaterThan(2100);
            expect(distance).toBeLessThan(2500);
        });

        test('should calculate distance from New York to Kaaba', () => {
            const distance = calculateDistanceToKaaba(40.7128, -74.0060);

            // New York to Mecca is approximately 10000-11000 km
            expect(distance).toBeGreaterThan(9500);
            expect(distance).toBeLessThan(11500);
        });

        test('should return 0 for Kaaba location', () => {
            const distance = calculateDistanceToKaaba(21.4225, 39.8262);
            expect(distance).toBeLessThan(1);
        });

    });

    describe('getCompassDirection', () => {

        test('should return N for 0°', () => {
            expect(getCompassDirection(0)).toBe('N');
        });

        test('should return E for 90°', () => {
            expect(getCompassDirection(90)).toBe('E');
        });

        test('should return S for 180°', () => {
            expect(getCompassDirection(180)).toBe('S');
        });

        test('should return W for 270°', () => {
            expect(getCompassDirection(270)).toBe('W');
        });

        test('should return NE for 45°', () => {
            expect(getCompassDirection(45)).toBe('NE');
        });

        test('should return SE for 135°', () => {
            expect(getCompassDirection(135)).toBe('SE');
        });

    });

    describe('validateCoordinates', () => {

        test('should validate correct coordinates', () => {
            const result = validateCoordinates(41.0082, 28.9784);
            expect(result.valid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        test('should reject invalid latitude', () => {
            const result = validateCoordinates(100, 28.9784);
            expect(result.valid).toBe(false);
            expect(result.errors.length).toBeGreaterThan(0);
        });

        test('should reject invalid longitude', () => {
            const result = validateCoordinates(41.0082, 200);
            expect(result.valid).toBe(false);
        });

        test('should detect Kaaba location', () => {
            const result = validateCoordinates(21.4225, 39.8262);
            expect(result.isAtKaaba).toBe(true);
        });

    });

    describe('applyMagneticDeclination', () => {

        test('should apply positive declination', () => {
            const magnetic = applyMagneticDeclination(150, 5);
            expect(magnetic).toBe(145);
        });

        test('should apply negative declination', () => {
            const magnetic = applyMagneticDeclination(150, -10);
            expect(magnetic).toBe(160);
        });

        test('should normalize to 0-360 range', () => {
            const magnetic = applyMagneticDeclination(5, 10);
            expect(magnetic).toBe(355);
        });

    });

});

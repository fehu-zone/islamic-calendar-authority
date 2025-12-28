/**
 * QIBLA CALCULATOR
 * ================
 * Calculate Qibla direction (bearing to Kaaba) from any location.
 * Uses great circle (spherical) formula for accuracy.
 * 
 * Zero external dependencies.
 */

import { KAABA_LAT, KAABA_LNG, DEG_TO_RAD, RAD_TO_DEG } from '../prayer/constants.js';

/**
 * Calculate Qibla direction from a given location
 * 
 * @param {number} latitude - Observer's latitude in degrees (-90 to 90)
 * @param {number} longitude - Observer's longitude in degrees (-180 to 180)
 * @returns {object} Qibla information
 * 
 * @example
 * const qibla = calculateQiblaDirection(41.0082, 28.9784); // Istanbul
 * console.log(qibla);
 * // {
 * //   direction: 152.45,      // Degrees from true north
 * //   compass: 'SSE',         // Compass direction
 * //   distance: 2238.5,       // Distance to Kaaba in km
 * //   kaaba: { lat: 21.4225, lng: 39.8262 }
 * // }
 */
export const calculateQiblaDirection = (latitude, longitude) => {
    // Validate inputs
    if (latitude < -90 || latitude > 90) {
        throw new Error('Latitude must be between -90 and 90 degrees');
    }
    if (longitude < -180 || longitude > 180) {
        throw new Error('Longitude must be between -180 and 180 degrees');
    }

    // Convert to radians
    const lat1 = latitude * DEG_TO_RAD;
    const lng1 = longitude * DEG_TO_RAD;
    const lat2 = KAABA_LAT * DEG_TO_RAD;
    const lng2 = KAABA_LNG * DEG_TO_RAD;

    // Great circle bearing formula
    // θ = atan2(sin(Δλ) × cos(φ₂), cos(φ₁) × sin(φ₂) − sin(φ₁) × cos(φ₂) × cos(Δλ))
    const dLng = lng2 - lng1;

    const x = Math.sin(dLng) * Math.cos(lat2);
    const y = Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    let bearing = Math.atan2(x, y) * RAD_TO_DEG;

    // Normalize to 0-360
    bearing = ((bearing % 360) + 360) % 360;

    // Calculate distance using Haversine formula
    const distance = calculateDistanceToKaaba(latitude, longitude);

    // Get compass direction
    const compass = getCompassDirection(bearing);

    return {
        direction: Math.round(bearing * 100) / 100,
        directionRaw: bearing,
        compass,
        compassFull: getCompassDirectionFull(bearing),
        distance: Math.round(distance * 10) / 10,
        distanceUnit: 'km',
        kaaba: {
            latitude: KAABA_LAT,
            longitude: KAABA_LNG
        },
        location: {
            latitude,
            longitude
        }
    };
};

/**
 * Calculate distance to Kaaba using Haversine formula
 * 
 * @param {number} latitude - Observer's latitude
 * @param {number} longitude - Observer's longitude
 * @returns {number} Distance in kilometers
 */
export const calculateDistanceToKaaba = (latitude, longitude) => {
    const R = 6371; // Earth's radius in km

    const lat1 = latitude * DEG_TO_RAD;
    const lng1 = longitude * DEG_TO_RAD;
    const lat2 = KAABA_LAT * DEG_TO_RAD;
    const lng2 = KAABA_LNG * DEG_TO_RAD;

    const dLat = lat2 - lat1;
    const dLng = lng2 - lng1;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

/**
 * Get compass direction abbreviation (N, NE, E, etc.)
 * 
 * @param {number} bearing - Bearing in degrees (0-360)
 * @returns {string} Compass direction (8 cardinal directions)
 */
export const getCompassDirection = (bearing) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(bearing / 45) % 8;
    return directions[index];
};

/**
 * Get full compass direction name
 * 
 * @param {number} bearing - Bearing in degrees
 * @returns {string} Full compass direction name
 */
export const getCompassDirectionFull = (bearing) => {
    const directions = [
        'North', 'North-East', 'East', 'South-East',
        'South', 'South-West', 'West', 'North-West'
    ];
    const index = Math.round(bearing / 45) % 8;
    return directions[index];
};

/**
 * Get 16-point compass direction
 * 
 * @param {number} bearing - Bearing in degrees
 * @returns {string} 16-point compass direction
 */
export const getCompassDirection16 = (bearing) => {
    const directions = [
        'N', 'NNE', 'NE', 'ENE',
        'E', 'ESE', 'SE', 'SSE',
        'S', 'SSW', 'SW', 'WSW',
        'W', 'WNW', 'NW', 'NNW'
    ];
    const index = Math.round(bearing / 22.5) % 16;
    return directions[index];
};

/**
 * Apply magnetic declination correction
 * Note: This requires external data for accurate declination values
 * 
 * @param {number} trueBearing - True north bearing
 * @param {number} declination - Magnetic declination (+ for east, - for west)
 * @returns {number} Magnetic bearing
 */
export const applyMagneticDeclination = (trueBearing, declination) => {
    // Magnetic bearing = True bearing - Declination
    let magnetic = trueBearing - declination;

    // Normalize to 0-360
    magnetic = ((magnetic % 360) + 360) % 360;

    return Math.round(magnetic * 100) / 100;
};

/**
 * Validate coordinates for Qibla calculation
 * 
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @returns {object} Validation result
 */
export const validateCoordinates = (latitude, longitude) => {
    const errors = [];

    if (typeof latitude !== 'number' || isNaN(latitude)) {
        errors.push('Latitude must be a valid number');
    } else if (latitude < -90 || latitude > 90) {
        errors.push('Latitude must be between -90 and 90');
    }

    if (typeof longitude !== 'number' || isNaN(longitude)) {
        errors.push('Longitude must be a valid number');
    } else if (longitude < -180 || longitude > 180) {
        errors.push('Longitude must be between -180 and 180');
    }

    // Check for extreme precision (likely coordinates)
    const hasReasonablePrecision = (
        String(latitude).length <= 12 &&
        String(longitude).length <= 12
    );

    return {
        valid: errors.length === 0,
        errors,
        hasReasonablePrecision,
        // Check if at Kaaba location
        isAtKaaba: (
            Math.abs(latitude - KAABA_LAT) < 0.01 &&
            Math.abs(longitude - KAABA_LNG) < 0.01
        )
    };
};

/**
 * Common magnetic declination values for major Muslim cities
 * Values are approximate and change over time (~0.1° per year)
 * Last updated: 2024
 */
export const MAGNETIC_DECLINATION = {
    // Turkey
    'Istanbul': 5.2,
    'Ankara': 5.0,

    // Middle East
    'Mecca': 2.5,
    'Medina': 3.0,
    'Riyadh': 2.8,
    'Dubai': 2.0,
    'Cairo': 3.5,
    'Tehran': 4.0,

    // South Asia
    'Karachi': 0.5,
    'Delhi': -0.5,
    'Dhaka': -0.8,

    // Southeast Asia
    'Jakarta': 0.8,
    'Kuala Lumpur': -0.2,

    // Europe
    'London': -0.5,
    'Paris': -0.1,
    'Berlin': 3.0,

    // North America
    'New York': -13.0,
    'Los Angeles': 11.5,
    'Toronto': -10.5
};

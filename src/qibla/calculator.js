/**
 * QIBLA CALCULATOR V2
 * ===================
 * High-precision Qibla calculations using ellipsoidal models.
 * Supports Magnetic North correction via injected providers.
 */

import { vincInv } from '../utils/math/vincenty.js';
import { providers } from '../core/providers.js';

const KAABA_COORDS = {
    latitude: 21.422487,
    longitude: 39.826206
};

const COMPASS_8 = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
const COMPASS_16 = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

export const MAGNETIC_DECLINATION = {
    DEFAULT: 0
};

/**
 * Validate latitude/longitude.
 * @returns {{valid: boolean, errors: string[], isAtKaaba: boolean}}
 */
export const validateCoordinates = (latitude, longitude) => {
    const errors = [];

    if (!Number.isFinite(latitude)) {
        errors.push('Latitude must be a finite number');
    } else if (latitude < -90 || latitude > 90) {
        errors.push('Latitude must be between -90 and 90');
    }

    if (!Number.isFinite(longitude)) {
        errors.push('Longitude must be a finite number');
    } else if (longitude < -180 || longitude > 180) {
        errors.push('Longitude must be between -180 and 180');
    }

    const isAtKaaba =
        Math.abs(latitude - KAABA_COORDS.latitude) < 0.001 &&
        Math.abs(longitude - KAABA_COORDS.longitude) < 0.001;

    return {
        valid: errors.length === 0,
        errors,
        isAtKaaba
    };
};

/**
 * Calculate Qibla direction from True North
 * Uses Vincenty's formulae for superior accuracy over Haversine.
 * 
 * @param {number} latitude - Current latitude
 * @param {number} longitude - Current longitude
 * @returns {object} { azimuth: number, distance: number }
 */
export const calculateQibla = (latitude, longitude) => {
    const result = vincInv(
        latitude,
        longitude,
        KAABA_COORDS.latitude,
        KAABA_COORDS.longitude
    );

    return {
        azimuth: result.initialBearing,
        distance: result.distance // meters
    };
};

/**
 * Apply magnetic declination to a true-north bearing.
 */
export const applyMagneticDeclination = (trueNorthBearing, declination = 0) => {
    return (trueNorthBearing - declination + 360) % 360;
};

/**
 * Compass direction (8-point rose).
 */
export const getCompassDirection = (bearing) => {
    const normalized = ((bearing % 360) + 360) % 360;
    const index = Math.round(normalized / 45) % 8;
    return COMPASS_8[index];
};

/**
 * Compass direction (16-point rose).
 */
export const getCompassDirection16 = (bearing) => {
    const normalized = ((bearing % 360) + 360) % 360;
    const index = Math.round(normalized / 22.5) % 16;
    return COMPASS_16[index];
};

/**
 * Full compass direction label.
 */
export const getCompassDirectionFull = (bearing) => {
    const short = getCompassDirection16(bearing);
    const labels = {
        N: 'North',
        NNE: 'North-Northeast',
        NE: 'Northeast',
        ENE: 'East-Northeast',
        E: 'East',
        ESE: 'East-Southeast',
        SE: 'Southeast',
        SSE: 'South-Southeast',
        S: 'South',
        SSW: 'South-Southwest',
        SW: 'Southwest',
        WSW: 'West-Southwest',
        W: 'West',
        WNW: 'West-Northwest',
        NW: 'Northwest',
        NNW: 'North-Northwest'
    };
    return labels[short] || 'Unknown';
};

/**
 * Returns distance to Kaaba in kilometers.
 */
export const calculateDistanceToKaaba = (latitude, longitude) => {
    const validation = validateCoordinates(latitude, longitude);
    if (!validation.valid) {
        throw new Error(validation.errors.join('; '));
    }

    const { distance } = calculateQibla(latitude, longitude);
    return Number((distance / 1000).toFixed(3));
};

/**
 * Backward compatible direction API.
 */
export const calculateQiblaDirection = (latitude, longitude) => {
    const validation = validateCoordinates(latitude, longitude);
    if (!validation.valid) {
        throw new Error(validation.errors.join('; '));
    }

    const { azimuth, distance } = calculateQibla(latitude, longitude);
    const distanceKm = Number((distance / 1000).toFixed(3));

    return {
        direction: azimuth,
        compass: getCompassDirection(azimuth),
        compass16: getCompassDirection16(azimuth),
        distance: distanceKm
    };
};

/**
 * Get comprehensive Qibla information including Magnetic Compass heading.
 * Requires an async Provider lookup for magnetic declination.
 * 
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns {Promise<object>}
 */
export const getQiblaInfo = async (latitude, longitude) => {
    const validation = validateCoordinates(latitude, longitude);
    if (!validation.valid) {
        throw new Error(validation.errors.join('; '));
    }

    // 1. Calculate Geometric Qibla (True North)
    const { azimuth, distance } = calculateQibla(latitude, longitude);

    // 2. Get Magnetic Declination
    let declination = 0;
    const magProvider = providers.getMagneticProvider();

    if (magProvider) {
        try {
            declination = await magProvider.getDeclination(latitude, longitude);
        } catch (error) {
            console.warn('Failed to get magnetic declination:', error.message);
        }
    }

    // 3. Calculate Magnetic Qibla
    // Magnetic North = True North - Declination
    // Example: If Declination is +5 (East), Magnetic North is 5 deg East of True.
    // So to point to same physical spot, we subtract declination?
    // Bearing relative to Mag North = Bearing relative to True North - Declination
    const magneticAzimuth = applyMagneticDeclination(azimuth, declination);

    return {
        trueNorth: azimuth,
        magneticNorth: magneticAzimuth,
        distance, // meters
        declination,
        target: { ...KAABA_COORDS }
    };
};

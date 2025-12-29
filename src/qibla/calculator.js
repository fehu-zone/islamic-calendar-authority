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
 * Get comprehensive Qibla information including Magnetic Compass heading.
 * Requires an async Provider lookup for magnetic declination.
 * 
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns {Promise<object>}
 */
export const getQiblaInfo = async (latitude, longitude) => {
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
    const magneticAzimuth = (azimuth - declination + 360) % 360;

    return {
        trueNorth: azimuth,
        magneticNorth: magneticAzimuth,
        distance, // meters
        declination,
        target: { ...KAABA_COORDS }
    };
};

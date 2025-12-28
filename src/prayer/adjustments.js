/**
 * HIGH LATITUDE ADJUSTMENTS
 * =========================
 * Special handling for regions where sun doesn't set/rise properly.
 * Applies to locations above ~48° latitude.
 */

import { HIGH_LAT_METHOD } from './constants.js';

/**
 * Check if location requires high latitude adjustments
 * @param {number} latitude - Latitude in degrees
 * @param {number} threshold - Threshold latitude (default 48°)
 * @returns {boolean}
 */
export const requiresHighLatAdjustment = (latitude, threshold = 48) => {
    return Math.abs(latitude) >= threshold;
};

/**
 * Calculate night portion for angle-based method
 * @param {number} angle - Fajr or Isha angle
 * @returns {number} Portion of night (0-1)
 */
export const nightPortion = (angle) => {
    // Method: angle/60 of the night
    return angle / 60;
};

/**
 * Adjust Fajr time for high latitudes
 * @param {number} fajr - Calculated Fajr time (may be null)
 * @param {number} sunrise - Sunrise time
 * @param {number} sunset - Previous sunset time
 * @param {number} angle - Fajr angle
 * @param {string} method - High latitude method
 * @returns {number} Adjusted Fajr time
 */
export const adjustFajr = (fajr, sunrise, sunset, angle, method) => {
    // If Fajr is calculable, no adjustment needed
    if (fajr !== null && !isNaN(fajr)) {
        return fajr;
    }

    // Night duration (from sunset to sunrise)
    const nightDuration = (24 - sunset) + sunrise;

    switch (method) {
        case HIGH_LAT_METHOD.MIDDLE_OF_NIGHT:
            return sunrise - nightDuration / 2;

        case HIGH_LAT_METHOD.ONE_SEVENTH:
            return sunrise - nightDuration / 7;

        case HIGH_LAT_METHOD.ANGLE_BASED:
            const portion = nightPortion(angle);
            return sunrise - portion * nightDuration;

        case HIGH_LAT_METHOD.NONE:
        default:
            return fajr;
    }
};

/**
 * Adjust Isha time for high latitudes
 * @param {number} isha - Calculated Isha time (may be null)
 * @param {number} sunset - Sunset time
 * @param {number} sunrise - Next sunrise time
 * @param {number} angle - Isha angle (or default 17 if using minutes)
 * @param {string} method - High latitude method
 * @returns {number} Adjusted Isha time
 */
export const adjustIsha = (isha, sunset, sunrise, angle, method) => {
    // If Isha is calculable, no adjustment needed
    if (isha !== null && !isNaN(isha) && isha < 24) {
        return isha;
    }

    // Night duration
    const nightDuration = (24 - sunset) + sunrise;

    switch (method) {
        case HIGH_LAT_METHOD.MIDDLE_OF_NIGHT:
            return sunset + nightDuration / 2;

        case HIGH_LAT_METHOD.ONE_SEVENTH:
            return sunset + nightDuration / 7;

        case HIGH_LAT_METHOD.ANGLE_BASED:
            const portion = nightPortion(angle || 17);
            return sunset + portion * nightDuration;

        case HIGH_LAT_METHOD.NONE:
        default:
            return isha;
    }
};

/**
 * Get recommended high latitude method for a location
 * @param {number} latitude - Latitude in degrees
 * @returns {string} Recommended method
 */
export const getRecommendedHighLatMethod = (latitude) => {
    const absLat = Math.abs(latitude);

    if (absLat < 48) {
        return HIGH_LAT_METHOD.NONE;
    } else if (absLat < 55) {
        return HIGH_LAT_METHOD.ANGLE_BASED;
    } else if (absLat < 60) {
        return HIGH_LAT_METHOD.ONE_SEVENTH;
    } else {
        return HIGH_LAT_METHOD.MIDDLE_OF_NIGHT;
    }
};

/**
 * High latitude regions and their typical cities
 */
export const HIGH_LAT_REGIONS = {
    'NO': { // Norway
        cities: ['Oslo', 'Bergen', 'Tromsø'],
        recommendedMethod: HIGH_LAT_METHOD.ONE_SEVENTH,
        notes: 'Midnight sun in summer, polar night in winter'
    },
    'SE': { // Sweden
        cities: ['Stockholm', 'Gothenburg', 'Malmö', 'Kiruna'],
        recommendedMethod: HIGH_LAT_METHOD.ANGLE_BASED,
        notes: 'Very short nights in summer'
    },
    'FI': { // Finland
        cities: ['Helsinki', 'Espoo', 'Oulu', 'Rovaniemi'],
        recommendedMethod: HIGH_LAT_METHOD.ANGLE_BASED,
        notes: 'Midnight sun above Arctic Circle'
    },
    'IS': { // Iceland
        cities: ['Reykjavik', 'Akureyri'],
        recommendedMethod: HIGH_LAT_METHOD.MIDDLE_OF_NIGHT,
        notes: 'Extreme variations in daylight'
    },
    'RU': { // Russia (northern parts)
        cities: ['St. Petersburg', 'Murmansk', 'Arkhangelsk'],
        recommendedMethod: HIGH_LAT_METHOD.ONE_SEVENTH,
        notes: 'White nights in St. Petersburg'
    },
    'CA': { // Canada (northern parts)
        cities: ['Whitehorse', 'Yellowknife', 'Iqaluit'],
        recommendedMethod: HIGH_LAT_METHOD.MIDDLE_OF_NIGHT,
        notes: 'Arctic regions'
    },
    'US': { // Alaska
        cities: ['Anchorage', 'Fairbanks', 'Juneau'],
        recommendedMethod: HIGH_LAT_METHOD.ONE_SEVENTH,
        notes: 'Alaska specific'
    }
};

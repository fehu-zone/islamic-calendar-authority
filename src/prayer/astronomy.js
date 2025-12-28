/**
 * ASTRONOMICAL CALCULATIONS
 * =========================
 * Core astronomical functions for calculating sun position.
 * All formulas are based on NOAA Solar Calculator algorithms.
 * 
 * Reference: https://gml.noaa.gov/grad/solcalc/calcdetails.html
 */

import { DEG_TO_RAD, RAD_TO_DEG, J2000, JULIAN_CENTURY } from './constants.js';

/**
 * Convert Gregorian date to Julian Day Number
 * @param {number} year - Full year (e.g., 2024)
 * @param {number} month - Month (1-12)
 * @param {number} day - Day of month (1-31, can include fractional part)
 * @returns {number} Julian Day Number
 */
export const gregorianToJulian = (year, month, day) => {
    if (month <= 2) {
        year -= 1;
        month += 12;
    }

    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);

    return Math.floor(365.25 * (year + 4716)) +
        Math.floor(30.6001 * (month + 1)) +
        day + B - 1524.5;
};

/**
 * Get Julian Day for a JavaScript Date object
 * @param {Date} date - JavaScript Date object
 * @returns {number} Julian Day Number (at noon UTC)
 */
export const dateToJulian = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return gregorianToJulian(year, month, day);
};

/**
 * Calculate Julian Century from Julian Day
 * @param {number} jd - Julian Day Number
 * @returns {number} Julian Century
 */
export const julianCentury = (jd) => {
    return (jd - J2000) / JULIAN_CENTURY;
};

/**
 * Calculate geometric mean longitude of the sun (degrees)
 * @param {number} T - Julian Century
 * @returns {number} Mean longitude in degrees
 */
export const sunMeanLongitude = (T) => {
    let L0 = 280.46646 + T * (36000.76983 + 0.0003032 * T);
    // Normalize to 0-360
    while (L0 < 0) L0 += 360;
    while (L0 >= 360) L0 -= 360;
    return L0;
};

/**
 * Calculate geometric mean anomaly of the sun (degrees)
 * @param {number} T - Julian Century
 * @returns {number} Mean anomaly in degrees
 */
export const sunMeanAnomaly = (T) => {
    return 357.52911 + T * (35999.05029 - 0.0001537 * T);
};

/**
 * Calculate eccentricity of Earth's orbit
 * @param {number} T - Julian Century
 * @returns {number} Eccentricity (dimensionless)
 */
export const earthOrbitEccentricity = (T) => {
    return 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
};

/**
 * Calculate equation of center for the sun (degrees)
 * @param {number} T - Julian Century
 * @returns {number} Equation of center in degrees
 */
export const sunEquationOfCenter = (T) => {
    const M = sunMeanAnomaly(T);
    const Mrad = M * DEG_TO_RAD;

    const C = Math.sin(Mrad) * (1.914602 - T * (0.004817 + 0.000014 * T)) +
        Math.sin(2 * Mrad) * (0.019993 - 0.000101 * T) +
        Math.sin(3 * Mrad) * 0.000289;

    return C;
};

/**
 * Calculate true longitude of the sun (degrees)
 * @param {number} T - Julian Century
 * @returns {number} True longitude in degrees
 */
export const sunTrueLongitude = (T) => {
    return sunMeanLongitude(T) + sunEquationOfCenter(T);
};

/**
 * Calculate apparent longitude of the sun (degrees)
 * @param {number} T - Julian Century
 * @returns {number} Apparent longitude in degrees
 */
export const sunApparentLongitude = (T) => {
    const O = sunTrueLongitude(T);
    const omega = 125.04 - 1934.136 * T;
    return O - 0.00569 - 0.00478 * Math.sin(omega * DEG_TO_RAD);
};

/**
 * Calculate mean obliquity of the ecliptic (degrees)
 * @param {number} T - Julian Century
 * @returns {number} Mean obliquity in degrees
 */
export const meanObliquityOfEcliptic = (T) => {
    const seconds = 21.448 - T * (46.8150 + T * (0.00059 - T * 0.001813));
    return 23 + (26 + seconds / 60) / 60;
};

/**
 * Calculate corrected obliquity of the ecliptic (degrees)
 * @param {number} T - Julian Century
 * @returns {number} Corrected obliquity in degrees
 */
export const obliquityCorrection = (T) => {
    const e0 = meanObliquityOfEcliptic(T);
    const omega = 125.04 - 1934.136 * T;
    return e0 + 0.00256 * Math.cos(omega * DEG_TO_RAD);
};

/**
 * Calculate solar declination (degrees)
 * The angle between sun's rays and Earth's equatorial plane
 * @param {number} T - Julian Century
 * @returns {number} Declination in degrees (-23.44 to +23.44)
 */
export const solarDeclination = (T) => {
    const e = obliquityCorrection(T);
    const lambda = sunApparentLongitude(T);

    const sint = Math.sin(e * DEG_TO_RAD) * Math.sin(lambda * DEG_TO_RAD);
    return Math.asin(sint) * RAD_TO_DEG;
};

/**
 * Calculate equation of time (minutes)
 * The difference between apparent solar time and mean solar time
 * @param {number} T - Julian Century
 * @returns {number} Equation of time in minutes
 */
export const equationOfTime = (T) => {
    const e = obliquityCorrection(T);
    const L0 = sunMeanLongitude(T);
    const ecc = earthOrbitEccentricity(T);
    const M = sunMeanAnomaly(T);

    const eRad = e * DEG_TO_RAD;
    const L0rad = L0 * DEG_TO_RAD;
    const Mrad = M * DEG_TO_RAD;

    let y = Math.tan(eRad / 2);
    y = y * y;

    const sin2L0 = Math.sin(2 * L0rad);
    const sinM = Math.sin(Mrad);
    const cos2L0 = Math.cos(2 * L0rad);
    const sin4L0 = Math.sin(4 * L0rad);
    const sin2M = Math.sin(2 * Mrad);

    const Etime = y * sin2L0 - 2 * ecc * sinM + 4 * ecc * y * sinM * cos2L0
        - 0.5 * y * y * sin4L0 - 1.25 * ecc * ecc * sin2M;

    return Etime * RAD_TO_DEG * 4; // Convert to minutes
};

/**
 * Calculate hour angle for a given altitude (degrees)
 * @param {number} altitude - Target sun altitude in degrees (negative for below horizon)
 * @param {number} latitude - Observer latitude in degrees
 * @param {number} declination - Solar declination in degrees
 * @returns {number|null} Hour angle in degrees, null if sun never reaches altitude
 */
export const hourAngle = (altitude, latitude, declination) => {
    const latRad = latitude * DEG_TO_RAD;
    const decRad = declination * DEG_TO_RAD;
    const altRad = altitude * DEG_TO_RAD;

    const cosHA = (Math.sin(altRad) - Math.sin(latRad) * Math.sin(decRad)) /
        (Math.cos(latRad) * Math.cos(decRad));

    // Check if sun never reaches this altitude at this location
    if (cosHA < -1 || cosHA > 1) {
        return null;
    }

    return Math.acos(cosHA) * RAD_TO_DEG;
};

/**
 * Calculate solar noon time (hours from midnight UTC)
 * @param {number} longitude - Observer longitude in degrees
 * @param {number} eqTime - Equation of time in minutes
 * @returns {number} Solar noon in hours (UTC)
 */
export const solarNoon = (longitude, eqTime) => {
    return (720 - 4 * longitude - eqTime) / 60;
};

/**
 * Calculate sun altitude at a specific time
 * @param {number} hourAngleDeg - Hour angle in degrees
 * @param {number} latitude - Observer latitude in degrees
 * @param {number} declination - Solar declination in degrees
 * @returns {number} Sun altitude in degrees
 */
export const sunAltitude = (hourAngleDeg, latitude, declination) => {
    const latRad = latitude * DEG_TO_RAD;
    const decRad = declination * DEG_TO_RAD;
    const haRad = hourAngleDeg * DEG_TO_RAD;

    const sinAlt = Math.sin(latRad) * Math.sin(decRad) +
        Math.cos(latRad) * Math.cos(decRad) * Math.cos(haRad);

    return Math.asin(sinAlt) * RAD_TO_DEG;
};

/**
 * Calculate Asr shadow length multiplier time (hour angle)
 * @param {number} shadowFactor - 1 for Shafi, 2 for Hanafi
 * @param {number} latitude - Observer latitude in degrees
 * @param {number} declination - Solar declination in degrees
 * @returns {number|null} Hour angle for Asr in degrees
 */
export const asrHourAngle = (shadowFactor, latitude, declination) => {
    const latRad = latitude * DEG_TO_RAD;
    const decRad = declination * DEG_TO_RAD;

    // Shadow length at noon
    const noonAlt = (90 - Math.abs(latitude - declination)) * DEG_TO_RAD;
    const tanNoonAlt = Math.tan(noonAlt);

    // Shadow at noon (when sun is at zenith angle)
    const noonShadow = 1 / Math.tan((90 - Math.abs(latitude - declination)) * DEG_TO_RAD);

    // Target altitude when shadow = object height * factor + noon shadow
    const targetCot = shadowFactor + Math.abs(Math.tan((latitude - declination) * DEG_TO_RAD));
    const targetAlt = Math.atan(1 / targetCot) * RAD_TO_DEG;

    return hourAngle(targetAlt, latitude, declination);
};

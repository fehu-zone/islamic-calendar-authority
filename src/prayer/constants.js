/**
 * ASTRONOMICAL CONSTANTS
 * ======================
 * Mathematical constants for prayer time calculations.
 * All calculations are done in pure JavaScript without external dependencies.
 */

// Mathematical constants
export const PI = Math.PI;
export const DEG_TO_RAD = PI / 180;
export const RAD_TO_DEG = 180 / PI;

// Kaaba coordinates (Masjid al-Haram, Mecca)
export const KAABA_LAT = 21.4225;
export const KAABA_LNG = 39.8262;

// Sun angle constants
export const SUN_RISE_SET_ANGLE = 0.833; // Standard refraction + sun radius
export const SUN_ALTITUDE_TWILIGHT = -6; // Civil twilight

// Julian Day constants
export const J2000 = 2451545.0; // Julian Day for January 1, 2000 at 12:00 TT
export const JULIAN_CENTURY = 36525; // Days per Julian century

// Earth's orbital elements (epoch J2000)
export const EARTH_OBLIQUITY = 23.4397; // Axial tilt in degrees

// Asr shadow factors
export const ASR_FACTOR = {
    SHAFI: 1,   // Shafi'i, Maliki, Hanbali
    HANAFI: 2   // Hanafi
};

// High latitude methods
export const HIGH_LAT_METHOD = {
    NONE: 'none',
    MIDDLE_OF_NIGHT: 'middleOfNight',
    ONE_SEVENTH: 'oneSeventh',
    ANGLE_BASED: 'angleBased'
};

// Time format
export const TIME_FORMAT = {
    H24: '24h',
    H12: '12h',
    FLOAT: 'float' // Hours as decimal
};

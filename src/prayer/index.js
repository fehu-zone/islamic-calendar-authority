/**
 * PRAYER TIME MODULE - INDEX
 * ==========================
 * Main exports for prayer time calculations.
 */

// Calculator functions
export {
    calculatePrayerTimes,
    calculatePrayerTimesRange,
    calculateMonthlyPrayerTimes,
    getNextPrayer
} from './calculator.js';

// Astronomical utilities
export {
    dateToJulian,
    julianCentury,
    solarDeclination,
    equationOfTime,
    hourAngle
} from './astronomy.js';

// High latitude adjustments
export {
    requiresHighLatAdjustment,
    getRecommendedHighLatMethod,
    HIGH_LAT_REGIONS
} from './adjustments.js';

// Constants
export {
    ASR_FACTOR,
    HIGH_LAT_METHOD,
    TIME_FORMAT
} from './constants.js';

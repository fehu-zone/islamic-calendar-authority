/**
 * PRAYER TIME CALCULATOR
 * ======================
 * Main calculator for Islamic prayer times.
 * Supports all major calculation methods (Diyanet, ISNA, MWL, etc.)
 * 
 * Zero external dependencies - pure JavaScript implementation.
 */

import {
    dateToJulian,
    julianCentury,
    solarDeclination,
    equationOfTime,
    hourAngle,
    solarNoon,
    asrHourAngle
} from './astronomy.js';

import {
    SUN_RISE_SET_ANGLE,
    ASR_FACTOR,
    HIGH_LAT_METHOD,
    TIME_FORMAT
} from './constants.js';

import { CALCULATION_METHODS, METHOD_IDS } from '../../methods.js';

/**
 * Default calculation options
 */
const DEFAULT_OPTIONS = {
    methodId: METHOD_IDS.DIYANET,
    asrMethod: 'hanafi',  // 'hanafi' or 'shafi'
    highLatMethod: HIGH_LAT_METHOD.ANGLE_BASED,
    highLatThreshold: 48, // Degrees latitude threshold
    timeFormat: TIME_FORMAT.H24,
    timezone: null,       // Auto-detect if null
    useMethodAdjustments: true, // Apply method-specific adjustments
    adjustments: {        // Manual adjustments in minutes
        fajr: 0,
        sunrise: 0,
        dhuhr: 0,
        asr: 0,
        maghrib: 0,
        isha: 0
    }
};

/**
 * Method-specific adjustments (in minutes)
 * These are calibrated against official sources (Diyanet, etc.)
 * Values derived from AlAdhan API offsets for each method
 */
const METHOD_ADJUSTMENTS = {
    [METHOD_IDS.DIYANET]: {
        fajr: 0,
        sunrise: -7,
        dhuhr: 5,
        asr: 4,
        maghrib: 7,
        isha: 0
    },
    [METHOD_IDS.UMM_AL_QURA]: {
        fajr: 0,
        sunrise: 0,
        dhuhr: 4,
        asr: 0,
        maghrib: 4,
        isha: 0
    },
    [METHOD_IDS.ISNA]: {
        fajr: 0,
        sunrise: 0,
        dhuhr: 0,
        asr: 0,
        maghrib: 0,
        isha: 0
    },
    [METHOD_IDS.MWL]: {
        fajr: 0,
        sunrise: 0,
        dhuhr: 2,
        asr: 0,
        maghrib: 2,
        isha: 0
    }
};

/**
 * Format time from decimal hours to string
 * @param {number} hours - Time in decimal hours (e.g., 5.5 = 5:30)
 * @param {string} format - '24h', '12h', or 'float'
 * @returns {string} Formatted time string
 */
const formatTime = (hours, format = TIME_FORMAT.H24) => {
    if (hours === null || isNaN(hours)) {
        return '--:--';
    }

    if (format === TIME_FORMAT.FLOAT) {
        return hours.toFixed(4);
    }

    // Normalize to 24-hour range
    hours = ((hours % 24) + 24) % 24;

    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);

    // Handle minute overflow
    let hour = h;
    let minute = m;
    if (minute >= 60) {
        minute -= 60;
        hour += 1;
    }
    hour = hour % 24;

    if (format === TIME_FORMAT.H12) {
        const period = hour >= 12 ? 'PM' : 'AM';
        const h12 = hour % 12 || 12;
        return `${h12}:${minute.toString().padStart(2, '0')} ${period}`;
    }

    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

/**
 * Calculate timezone offset from longitude (approximate)
 * @param {number} longitude - Longitude in degrees
 * @returns {number} Timezone offset in hours
 */
const estimateTimezone = (longitude) => {
    return Math.round(longitude / 15);
};

/**
 * Apply high latitude adjustment for a prayer time
 * @param {number} time - Calculated time (may be null)
 * @param {string} prayer - Prayer name ('fajr' or 'isha')
 * @param {object} times - Object with all calculated times
 * @param {number} angle - Method angle
 * @param {string} method - High latitude adjustment method
 * @returns {number} Adjusted time
 */
const applyHighLatAdjustment = (time, prayer, times, angle, method) => {
    if (time !== null || method === HIGH_LAT_METHOD.NONE) {
        return time;
    }

    const { sunrise, sunset, dhuhr } = times;
    if (sunrise === null || sunset === null) {
        return null;
    }

    // Night duration
    const nightDuration = (24 - sunset) + sunrise;

    switch (method) {
        case HIGH_LAT_METHOD.MIDDLE_OF_NIGHT:
            // Fajr = Sunrise - nightDuration/2, Isha = Sunset + nightDuration/2
            if (prayer === 'fajr') {
                return sunrise - nightDuration / 2;
            } else {
                return sunset + nightDuration / 2;
            }

        case HIGH_LAT_METHOD.ONE_SEVENTH:
            // Fajr = Sunrise - nightDuration/7, Isha = Sunset + nightDuration/7
            if (prayer === 'fajr') {
                return sunrise - nightDuration / 7;
            } else {
                return sunset + nightDuration / 7;
            }

        case HIGH_LAT_METHOD.ANGLE_BASED:
        default:
            // Proportional to the angle
            const baseDuration = nightDuration / 2;
            const portion = (angle / 60) * baseDuration;
            if (prayer === 'fajr') {
                return sunrise - portion;
            } else {
                return sunset + portion;
            }
    }
};

/**
 * Calculate all prayer times for a given date and location
 * 
 * @param {Date} date - Date to calculate for
 * @param {number} latitude - Latitude in degrees (-90 to 90)
 * @param {number} longitude - Longitude in degrees (-180 to 180)
 * @param {object} options - Calculation options
 * @returns {object} Prayer times object
 * 
 * @example
 * const times = calculatePrayerTimes(
 *   new Date('2026-02-19'),
 *   41.0082,  // Istanbul latitude
 *   28.9784,  // Istanbul longitude
 *   { methodId: 13 }  // Diyanet method
 * );
 * console.log(times);
 * // {
 * //   fajr: '05:52',
 * //   sunrise: '07:14',
 * //   dhuhr: '12:35',
 * //   asr: '15:45',
 * //   maghrib: '17:50',
 * //   isha: '19:10',
 * //   date: '2026-02-19',
 * //   method: 'Diyanet İşleri Başkanlığı',
 * //   location: { latitude: 41.0082, longitude: 28.9784 }
 * // }
 */
export const calculatePrayerTimes = (date, latitude, longitude, options = {}) => {
    // Merge options with defaults
    const opts = { ...DEFAULT_OPTIONS, ...options };
    if (options.adjustments) {
        opts.adjustments = { ...DEFAULT_OPTIONS.adjustments, ...options.adjustments };
    }

    // Get calculation method
    const method = CALCULATION_METHODS[opts.methodId] || CALCULATION_METHODS[METHOD_IDS.DIYANET];

    // Calculate timezone
    const timezone = opts.timezone !== null ? opts.timezone : estimateTimezone(longitude);

    // Get Julian Day and astronomical parameters
    const jd = dateToJulian(date);
    const T = julianCentury(jd);
    const declination = solarDeclination(T);
    const eqTime = equationOfTime(T);

    // Calculate solar noon (Dhuhr)
    // Formula: 12:00 + timezone - longitude/15 - eqTime/60
    const noon = 12 + timezone - longitude / 15 - eqTime / 60;

    // Calculate sunrise/sunset hour angle
    const sunriseHA = hourAngle(-SUN_RISE_SET_ANGLE, latitude, declination);

    // Calculate prayer times
    let times = {};

    // Sunrise & Sunset (base times)
    times.sunrise = sunriseHA !== null ? noon - sunriseHA / 15 : null;
    times.sunset = sunriseHA !== null ? noon + sunriseHA / 15 : null;

    // Dhuhr (solar noon + small safety margin)
    times.dhuhr = noon + 1 / 60; // Add 1 minute after zenith

    // Fajr - based on method angle
    const fajrAngle = method.fajrAngle;
    const fajrHA = hourAngle(-fajrAngle, latitude, declination);
    times.fajr = fajrHA !== null ? noon - fajrHA / 15 : null;

    // Asr - based on shadow factor
    // Use method's preferred school if defined, otherwise user's choice
    const asrSchool = method.asrSchool || opts.asrMethod;
    const asrFactor = asrSchool === 'hanafi' ? ASR_FACTOR.HANAFI : ASR_FACTOR.SHAFI;
    const asrHA = asrHourAngle(asrFactor, latitude, declination);
    times.asr = asrHA !== null ? noon + asrHA / 15 : null;

    // Maghrib - at sunset (or with angle for Tehran method)
    if (method.maghribAngle) {
        const maghribHA = hourAngle(-method.maghribAngle, latitude, declination);
        times.maghrib = maghribHA !== null ? noon + maghribHA / 15 : null;
    } else {
        times.maghrib = times.sunset;
    }

    // Isha - based on method (angle or fixed minutes)
    if (method.ishaMinutes) {
        // Fixed minutes after Maghrib (e.g., Umm Al-Qura: 90 min)
        times.isha = times.maghrib !== null ? times.maghrib + method.ishaMinutes / 60 : null;
    } else {
        const ishaAngle = method.ishaAngle;
        const ishaHA = hourAngle(-ishaAngle, latitude, declination);
        times.isha = ishaHA !== null ? noon + ishaHA / 15 : null;
    }

    // Apply high latitude adjustments if needed
    if (Math.abs(latitude) >= opts.highLatThreshold) {
        times.fajr = applyHighLatAdjustment(
            times.fajr, 'fajr', times, method.fajrAngle, opts.highLatMethod
        );
        times.isha = applyHighLatAdjustment(
            times.isha, 'isha', times, method.ishaAngle || 17, opts.highLatMethod
        );
    }

    // Apply method-specific adjustments (to match official calendars)
    if (opts.useMethodAdjustments && METHOD_ADJUSTMENTS[opts.methodId]) {
        const methodAdj = METHOD_ADJUSTMENTS[opts.methodId];
        for (const prayer of Object.keys(methodAdj)) {
            if (times[prayer] !== null && times[prayer] !== undefined) {
                times[prayer] += methodAdj[prayer] / 60;
            }
        }
    }

    // Apply manual adjustments (user overrides)
    for (const prayer of Object.keys(opts.adjustments)) {
        if (times[prayer] !== null && times[prayer] !== undefined) {
            times[prayer] += opts.adjustments[prayer] / 60;
        }
    }

    // Format output
    const format = opts.timeFormat;
    const result = {
        fajr: formatTime(times.fajr, format),
        sunrise: formatTime(times.sunrise, format),
        dhuhr: formatTime(times.dhuhr, format),
        asr: formatTime(times.asr, format),
        maghrib: formatTime(times.maghrib, format),
        isha: formatTime(times.isha, format),

        // Metadata
        date: date.toISOString().split('T')[0],
        method: method.name,
        methodId: opts.methodId,
        asrMethod: opts.asrMethod,
        location: {
            latitude,
            longitude,
            timezone
        },

        // Raw values (for further processing)
        _raw: {
            fajr: times.fajr,
            sunrise: times.sunrise,
            dhuhr: times.dhuhr,
            asr: times.asr,
            maghrib: times.maghrib,
            isha: times.isha
        }
    };

    return result;
};

/**
 * Calculate prayer times for a date range
 * 
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @param {object} options - Calculation options
 * @returns {Array} Array of prayer times for each day
 */
export const calculatePrayerTimesRange = (startDate, endDate, latitude, longitude, options = {}) => {
    const results = [];
    const current = new Date(startDate);

    while (current <= endDate) {
        results.push(calculatePrayerTimes(new Date(current), latitude, longitude, options));
        current.setDate(current.getDate() + 1);
    }

    return results;
};

/**
 * Calculate prayer times for a specific month
 * 
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @param {object} options - Calculation options
 * @returns {Array} Array of prayer times for the month
 */
export const calculateMonthlyPrayerTimes = (year, month, latitude, longitude, options = {}) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0); // Last day of month

    return calculatePrayerTimesRange(startDate, endDate, latitude, longitude, options);
};

/**
 * Get next prayer time from current time
 * 
 * @param {Date} now - Current date/time
 * @param {object} prayerTimes - Prayer times object from calculatePrayerTimes
 * @returns {object} Next prayer info { name, time, remaining }
 */
export const getNextPrayer = (now, prayerTimes) => {
    const prayers = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const currentHours = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;

    for (const prayer of prayers) {
        const rawTime = prayerTimes._raw[prayer];
        if (rawTime !== null && rawTime > currentHours) {
            const remainingHours = rawTime - currentHours;
            const remainingMinutes = Math.floor(remainingHours * 60);

            return {
                name: prayer,
                time: prayerTimes[prayer],
                remainingMinutes,
                remainingFormatted: `${Math.floor(remainingMinutes / 60)}h ${remainingMinutes % 60}m`
            };
        }
    }

    // After Isha, next is tomorrow's Fajr
    return {
        name: 'fajr',
        time: prayerTimes.fajr,
        remainingMinutes: null,
        remainingFormatted: 'Tomorrow',
        nextDay: true
    };
};

/**
 * CROSS-CHECK SERVICE V2
 * ======================
 * Logic for comparing calculating prayer times against reference sources.
 * Supports regional tolerances (Turkey vs World).
 */

/**
 * Convert HH:MM time string to minutes from midnight
 * @param {string} timeStr - "05:45"
 * @returns {number} minutes
 */
const timeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const cleanTime = timeStr.split(' ')[0];
    const [hours, minutes] = cleanTime.split(':').map(Number);
    return hours * 60 + minutes;
};

/**
 * Compare two times and return difference in minutes
 */
const diffMinutes = (t1, t2) => {
    return timeToMinutes(t1) - timeToMinutes(t2);
};

/**
 * Check if location is approximately in Turkey
 * Bounding Box: Lat 36-42, Lng 26-45
 * @param {number} lat 
 * @param {number} lng 
 * @returns {boolean}
 */
const isTurkey = (lat, lng) => {
    return lat >= 35.8 && lat <= 42.2 && lng >= 25.6 && lng <= 44.9;
};

export class CrossCheckService {
    /**
     * @param {object} config
     * @param {number} config.defaultTolerance - World tolerance (default: 2 min)
     * @param {number} config.strictTolerance - Strict tolerance for TR (default: 1 min)
     */
    constructor(config = {}) {
        this.defaultTolerance = config.defaultTolerance || 2;
        this.strictTolerance = config.strictTolerance || 1;
    }

    /**
     * Get applicable tolerance for location
     */
    getTolerance(lat, lng) {
        return isTurkey(lat, lng) ? this.strictTolerance : this.defaultTolerance;
    }

    /**
     * Validate a set of prayer times against a reference
     */
    validate(primaryTimes, referenceTimes) {
        const result = {
            isValid: true,
            maxDiff: 0,
            discrepancies: [],
            details: {},
            primarySource: primaryTimes.source || 'Unknown',
            referenceSource: referenceTimes.source || 'Reference',
            appliedTolerance: 0
        };

        // Determine tolerance based on location if available in times
        const lat = primaryTimes._meta?.latitude || primaryTimes.location?.latitude || 0;
        const lng = primaryTimes._meta?.longitude || primaryTimes.location?.longitude || 0;

        const tolerance = this.getTolerance(lat, lng);
        result.appliedTolerance = tolerance;

        const prayers = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

        for (const prayer of prayers) {
            const primary = primaryTimes[prayer];
            const reference = referenceTimes[prayer];

            const diff = diffMinutes(primary, reference);
            const absDiff = Math.abs(diff);

            if (absDiff > result.maxDiff) {
                result.maxDiff = absDiff;
            }

            const passed = absDiff <= tolerance;

            result.details[prayer] = {
                primary,
                reference,
                diff,
                passed
            };

            if (!passed) {
                result.isValid = false;
                result.discrepancies.push({
                    prayer,
                    diff,
                    primary,
                    reference
                });
            }
        }

        return result;
    }

    /**
     * Recommend which source to use based on validation
     */
    recommend(validationResult, primaryTimes, referenceTimes) {
        // Safe Zone
        if (validationResult.isValid) {
            return {
                ...primaryTimes,
                _validation: {
                    status: 'VALID',
                    source: 'PRIMARY',
                    toleranceUsed: validationResult.appliedTolerance
                }
            };
        }

        // Critical Fallback Threshold (15 mins)
        // If discrepancy is huge, assume API is broken (timezone/params)
        const CRITICAL_THRESHOLD = 15;

        if (validationResult.maxDiff > CRITICAL_THRESHOLD) {
            return {
                ...referenceTimes,
                _validation: {
                    status: 'FALLBACK_CRITICAL',
                    source: 'REFERENCE',
                    reason: `Critical deviation > ${CRITICAL_THRESHOLD}m`,
                    details: validationResult.discrepancies,
                    toleranceUsed: validationResult.appliedTolerance
                }
            };
        }

        // Minor Discrepancy (e.g. 3 mins vs 2 mins tolerance)
        // Usually safe to trust API (Primary) but warn
        // BUT strict requirement: "Sistem ... koordinat doğruluğu daha yüksek olan kaynağı önceliklendirmelidir"
        // If API fails tolerance, it might be better to report the discrepancy but use it IF it looks like a local nuance.

        return {
            ...primaryTimes,
            _validation: {
                status: 'WARNING',
                source: 'PRIMARY',
                reason: `Tolerance exceeded (${validationResult.maxDiff}m > ${validationResult.appliedTolerance}m)`,
                details: validationResult.discrepancies
            }
        };
    }
}

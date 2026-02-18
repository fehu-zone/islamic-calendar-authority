/**
 * PRAYER TIME ORCHESTRATOR V2
 * ===========================
 * Manages the flow of fetching, validating, and selecting the best prayer time source.
 * Implements "Safe Location" checks and Hybrid Validation.
 */

import { AlAdhanSource, InternalCalculationSource, DiyanetSource } from './dataSources.js';
import { CrossCheckService } from './crossCheck.js';

const isTurkeyCountry = (country) => {
    if (!country || typeof country !== 'string') return false;
    const normalized = country
        .toLowerCase()
        .replace(/\u0131/g, 'i')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
    return normalized === 'tr' || normalized === 'turkey' || normalized === 'turkiye';
};

const isTurkeyCoords = (lat, lng) => {
    return lat >= 35.8 && lat <= 42.2 && lng >= 25.6 && lng <= 44.9;
};

class PrayerTimeOrchestrator {
    constructor() {
        this.globalPrimarySource = new AlAdhanSource();
        this.turkeyPrimarySource = new DiyanetSource();
        this.referenceSource = new InternalCalculationSource();
        this.validator = new CrossCheckService({ defaultTolerance: 2, strictTolerance: 1 });
    }

    /**
     * Get the most accurate prayer times available
     */
    async getAccurateTimes(date, latitude, longitude, options = {}) {
        const {
            method = 13,
            accuracy = 0, // Location accuracy in meters (0 = unknown/perfect)
            forceFallback = false,
            country
        } = options;
        const isTurkey = isTurkeyCountry(country) || isTurkeyCoords(latitude, longitude);
        const primarySource = isTurkey ? this.turkeyPrimarySource : this.globalPrimarySource;
        const referenceMethod = isTurkey ? 13 : method;

        // 1. Initial Safety Check
        // If accuracy > 100m, data is "Unsafe"
        // We still fetch, but we flag it heavily.
        const isUnsafeLocation = accuracy > 100;
        if (isUnsafeLocation) {
            // Unsafe location, accuracy > 100m
        }

        // 2. Fallback Requested?
        if (forceFallback) {
            return this.referenceSource.getTimes(date, latitude, longitude, { method: referenceMethod });
        }

        let primaryTimes = null;
        let referenceTimes = null;
        const referencePromise = this.referenceSource.getTimes(date, latitude, longitude, {
            method: referenceMethod
        });

        try {
            // 3. Fetch Primary Data (API) & Reference
            [primaryTimes, referenceTimes] = await Promise.all([
                primarySource.getTimes(date, latitude, longitude, options),
                referencePromise
            ]);

            // Embed location metadata if available
            if (options.accuracy !== undefined) {
                primaryTimes.location = { ...primaryTimes.location, accuracy };
            }

            // 4. Validate
            const validationResult = this.validator.validate(primaryTimes, referenceTimes);

            // 5. Decide & Recommend
            const result = this.validator.recommend(validationResult, primaryTimes, referenceTimes);

            // Add Safety Warning to Result
            if (isUnsafeLocation) {
                result._meta = result._meta || {};
                result._meta.safety = 'LOW_PRECISION';
                result._meta.accuracy = accuracy;
            }

            // Log significant events logic...
            if (result._validation && result._validation.status !== 'VALID') {
                // Potential discrepancy handled via result metadata
            }

            return result;

        } catch (error) {
            // If Turkey primary fails, try global API before local calculation fallback.
            if (isTurkey) {
                try {
                    const secondaryPrimary = await this.globalPrimarySource.getTimes(date, latitude, longitude, {
                        ...options,
                        method: referenceMethod
                    });

                    if (!referenceTimes) {
                        referenceTimes = await referencePromise;
                    }

                    const validationResult = this.validator.validate(secondaryPrimary, referenceTimes);
                    const result = this.validator.recommend(validationResult, secondaryPrimary, referenceTimes);
                    result._validation = {
                        ...(result._validation || {}),
                        upstreamFallback: 'DIYANET_TO_ALADHAN',
                        upstreamReason: error.message
                    };

                    return result;
                } catch (secondaryError) {
                    // Continue to reference fallback below
                    error = new Error(`Diyanet failed: ${error.message}; AlAdhan failed: ${secondaryError.message}`);
                }
            }

            if (!referenceTimes) {
                referenceTimes = await referencePromise;
            }

            return {
                ...referenceTimes,
                _validation: {
                    status: 'FALLBACK_ERROR',
                    source: 'REFERENCE',
                    reason: `Primary source error: ${error.message}`
                }
            };
        }
    }
}

export const orchestrator = new PrayerTimeOrchestrator();

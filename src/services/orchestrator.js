/**
 * PRAYER TIME ORCHESTRATOR V2
 * ===========================
 * Manages the flow of fetching, validating, and selecting the best prayer time source.
 * Implements "Safe Location" checks and Hybrid Validation.
 */

import { AlAdhanSource, InternalCalculationSource } from './dataSources.js';
import { CrossCheckService } from './crossCheck.js';
import { providers } from '../core/providers.js';

class PrayerTimeOrchestrator {
    constructor() {
        this.primarySource = new AlAdhanSource();
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
            forceFallback = false
        } = options;

        // 1. Initial Safety Check
        // If accuracy > 100m, data is "Unsafe"
        // We still fetch, but we flag it heavily.
        const isUnsafeLocation = accuracy > 100;
        if (isUnsafeLocation) {
            // Unsafe location, accuracy > 100m
        }

        // 2. Fallback Requested?
        if (forceFallback) {
            return this.referenceSource.getTimes(date, latitude, longitude, { method });
        }

        let primaryTimes = null;
        let referenceTimes = null;
        const referencePromise = this.referenceSource.getTimes(date, latitude, longitude, { method });

        try {
            // 3. Fetch Primary Data (API) & Reference
            [primaryTimes, referenceTimes] = await Promise.all([
                this.primarySource.getTimes(date, latitude, longitude, { method }),
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
            // Primary source failed, proceed to fallback logic

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

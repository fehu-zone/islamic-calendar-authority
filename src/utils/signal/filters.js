/**
 * SIGNAL PROCESSING UTILITIES
 * ===========================
 * Algorithms for smoothing noisy sensor data (Magnetometer/Accelerometer).
 */

/**
 * Low Pass Filter (EMA - Exponential Moving Average)
 * Smooths data by filtering out high-frequency noise.
 */
export class LowPassFilter {
    /**
     * @param {number} alpha - Smoothing factor (0 < alpha <= 1). 
     * Lower = smoother but more lag. Higher = more responsive but noisier.
     * Recommended: 0.1 - 0.25 for compass.
     */
    constructor(alpha = 0.25) {
        this.alpha = alpha;
        this.lastValue = null;
    }

    /**
     * Filter a scalar value
     * @param {number} currentValue 
     * @returns {number} Smoothed value
     */
    next(currentValue) {
        if (this.lastValue === null) {
            this.lastValue = currentValue;
            return currentValue;
        }

        // EMA Formula: outlier * alpha + old * (1 - alpha)
        this.lastValue = this.lastValue + this.alpha * (currentValue - this.lastValue);
        return this.lastValue;
    }

    /**
     * Reset the filter state
     */
    reset() {
        this.lastValue = null;
    }
}

/**
 * Circular Buffer Low Pass Filter for Angles (0-360)
 * Handles the wrap-around problem (e.g., average of 359 and 1 should be 0, not 180).
 */
export class AngleLowPassFilter {
    /**
     * @param {number} alpha 
     */
    constructor(alpha = 0.25) {
        this.alpha = alpha;
        this.sinFilter = new LowPassFilter(alpha);
        this.cosFilter = new LowPassFilter(alpha);
    }

    /**
     * Filter an angle in degrees
     * @param {number} angleDegrees 
     * @returns {number} Smoothed angle (0-360)
     */
    next(angleDegrees) {
        const rad = angleDegrees * Math.PI / 180;

        // Decompose into vector components
        const smoothSin = this.sinFilter.next(Math.sin(rad));
        const smoothCos = this.cosFilter.next(Math.cos(rad));

        // Reconstruct angle
        let smoothRad = Math.atan2(smoothSin, smoothCos);
        let smoothDeg = smoothRad * 180 / Math.PI;

        // Normalize to 0-360
        return (smoothDeg + 360) % 360;
    }

    reset() {
        this.sinFilter.reset();
        this.cosFilter.reset();
    }
}

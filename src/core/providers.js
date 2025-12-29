/**
 * PROVIDER REGISTRY & INTERFACES
 * ==============================
 * Dependency Injection system for platform-specific capabilities.
 * Allows the core library to remain Pure JS while using native power.
 */

/**
 * Interface definition for Location Provider
 * Implement this interface in your application layer (e.g. React Native)
 */
export class ILocationProvider {
    /**
     * Get the current device position
     * @returns {Promise<{latitude: number, longitude: number, accuracy: number, timestamp: number}>}
     */
    getCurrentPosition() {
        throw new Error('Method not implemented');
    }
}

/**
 * Interface definition for Magnetic Field Provider
 * Implement this to provide true north correction (declination)
 */
export class IMagneticProvider {
    /**
     * Get magnetic declination for a specific location
     * @param {number} latitude 
     * @param {number} longitude 
     * @param {number} altitude (optional)
     * @returns {Promise<number>} Declination in degrees (East is positive)
     */
    getDeclination(latitude, longitude, altitude = 0) {
        throw new Error('Method not implemented');
    }
}

/**
 * Central registry for injected providers
 */
class ProviderRegistry {
    constructor() {
        this.locationProvider = null;
        this.magneticProvider = null;
    }

    /**
     * Register a location provider
     * @param {ILocationProvider} provider 
     */
    registerLocationProvider(provider) {
        if (!provider || typeof provider.getCurrentPosition !== 'function') {
            throw new Error('Invalid LocationProvider: must implement getCurrentPosition');
        }
        this.locationProvider = provider;
    }

    /**
     * Register a magnetic provider
     * @param {IMagneticProvider} provider 
     */
    registerMagneticProvider(provider) {
        if (!provider || typeof provider.getDeclination !== 'function') {
            throw new Error('Invalid MagneticProvider: must implement getDeclination');
        }
        this.magneticProvider = provider;
    }

    /**
     * Get the registered location provider
     * @returns {ILocationProvider}
     */
    getLocationProvider() {
        if (!this.locationProvider) {
            throw new Error('No LocationProvider registered. Please inject one at startup.');
        }
        return this.locationProvider;
    }

    /**
     * Get the registered magnetic provider
     * @returns {IMagneticProvider}
     */
    getMagneticProvider() {
        if (!this.magneticProvider) {
            console.warn('No MagneticProvider registered. Qibla will use Magnetic North instead of True North.');
            return null;
        }
        return this.magneticProvider;
    }
}

// Export singleton instance
export const providers = new ProviderRegistry();

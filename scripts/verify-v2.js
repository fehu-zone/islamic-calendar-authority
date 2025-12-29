/**
 * V2 ENGINE VERIFICATION (JSON OUTPUT)
 * ====================================
 * Validates Providers, Vincenty Math, and Regional Tolerances.
 */

import { vincInv } from '../src/utils/math/vincenty.js';
import { calculateQibla, getQiblaInfo } from '../src/qibla/calculator.js';
import { providers } from '../src/core/providers.js';
import { orchestrator } from '../src/services/orchestrator.js';
import { METHOD_IDS } from '../methods.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_FILE = path.join(__dirname, '..', 'verification-v2-results.json');

// --- MOCK PROVIDERS ---
class MockMagneticProvider {
    async getDeclination(lat, lng) {
        if (lat > 40 && lat < 42 && lng > 28 && lng < 30) return 5.5; // Istanbul
        if (lat > 40 && lat < 41 && lng < -73) return -12.0; // NYC
        return 0;
    }
}
providers.registerMagneticProvider(new MockMagneticProvider());

// --- TESTS ---
const runTests = async () => {
    const results = {};

    // 1. VINCENTY MATH TEST
    const nyc = { lat: 40.7128, lng: -74.0060 };
    const mecca = { lat: 21.4225, lng: 39.8262 };
    const vResult = vincInv(nyc.lat, nyc.lng, mecca.lat, mecca.lng);

    results.vincenty = {
        distanceKm: Number((vResult.distance / 1000).toFixed(2)),
        bearing: Number(vResult.initialBearing.toFixed(4)),
        passed: vResult.distance > 10000000 && vResult.distance < 10500000
    };

    // 2. QIBLA PROVIDER TEST
    const ist = { lat: 41.0082, lng: 28.9784 };
    const qiblaInfo = await getQiblaInfo(ist.lat, ist.lng);

    // Istanbul Declination is mocked at 5.5 East
    // Magnetic Bearing should be True Bearing - 5.5
    const expectedMag = (qiblaInfo.trueNorth - 5.5 + 360) % 360;

    results.qibla = {
        trueNorth: qiblaInfo.trueNorth,
        magneticDec: qiblaInfo.declination,
        magneticNorth: qiblaInfo.magneticNorth,
        passed: Math.abs(qiblaInfo.magneticNorth - expectedMag) < 0.1
    };

    // 3. REGIONAL TOLERANCE TEST
    const date = new Date('2026-02-19');

    // Case A: Turkey (Lat 41, Lng 28)
    const trResult = await orchestrator.getAccurateTimes(date, 41.0082, 28.9784, { method: METHOD_IDS.DIYANET });

    // Case B: USA (Lat 40, Lng -74)
    const usResult = await orchestrator.getAccurateTimes(date, 40.7128, -74.0060, { method: METHOD_IDS.ISNA });

    results.tolerance = {
        turkey: {
            value: trResult._validation?.toleranceUsed,
            passed: trResult._validation?.toleranceUsed === 1
        },
        usa: {
            value: usResult._validation?.toleranceUsed,
            passed: usResult._validation?.toleranceUsed === 2
        }
    };

    // 4. UNSAFE LOCATION TEST
    // > 100m accuracy
    const unsafeResult = await orchestrator.getAccurateTimes(date, 41.0082, 28.9784, {
        method: METHOD_IDS.DIYANET,
        accuracy: 150
    });

    results.safety = {
        flag: unsafeResult._meta?.safety,
        passed: unsafeResult._meta?.safety === 'LOW_PRECISION'
    };

    fs.writeFileSync(LOG_FILE, JSON.stringify(results, null, 2));
    console.log(`Results written to ${LOG_FILE}`);
};

runTests();

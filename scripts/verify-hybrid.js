import { orchestrator } from '../src/services/orchestrator.js';
import { METHOD_IDS } from '../methods.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_FILE = path.join(__dirname, '..', 'hybrid-verification-results.json');

const LOCATIONS = [
    {
        name: 'Istanbul, TR',
        lat: 41.0082,
        lng: 28.9784,
        method: METHOD_IDS.DIYANET,
        timezone: 3,
        description: 'Should use API and be VALID'
    },
    {
        name: 'New York, US',
        lat: 40.7128,
        lng: -74.0060,
        method: METHOD_IDS.ISNA,
        timezone: -5,
        description: 'Should use API and be VALID'
    },
    {
        name: 'Mecca, SA',
        lat: 21.4225,
        lng: 39.8262,
        method: METHOD_IDS.UMM_AL_QURA,
        timezone: 3,
        description: 'Should use API and be VALID'
    }
];

const runVerification = async () => {
    const results = [];
    const date = new Date();

    console.log('Starting verification...');

    for (const loc of LOCATIONS) {
        try {
            const start = performance.now();
            const result = await orchestrator.getAccurateTimes(date, loc.lat, loc.lng, {
                method: loc.method,
                timezone: loc.timezone
            });
            const duration = (performance.now() - start).toFixed(0);

            results.push({
                location: loc.name,
                expected: loc.description,
                timeMs: duration,
                source: result.source,
                validation: result._validation || 'NONE',
                times: {
                    fajr: result.fajr,
                    maghrib: result.maghrib
                }
            });

        } catch (error) {
            results.push({
                location: loc.name,
                error: error.message
            });
        }
    }

    // Force Fallback Test
    try {
        const result = await orchestrator.getAccurateTimes(date, 41.0082, 28.9784, {
            method: 13,
            forceFallback: true,
            timezone: 3
        });

        results.push({
            test: 'Forced Fallback',
            source: result.source,
            success: result.source === 'Internal Calculation'
        });
    } catch (error) {
        results.push({
            test: 'Forced Fallback',
            error: error.message
        });
    }

    fs.writeFileSync(LOG_FILE, JSON.stringify(results, null, 2));
    console.log(`Results written to ${LOG_FILE}`);
};

runVerification();

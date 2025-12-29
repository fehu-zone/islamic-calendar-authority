# Islamic Calendar Authority 🕌

A professional-grade, high-precision Islamic calendar library for JavaScript. This library provides a robust, platform-independent core for calculating prayer times, Qibla direction, and Ramadan dates, validated against official religious authorities worldwide.

[![npm version](https://badge.fury.io/js/@fehu-zone%2Fislamic-calendar-authority.svg)](https://www.npmjs.com/package/@fehu-zone/islamic-calendar-authority)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🆕 New in Version 2.0.0

- **⚖️ Hybrid Data Verification (Cross-Check)**: Automatically validates API results against precise internal calculations. Supports regional tolerances (Turkey ±1m, Global ±2m).
- **🕋 Advanced Qibla Engine**: Switched to **Vincenty's Formulae** for geodetic accuracy. Now supports **True North vs. Magnetic North** correction.
- **🔌 Provider-Based Architecture**: Platform-agnostic core. Inject your own native location and compass services (ideal for React Native, Capacitor, or Web).
- **🛡️ Fault Tolerance**: Intelligent retry mechanism with exponential backoff and localized caching.
- **🌐 100% Translated**: All documentation and internal comments are now in English.

## Features

- **🕌 Prayer Times**: Accurate calculation using major methodologies (Diyanet, ISNA, MWL, Umm Al-Qura, etc.).
- **🕋 Qibla Direction**: Geodetic ellipsoidal calculations with magnetic correction support.
- **🌙 Ramadan Dates**: Country-specific dates based on official religious authorities.
- **🌍 50+ Countries**: Authority information and localized methodology presets.
- **⚡ Zero Dependencies**: Pure JavaScript, lightweight and tree-shakable.
- **📱 Universal**: Works seamlessly in Node.js, Browsers, and Mobile (React Native).

## Installation

```bash
npm install @fehu-zone/islamic-calendar-authority
```

## Advanced Usage (V2 Engine)

### 1. Register Providers (Crucial for Mobile/Web)
To keep the core library platform-independent, you should inject your platform's native services using the Provider pattern.

```javascript
import { providers } from '@fehu-zone/islamic-calendar-authority/core';

// Example: Injecting React Native Geolocation
providers.registerLocationProvider({
    getCurrentPosition: async () => {
        // Wrap your native tool here
        return { latitude: 41.0082, longitude: 28.9784, accuracy: 10 };
    }
});

// Example: Injecting Magnetic Correction (WMM)
providers.registerMagneticProvider({
    getDeclination: async (lat, lng) => {
        // Return declination in degrees for True North correction
        return 5.5; 
    }
});
```

### 2. Accurate Prayer Times (Hybrid Orchestrator)
The `getPrayerTimes` function uses an orchestrator to verify API data against local math.

```javascript
import { getPrayerTimes, METHOD_IDS } from '@fehu-zone/islamic-calendar-authority';

const times = await getPrayerTimes(new Date(), 41.0082, 28.9784, {
    method: METHOD_IDS.DIYANET,
    accuracy: 10 // Pass GPS accuracy in meters
});

console.log(times);
// {
//   fajr: '05:45',
//   ...,
//   _validation: { status: 'VALID', source: 'PRIMARY' }
// }
```

### 3. Professional Qibla Calculation
Get geodetic accuracy with magnetic compass correction.

```javascript
import { getQiblaInfo } from '@fehu-zone/islamic-calendar-authority/qibla';

const qibla = await getQiblaInfo(41.0082, 28.9784);

console.log(qibla);
// {
//   trueNorth: 151.52,      // True North bearing
//   magneticNorth: 146.02,  // Compass heading (corrected)
//   distance: 2405820,      // Distance in meters
//   declination: 5.5
// }
```

## Quick Start (Legacy Support)

### Prayer Times (Simple)
```javascript
import { calculatePrayerTimes, METHOD_IDS } from '@fehu-zone/islamic-calendar-authority';

const times = calculatePrayerTimes(new Date(), 41.0082, 28.9784, { 
    methodId: METHOD_IDS.DIYANET 
});
```

### Ramadan Dates
```javascript
import { getRamadanStartDate } from '@fehu-zone/islamic-calendar-authority';

const start = getRamadanStartDate(1447, 'Turkey'); // 2026-02-19
```

## Calculation Methods

| ID | Method | Fajr | Isha | Default Region |
|----|--------|------|------|----------------|
| 1 | Karachi | 18° | 18° | Pakistan, India |
| 2 | ISNA | 15° | 15° | USA, Canada |
| 3 | MWL | 18° | 17° | Europe |
| 4 | Umm Al-Qura | 18.5° | 90min | Saudi Arabia |
| 13 | Diyanet | 18° | 17° | Turkey |

## Accuracy & Safety
- **Regional Tolerances**: Automatically applies stricter validation for Turkey (±1m) vs Global (±2m).
- **Safety Flags**: Locations with >100m GPS error are flagged as `LOW_PRECISION`.
- **Fallbacks**: If an API provider returns data deviating >15m from the reference, the system automatically falls back to internal high-precision calculation.

## License
MIT

## Contributing
Professional contributions are welcome. Please ensure all new logic includes geodetic validation or official religious authority citations.

---
Created for the **Ramazan App** project.

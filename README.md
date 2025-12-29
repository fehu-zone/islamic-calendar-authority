# 🕌 Islamic Calendar Authority (Core Engine v2.0.0)

[![npm version](https://badge.fury.io/js/@fehu-zone%2Fislamic-calendar-authority.svg)](https://www.npmjs.com/package/@fehu-zone/islamic-calendar-authority)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Platform: Universal](https://img.shields.io/badge/Platform-Browser%20%7C%20Node%20%7C%20Mobile-green.svg)](#)

A high-performance, professional-grade core engine for Islamic temporal and spatial calculations. This library is designed to be the "Reliability Layer" for modern Islamic applications, offering platform independence and automated data verification.

---

## 🚀 Key Improvements in v2.0.0

### 1. ⚖️ Hybrid Validation (The "Cross-Check" Engine)
Never serve "broken" prayer times again. The orchestrator fetches data from official APIs and validates them against internal high-precision astronomical engine.
- **Regional Logic**: Applies ±1m tolerance for Turkey (Diyanet standard) and ±2m globally.
- **Automated Fallback**: If an API returns anomalous data (>15m error), the engine automatically falls back to internal calculation.

### 2. 🌍 Geodetic Qibla (Vincenty's Formula)
Switched from Haversine (Spherical) to **Vincenty's Formulae** (Ellipsoidal).
- **Millimeter Precision**: Calculated on the WGS-84 ellipsoid.
- **Magnetic Correction**: Supports True North to Magnetic North conversion via injectable providers.

### 3. 🔌 Provider Pattern (Universal Core)
100% platform agnostic. Inject your native device powers:
- **LocationProvider**: Bind to `react-native-geolocation-service` or Web Geolocation.
- **MagneticProvider**: Bind to `geomagnetism` or native WMM models.

### 4. 🛡️ Robust Networking
- **Exponential Backoff**: Automatic retries for unstable network conditions.
- **Smart Caching**: In-memory caching for API responses to minimize data usage.

---

## 📦 Installation

```bash
npm install @fehu-zone/islamic-calendar-authority
```

---

## 🛠️ Implementation Guide

### A. Initializing Providers (Mobile/Web)
Inject native capabilities at app startup to enable high-precision features.

```javascript
import { providers } from '@fehu-zone/islamic-calendar-authority/core';

// Example: React Native Injection
providers.registerLocationProvider({
    getCurrentPosition: async () => {
        // High accuracy native call
        return { latitude: 41.0082, longitude: 28.9784, accuracy: 15 };
    }
});

providers.registerMagneticProvider({
    getDeclination: async (lat, lng) => {
        // Return magnetic declination for proper compass heading
        return 5.5; 
    }
});
```

### B. Fetching Accurate Prayer Times
Use the orchestrator for automated validation and fallback handling.

```javascript
import { getPrayerTimes, METHOD_IDS } from '@fehu-zone/islamic-calendar-authority';

const times = await getPrayerTimes(new Date(), 41.0082, 28.9784, {
    method: METHOD_IDS.DIYANET,
    accuracy: 15 // meters
});

// Response contains validation metadata
console.log(times._validation.status); // 'VALID', 'WARNING', or 'FALLBACK_CRITICAL'
```

### C. Precision Qibla & Compass
Get exact bearings for True North and Magnetic Compass.

```javascript
import { getQiblaInfo } from '@fehu-zone/islamic-calendar-authority/qibla';

const qibla = await getQiblaInfo(41.0082, 28.9784);

/* 
Output:
{
  trueNorth: 151.52,      // True North bearing (Geodetic)
  magneticNorth: 146.02,  // Corrected compass heading
  distance: 2405820.5,    // Distance to Kaaba in meters
  declination: 5.5
}
*/
```

---

## 🌙 Ramadan & Authorities

### Official Dates
The library contains official dates validated by national authorities (Diyanet, Umm Al-Qura, etc.).

```javascript
import { getRamadanStartDate, getAuthorityForCountry } from '@fehu-zone/islamic-calendar-authority';

const start = getRamadanStartDate(1447, 'TR'); // 2026-02-19
const authority = getAuthorityForCountry('TR'); // Diyanet İşleri Başkanlığı
```

---

## 📊 Methodology Presets

| ID | Authority | Region | Fajr Angle | Isha Angle |
|:---|:---|:---|:---|:---|
| 13 | Diyanet | Turkey | 18.0° | 17.0° |
| 4 | Umm Al-Qura | Saudi / Gulf | 18.5° | 90min (Fixed) |
| 2 | ISNA | North America | 15.0° | 15.0° |
| 3 | MWL | Global / Europe | 18.0° | 17.0° |

---

## ⚖️ Safety & Precision Benchmarks
- **GPS Safety**: Automatically flags `LOW_PRECISION` if GPS accuracy > 100m.
- **Astronomical Engine**: Calibrated against NOAA Solar Algorithms.
- **Cross-Check**: Real-time comparison between AlAdhan API and internal reference engine.

## 📄 License
MIT © Ramazan App Team

---
*Developed to provide the most reliable spiritual timing for Muslims worldwide.*

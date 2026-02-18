# 🕌 Islamic Calendar Authority (v2.1.2)

[![npm version](https://badge.fury.io/js/@fehu-zone%2Fislamic-calendar-authority.svg)](https://www.npmjs.com/package/@fehu-zone/islamic-calendar-authority)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A high-performance, production-grade core engine for Islamic temporal and spatial calculations. Designed as a **reliability layer** with hybrid validation, official authority routing, and geodetic precision.

---

## 🚀 Key Features

- **⚖️ Hybrid Validation**: Validates API results against an internal astronomical engine.
- **🇹🇷 Turkey-Aware Routing**: Smart routing between Diyanet (Turkey) and AlAdhan (Global) based on coordinates.
- **🌍 Geodetic Qibla**: Uses **Vincenty's Formulae (WGS-84)** for millimeter-level precision.
- **🔌 Provider Pattern**: 100% platform-agnostic (Browser, Node, React Native).
- **�️ Deterministic Fallback**: Automatic failover (API → API → Internal Engine) if anomalies are detected.

---

## 📦 Installation

```bash
npm install @fehu-zone/islamic-calendar-authority
```

---

## 🛠 Usage Guide

### 1. Get Prayer Times (Validated)

The orchestrator handles validation and regional routing automatically.

```javascript
import { getPrayerTimes, METHOD_IDS } from '@fehu-zone/islamic-calendar-authority';

const times = await getPrayerTimes(new Date(), 41.0082, 28.9784, {
    methodId: METHOD_IDS.DIYANET
});

console.log(times._validation.status); // 'VALID', 'WARNING', or 'FALLBACK_CRITICAL'
```

### 2. Precision Qibla Info

Get exact bearings for True North and Magnetic Compass.

```javascript
import { getQiblaInfo } from '@fehu-zone/islamic-calendar-authority/qibla';

const qibla = await getQiblaInfo(41.0082, 28.9784);
/*
Output: {
  trueNorth: 151.52,
  magneticNorth: 146.02,
  distance: 2405820.5, // meters
  declination: 5.5
}
*/
```

### 3. Ramadan & Authority Data

```javascript
import { getRamadanStartDate, getAuthorityForCountry } from '@fehu-zone/islamic-calendar-authority';

const start = getRamadanStartDate(1447, 'TR'); // 2026-02-19
const authority = getAuthorityForCountry('TR'); // Diyanet
```

---

## Methodology Presets

| ID | Authority | Region | Fajr Angle | Isha Angle |
| :--- | :--- | :--- | :--- | :--- |
| 13 | Diyanet | Turkey | 18.0° | 17.0° |
| 4 | Umm Al-Qura | Saudi / Gulf | 18.5° | 90min (Fixed) |
| 2 | ISNA | North America | 15.0° | 15.0° |
| 3 | MWL | Global / Europe | 18.0° | 17.0° |

---

## Status & Benchmarks

- **66/66 Tests Passing**
- **UTC Shift Resolved**: Robust handling of cross-day prayer fetches.
- **Smart Caching**: In-memory caching for API responses.

## License

MIT © Ramazan App Team

# Islamic Calendar Authority

A comprehensive, zero-dependency JavaScript library for Islamic calendar calculations based on official religious authorities worldwide.

## Features

- **🕌 Prayer Times**: Accurate calculation using major methodologies (Diyanet, ISNA, MWL, Umm Al-Qura, etc.)
- **🕋 Qibla Direction**: Great circle formula with compass directions and distance to Kaaba
- **🌙 Ramadan Dates**: Country-specific dates based on official religious authorities
- **🌍 50+ Countries**: Authority information with calculation methods
- **⚡ Zero Dependencies**: Pure JavaScript, no external libraries
- **📱 Universal**: Works in Node.js and browsers

## Installation

```bash
npm install islamic-calendar-authority
```

## Quick Start

### Prayer Times

```javascript
import { calculatePrayerTimes, METHOD_IDS } from 'islamic-calendar-authority';

// Calculate prayer times for Istanbul
const times = calculatePrayerTimes(
  new Date('2026-02-19'),
  41.0082,  // latitude
  28.9784,  // longitude
  { 
    methodId: METHOD_IDS.DIYANET,
    timezone: 3 
  }
);

console.log(times);
// {
//   fajr: '05:52',
//   sunrise: '07:14',
//   dhuhr: '12:35',
//   asr: '15:45',
//   maghrib: '17:50',
//   isha: '19:10',
//   date: '2026-02-19',
//   method: 'Diyanet İşleri Başkanlığı'
// }
```

### Qibla Direction

```javascript
import { calculateQiblaDirection } from 'islamic-calendar-authority';

// Calculate Qibla for Istanbul
const qibla = calculateQiblaDirection(41.0082, 28.9784);

console.log(qibla);
// {
//   direction: 152.45,     // degrees from true north
//   compass: 'SE',         // compass direction
//   distance: 2405.1,      // distance to Kaaba in km
// }
```

### Ramadan Dates

```javascript
import { getRamadanStartDate, isRamadan, getRamadanDay } from 'islamic-calendar-authority';

// Get Ramadan start for Turkey (Hicri 1447)
const start = getRamadanStartDate(1447, 'Turkey');
console.log(start); // Date: 2026-02-19

// Check if a date is in Ramadan
const date = new Date('2026-02-25');
isRamadan(date, 'Turkey');     // true
getRamadanDay(date, 'Turkey'); // 7 (7th day of Ramadan)

// Works with country codes and aliases
getRamadanStartDate(1447, 'TR');      // Turkey
getRamadanStartDate(1447, 'türkiye'); // Turkey
getRamadanStartDate(1447, 'SA');      // Saudi Arabia
```

## Calculation Methods

| ID | Method | Fajr | Isha | Countries |
|----|--------|------|------|-----------|
| 1 | Karachi | 18° | 18° | Pakistan, India, Bangladesh |
| 2 | ISNA | 15° | 15° | USA, Canada |
| 3 | MWL | 18° | 17° | Europe, Middle East |
| 4 | Umm Al-Qura | 18.5° | 90min | Saudi Arabia, Gulf |
| 5 | Egypt | 19.5° | 17.5° | Egypt, North Africa |
| 7 | Tehran | 17.7° | 14° | Iran |
| 11 | Singapore | 20° | 18° | Southeast Asia |
| 12 | UOIF | 12° | 12° | France |
| 13 | Diyanet | 18° | 17° | Turkey |
| 14 | Russia | 16° | 15° | Russia, Central Asia |

```javascript
import { getMethodForCountry, getMethodAngles, METHOD_IDS } from 'islamic-calendar-authority';

// Get method for a country
getMethodForCountry('TR'); // 13 (Diyanet)
getMethodForCountry('US'); // 2 (ISNA)

// Get method angles
getMethodAngles(METHOD_IDS.DIYANET);
// { fajr: 18, isha: 17, ishaMinutes: null, maghrib: null }
```

## Asr Calculation

Supports both Hanafi and Shafi madhabs:

```javascript
const hanafiTimes = calculatePrayerTimes(date, lat, lng, {
  asrMethod: 'hanafi'  // Shadow factor = 2
});

const shafiTimes = calculatePrayerTimes(date, lat, lng, {
  asrMethod: 'shafi'   // Shadow factor = 1
});
```

## High Latitude Adjustments

For locations above 48° latitude (Scandinavia, Alaska, etc.):

```javascript
import { calculatePrayerTimes, HIGH_LAT_METHOD } from 'islamic-calendar-authority';

const times = calculatePrayerTimes(date, 59.9139, 10.7522, { // Oslo
  methodId: METHOD_IDS.MWL,
  highLatMethod: HIGH_LAT_METHOD.ONE_SEVENTH
});
```

Available methods:
- `NONE` - No adjustment
- `MIDDLE_OF_NIGHT` - Fajr/Isha at night midpoint
- `ONE_SEVENTH` - Fajr/Isha at 1/7 of night
- `ANGLE_BASED` - Proportional to angle

## Country Authorities

```javascript
import { getAuthorityForCountry, getAllAuthorities } from 'islamic-calendar-authority';

const authority = getAuthorityForCountry('Turkey');
// {
//   code: 'TR',
//   name: 'Turkey',
//   authority: 'Diyanet İşleri Başkanlığı',
//   authorityShort: 'Diyanet',
//   methodId: 13,
//   website: 'https://www.diyanet.gov.tr',
//   timezone: 'Europe/Istanbul',
//   usesLunarSighting: false
// }
```

## Supported Countries

25+ countries with official religious authority data:

- **Turkey** - Diyanet İşleri Başkanlığı
- **Saudi Arabia** - Umm Al-Qura
- **Egypt** - Egyptian General Authority
- **Iran** - University of Tehran
- **Pakistan** - Ruet-e-Hilal Committee
- **Indonesia** - Kementerian Agama
- **Malaysia** - JAKIM
- **USA** - ISNA
- **UK** - Muslim Council of Britain
- **Germany** - ZMD
- **France** - UOIF
- And many more...

## Monthly Calendar

```javascript
import { calculateMonthlyPrayerTimes } from 'islamic-calendar-authority';

const february = calculateMonthlyPrayerTimes(2026, 2, 41.0082, 28.9784, {
  methodId: METHOD_IDS.DIYANET,
  timezone: 3
});

// Returns array of 28 days with prayer times
```

## Ramadan Calendar

```javascript
import { getRamadanCalendar } from 'islamic-calendar-authority';

const calendar = getRamadanCalendar(1447, 'Turkey');
// [
//   { day: 1, gregorianDate: '2026-02-19', weekday: 'Perşembe', ... },
//   { day: 2, gregorianDate: '2026-02-20', weekday: 'Cuma', ... },
//   ...
// ]
```

## Compare Ramadan Dates

```javascript
import { compareRamadanStartDates } from 'islamic-calendar-authority';

const comparison = compareRamadanStartDates(1447);
// [
//   { countryCode: 'SA', startDate: '2026-02-18', authority: 'Umm Al-Qura' },
//   { countryCode: 'TR', startDate: '2026-02-19', authority: 'Diyanet' },
//   ...
// ]
```

## API Reference

### Prayer Times

| Function | Description |
|----------|-------------|
| `calculatePrayerTimes(date, lat, lng, options)` | Calculate prayer times for a date |
| `calculateMonthlyPrayerTimes(year, month, lat, lng, options)` | Calculate for entire month |
| `calculatePrayerTimesRange(start, end, lat, lng, options)` | Calculate for date range |
| `getNextPrayer(now, prayerTimes)` | Get next upcoming prayer |

### Qibla

| Function | Description |
|----------|-------------|
| `calculateQiblaDirection(lat, lng)` | Calculate Qibla bearing |
| `calculateDistanceToKaaba(lat, lng)` | Distance to Kaaba in km |
| `applyMagneticDeclination(bearing, declination)` | Apply magnetic correction |

### Ramadan

| Function | Description |
|----------|-------------|
| `getRamadanStartDate(hijriYear, country)` | Get Ramadan start date |
| `getRamadanEndDate(hijriYear, country)` | Get Ramadan end date |
| `isRamadan(date, country)` | Check if date is in Ramadan |
| `getRamadanDay(date, country)` | Get day number (1-30) |
| `getRamadanCalendar(hijriYear, country)` | Full 30-day calendar |

### Methods

| Function | Description |
|----------|-------------|
| `getMethodForCountry(countryCode)` | Get recommended method ID |
| `getMethodAngles(methodId)` | Get Fajr/Isha angles |
| `getMethodsForUI()` | Get all methods for dropdown |

## Accuracy

- Prayer times validated against Diyanet, ISNA, and Umm Al-Qura
- Qibla direction accurate to ±0.5°
- Uses NOAA solar calculation algorithms

## License

MIT

## Contributing

Contributions welcome! Please help us:
- Add more countries and authorities
- Update Ramadan dates after official announcements
- Improve calculation accuracy
- Add translations

## Credits

Created for the Ramazan App project.

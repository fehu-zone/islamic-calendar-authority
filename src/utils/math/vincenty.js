/**
 * VINCENTY'S FORMULAE
 * ===================
 * High-precision geodesic calculations for an ellipsoidal Earth.
 * Far more accurate than Haversine for long distances.
 * 
 * Based on WGS-84 ellipsoid:
 * a = 6378137.0 meters (equatorial radius)
 * f = 1/298.257223563 (flattening)
 * b = 6356752.314245 meters (polar radius)
 */

const a = 6378137.0;
const f = 1 / 298.257223563;
const b = 6356752.314245;

const toRad = degree => degree * Math.PI / 180;
const toDeg = radian => radian * 180 / Math.PI;

/**
 * Calculates geodetic distance and azimuths between two points
 * 
 * @param {number} lat1 - Latitude of start point (degrees)
 * @param {number} lon1 - Longitude of start point (degrees)
 * @param {number} lat2 - Latitude of destination (degrees)
 * @param {number} lon2 - Longitude of destination (degrees)
 * @returns {object} { distance: number (meters), initialBearing: number (degrees), finalBearing: number (degrees) }
 */
export const vincInv = (lat1, lon1, lat2, lon2) => {
    const L = toRad(lon2 - lon1);
    const U1 = Math.atan((1 - f) * Math.tan(toRad(lat1)));
    const U2 = Math.atan((1 - f) * Math.tan(toRad(lat2)));
    const sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
    const sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);

    let lambda = L;
    let lambdaP;
    let iterLimit = 100;

    let cosSqAlpha, sinSigma, cos2SigmaM, cosSigma, sigma, sinAlpha;

    do {
        const sinLambda = Math.sin(lambda);
        const cosLambda = Math.cos(lambda);

        sinSigma = Math.sqrt(
            (cosU2 * sinLambda) * (cosU2 * sinLambda) +
            (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
        );

        if (sinSigma === 0) return { distance: 0, initialBearing: 0, finalBearing: 0 }; // Co-incident points

        cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
        sigma = Math.atan2(sinSigma, cosSigma);
        sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
        cosSqAlpha = 1 - sinAlpha * sinAlpha;

        cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
        if (isNaN(cos2SigmaM)) cos2SigmaM = 0; // Equatorial line: cosSqAlpha=0

        const C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
        lambdaP = lambda;
        lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));

    } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);

    if (iterLimit === 0) return { distance: NaN, initialBearing: NaN, finalBearing: NaN }; // Failure to converge

    const uSq = cosSqAlpha * (a * a - b * b) / (b * b);
    const A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));

    const deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
        B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));

    const s = b * A * (sigma - deltaSigma); // Distance in meters

    const fwdAz = Math.atan2(cosU2 * Math.sin(lambda), cosU1 * sinU2 - sinU1 * cosU2 * Math.cos(lambda));
    const initialBearing = (toDeg(fwdAz) + 360) % 360; // Normalize 0-360

    return {
        distance: Number(s.toFixed(3)),
        initialBearing: Number(initialBearing.toFixed(4)),
        finalBearing: 0 // Not strictly needed for Qibla
    };
};

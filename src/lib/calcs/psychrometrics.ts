// Psychrometric calculations based on ASHRAE Fundamentals (Hyland–Wexler saturation pressure formulation)
// Notes:
// - Implemented for typical HVAC ranges.
// - Dew point is obtained by numerically inverting saturation vapor pressure.

export type TempUnit = 'F' | 'C';

const P_STD_PA = 101_325; // Standard atmosphere

export function fToC(f: number): number {
  return (f - 32) * (5 / 9);
}

export function cToF(c: number): number {
  return c * (9 / 5) + 32;
}

function assertFinite(x: number, name: string): void {
  if (!Number.isFinite(x)) throw new Error(`${name} must be a finite number`);
}

function cToK(c: number): number {
  return c + 273.15;
}

// --- Core vapor pressure relationships ---

export function saturationVaporPressurePa(tC: number): number {
  // ASHRAE Fundamentals (e.g., 2017): saturation vapor pressure over liquid water.
  // ln(Pws) = C1/T + C2 + C3*T + C4*T^2 + C5*T^3 + C6*ln(T)
  // T in K, Pws in Pa.
  assertFinite(tC, 'tC');
  const T = cToK(tC);

  const C1 = -5.8002206e3;
  const C2 = 1.3914993;
  const C3 = -4.8640239e-2;
  const C4 = 4.1764768e-5;
  const C5 = -1.4452093e-8;
  const C6 = 6.5459673;

  const lnPws = C1 / T + C2 + C3 * T + C4 * T ** 2 + C5 * T ** 3 + C6 * Math.log(T);
  return Math.exp(lnPws);
}

export function vaporPressureFromRhPa(tC: number, rhPercent: number): number {
  assertFinite(rhPercent, 'rhPercent');
  if (rhPercent < 0 || rhPercent > 100) throw new Error('Relative humidity must be between 0 and 100');
  const pws = saturationVaporPressurePa(tC);
  return (rhPercent / 100) * pws;
}

export function humidityRatioFromVaporPressure(pVaporPa: number, pBaroPa: number = P_STD_PA): number {
  assertFinite(pVaporPa, 'pVaporPa');
  assertFinite(pBaroPa, 'pBaroPa');
  if (pBaroPa <= 0) throw new Error('Barometric pressure must be > 0');
  if (pVaporPa < 0) throw new Error('Vapor pressure must be >= 0');
  if (pVaporPa >= pBaroPa) throw new Error('Vapor pressure must be less than barometric pressure');

  // W = 0.621945 * Pv / (P - Pv)
  return 0.621945 * (pVaporPa / (pBaroPa - pVaporPa));
}

export function humidityRatioFromRh(tC: number, rhPercent: number, pBaroPa: number = P_STD_PA): number {
  const pv = vaporPressureFromRhPa(tC, rhPercent);
  return humidityRatioFromVaporPressure(pv, pBaroPa);
}

// --- Enthalpy (I-P) ---

export function enthalpyBtuPerLbDryAir(tDryBulbF: number, humidityRatio: number): number {
  assertFinite(tDryBulbF, 'tDryBulbF');
  assertFinite(humidityRatio, 'humidityRatio');
  if (humidityRatio < 0) throw new Error('Humidity ratio must be >= 0');

  // ASHRAE psychrometric relationship (I-P):
  // h = 0.240*Tdb + W*(1061 + 0.444*Tdb)
  return 0.240 * tDryBulbF + humidityRatio * (1061 + 0.444 * tDryBulbF);
}

export function dryBulbFromEnthalpyAndW(hBtuLb: number, humidityRatio: number): number {
  assertFinite(hBtuLb, 'hBtuLb');
  assertFinite(humidityRatio, 'humidityRatio');
  if (humidityRatio < 0) throw new Error('Humidity ratio must be >= 0');

  // Rearranged:
  // h = (0.240 + 0.444W)T + 1061W
  const denom = 0.240 + 0.444 * humidityRatio;
  if (denom === 0) throw new Error('Invalid humidity ratio');
  return (hBtuLb - 1061 * humidityRatio) / denom;
}

// --- Dew point ---

export function dewPointCFromVaporPressure(pVaporPa: number): number {
  assertFinite(pVaporPa, 'pVaporPa');
  if (pVaporPa <= 0) throw new Error('Vapor pressure must be > 0');

  // Invert Pws(T) = Pv using bisection.
  let lo = -80;
  let hi = 90;

  // Ensure bracket
  for (let i = 0; i < 30; i++) {
    if (saturationVaporPressurePa(lo) > pVaporPa) {
      hi = lo;
      lo -= 40;
      continue;
    }
    if (saturationVaporPressurePa(hi) < pVaporPa) {
      lo = hi;
      hi += 40;
      continue;
    }
    break;
  }

  const fLo0 = saturationVaporPressurePa(lo) - pVaporPa;
  const fHi0 = saturationVaporPressurePa(hi) - pVaporPa;
  if (fLo0 > 0 || fHi0 < 0) throw new Error('Failed to bracket dew point');

  let fLo = fLo0;
  let fHi = fHi0;

  for (let iter = 0; iter < 80; iter++) {
    const mid = (lo + hi) / 2;
    const fMid = saturationVaporPressurePa(mid) - pVaporPa;
    if (Math.abs(fMid) < 0.01) return mid;
    if (fMid > 0) {
      hi = mid;
      fHi = fMid;
    } else {
      lo = mid;
      fLo = fMid;
    }
  }

  // Best estimate
  return (lo + hi) / 2;
}

export function dewPointFromDryBulbRh(tDryBulb: number, rhPercent: number, unit: TempUnit = 'F'): {
  dewPoint: number;
  unit: TempUnit;
} {
  const tC = unit === 'F' ? fToC(tDryBulb) : tDryBulb;
  const pv = vaporPressureFromRhPa(tC, rhPercent);
  const dpC = dewPointCFromVaporPressure(pv);
  return { dewPoint: unit === 'F' ? cToF(dpC) : dpC, unit };
}

// --- Mixed air (mass balance) ---

export function mixedAirFromStreams(
  stream1: { cfm: number; tDryBulbF: number; rhPercent: number },
  stream2: { cfm: number; tDryBulbF: number; rhPercent: number },
  pBaroPa: number = P_STD_PA,
): {
  tDryBulbF: number;
  rhPercent: number;
  humidityRatio: number;
  enthalpyBtuLb: number;
} {
  const { cfm: c1, tDryBulbF: t1, rhPercent: rh1 } = stream1;
  const { cfm: c2, tDryBulbF: t2, rhPercent: rh2 } = stream2;
  [c1, c2, t1, t2, rh1, rh2].forEach((v, idx) => assertFinite(v, `input${idx}`));
  if (c1 < 0 || c2 < 0) throw new Error('CFM must be >= 0');
  const total = c1 + c2;
  if (total <= 0) throw new Error('Total CFM must be > 0');

  const w1 = humidityRatioFromRh(fToC(t1), rh1, pBaroPa);
  const w2 = humidityRatioFromRh(fToC(t2), rh2, pBaroPa);
  const h1 = enthalpyBtuPerLbDryAir(t1, w1);
  const h2 = enthalpyBtuPerLbDryAir(t2, w2);

  // Approximate mass flow proportional to CFM for field TAB use.
  const w = (c1 * w1 + c2 * w2) / total;
  const h = (c1 * h1 + c2 * h2) / total;

  const t = dryBulbFromEnthalpyAndW(h, w);

  // Compute RH from T and W
  const tC = fToC(t);
  const pv = (w * pBaroPa) / (0.621945 + w);
  const pws = saturationVaporPressurePa(tC);
  const rh = Math.max(0, Math.min(100, (pv / pws) * 100));

  return { tDryBulbF: t, rhPercent: rh, humidityRatio: w, enthalpyBtuLb: h };
}

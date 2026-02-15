// Duct pressure loss calculations using Darcy–Weisbach.
// References:
// - ASHRAE Fundamentals: Darcy–Weisbach and fitting-loss method.
// - Swamee–Jain explicit approximation for turbulent friction factor.

import { paToInWg } from './conversions';

export type DuctShape = 'round' | 'rectangular';

function assertFinite(x: number, name: string): void {
  if (!Number.isFinite(x)) throw new Error(`${name} must be a finite number`);
}

export function cfmToM3s(cfm: number): number {
  return cfm * 0.00047194745;
}

export function inchToM(inches: number): number {
  return inches * 0.0254;
}

export function airDensityKgPerM3(opts?: { temperatureC?: number; pressurePa?: number }): number {
  // Ideal gas approximation for dry air.
  const tC = opts?.temperatureC ?? 20;
  const p = opts?.pressurePa ?? 101_325;
  assertFinite(tC, 'temperatureC');
  assertFinite(p, 'pressurePa');
  const T = tC + 273.15;
  const R = 287.055; // J/(kg·K)
  return p / (R * T);
}

export function airKinematicViscosityM2PerS(temperatureC: number = 20): number {
  // Temperature-dependent kinematic viscosity approximation (sufficient for TAB field calcs).
  assertFinite(temperatureC, 'temperatureC');
  const T = temperatureC + 273.15;
  const T0 = 273.15;
  const nu0 = 1.32e-5; // m²/s near 0°C
  return nu0 * Math.pow(T / T0, 1.5);
}

export function hydraulicDiameterM(shape: DuctShape, dims: { diameterIn?: number; widthIn?: number; heightIn?: number }): number {
  if (shape === 'round') {
    const dIn = dims.diameterIn;
    if (dIn == null) throw new Error('diameterIn is required for round duct');
    assertFinite(dIn, 'diameterIn');
    if (dIn <= 0) throw new Error('Diameter must be > 0');
    return inchToM(dIn);
  }

  const wIn = dims.widthIn;
  const hIn = dims.heightIn;
  if (wIn == null || hIn == null) throw new Error('widthIn and heightIn are required for rectangular duct');
  assertFinite(wIn, 'widthIn');
  assertFinite(hIn, 'heightIn');
  if (wIn <= 0 || hIn <= 0) throw new Error('Width and height must be > 0');

  const a = inchToM(wIn);
  const b = inchToM(hIn);
  // Dh = 2ab/(a+b)
  return (2 * a * b) / (a + b);
}

export function areaM2(shape: DuctShape, dims: { diameterIn?: number; widthIn?: number; heightIn?: number }): number {
  if (shape === 'round') {
    const d = hydraulicDiameterM('round', dims);
    return (Math.PI * d ** 2) / 4;
  }
  const wIn = dims.widthIn!;
  const hIn = dims.heightIn!;
  return inchToM(wIn) * inchToM(hIn);
}

export function velocityMPerS(cfm: number, areaM2Value: number): number {
  assertFinite(cfm, 'cfm');
  assertFinite(areaM2Value, 'areaM2');
  if (cfm < 0) throw new Error('CFM must be >= 0');
  if (areaM2Value <= 0) throw new Error('Area must be > 0');
  return cfmToM3s(cfm) / areaM2Value;
}

export function reynoldsNumber(vMPerS: number, dHydraulicM: number, nuM2PerS: number): number {
  assertFinite(vMPerS, 'velocity');
  assertFinite(dHydraulicM, 'diameter');
  assertFinite(nuM2PerS, 'nu');
  if (dHydraulicM <= 0) throw new Error('Diameter must be > 0');
  if (nuM2PerS <= 0) throw new Error('Kinematic viscosity must be > 0');
  return (vMPerS * dHydraulicM) / nuM2PerS;
}

export function frictionFactorSwameeJain(re: number, relRoughness: number): number {
  assertFinite(re, 'Re');
  assertFinite(relRoughness, 'relRoughness');
  if (re <= 0) throw new Error('Re must be > 0');
  if (relRoughness < 0) throw new Error('Relative roughness must be >= 0');

  if (re < 2300) return 64 / re; // laminar

  const term = relRoughness / 3.7 + 5.74 / Math.pow(re, 0.9);
  return 0.25 / (Math.log10(term) ** 2);
}

export function ductFrictionLoss(opts: {
  cfm: number;
  lengthFt: number;
  shape: DuctShape;
  diameterIn?: number;
  widthIn?: number;
  heightIn?: number;
  roughnessMm?: number;
  temperatureC?: number;
  pressurePa?: number;
}): {
  velocityMPerS: number;
  reynolds: number;
  frictionFactor: number;
  deltaPPa: number;
  deltaPInWg: number;
} {
  const {
    cfm,
    lengthFt,
    shape,
    diameterIn,
    widthIn,
    heightIn,
    roughnessMm = 0.09, // galvanized steel, typical
    temperatureC = 20,
    pressurePa = 101_325,
  } = opts;

  assertFinite(cfm, 'cfm');
  assertFinite(lengthFt, 'lengthFt');
  if (cfm < 0) throw new Error('CFM must be >= 0');
  if (lengthFt < 0) throw new Error('Length must be >= 0');

  const d = hydraulicDiameterM(shape, { diameterIn, widthIn, heightIn });
  const a = areaM2(shape, { diameterIn, widthIn, heightIn });
  const v = velocityMPerS(cfm, a);

  const rho = airDensityKgPerM3({ temperatureC, pressurePa });
  const nu = airKinematicViscosityM2PerS(temperatureC);
  const re = reynoldsNumber(v, d, nu);

  const eps = (roughnessMm / 1000); // m
  const relRoughness = eps / d;
  const f = frictionFactorSwameeJain(re, relRoughness);

  const L = lengthFt * 0.3048;
  const dp = f * (L / d) * (rho * v ** 2 / 2);

  return { velocityMPerS: v, reynolds: re, frictionFactor: f, deltaPPa: dp, deltaPInWg: paToInWg(dp) };
}

// NEBB Fundamental Formula Chart: Duct Fitting Loss = C × VP
// (where C is a fitting loss coefficient and VP is velocity pressure)
export function ductFittingLossFromCAndVpInWg(cCoefficient: number, velocityPressureInWg: number): number {
  assertFinite(cCoefficient, 'cCoefficient');
  assertFinite(velocityPressureInWg, 'velocityPressureInWg');
  if (cCoefficient < 0) throw new Error('cCoefficient must be >= 0');
  if (velocityPressureInWg < 0) throw new Error('velocityPressureInWg must be >= 0');
  return cCoefficient * velocityPressureInWg;
}

export function fittingLossFromK(opts: {
  cfm: number;
  k: number;
  shape: DuctShape;
  diameterIn?: number;
  widthIn?: number;
  heightIn?: number;
  temperatureC?: number;
  pressurePa?: number;
}): { velocityMPerS: number; deltaPPa: number; deltaPInWg: number } {
  const { cfm, k, shape, diameterIn, widthIn, heightIn, temperatureC = 20, pressurePa = 101_325 } = opts;
  assertFinite(k, 'k');
  if (k < 0) throw new Error('K must be >= 0');

  const a = areaM2(shape, { diameterIn, widthIn, heightIn });
  const v = velocityMPerS(cfm, a);
  const rho = airDensityKgPerM3({ temperatureC, pressurePa });
  const dp = k * (rho * v ** 2 / 2);
  return { velocityMPerS: v, deltaPPa: dp, deltaPInWg: paToInWg(dp) };
}

export function equivalentLengthFromK(opts: {
  k: number;
  shape: DuctShape;
  diameterIn?: number;
  widthIn?: number;
  heightIn?: number;
  frictionFactor: number;
}): { equivalentLengthFt: number } {
  const { k, shape, diameterIn, widthIn, heightIn, frictionFactor } = opts;
  assertFinite(k, 'k');
  assertFinite(frictionFactor, 'frictionFactor');
  if (k < 0) throw new Error('K must be >= 0');
  if (frictionFactor <= 0) throw new Error('Friction factor must be > 0');

  const d = hydraulicDiameterM(shape, { diameterIn, widthIn, heightIn });
  const leM = (k * d) / frictionFactor;
  return { equivalentLengthFt: leM / 0.3048 };
}

export function kFromEquivalentLength(opts: {
  equivalentLengthFt: number;
  shape: DuctShape;
  diameterIn?: number;
  widthIn?: number;
  heightIn?: number;
  frictionFactor: number;
}): { k: number } {
  const { equivalentLengthFt, shape, diameterIn, widthIn, heightIn, frictionFactor } = opts;
  assertFinite(equivalentLengthFt, 'equivalentLengthFt');
  assertFinite(frictionFactor, 'frictionFactor');
  if (equivalentLengthFt < 0) throw new Error('Equivalent length must be >= 0');
  if (frictionFactor <= 0) throw new Error('Friction factor must be > 0');

  const d = hydraulicDiameterM(shape, { diameterIn, widthIn, heightIn });
  const leM = equivalentLengthFt * 0.3048;
  return { k: (frictionFactor * leM) / d };
}

// --- Backwards-compatible aliases (older UI screens) ---
// These keep previously-built screens working while the new API uses the functions above.

export function calcEquivalentLengthM(kTotal: number, dh_m: number, frictionFactor: number): number {
  assertFinite(kTotal, 'kTotal');
  assertFinite(dh_m, 'dh_m');
  assertFinite(frictionFactor, 'frictionFactor');
  if (kTotal < 0) throw new Error('kTotal must be >= 0');
  if (dh_m <= 0) throw new Error('dh_m must be > 0');
  if (frictionFactor <= 0) throw new Error('frictionFactor must be > 0');
  return (kTotal * dh_m) / frictionFactor;
}

export function calcFittingLossPa(opts: { velocity_m_s: number; kTotal: number; temperatureC?: number; pressurePa?: number }): number {
  const { velocity_m_s, kTotal, temperatureC = 20, pressurePa = 101_325 } = opts;
  assertFinite(velocity_m_s, 'velocity_m_s');
  assertFinite(kTotal, 'kTotal');
  if (kTotal < 0) throw new Error('kTotal must be >= 0');
  const rho = airDensityKgPerM3({ temperatureC, pressurePa });
  return kTotal * (rho * velocity_m_s ** 2 / 2);
}

export function calcDuctFrictionLoss(opts: {
  airflowCfm: number;
  lengthFt: number;
  shape: 'round' | 'rect';
  diameterIn?: number;
  widthIn?: number;
  heightIn?: number;
}): { dpInWg: number; velocity_m_s: number; Dh_m: number; frictionFactor: number } {
  const { airflowCfm, lengthFt, shape, diameterIn, widthIn, heightIn } = opts;

  const mappedShape: DuctShape = shape === 'rect' ? 'rectangular' : 'round';
  const out = ductFrictionLoss({
    cfm: airflowCfm,
    lengthFt,
    shape: mappedShape,
    diameterIn,
    widthIn,
    heightIn,
  });

  return {
    dpInWg: out.deltaPInWg,
    velocity_m_s: out.velocityMPerS,
    Dh_m: hydraulicDiameterM(mappedShape, { diameterIn, widthIn, heightIn }),
    frictionFactor: out.frictionFactor,
  };
}

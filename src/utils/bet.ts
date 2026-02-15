import { parseNumber, requirePositive, round } from './cleanroom';

export const PA_PER_IN_WC = 249.0889; // 1 in. w.c. ≈ 249.0889 Pa

export function paToInWc(pa: number): number {
  return pa / PA_PER_IN_WC;
}

export function inWcToPa(inWc: number): number {
  return inWc * PA_PER_IN_WC;
}

export type PressureUnit = 'Pa' | 'in_w_c';

export function pressureToPa(value: number, unit: PressureUnit): number {
  return unit === 'Pa' ? value : inWcToPa(value);
}

export function pressureFromPa(pa: number, unit: PressureUnit): number {
  return unit === 'Pa' ? pa : paToInWc(pa);
}

/**
 * Power-law pressure/flow relationship used for blower-door / enclosure leakage work:
 *   Q2 = Q1 * (P2 / P1)^n
 */
export function calcFlowAtPressure(q1: number, p1Pa: number, p2Pa: number, n: number): number {
  if (![q1, p1Pa, p2Pa, n].every(Number.isFinite)) return NaN;
  if (p1Pa <= 0 || p2Pa <= 0) return NaN;
  return q1 * Math.pow(p2Pa / p1Pa, n);
}

export function calcAchFromCfm(volumeFt3: number, cfm: number): number {
  if (!Number.isFinite(volumeFt3) || !Number.isFinite(cfm)) return NaN;
  if (volumeFt3 <= 0) return NaN;
  if (cfm < 0) return NaN;
  return (cfm * 60) / volumeFt3;
}

export function calcCfmPerFt2(cfm: number, areaFt2: number): number {
  if (!Number.isFinite(cfm) || !Number.isFinite(areaFt2)) return NaN;
  if (areaFt2 <= 0) return NaN;
  return cfm / areaFt2;
}

export function validateFlowExponent(n: number): { ok: true } | { ok: false; error: string } {
  if (!Number.isFinite(n)) return { ok: false, error: 'Flow exponent (n) must be a valid number' };
  if (n <= 0 || n >= 1) {
    return { ok: false, error: 'Flow exponent (n) is typically between 0 and 1 (e.g., 0.50–0.70)' };
  }
  return { ok: true };
}

export function formatPressurePair(pa: number): { pa: string; inWc: string } {
  return {
    pa: `${round(pa, 2)} Pa`,
    inWc: `${round(paToInWc(pa), 3)} in. w.c.`,
  };
}

export { parseNumber, requirePositive, round };

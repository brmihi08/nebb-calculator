export type ParseResult = { value: number } | { error: string };

export function parseNumber(input: string, label = 'Value'): ParseResult {
  const trimmed = (input ?? '').trim();
  if (!trimmed) return { error: `${label} is required` };

  // allow user-entered thousands separators
  const normalized = trimmed.replace(/,/g, '');
  const value = Number(normalized);
  if (!Number.isFinite(value)) return { error: `${label} must be a valid number` };
  return { value };
}

export function requireNonNegative(value: number, label: string): ParseResult {
  if (value < 0) return { error: `${label} cannot be negative` };
  return { value };
}

export function requirePositive(value: number, label: string): ParseResult {
  if (value <= 0) return { error: `${label} must be greater than zero` };
  return { value };
}

export function round(value: number, decimals = 2): number {
  const p = Math.pow(10, decimals);
  return Math.round((value + Number.EPSILON) * p) / p;
}

export function ft2ToM2(ft2: number): number {
  return ft2 * 0.09290304;
}

export function m2ToFt2(m2: number): number {
  return m2 / 0.09290304;
}

export function ft3ToM3(ft3: number): number {
  return ft3 * 0.028316846592;
}

export function m3ToFt3(m3: number): number {
  return m3 / 0.028316846592;
}

export function calcCfmFromAch(volumeFt3: number, ach: number): number {
  // CFM = (V * ACH) / 60
  if (!Number.isFinite(volumeFt3) || !Number.isFinite(ach)) return NaN;
  if (volumeFt3 <= 0) return NaN;
  if (ach < 0) return NaN;
  return (volumeFt3 * ach) / 60;
}

export function calcAchFromCfm(volumeFt3: number, cfm: number): number {
  // ACH = (CFM * 60) / V
  if (!Number.isFinite(volumeFt3) || !Number.isFinite(cfm)) return NaN;
  if (volumeFt3 <= 0) return NaN;
  if (cfm < 0) return NaN;
  return (cfm * 60) / volumeFt3;
}

export function calcRoomVolumeFt3(lengthFt: number, widthFt: number, heightFt: number): number {
  return lengthFt * widthFt * heightFt;
}

export function calcRoomAreaFt2(lengthFt: number, widthFt: number): number {
  return lengthFt * widthFt;
}

export function calcSamplingLocationsIso14644_1(areaM2: number): number {
  /**
   * Sampling locations for cleanroom classification testing.
   *
   * Important:
   * - ISO 14644-1:2015 determines the number of sampling locations using a table
   *   (Annex A, Table A.1), not the older NL = ceil(sqrt(A)) relationship.
   * - This function implements the legacy "sqrt(area)" estimate that appears in
   *   older guidance and is still commonly used for preliminary planning.
   *
   * For certification/contractual compliance, use the project test plan and
   * ISO 14644-1:2015 Annex A table values.
   */
  if (areaM2 <= 0) return 0;
  return Math.max(1, Math.ceil(Math.sqrt(areaM2)));
}

export function paToInWg(pa: number): number {
  // 1 in.w.g ≈ 249.0889 Pa at 4°C
  return pa / 249.0889;
}

export function inWgToPa(inWg: number): number {
  return inWg * 249.0889;
}

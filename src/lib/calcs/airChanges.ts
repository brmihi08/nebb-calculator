// Air changes per hour (ACH) relationships
// Volume in ft^3, airflow in CFM

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

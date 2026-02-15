// Pitot tube / velocity pressure relationships
// Pv in inches of water gauge (in. w.g.)
// Density in lb/ft^3
//
// For standard air density (0.075 lb/ft^3):
//   V (FPM) = 4005 * sqrt(Pv)
// For non-standard density:
//   V (FPM) = 4005 * sqrt(Pv * (0.075 / rho))
//           = 4005 * sqrt(Pv * standardDensity / rho)

export const STANDARD_AIR_DENSITY_LB_FT3 = 0.075;

export function calcVelocityFpmFromVelocityPressure(
  velocityPressureInWg: number,
  densityLbFt3: number = STANDARD_AIR_DENSITY_LB_FT3,
): number {
  if (!Number.isFinite(velocityPressureInWg) || !Number.isFinite(densityLbFt3)) return NaN;
  if (velocityPressureInWg < 0) return NaN;
  if (densityLbFt3 <= 0) return NaN;

  return 4005 * Math.sqrt((velocityPressureInWg * STANDARD_AIR_DENSITY_LB_FT3) / densityLbFt3);
}

export function calcVelocityPressureInWgFromVelocity(
  velocityFpm: number,
  densityLbFt3: number = STANDARD_AIR_DENSITY_LB_FT3,
): number {
  if (!Number.isFinite(velocityFpm) || !Number.isFinite(densityLbFt3)) return NaN;
  if (velocityFpm < 0) return NaN;
  if (densityLbFt3 <= 0) return NaN;

  // Pv = (V/4005)^2 * (rho/0.075)
  return Math.pow(velocityFpm / 4005, 2) * (densityLbFt3 / STANDARD_AIR_DENSITY_LB_FT3);
}

export function calcAirDensityLbFt3FromVelocityAndPressure(
  velocityFpm: number,
  velocityPressureInWg: number,
): number {
  if (!Number.isFinite(velocityFpm) || !Number.isFinite(velocityPressureInWg)) return NaN;
  if (velocityFpm <= 0) return NaN;
  if (velocityPressureInWg < 0) return NaN;

  // Rearranged from Pv = (V/4005)^2 * (rho/0.075)
  // rho = 0.075 * Pv / (V/4005)^2
  const ratio = Math.pow(velocityFpm / 4005, 2);
  if (ratio === 0) return NaN;
  return STANDARD_AIR_DENSITY_LB_FT3 * (velocityPressureInWg / ratio);
}

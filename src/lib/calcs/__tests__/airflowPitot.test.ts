import {
  calcAirDensityLbFt3FromVelocityAndPressure,
  calcVelocityFpmFromVelocityPressure,
  calcVelocityPressureInWgFromVelocity,
  STANDARD_AIR_DENSITY_LB_FT3,
} from '../airflowPitot';

describe('pitot / velocity pressure relationships', () => {
  test('standard density: V = 4005*sqrt(Pv)', () => {
    const vp = 0.01;
    const v = calcVelocityFpmFromVelocityPressure(vp, STANDARD_AIR_DENSITY_LB_FT3);
    expect(v).toBeCloseTo(400.5, 6);

    const vpBack = calcVelocityPressureInWgFromVelocity(v, STANDARD_AIR_DENSITY_LB_FT3);
    expect(vpBack).toBeCloseTo(vp, 10);
  });

  test('non-standard density scales with sqrt(0.075/rho)', () => {
    const vp = 0.01;
    const rho = 0.06;
    const v = calcVelocityFpmFromVelocityPressure(vp, rho);
    // 4005*sqrt(0.01*0.075/0.06) = 4005*sqrt(0.0125)
    expect(v).toBeCloseTo(447.7726, 4);

    const rhoBack = calcAirDensityLbFt3FromVelocityAndPressure(v, vp);
    expect(rhoBack).toBeCloseTo(rho, 6);
  });

  test('invalid inputs -> NaN', () => {
    expect(Number.isNaN(calcVelocityFpmFromVelocityPressure(-0.01, 0.075))).toBe(true);
    expect(Number.isNaN(calcVelocityFpmFromVelocityPressure(0.01, 0))).toBe(true);
    expect(Number.isNaN(calcVelocityPressureInWgFromVelocity(-10, 0.075))).toBe(true);
    expect(Number.isNaN(calcAirDensityLbFt3FromVelocityAndPressure(0, 0.01))).toBe(true);
  });
});

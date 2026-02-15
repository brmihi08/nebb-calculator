import {
  dewPointFromDryBulbRh,
  humidityRatioFromRh,
  enthalpyBtuPerLbDryAir,
  mixedAirFromStreams,
  fToC,
} from '../psychrometrics';

describe('psychrometrics (ASHRAE)', () => {
  test('dew point at 75°F, 50% RH is ~55°F', () => {
    const { dewPoint } = dewPointFromDryBulbRh(75, 50, 'F');
    expect(dewPoint).toBeGreaterThan(54);
    expect(dewPoint).toBeLessThan(56);
  });

  test('humidity ratio and enthalpy sanity check at 75°F, 50% RH', () => {
    const w = humidityRatioFromRh(fToC(75), 50);
    expect(w).toBeGreaterThan(0.008);
    expect(w).toBeLessThan(0.011);

    const h = enthalpyBtuPerLbDryAir(75, w);
    expect(h).toBeGreaterThan(27);
    expect(h).toBeLessThan(29.5);
  });

  test('mixed air values are bounded (equal CFM)', () => {
    const out = mixedAirFromStreams(
      { cfm: 1000, tDryBulbF: 70, rhPercent: 50 },
      { cfm: 1000, tDryBulbF: 90, rhPercent: 30 },
    );

    expect(out.tDryBulbF).toBeGreaterThan(70);
    expect(out.tDryBulbF).toBeLessThan(90);
    expect(out.rhPercent).toBeGreaterThan(0);
    expect(out.rhPercent).toBeLessThan(100);
  });
});

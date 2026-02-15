import { ft2ToM2, m2ToFt2, ft3ToM3, m3ToFt3, paToInWg, inWgToPa } from '../conversions';

describe('conversions', () => {
  test('ft² <-> m²', () => {
    expect(ft2ToM2(10)).toBeCloseTo(0.9290304, 10);
    expect(m2ToFt2(ft2ToM2(10))).toBeCloseTo(10, 10);
  });

  test('ft³ <-> m³', () => {
    // 1 m³ ≈ 35.3147 ft³
    expect(ft3ToM3(35.3147)).toBeCloseTo(1, 4);
    expect(m3ToFt3(1)).toBeCloseTo(35.3147, 3);
  });

  test('Pa <-> in.w.g', () => {
    expect(paToInWg(249.0889)).toBeCloseTo(1, 10);
    expect(inWgToPa(1)).toBeCloseTo(249.0889, 10);
  });
});

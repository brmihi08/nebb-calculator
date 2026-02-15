import { calcPowerLawRegression } from '../regression';

describe('calcPowerLawRegression', () => {
  test('recovers C and n from perfect power-law data', () => {
    const C = 100;
    const n = 0.65;
    const pressures = [10, 20, 30, 40, 50];

    const points = pressures.map((p) => ({ pressure: p, flow: C * Math.pow(p, n) }));

    const result = calcPowerLawRegression(points);
    expect(result).not.toBeNull();
    expect(result!.count).toBe(points.length);
    expect(result!.C).toBeCloseTo(C, 10);
    expect(result!.n).toBeCloseTo(n, 10);
    expect(result!.r2).toBeCloseTo(1, 12);
  });

  test('returns null when fewer than 2 usable points', () => {
    expect(calcPowerLawRegression([{ pressure: 10, flow: 100 }])).toBeNull();
    expect(calcPowerLawRegression([{ pressure: -10, flow: 100 }, { pressure: 20, flow: -5 }])).toBeNull();
  });
});

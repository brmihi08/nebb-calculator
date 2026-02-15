import { fanLawFlow, fanLawPressure, fanLawPower } from '../fanAffinity';

describe('fanAffinity', () => {
  test('reduces to classic speed-only laws when diameters omitted', () => {
    expect(fanLawFlow(1000, 1000, 1200)).toBeCloseTo(1200, 6);
    expect(fanLawPressure(1, 1000, 1200)).toBeCloseTo(1 * Math.pow(1.2, 2), 6);
    expect(fanLawPower(10, 1000, 1200)).toBeCloseTo(10 * Math.pow(1.2, 3), 6);
  });

  test('includes diameter ratio when provided', () => {
    // Q ∝ N*D^3
    expect(fanLawFlow(1000, 1000, 1000, 10, 12)).toBeCloseTo(1000 * Math.pow(1.2, 3), 6);
    // SP ∝ N^2*D^2
    expect(fanLawPressure(1, 1000, 1000, 10, 12)).toBeCloseTo(1 * Math.pow(1.2, 2), 6);
    // HP ∝ N^3*D^5
    expect(fanLawPower(10, 1000, 1000, 10, 12)).toBeCloseTo(10 * Math.pow(1.2, 5), 6);
  });
});

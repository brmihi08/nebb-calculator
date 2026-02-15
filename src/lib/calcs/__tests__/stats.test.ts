import { calcAverage } from '../stats';

describe('calcAverage', () => {
  test('returns null for empty input', () => {
    expect(calcAverage([])).toBeNull();
  });

  test('averages values', () => {
    expect(calcAverage([80, 100, 120])).toBe(100);
  });
});

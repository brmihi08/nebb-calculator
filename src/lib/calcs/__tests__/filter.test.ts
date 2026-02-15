import { applyLoadingMultiplier, filterDeltaPAtFlowSquareLaw } from '../filter';

describe('filter', () => {
  test('square-law flow scaling', () => {
    expect(filterDeltaPAtFlowSquareLaw({ deltaP1: 0.5, flow1: 1000, flow2: 2000 })).toBeCloseTo(2.0, 8);
  });

  test('loading multiplier', () => {
    expect(applyLoadingMultiplier(0.6, 1.5)).toBeCloseTo(0.9, 10);
  });
});

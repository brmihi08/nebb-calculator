import { ductFittingLossFromCAndVpInWg } from '../duct';

describe('duct fitting loss (C × VP)', () => {
  test('computes loss in in. w.g.', () => {
    expect(ductFittingLossFromCAndVpInWg(2.5, 0.08)).toBeCloseTo(0.2, 12);
  });
});

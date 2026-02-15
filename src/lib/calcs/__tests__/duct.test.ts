import { ductFrictionLoss, fittingLossFromK, equivalentLengthFromK, kFromEquivalentLength } from '../duct';

describe('duct (Darcy–Weisbach)', () => {
  test('friction loss scales ~linearly with length', () => {
    const base = ductFrictionLoss({ cfm: 1000, lengthFt: 50, shape: 'round', diameterIn: 12 });
    const dbl = ductFrictionLoss({ cfm: 1000, lengthFt: 100, shape: 'round', diameterIn: 12 });
    expect(dbl.deltaPPa / base.deltaPPa).toBeCloseTo(2, 1);
  });

  test('fitting loss from K is non-negative', () => {
    const out = fittingLossFromK({ cfm: 1000, k: 1.5, shape: 'round', diameterIn: 12 });
    expect(out.deltaPPa).toBeGreaterThan(0);
    expect(out.deltaPInWg).toBeGreaterThan(0);
  });

  test('equivalent length conversions are reversible', () => {
    const f = 0.02;
    const { equivalentLengthFt } = equivalentLengthFromK({ k: 1.2, shape: 'round', diameterIn: 12, frictionFactor: f });
    const { k } = kFromEquivalentLength({ equivalentLengthFt, shape: 'round', diameterIn: 12, frictionFactor: f });
    expect(k).toBeCloseTo(1.2, 8);
  });
});

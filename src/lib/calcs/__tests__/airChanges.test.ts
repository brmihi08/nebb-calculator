import { calcAchFromCfm, calcCfmFromAch } from '../airChanges';

describe('air changes', () => {
  test('CFM <-> ACH round trip', () => {
    const volume = 6000;
    const ach = 10;
    const cfm = calcCfmFromAch(volume, ach);
    expect(cfm).toBeCloseTo(1000, 12);

    const achBack = calcAchFromCfm(volume, cfm);
    expect(achBack).toBeCloseTo(ach, 12);
  });
});

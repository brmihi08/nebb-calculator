export type PressureFlowPoint = { pressure: number; flow: number };

export type PowerLawRegressionResult = {
  // Q = C * (ΔP)^n
  C: number;
  n: number;
  r2: number;
  count: number;
};

/**
 * Fits a power-law model Q = C * (ΔP)^n by linear regression in natural log space:
 *   ln(Q) = ln(C) + n*ln(ΔP)
 */
export function calcPowerLawRegression(points: PressureFlowPoint[]): PowerLawRegressionResult | null {
  const usable = points.filter(
    (p) => Number.isFinite(p.pressure) && Number.isFinite(p.flow) && p.pressure > 0 && p.flow > 0,
  );
  if (usable.length < 2) return null;

  const xs = usable.map((p) => Math.log(p.pressure));
  const ys = usable.map((p) => Math.log(p.flow));

  const nPts = xs.length;
  const xBar = xs.reduce((a, b) => a + b, 0) / nPts;
  const yBar = ys.reduce((a, b) => a + b, 0) / nPts;

  let ssXX = 0;
  let ssXY = 0;
  let ssYY = 0;

  for (let i = 0; i < nPts; i++) {
    const dx = xs[i] - xBar;
    const dy = ys[i] - yBar;
    ssXX += dx * dx;
    ssXY += dx * dy;
    ssYY += dy * dy;
  }

  if (ssXX === 0) return null;

  const slope = ssXY / ssXX; // exponent n
  const intercept = yBar - slope * xBar; // ln(C)

  const ssRes = ys.reduce((sum, y, i) => {
    const yHat = intercept + slope * xs[i];
    const err = y - yHat;
    return sum + err * err;
  }, 0);

  const r2 = ssYY === 0 ? 1 : 1 - ssRes / ssYY;

  return {
    n: slope,
    C: Math.exp(intercept),
    r2,
    count: usable.length,
  };
}

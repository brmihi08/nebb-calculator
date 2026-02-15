// Simple filter pressure drop relationships used in HVAC field calculations.
// Notes:
// - Many filters approximately follow a square-law relationship with airflow.
// - Loading over time is highly dependent on media and dust; this module provides a simple multiplier model.

function assertFinite(x: number, name: string): void {
  if (!Number.isFinite(x)) throw new Error(`${name} must be a finite number`);
}

export function filterDeltaPAtFlowSquareLaw(opts: {
  deltaP1: number;
  flow1: number;
  flow2: number;
}): number {
  const { deltaP1, flow1, flow2 } = opts;
  assertFinite(deltaP1, 'deltaP1');
  assertFinite(flow1, 'flow1');
  assertFinite(flow2, 'flow2');
  if (deltaP1 < 0) throw new Error('deltaP1 must be >= 0');
  if (flow1 <= 0) throw new Error('flow1 must be > 0');
  if (flow2 < 0) throw new Error('flow2 must be >= 0');

  return deltaP1 * Math.pow(flow2 / flow1, 2);
}

export function applyLoadingMultiplier(deltaPClean: number, loadingMultiplier: number): number {
  assertFinite(deltaPClean, 'deltaPClean');
  assertFinite(loadingMultiplier, 'loadingMultiplier');
  if (deltaPClean < 0) throw new Error('deltaPClean must be >= 0');
  if (loadingMultiplier < 1) throw new Error('loadingMultiplier must be >= 1');
  return deltaPClean * loadingMultiplier;
}

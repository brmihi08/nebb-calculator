// Fan affinity laws (NEBB fundamental relationships)
// These are dimensional relationships for geometrically similar fans.
//
// Basic proportionalities:
//   Q ∝ N·D^3
//   SP ∝ ρ·N^2·D^2  (for same density, SP ∝ N^2·D^2)
//   HP ∝ ρ·N^3·D^5 (for same density, HP ∝ N^3·D^5)
//
// For typical TAB field work, density is often assumed constant; NEBB chart lists
// the classic forms using ratios.

function assertFinite(x: number, name: string): void {
  if (!Number.isFinite(x)) throw new Error(`${name} must be a finite number`);
}

export function fanLawFlow(
  q1: number,
  n1: number,
  n2: number,
  d1?: number,
  d2?: number,
): number {
  // Q2 = Q1*(N2/N1)*(D2/D1)^3
  [q1, n1, n2].forEach((v, i) => assertFinite(v, `arg${i}`));
  if (q1 < 0) throw new Error('q1 must be >= 0');
  if (n1 <= 0 || n2 <= 0) throw new Error('Speeds must be > 0');

  const speedRatio = n2 / n1;
  const diaRatio = d1 != null && d2 != null ? (() => {
    assertFinite(d1, 'd1');
    assertFinite(d2, 'd2');
    if (d1 <= 0 || d2 <= 0) throw new Error('Diameters must be > 0');
    return d2 / d1;
  })() : 1;

  return q1 * speedRatio * Math.pow(diaRatio, 3);
}

export function fanLawPressure(
  p1: number,
  n1: number,
  n2: number,
  d1?: number,
  d2?: number,
): number {
  // P2 = P1*(N2/N1)^2*(D2/D1)^2
  [p1, n1, n2].forEach((v, i) => assertFinite(v, `arg${i}`));
  if (n1 <= 0 || n2 <= 0) throw new Error('Speeds must be > 0');

  const speedRatio = n2 / n1;
  const diaRatio = d1 != null && d2 != null ? (() => {
    assertFinite(d1, 'd1');
    assertFinite(d2, 'd2');
    if (d1 <= 0 || d2 <= 0) throw new Error('Diameters must be > 0');
    return d2 / d1;
  })() : 1;

  return p1 * Math.pow(speedRatio, 2) * Math.pow(diaRatio, 2);
}

export function fanLawPower(
  hp1: number,
  n1: number,
  n2: number,
  d1?: number,
  d2?: number,
): number {
  // HP2 = HP1*(N2/N1)^3*(D2/D1)^5
  [hp1, n1, n2].forEach((v, i) => assertFinite(v, `arg${i}`));
  if (hp1 < 0) throw new Error('hp1 must be >= 0');
  if (n1 <= 0 || n2 <= 0) throw new Error('Speeds must be > 0');

  const speedRatio = n2 / n1;
  const diaRatio = d1 != null && d2 != null ? (() => {
    assertFinite(d1, 'd1');
    assertFinite(d2, 'd2');
    if (d1 <= 0 || d2 <= 0) throw new Error('Diameters must be > 0');
    return d2 / d1;
  })() : 1;

  return hp1 * Math.pow(speedRatio, 3) * Math.pow(diaRatio, 5);
}

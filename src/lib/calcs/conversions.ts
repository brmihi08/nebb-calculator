export function ft2ToM2(ft2: number): number {
  return ft2 * 0.09290304;
}

export function m2ToFt2(m2: number): number {
  return m2 / 0.09290304;
}

export function ft3ToM3(ft3: number): number {
  return ft3 * 0.028316846592;
}

export function m3ToFt3(m3: number): number {
  return m3 / 0.028316846592;
}

export function paToInWg(pa: number): number {
  // 1 in.w.g ≈ 249.0889 Pa at 4°C
  return pa / 249.0889;
}

export function inWgToPa(inWg: number): number {
  return inWg * 249.0889;
}

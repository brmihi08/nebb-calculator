export type SanitizeNumberOptions = {
  allowNegative?: boolean;
  maxDecimals?: number;
};

/**
 * Sanitizes a user-entered numeric string for calculators.
 * - Allows a single leading '-' (optional)
 * - Allows a single '.'
 * - Strips other characters (commas, units, spaces)
 * - Optionally clamps decimals
 */
export function sanitizeNumberInput(raw: string, opts: SanitizeNumberOptions = {}): string {
  const allowNegative = !!opts.allowNegative;
  const maxDecimals = opts.maxDecimals;

  let s = raw
    .replace(/,/g, '.') // users often type 1,5 on some keyboards
    .replace(/\s+/g, '')
    .replace(/[^0-9.\-]/g, '');

  // Keep only first '-' and only at start
  if (!allowNegative) {
    s = s.replace(/-/g, '');
  } else {
    s = s.replace(/(?!^)-/g, '');
  }

  // Keep only first '.'
  const firstDot = s.indexOf('.');
  if (firstDot !== -1) {
    s = s.slice(0, firstDot + 1) + s.slice(firstDot + 1).replace(/\./g, '');
  }

  if (typeof maxDecimals === 'number' && maxDecimals >= 0 && firstDot !== -1) {
    const [intPart, decPart = ''] = s.split('.');
    s = `${intPart}.${decPart.slice(0, maxDecimals)}`;
  }

  return s;
}

export function toNumberOrNull(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

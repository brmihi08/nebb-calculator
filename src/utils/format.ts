export type FormatNumberOptions = {
  /** Fixed decimals; if omitted uses up to maxDecimals with trimming. */
  decimals?: number;
  /** Maximum decimals when trimming. Default 3. */
  maxDecimals?: number;
  /** If true, uses locale formatting with grouping on web/native. */
  useGrouping?: boolean;
};

export function formatNumber(value: number, opts: FormatNumberOptions = {}): string {
  if (!Number.isFinite(value)) return '';
  const maxDecimals = opts.maxDecimals ?? 3;

  if (typeof opts.decimals === 'number') {
    const fixed = value.toFixed(opts.decimals);
    return opts.useGrouping
      ? new Intl.NumberFormat(undefined, {
          minimumFractionDigits: opts.decimals,
          maximumFractionDigits: opts.decimals,
          useGrouping: true,
        }).format(Number(fixed))
      : fixed;
  }

  // Trim trailing zeros while keeping reasonable precision
  const s = value.toFixed(maxDecimals);
  const trimmed = s.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');

  if (opts.useGrouping) {
    const n = Number(trimmed);
    const decimals = trimmed.includes('.') ? trimmed.split('.')[1].length : 0;
    return new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: Math.max(0, decimals),
      useGrouping: true,
    }).format(n);
  }

  return trimmed;
}

export function formatWithUnit(value: number, unit?: string, opts?: FormatNumberOptions): string {
  const v = formatNumber(value, opts);
  return unit ? `${v} ${unit}` : v;
}

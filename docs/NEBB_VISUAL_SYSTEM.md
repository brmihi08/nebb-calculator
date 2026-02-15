# NEBB Visual System (TAB)

This app’s TAB screens share a consistent “liquid card” layout:

- **Soft green background** on the screen (`#f0f8f0`)
- A **raised header surface** with large title + subtitle
- One or more **white translucent cards** with rounded corners
- **Accent-tinted blocks** for formulas and results (tinted background + border)
- Primary/secondary buttons using the section’s **accent color**

This doc captures the reusable building blocks extracted to `src/components/nebb`.

---

## Design tokens (current)

### Base
- Screen background: `#f0f8f0`
- Card background: `rgba(255, 255, 255, 0.95)`
- Input background: `rgba(255, 255, 255, 0.8)`
- Text: `#000000` (secondary via `opacity: 0.8`)

### Accents by TAB category
- Air: `#22c55e` (green)
- Hydronic: `#3b82f6` (blue)
- Electrical: `#f59e0b` (amber)

### Accent blocks
For formula/result containers:
- Background: `rgba(accent, 0.1)`
- Border: `rgba(accent, 0.2)`

Implementation helper: `rgbaFromHex()` in `src/components/nebb/colors.ts`.

---

## Layout patterns

### 1) Screen shell
Use `CalcScreen` to apply:
- `ScrollView` with padding
- Standard header container (Surface + title/subtitle)

```tsx
<CalcScreen title="Duct Area" subtitle="Calculate duct cross-sectional area…">
  ...
</CalcScreen>
```

### 2) Section spacing
Use `CalcSection` for consistent spacing between top-level blocks:

```tsx
<CalcSection>
  <CalcCard>...</CalcCard>
</CalcSection>
```

### 3) Liquid card
Use `CalcCard` for the standard TAB card look (both calculators *and* category/list screens):
- Rounded radius 20
- Light elevation/shadow
- `cardContent` padding 20

```tsx
<CalcCard>
  {/* card content */}
</CalcCard>
```

### 4) Formula block
Use `FormulaBlock` for the tinted formula container.

```tsx
<FormulaBlock accentColor={ACCENT} title="Formulas" description="Where: …">
  <Text style={formulaTextStyles.formulaText}>Single Phase:</Text>
  <Text style={formulaTextStyles.formulaSubText}>P = V × I × PF</Text>
</FormulaBlock>
```

### 5) Result block
Use `ResultBlock` for the tinted results container.

```tsx
<ResultBlock accentColor={ACCENT} label="Current Values:">
  <Text style={resultTextStyles.value}>Area: 12.3 ft²</Text>
</ResultBlock>
```

---

## Component inventory

Located in: `src/components/nebb/`

- `CalcScreen` / `CalcHeader`
- `CalcSection`
- `CalcCard`
- `FormulaBlock` (+ `formulaTextStyles`)
- `ResultBlock` (+ `resultTextStyles`)
- `colors.ts` (`rgbaFromHex`, `hexToRgb`)

---

## Refactor guidance (no visual change)

When updating an existing TAB screen:

1. Replace the outer `ScrollView` + duplicated header markup with `CalcScreen`.
2. Replace the white `Surface` “liquidCard” wrapper + padded content with `CalcCard`.
3. Replace formula + results containers with `FormulaBlock` / `ResultBlock`.
4. Keep screen-specific layout styles (input rows, toggles, selectors) local.
5. Keep button styles but source the accent color from a local `ACCENT` constant.

---

## Notes / future cleanup

- Many screens still hardcode accent colors and button styling. A future step is a `useCalcAccent()` helper or an `AccentButtonRow` component.
- `src/theme/NEBBTheme.ts` contains related values; long-term we can consolidate the theme + component styles so there’s a single source of truth.

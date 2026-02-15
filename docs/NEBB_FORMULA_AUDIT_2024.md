# NEBB Calc — Formula Audit vs NEBB Fundamental Formula Chart (Final 2024-10-25)

Source chart PDF (downloaded 2026-02-11):
- https://www.nebb.org/wp-content/uploads/2025/03/NEBB-Fundamental-Formula-Chart-Final-2024-10-25.pdf

This audit focuses on the app’s implemented calculators (code in `src/lib/calcs/*` and relevant screens) and checks them against the NEBB chart’s fundamental relationships.

## Verified formulas (no changes required)

### Pitot / Velocity Pressure (I-P)
File: `src/lib/calcs/airflowPitot.ts`
- **V (FPM) = 4005 × √(VP × 0.075 / ρ)**
- **VP (in. w.c.) = (V/4005)² × (ρ/0.075)**

These match the NEBB chart’s velocity-pressure relationship and the standard/non‑standard density form.

### Air Changes
File: `src/lib/calcs/airChanges.ts`
- ACH = (CFM × 60) / Volume(ft³)

### Psychrometrics (ASHRAE relationships)
File: `src/lib/calcs/psychrometrics.ts`
- Humidity ratio from vapor pressure: **W = 0.621945×Pv/(P−Pv)**
- Enthalpy (I‑P): **h = 0.240Tdb + W(1061 + 0.444Tdb)**
- Mixed air by mass/flow balance (TAB approximation) implemented.

### Heat transfer screens (standard air)
Files:
- `src/screens/tab/calculations/HeatTransferTotalHeatTransferScreen.tsx`
- `src/screens/tab/calculations/HeatTransferSensibleHeatTransferScreen.tsx`

- **Qtotal = 4.5 × CFM × Δh**
- **Qsensible = 1.08 × CFM × ΔT**

These match the chart’s “standard air” relationships.

## Discrepancies found and fixed

### Pressure screen: VP↔Velocity conversion
File: `src/screens/PressureScreen.tsx`

**Problem:** The app previously used `V = √(2×VP×g/ρ)` directly with VP entered in **in. w.c.** and velocity labeled **ft/min**, which is not the NEBB chart relationship and mixes units.

**Fix:** Updated to use the NEBB Pitot relationships from `src/lib/calcs/airflowPitot.ts`.
- Velocity now calculated with **4005** constant and proper density correction.
- Reverse calculation updated accordingly.

### Temperature screen: dew point & enthalpy
File: `src/screens/TemperatureScreen.tsx`

**Problem:** Dew point and enthalpy were computed using simplified “rules of thumb” (not NEBB/ASHRAE psychrometrics).

**Fix:** Updated to use psychrometric relationships from `src/lib/calcs/psychrometrics.ts`:
- Dew point computed by inverting saturation vapor pressure (numerical bisection).
- Enthalpy computed using humidity ratio derived from Tdb & RH.

## Missing formulas from the NEBB chart that were added

### Duct fitting loss (C × VP)
File: `src/lib/calcs/duct.ts`
- Added `ductFittingLossFromCAndVpInWg(C, VP)` implementing:
  - **Duct Fitting Loss = C × VP**

### Fan affinity laws including diameter
File: `src/lib/calcs/fanAffinity.ts` (new)
- Added functions implementing the generalized similarity relationships:
  - **Q2 = Q1 (N2/N1) (D2/D1)^3**
  - **P2 = P1 (N2/N1)^2 (D2/D1)^2**
  - **HP2 = HP1 (N2/N1)^3 (D2/D1)^5**

The existing UI screen (`TABFanAffinityScreen.tsx`) already covered the speed-only special case; this adds the diameter-inclusive form listed on the NEBB chart.

## Build/quality

- TypeScript: `npx tsc --noEmit` passes.
- Jest: all calculator tests pass; added tests:
  - `fanAffinity.test.ts`
  - `ductFittingLoss.test.ts`

## Notes / Remaining gaps

- The NEBB chart includes many additional reference equations (electrical, hydronic, belts/sheaves, etc.) that may not have dedicated calculators in this app yet. This audit addressed the categories requested: pitot/velocity, airflow, pressure, fan laws, psychrometrics, duct fitting loss, and heat transfer.

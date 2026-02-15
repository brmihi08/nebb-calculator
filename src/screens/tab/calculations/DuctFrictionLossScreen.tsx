import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Snackbar, Text } from 'react-native-paper';

import {
  CalcCard,
  CalcScreen,
  CopyableValueRow,
  FormulaBlock,
  NumericField,
  ResultBlock,
  formulaTextStyles,
} from '../../../components/nebb';
import { ductFrictionLoss, DuctShape } from '../../../lib/calcs/duct';
import { formatNumber, formatWithUnit } from '../../../utils/format';

const ACCENT = '#22c55e';

type ShapeUi = 'round' | 'rectangular';

export default function DuctFrictionLossScreen() {
  const [shape, setShape] = useState<ShapeUi>('round');

  const [cfm, setCfm] = useState('');
  const [lengthFt, setLengthFt] = useState('100');

  const [diameterIn, setDiameterIn] = useState('');
  const [widthIn, setWidthIn] = useState('');
  const [heightIn, setHeightIn] = useState('');

  const [roughnessMm, setRoughnessMm] = useState('0.09');
  const [temperatureC, setTemperatureC] = useState('20');

  const [results, setResults] = useState<null | {
    deltaPInWg: number;
    deltaPPa: number;
    velocityMPerS: number;
    reynolds: number;
    frictionFactor: number;
  }>(null);

  const [snack, setSnack] = useState('');

  const formula = useMemo(() => {
    return [
      'Darcy–Weisbach:',
      'ΔP = f · (L/Dh) · (ρ·V²/2)',
      'V = Q/A',
    ].join('\n');
  }, []);

  const clearAll = () => {
    setCfm('');
    setLengthFt('100');
    setDiameterIn('');
    setWidthIn('');
    setHeightIn('');
    setRoughnessMm('0.09');
    setTemperatureC('20');
    setResults(null);
  };

  const calculate = () => {
    const q = Number(cfm);
    const l = Number(lengthFt);
    const eps = Number(roughnessMm);
    const tC = Number(temperatureC);

    if (!Number.isFinite(q) || q < 0) return Alert.alert('Error', 'Airflow (CFM) must be ≥ 0');
    if (!Number.isFinite(l) || l < 0) return Alert.alert('Error', 'Length must be ≥ 0');
    if (!Number.isFinite(eps) || eps < 0) return Alert.alert('Error', 'Roughness must be ≥ 0');
    if (!Number.isFinite(tC)) return Alert.alert('Error', 'Temperature must be a number');

    try {
      const shapeCalc: DuctShape = shape;

      const r = ductFrictionLoss({
        cfm: q,
        lengthFt: l,
        shape: shapeCalc,
        diameterIn: shapeCalc === 'round' ? Number(diameterIn) : undefined,
        widthIn: shapeCalc === 'rectangular' ? Number(widthIn) : undefined,
        heightIn: shapeCalc === 'rectangular' ? Number(heightIn) : undefined,
        roughnessMm: eps,
        temperatureC: tC,
      });

      setResults({
        deltaPInWg: r.deltaPInWg,
        deltaPPa: r.deltaPPa,
        velocityMPerS: r.velocityMPerS,
        reynolds: r.reynolds,
        frictionFactor: r.frictionFactor,
      });
    } catch {
      Alert.alert('Error', 'Unable to calculate. Check duct dimensions and inputs.');
    }
  };

  return (
    <CalcScreen
      title="Duct Friction Loss"
      subtitle="Darcy–Weisbach pressure loss for straight duct (round or rectangular)"
    >
      <CalcCard>
        <FormulaBlock
          accentColor={ACCENT}
          title="Formula"
          description="Reference: ASHRAE Fundamentals (Darcy–Weisbach; Swamee–Jain friction factor)"
        >
          {formula.split('\n').map((line) => (
            <Text key={line} style={formulaTextStyles.formulaSubText}>
              {line}
            </Text>
          ))}
        </FormulaBlock>

        <View style={styles.shapeRow}>
          <Button
            mode={shape === 'round' ? 'contained' : 'outlined'}
            onPress={() => {
              setShape('round');
              setResults(null);
            }}
            style={[styles.shapeBtn, shape === 'round' ? styles.shapeBtnActive : null]}
          >
            Round
          </Button>
          <Button
            mode={shape === 'rectangular' ? 'contained' : 'outlined'}
            onPress={() => {
              setShape('rectangular');
              setResults(null);
            }}
            style={[styles.shapeBtn, shape === 'rectangular' ? styles.shapeBtnActive : null]}
          >
            Rectangular
          </Button>
        </View>

        <View style={styles.row}>
          <NumericField label="Airflow" value={cfm} onChangeText={setCfm} rightText="CFM" maxDecimals={2} onSubmitEditing={calculate} />
        </View>

        <View style={styles.row}>
          <NumericField label="Length" value={lengthFt} onChangeText={setLengthFt} rightText="ft" maxDecimals={1} onSubmitEditing={calculate} />
        </View>

        {shape === 'round' ? (
          <View style={styles.row}>
            <NumericField label="Diameter" value={diameterIn} onChangeText={setDiameterIn} rightText="in" maxDecimals={2} onSubmitEditing={calculate} />
          </View>
        ) : (
          <>
            <View style={styles.row}>
              <NumericField label="Width" value={widthIn} onChangeText={setWidthIn} rightText="in" maxDecimals={2} onSubmitEditing={calculate} />
            </View>
            <View style={styles.row}>
              <NumericField label="Height" value={heightIn} onChangeText={setHeightIn} rightText="in" maxDecimals={2} onSubmitEditing={calculate} />
            </View>
          </>
        )}

        <View style={styles.row}>
          <NumericField label="Roughness" value={roughnessMm} onChangeText={setRoughnessMm} rightText="mm" maxDecimals={3} onSubmitEditing={calculate} />
        </View>

        <View style={styles.row}>
          <NumericField label="Temperature" value={temperatureC} onChangeText={setTemperatureC} rightText="°C" maxDecimals={1} onSubmitEditing={calculate} />
        </View>

        <View style={styles.buttonRow}>
          <Button mode="contained" onPress={calculate} style={styles.calcBtn}>
            Calculate
          </Button>
          <Button mode="outlined" onPress={clearAll} style={styles.clearBtn}>
            Clear
          </Button>
        </View>

        {!!results && (
          <ResultBlock accentColor={ACCENT} label="Results">
            <CopyableValueRow
              label="ΔP"
              value={formatWithUnit(results.deltaPInWg, 'in. w.g.', { decimals: 4 })}
              onCopied={() => setSnack('Copied')}
            />
            <CopyableValueRow
              label="ΔP"
              value={formatWithUnit(results.deltaPPa, 'Pa', { decimals: 1 })}
              onCopied={() => setSnack('Copied')}
            />
            <CopyableValueRow
              label="Velocity"
              value={formatWithUnit(results.velocityMPerS, 'm/s', { decimals: 2 })}
              onCopied={() => setSnack('Copied')}
            />
            <CopyableValueRow
              label="Re"
              value={formatNumber(results.reynolds, { decimals: 0, useGrouping: true })}
              onCopied={() => setSnack('Copied')}
            />
            <CopyableValueRow
              label="f"
              value={formatNumber(results.frictionFactor, { decimals: 4 })}
              onCopied={() => setSnack('Copied')}
            />
          </ResultBlock>
        )}

        <Snackbar visible={!!snack} onDismiss={() => setSnack('')} duration={1200}>
          {snack}
        </Snackbar>
      </CalcCard>
    </CalcScreen>
  );
}

const styles = StyleSheet.create({
  row: { marginBottom: 16 },
  shapeRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  shapeBtn: { flex: 1 },
  shapeBtnActive: { backgroundColor: ACCENT },
  buttonRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  calcBtn: { flex: 1, backgroundColor: ACCENT },
  clearBtn: { flex: 1, borderColor: ACCENT },
});

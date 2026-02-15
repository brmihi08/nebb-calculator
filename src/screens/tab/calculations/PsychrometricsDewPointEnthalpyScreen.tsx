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
import {
  dewPointFromDryBulbRh,
  enthalpyBtuPerLbDryAir,
  fToC,
  humidityRatioFromRh,
} from '../../../lib/calcs/psychrometrics';
import { formatNumber, formatWithUnit } from '../../../utils/format';

const ACCENT = '#22c55e';

export default function PsychrometricsDewPointEnthalpyScreen() {
  const [tDryBulbF, setTDryBulbF] = useState('75');
  const [rhPercent, setRhPercent] = useState('50');

  const [results, setResults] = useState<null | {
    dewPointF: number;
    humidityRatio: number;
    enthalpyBtuLb: number;
  }>(null);

  const [snack, setSnack] = useState('');

  const formula = useMemo(() => {
    return [
      'W = 0.621945 · Pv / (P − Pv)',
      'h = 0.240·Tdb + W·(1061 + 0.444·Tdb)',
      'Tdp from Pv (invert saturation pressure)',
    ].join('\n');
  }, []);

  const clearAll = () => {
    setTDryBulbF('');
    setRhPercent('');
    setResults(null);
  };

  const calculate = () => {
    const tF = Number(tDryBulbF);
    const rh = Number(rhPercent);

    if (!Number.isFinite(tF)) return Alert.alert('Error', 'Dry-bulb temperature must be a number');
    if (!Number.isFinite(rh) || rh < 0 || rh > 100) return Alert.alert('Error', 'Relative humidity must be between 0 and 100');

    try {
      const w = humidityRatioFromRh(fToC(tF), rh);
      const dp = dewPointFromDryBulbRh(tF, rh, 'F');
      const h = enthalpyBtuPerLbDryAir(tF, w);

      setResults({ dewPointF: dp.dewPoint, humidityRatio: w, enthalpyBtuLb: h });
    } catch {
      Alert.alert('Error', 'Unable to calculate. Check inputs.');
    }
  };

  return (
    <CalcScreen title="Psychrometrics" subtitle="Dew point, humidity ratio, and enthalpy from dry-bulb and RH">
      <CalcCard>
        <FormulaBlock accentColor={ACCENT} title="Formulas" description="ASHRAE Fundamentals (I-P units)">
          {formula.split('\n').map((line) => (
            <Text key={line} style={formulaTextStyles.formulaSubText}>
              {line}
            </Text>
          ))}
        </FormulaBlock>

        <View style={styles.row}>
          <NumericField label="Dry-bulb" value={tDryBulbF} onChangeText={setTDryBulbF} rightText="°F" maxDecimals={1} onSubmitEditing={calculate} />
        </View>

        <View style={styles.row}>
          <NumericField label="Relative Humidity" value={rhPercent} onChangeText={setRhPercent} rightText="%" maxDecimals={1} onSubmitEditing={calculate} />
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
            <CopyableValueRow label="Dew Point" value={formatWithUnit(results.dewPointF, '°F', { decimals: 1 })} onCopied={() => setSnack('Copied')} />
            <CopyableValueRow
              label="Humidity Ratio (W)"
              value={`${formatNumber(results.humidityRatio, { decimals: 5 })} lb/lb`}
              onCopied={() => setSnack('Copied')}
            />
            <CopyableValueRow label="Enthalpy" value={formatWithUnit(results.enthalpyBtuLb, 'Btu/lb', { decimals: 1 })} onCopied={() => setSnack('Copied')} />
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
  buttonRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  calcBtn: { flex: 1, backgroundColor: ACCENT },
  clearBtn: { flex: 1, borderColor: ACCENT },
});

import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Snackbar, Text } from 'react-native-paper';
import { screenBackground } from '../../../theme/screenStyles';

import {
  CalcCard,
  CalcScreen,
  CopyableValueRow,
  FormulaBlock,
  NumericField,
  ResultBlock,
  formulaTextStyles,
} from '../../../components/nebb';
import { mixedAirFromStreams } from '../../../lib/calcs/psychrometrics';
import { formatNumber, formatWithUnit } from '../../../utils/format';

const ACCENT = '#22c55e';

export default function PsychrometricsMixedAirScreen() {
  const [cfm1, setCfm1] = useState('1000');
  const [t1, setT1] = useState('95');
  const [rh1, setRh1] = useState('40');

  const [cfm2, setCfm2] = useState('4000');
  const [t2, setT2] = useState('75');
  const [rh2, setRh2] = useState('50');

  const [results, setResults] = useState<null | {
    tDryBulbF: number;
    rhPercent: number;
    humidityRatio: number;
    enthalpyBtuLb: number;
  }>(null);

  const [snack, setSnack] = useState('');

  const formula = useMemo(() => {
    return [
      'Mass balance (approx.):',
      'Wm = (C1·W1 + C2·W2) / (C1 + C2)',
      'hm = (C1·h1 + C2·h2) / (C1 + C2)',
    ].join('\n');
  }, []);

  const clearAll = () => {
    setCfm1('');
    setT1('');
    setRh1('');
    setCfm2('');
    setT2('');
    setRh2('');
    setResults(null);
  };

  const calculate = () => {
    const C1 = Number(cfm1);
    const T1 = Number(t1);
    const RH1 = Number(rh1);
    const C2 = Number(cfm2);
    const T2 = Number(t2);
    const RH2 = Number(rh2);

    if (!Number.isFinite(C1) || C1 < 0) return Alert.alert('Error', 'Stream 1 CFM must be ≥ 0');
    if (!Number.isFinite(C2) || C2 < 0) return Alert.alert('Error', 'Stream 2 CFM must be ≥ 0');
    if (!Number.isFinite(T1) || !Number.isFinite(T2)) return Alert.alert('Error', 'Temperatures must be numbers');
    if (!Number.isFinite(RH1) || RH1 < 0 || RH1 > 100) return Alert.alert('Error', 'Stream 1 RH must be 0–100');
    if (!Number.isFinite(RH2) || RH2 < 0 || RH2 > 100) return Alert.alert('Error', 'Stream 2 RH must be 0–100');

    try {
      const r = mixedAirFromStreams(
        { cfm: C1, tDryBulbF: T1, rhPercent: RH1 },
        { cfm: C2, tDryBulbF: T2, rhPercent: RH2 },
      );
      setResults(r);
    } catch {
      Alert.alert('Error', 'Unable to calculate. Check inputs.');
    }
  };

  return (
    <CalcScreen title="Mixed Air (Psychrometrics)" subtitle="Mix two airstreams by CFM using psychrometric properties">
      <CalcCard>
        <FormulaBlock accentColor={ACCENT} title="Formulas" description="Approximate mass flow ∝ CFM (field TAB use)">
          {formula.split('\n').map((line) => (
            <Text key={line} style={formulaTextStyles.formulaSubText}>
              {line}
            </Text>
          ))}
        </FormulaBlock>

        <Text style={styles.sectionTitle}>Stream 1</Text>
        <View style={styles.row}>
          <NumericField label="Airflow" value={cfm1} onChangeText={setCfm1} rightText="CFM" maxDecimals={1} onSubmitEditing={calculate} />
        </View>
        <View style={styles.row}>
          <NumericField label="Dry-bulb" value={t1} onChangeText={setT1} rightText="°F" maxDecimals={1} onSubmitEditing={calculate} />
        </View>
        <View style={styles.row}>
          <NumericField label="RH" value={rh1} onChangeText={setRh1} rightText="%" maxDecimals={1} onSubmitEditing={calculate} />
        </View>

        <Text style={styles.sectionTitle}>Stream 2</Text>
        <View style={styles.row}>
          <NumericField label="Airflow" value={cfm2} onChangeText={setCfm2} rightText="CFM" maxDecimals={1} onSubmitEditing={calculate} />
        </View>
        <View style={styles.row}>
          <NumericField label="Dry-bulb" value={t2} onChangeText={setT2} rightText="°F" maxDecimals={1} onSubmitEditing={calculate} />
        </View>
        <View style={styles.row}>
          <NumericField label="RH" value={rh2} onChangeText={setRh2} rightText="%" maxDecimals={1} onSubmitEditing={calculate} />
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
          <ResultBlock accentColor={ACCENT} label="Mixed Air Results">
            <CopyableValueRow label="Dry-bulb" value={formatWithUnit(results.tDryBulbF, '°F', { decimals: 1 })} onCopied={() => setSnack('Copied')} />
            <CopyableValueRow label="RH" value={formatWithUnit(results.rhPercent, '%', { decimals: 1 })} onCopied={() => setSnack('Copied')} />
            <CopyableValueRow label="Humidity Ratio (W)" value={`${formatNumber(results.humidityRatio, { decimals: 5 })} lb/lb`} onCopied={() => setSnack('Copied')} />
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
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8, opacity: 0.85 },
  buttonRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  calcBtn: { flex: 1, backgroundColor: ACCENT },
  clearBtn: { flex: 1, borderColor: ACCENT },
});

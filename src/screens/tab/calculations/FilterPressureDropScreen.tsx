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
import { applyLoadingMultiplier, filterDeltaPAtFlowSquareLaw } from '../../../lib/calcs/filter';
import { formatWithUnit } from '../../../utils/format';

const ACCENT = '#22c55e';

export default function FilterPressureDropScreen() {
  const [deltaP1, setDeltaP1] = useState('0.30');
  const [flow1, setFlow1] = useState('2000');
  const [flow2, setFlow2] = useState('1500');
  const [loadingMultiplier, setLoadingMultiplier] = useState('1.00');

  const [results, setResults] = useState<null | { deltaPClean2: number; deltaPLoaded2: number }>(null);
  const [snack, setSnack] = useState('');

  const formula = useMemo(() => {
    return ['Square law (approx.):', 'ΔP₂ = ΔP₁ · (Q₂/Q₁)²', 'Loaded ΔP = ΔP_clean · multiplier'].join('\n');
  }, []);

  const clearAll = () => {
    setDeltaP1('');
    setFlow1('');
    setFlow2('');
    setLoadingMultiplier('1.00');
    setResults(null);
  };

  const calculate = () => {
    const dp1 = Number(deltaP1);
    const q1 = Number(flow1);
    const q2 = Number(flow2);
    const mult = Number(loadingMultiplier);

    if (!Number.isFinite(dp1) || dp1 < 0) return Alert.alert('Error', 'ΔP₁ must be ≥ 0');
    if (!Number.isFinite(q1) || q1 <= 0) return Alert.alert('Error', 'Q₁ must be > 0');
    if (!Number.isFinite(q2) || q2 < 0) return Alert.alert('Error', 'Q₂ must be ≥ 0');
    if (!Number.isFinite(mult) || mult < 1) return Alert.alert('Error', 'Loading multiplier must be ≥ 1');

    try {
      const dpClean2 = filterDeltaPAtFlowSquareLaw({ deltaP1: dp1, flow1: q1, flow2: q2 });
      const dpLoaded2 = applyLoadingMultiplier(dpClean2, mult);
      setResults({ deltaPClean2: dpClean2, deltaPLoaded2: dpLoaded2 });
    } catch {
      Alert.alert('Error', 'Unable to calculate. Check inputs.');
    }
  };

  return (
    <CalcScreen title="Filter Pressure Drop" subtitle="Estimate filter ΔP at a new flow (square law) and with loading">
      <CalcCard>
        <FormulaBlock accentColor={ACCENT} title="Formulas" description="Units are consistent: use in. w.g. (or Pa) as long as both ΔP values match.">
          {formula.split('\n').map((line) => (
            <Text key={line} style={formulaTextStyles.formulaSubText}>
              {line}
            </Text>
          ))}
        </FormulaBlock>

        <View style={styles.row}>
          <NumericField label="ΔP₁ (clean)" value={deltaP1} onChangeText={setDeltaP1} rightText="in. w.g." maxDecimals={4} onSubmitEditing={calculate} />
        </View>
        <View style={styles.row}>
          <NumericField label="Q₁" value={flow1} onChangeText={setFlow1} rightText="CFM" maxDecimals={1} onSubmitEditing={calculate} />
        </View>
        <View style={styles.row}>
          <NumericField label="Q₂" value={flow2} onChangeText={setFlow2} rightText="CFM" maxDecimals={1} onSubmitEditing={calculate} />
        </View>
        <View style={styles.row}>
          <NumericField label="Loading multiplier" value={loadingMultiplier} onChangeText={setLoadingMultiplier} maxDecimals={2} onSubmitEditing={calculate} />
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
            <CopyableValueRow label="ΔP₂ (clean)" value={formatWithUnit(results.deltaPClean2, 'in. w.g.', { decimals: 4 })} onCopied={() => setSnack('Copied')} />
            <CopyableValueRow label="ΔP₂ (loaded)" value={formatWithUnit(results.deltaPLoaded2, 'in. w.g.', { decimals: 4 })} onCopied={() => setSnack('Copied')} />
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

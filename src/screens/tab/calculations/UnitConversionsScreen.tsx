import React, { useState } from 'react';
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
import { ft2ToM2, ft3ToM3, inWgToPa, m2ToFt2, m3ToFt3, paToInWg } from '../../../lib/calcs/conversions';
import { formatNumber, formatWithUnit } from '../../../utils/format';

const ACCENT = '#22c55e';

function parseOrNull(s: string): number | null {
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export default function UnitConversionsScreen() {
  const [ft2, setFt2] = useState('');
  const [m2, setM2] = useState('');

  const [ft3, setFt3] = useState('');
  const [m3, setM3] = useState('');

  const [pa, setPa] = useState('');
  const [inWg, setInWg] = useState('');

  const [snack, setSnack] = useState('');

  const clearAll = () => {
    setFt2('');
    setM2('');
    setFt3('');
    setM3('');
    setPa('');
    setInWg('');
  };

  const syncArea = (changed: 'ft2' | 'm2', next: string) => {
    if (changed === 'ft2') {
      setFt2(next);
      const v = parseOrNull(next);
      setM2(v == null ? '' : formatNumber(ft2ToM2(v), { maxDecimals: 6 }));
    } else {
      setM2(next);
      const v = parseOrNull(next);
      setFt2(v == null ? '' : formatNumber(m2ToFt2(v), { maxDecimals: 6 }));
    }
  };

  const syncVolume = (changed: 'ft3' | 'm3', next: string) => {
    if (changed === 'ft3') {
      setFt3(next);
      const v = parseOrNull(next);
      setM3(v == null ? '' : formatNumber(ft3ToM3(v), { maxDecimals: 6 }));
    } else {
      setM3(next);
      const v = parseOrNull(next);
      setFt3(v == null ? '' : formatNumber(m3ToFt3(v), { maxDecimals: 6 }));
    }
  };

  const syncPressure = (changed: 'pa' | 'inWg', next: string) => {
    if (changed === 'pa') {
      setPa(next);
      const v = parseOrNull(next);
      setInWg(v == null ? '' : formatNumber(paToInWg(v), { maxDecimals: 6 }));
    } else {
      setInWg(next);
      const v = parseOrNull(next);
      setPa(v == null ? '' : formatNumber(inWgToPa(v), { maxDecimals: 3 }));
    }
  };

  const validate = () => {
    const nums = [ft2, m2, ft3, m3, pa, inWg].map(parseOrNull).filter((v) => v != null) as number[];
    if (nums.some((v) => !Number.isFinite(v))) {
      Alert.alert('Error', 'One or more values are not valid numbers');
      return false;
    }
    return true;
  };

  return (
    <CalcScreen title="Unit Conversions" subtitle="Common area, volume, and pressure conversions">
      <CalcCard>
        <FormulaBlock accentColor={ACCENT} title="Tip">
          <Text style={formulaTextStyles.formulaSubText}>Enter a value on either side and the other side updates.</Text>
        </FormulaBlock>

        <Text style={styles.sectionTitle}>Area</Text>
        <View style={styles.row}>
          <NumericField label="ft²" value={ft2} onChangeText={(t) => syncArea('ft2', t)} maxDecimals={6} />
        </View>
        <View style={styles.row}>
          <NumericField label="m²" value={m2} onChangeText={(t) => syncArea('m2', t)} maxDecimals={6} />
        </View>

        <Text style={styles.sectionTitle}>Volume</Text>
        <View style={styles.row}>
          <NumericField label="ft³" value={ft3} onChangeText={(t) => syncVolume('ft3', t)} maxDecimals={6} />
        </View>
        <View style={styles.row}>
          <NumericField label="m³" value={m3} onChangeText={(t) => syncVolume('m3', t)} maxDecimals={6} />
        </View>

        <Text style={styles.sectionTitle}>Pressure</Text>
        <View style={styles.row}>
          <NumericField label="Pa" value={pa} onChangeText={(t) => syncPressure('pa', t)} maxDecimals={3} />
        </View>
        <View style={styles.row}>
          <NumericField label="in. w.g." value={inWg} onChangeText={(t) => syncPressure('inWg', t)} maxDecimals={6} />
        </View>

        <View style={styles.buttonRow}>
          <Button mode="outlined" onPress={() => { if (validate()) clearAll(); }} style={styles.clearBtn}>
            Clear
          </Button>
        </View>

        {(ft2 || m2 || ft3 || m3 || pa || inWg) && (
          <ResultBlock accentColor={ACCENT} label="Current Values">
            {!!ft2 && <CopyableValueRow label="Area" value={formatWithUnit(Number(ft2), 'ft²', { maxDecimals: 6 })} onCopied={() => setSnack('Copied')} />}
            {!!m2 && <CopyableValueRow label="Area" value={formatWithUnit(Number(m2), 'm²', { maxDecimals: 6 })} onCopied={() => setSnack('Copied')} />}
            {!!ft3 && <CopyableValueRow label="Volume" value={formatWithUnit(Number(ft3), 'ft³', { maxDecimals: 6 })} onCopied={() => setSnack('Copied')} />}
            {!!m3 && <CopyableValueRow label="Volume" value={formatWithUnit(Number(m3), 'm³', { maxDecimals: 6 })} onCopied={() => setSnack('Copied')} />}
            {!!pa && <CopyableValueRow label="Pressure" value={formatWithUnit(Number(pa), 'Pa', { maxDecimals: 3 })} onCopied={() => setSnack('Copied')} />}
            {!!inWg && <CopyableValueRow label="Pressure" value={formatWithUnit(Number(inWg), 'in. w.g.', { maxDecimals: 6 })} onCopied={() => setSnack('Copied')} />}
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
  clearBtn: { flex: 1, borderColor: ACCENT },
});

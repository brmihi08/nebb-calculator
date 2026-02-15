import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import {
  CalcCard,
  CalcScreen,
  CalcSection,
  FormulaBlock,
  ResultBlock,
  formulaTextStyles,
  resultTextStyles,
} from '../../../components/nebb';
import {
  calcAchFromCfm,
  calcCfmFromAch,
  parseNumber,
  requireNonNegative,
  requirePositive,
  round,
} from '../../../utils/cleanroom';

const ACCENT = '#10b981';

const CleanroomAirChangeVerificationScreen = () => {
  const [roomVolume, setRoomVolume] = useState('');
  const [targetAch, setTargetAch] = useState('');
  const [measuredSupplyCfm, setMeasuredSupplyCfm] = useState('');
  const [measuredExhaustCfm, setMeasuredExhaustCfm] = useState('');

  const [requiredCfm, setRequiredCfm] = useState<string>('');
  const [achFromSupply, setAchFromSupply] = useState<string>('');
  const [achFromExhaust, setAchFromExhaust] = useState<string>('');
  const [offsetCfm, setOffsetCfm] = useState<string>('');
  const [percentOfTarget, setPercentOfTarget] = useState<string>('');

  const computed = useMemo(() => {
    const v = roomVolume ? parseNumber(roomVolume, 'Room volume') : null;
    const t = targetAch ? parseNumber(targetAch, 'Target ACH') : null;
    const s = measuredSupplyCfm ? parseNumber(measuredSupplyCfm, 'Measured supply CFM') : null;
    const e = measuredExhaustCfm ? parseNumber(measuredExhaustCfm, 'Measured exhaust CFM') : null;

    if (!v || 'error' in v) return null;
    if ('error' in requirePositive(v.value, 'Room volume')) return null;

    const out: {
      requiredCfm?: number;
      achSupply?: number;
      achExhaust?: number;
      offsetCfm?: number;
      percent?: number;
    } = {};

    if (t && !('error' in t)) {
      if ('error' in requirePositive(t.value, 'Target ACH')) return null;
      out.requiredCfm = calcCfmFromAch(v.value, t.value);
    }

    if (s && !('error' in s)) {
      if ('error' in requireNonNegative(s.value, 'Measured supply CFM')) return null;
      out.achSupply = calcAchFromCfm(v.value, s.value);
    }

    if (e && !('error' in e)) {
      if ('error' in requireNonNegative(e.value, 'Measured exhaust CFM')) return null;
      out.achExhaust = calcAchFromCfm(v.value, e.value);
    }

    if (s && !('error' in s) && e && !('error' in e)) {
      out.offsetCfm = s.value - e.value;
    }

    if (t && !('error' in t) && s && !('error' in s)) {
      const achieved = calcAchFromCfm(v.value, s.value);
      out.percent = t.value === 0 ? 0 : (achieved / t.value) * 100;
    }

    return out;
  }, [roomVolume, targetAch, measuredSupplyCfm, measuredExhaustCfm]);

  const calculate = () => {
    const v = parseNumber(roomVolume, 'Room volume (ft³)');
    if ('error' in v) return Alert.alert('Error', v.error);
    const vPos = requirePositive(v.value, 'Room volume');
    if ('error' in vPos) return Alert.alert('Error', vPos.error);

    // Target ACH is optional but used for required CFM & percent.
    let tVal: number | null = null;
    if (targetAch.trim()) {
      const t = parseNumber(targetAch, 'Target ACH');
      if ('error' in t) return Alert.alert('Error', t.error);
      const tPos = requirePositive(t.value, 'Target ACH');
      if ('error' in tPos) return Alert.alert('Error', tPos.error);
      tVal = t.value;
    }

    let sVal: number | null = null;
    if (measuredSupplyCfm.trim()) {
      const s = parseNumber(measuredSupplyCfm, 'Measured supply CFM');
      if ('error' in s) return Alert.alert('Error', s.error);
      const sOk = requireNonNegative(s.value, 'Measured supply CFM');
      if ('error' in sOk) return Alert.alert('Error', sOk.error);
      sVal = s.value;
    }

    let eVal: number | null = null;
    if (measuredExhaustCfm.trim()) {
      const e = parseNumber(measuredExhaustCfm, 'Measured exhaust CFM');
      if ('error' in e) return Alert.alert('Error', e.error);
      const eOk = requireNonNegative(e.value, 'Measured exhaust CFM');
      if ('error' in eOk) return Alert.alert('Error', eOk.error);
      eVal = e.value;
    }

    if (tVal !== null) setRequiredCfm(String(round(calcCfmFromAch(v.value, tVal), 2)));
    if (sVal !== null) setAchFromSupply(String(round(calcAchFromCfm(v.value, sVal), 2)));
    if (eVal !== null) setAchFromExhaust(String(round(calcAchFromCfm(v.value, eVal), 2)));
    if (sVal !== null && eVal !== null) setOffsetCfm(String(round(sVal - eVal, 2)));
    if (tVal !== null && sVal !== null) setPercentOfTarget(String(round((calcAchFromCfm(v.value, sVal) / tVal) * 100, 1)));
  };

  const clearAll = () => {
    setRoomVolume('');
    setTargetAch('');
    setMeasuredSupplyCfm('');
    setMeasuredExhaustCfm('');
    setRequiredCfm('');
    setAchFromSupply('');
    setAchFromExhaust('');
    setOffsetCfm('');
    setPercentOfTarget('');
  };

  const showResults = requiredCfm || achFromSupply || achFromExhaust || offsetCfm || percentOfTarget || computed;

  return (
    <CalcScreen
      title="Air Change Verification"
      subtitle="NEBB-first: verify achieved air changes using measured airflow (CFM) and room volume. Includes supply/exhaust offset for balance."
    >
      <CalcSection>
        <CalcCard>
          <FormulaBlock
            accentColor={ACCENT}
            title="Formulas"
            description="Primary outputs are Required CFM (from Target ACH) and Achieved ACH (from Measured CFM). Secondary note: a positive offset (Supply − Exhaust) typically indicates positive pressurization."
          >
            <Text style={formulaTextStyles.formulaSubText}>Required CFM = (Volume × Target ACH) / 60</Text>
            <Text style={formulaTextStyles.formulaSubText}>Achieved ACH = (Measured CFM × 60) / Volume</Text>
          </FormulaBlock>

          <View style={styles.inputRow}>
            <TextInput
              label="Room Volume (ft³)"
              value={roomVolume}
              onChangeText={setRoomVolume}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>

          <View style={styles.inputRow}>
            <TextInput
              label="Target ACH (optional)"
              value={targetAch}
              onChangeText={setTargetAch}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>

          <View style={styles.inputRow}>
            <TextInput
              label="Measured Supply (CFM)"
              value={measuredSupplyCfm}
              onChangeText={setMeasuredSupplyCfm}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>

          <View style={styles.inputRow}>
            <TextInput
              label="Measured Exhaust/Return (CFM)"
              value={measuredExhaustCfm}
              onChangeText={setMeasuredExhaustCfm}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={calculate}
              style={[styles.button, { backgroundColor: ACCENT }]}
              labelStyle={styles.buttonLabel}
            >
              Calculate
            </Button>
            <Button
              mode="outlined"
              onPress={clearAll}
              style={[styles.clearButton, { borderColor: ACCENT }]}
              labelStyle={[styles.clearButtonLabel, { color: ACCENT }]}
            >
              Clear All
            </Button>
          </View>

          {showResults && (
            <ResultBlock accentColor={ACCENT} label="Results:">
              {(requiredCfm || computed?.requiredCfm !== undefined) && (
                <Text style={resultTextStyles.value}>
                  Required CFM (from target): {requiredCfm || round(computed?.requiredCfm ?? 0, 2)} CFM
                </Text>
              )}
              {(achFromSupply || computed?.achSupply !== undefined) && (
                <Text style={resultTextStyles.value}>
                  Achieved ACH (supply): {achFromSupply || round(computed?.achSupply ?? 0, 2)} ACH
                </Text>
              )}
              {(achFromExhaust || computed?.achExhaust !== undefined) && (
                <Text style={resultTextStyles.value}>
                  Achieved ACH (exhaust): {achFromExhaust || round(computed?.achExhaust ?? 0, 2)} ACH
                </Text>
              )}
              {(percentOfTarget || computed?.percent !== undefined) && (
                <Text style={resultTextStyles.value}>
                  % of Target (supply): {percentOfTarget || round(computed?.percent ?? 0, 1)}%
                </Text>
              )}
              {(offsetCfm || computed?.offsetCfm !== undefined) && (
                <Text style={resultTextStyles.value}>
                  Supply − Exhaust Offset: {offsetCfm || round(computed?.offsetCfm ?? 0, 2)} CFM
                </Text>
              )}
            </ResultBlock>
          )}
        </CalcCard>
      </CalcSection>
    </CalcScreen>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginRight: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    flex: 1,
    marginLeft: 8,
  },
  clearButtonLabel: {
    fontSize: 16,
  },
});

export default CleanroomAirChangeVerificationScreen;

import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Paragraph, Surface, Text, TextInput, Title } from 'react-native-paper';

import { calcDuctFrictionLoss, calcEquivalentLengthM, calcFittingLossPa } from '../../../lib/calcs/duct';
import { paToInWg } from '../../../lib/calcs/conversions';

const AirflowFittingLossEquivalentLengthScreen = () => {
  const [shape, setShape] = useState<'round' | 'rect'>('round');

  const [airflowCfm, setAirflowCfm] = useState('');
  const [diameterIn, setDiameterIn] = useState('');
  const [widthIn, setWidthIn] = useState('');
  const [heightIn, setHeightIn] = useState('');

  const [kTotal, setKTotal] = useState('');
  const [straightLengthFt, setStraightLengthFt] = useState('0');

  const [dpFittings, setDpFittings] = useState('');
  const [leFt, setLeFt] = useState('');
  const [dpStraight, setDpStraight] = useState('');
  const [dpTotal, setDpTotal] = useState('');

  const formulas = useMemo(
    () =>
      [
        'ΔP_fittings = K_total · (ρ·V²/2)',
        'L_eq = (K_total · Dh) / f',
        'Total ΔP ≈ ΔP_straight + ΔP_fittings',
      ].join('\n'),
    [],
  );

  const clearAll = () => {
    setAirflowCfm('');
    setDiameterIn('');
    setWidthIn('');
    setHeightIn('');
    setKTotal('');
    setStraightLengthFt('0');
    setDpFittings('');
    setLeFt('');
    setDpStraight('');
    setDpTotal('');
  };

  const calculate = () => {
    const Q = parseFloat(airflowCfm);
    const K = parseFloat(kTotal);
    const Ls = parseFloat(straightLengthFt);

    if (!Number.isFinite(Q) || Q <= 0) return Alert.alert('Error', 'Airflow must be > 0');
    if (!Number.isFinite(K) || K < 0) return Alert.alert('Error', 'K_total must be ≥ 0');
    if (!Number.isFinite(Ls) || Ls < 0) return Alert.alert('Error', 'Straight length must be ≥ 0');

    try {
      const base =
        shape === 'round'
          ? calcDuctFrictionLoss({ shape: 'round', airflowCfm: Q, diameterIn: parseFloat(diameterIn), lengthFt: 1 })
          : calcDuctFrictionLoss({ shape: 'rect', airflowCfm: Q, widthIn: parseFloat(widthIn), heightIn: parseFloat(heightIn), lengthFt: 1 });

      const dpFitPa = calcFittingLossPa({ velocity_m_s: base.velocity_m_s, kTotal: K });
      const dpFitIn = paToInWg(dpFitPa);

      const leM = calcEquivalentLengthM(K, base.Dh_m, base.frictionFactor);
      const le = leM / 0.3048;

      const straight =
        Ls > 0
          ? shape === 'round'
            ? calcDuctFrictionLoss({ shape: 'round', airflowCfm: Q, diameterIn: parseFloat(diameterIn), lengthFt: Ls })
            : calcDuctFrictionLoss({ shape: 'rect', airflowCfm: Q, widthIn: parseFloat(widthIn), heightIn: parseFloat(heightIn), lengthFt: Ls })
          : null;

      const dpStr = straight ? straight.dpInWg : 0;
      const dpTot = dpStr + dpFitIn;

      setDpFittings(dpFitIn.toFixed(4));
      setLeFt(le.toFixed(1));
      setDpStraight(dpStr.toFixed(4));
      setDpTotal(dpTot.toFixed(4));
    } catch {
      Alert.alert('Error', 'Unable to calculate. Check duct size inputs.');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Fitting Loss & Equivalent Length</Title>
            <Paragraph style={styles.headerSubtitle}>Use K_total (from ASHRAE Duct Fitting Database/vendor) to estimate ΔP and L_eq.</Paragraph>
          </View>
        </Surface>
      </View>

      <Surface style={styles.liquidCard}>
        <View style={styles.cardContent}>
          <View style={styles.formulaContainer}>
            <Title style={styles.formulaTitle}>Formulas</Title>
            <Text style={styles.formulaText}>{formulas}</Text>
            <Paragraph style={styles.formulaDescription}>Reference: ASHRAE Fundamentals (loss coefficient method).</Paragraph>
          </View>

          <View style={styles.shapeSelector}>
            <Button mode={shape === 'round' ? 'contained' : 'outlined'} onPress={() => { setShape('round'); clearAll(); }} style={styles.shapeButton}>
              Round
            </Button>
            <Button mode={shape === 'rect' ? 'contained' : 'outlined'} onPress={() => { setShape('rect'); clearAll(); }} style={styles.shapeButton}>
              Rect
            </Button>
          </View>

          <View style={styles.inputRow}>
            <TextInput label="Airflow (CFM)" value={airflowCfm} onChangeText={setAirflowCfm} keyboardType="numeric" style={styles.input} mode="outlined" />
          </View>

          {shape === 'round' ? (
            <View style={styles.inputRow}>
              <TextInput label="Diameter (in)" value={diameterIn} onChangeText={setDiameterIn} keyboardType="numeric" style={styles.input} mode="outlined" />
            </View>
          ) : (
            <>
              <View style={styles.inputRow}>
                <TextInput label="Width (in)" value={widthIn} onChangeText={setWidthIn} keyboardType="numeric" style={styles.input} mode="outlined" />
              </View>
              <View style={styles.inputRow}>
                <TextInput label="Height (in)" value={heightIn} onChangeText={setHeightIn} keyboardType="numeric" style={styles.input} mode="outlined" />
              </View>
            </>
          )}

          <View style={styles.inputRow}>
            <TextInput label="K_total" value={kTotal} onChangeText={setKTotal} keyboardType="numeric" style={styles.input} mode="outlined" />
          </View>

          <View style={styles.inputRow}>
            <TextInput label="Straight duct length (ft) (optional)" value={straightLengthFt} onChangeText={setStraightLengthFt} keyboardType="numeric" style={styles.input} mode="outlined" />
          </View>

          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={calculate} style={styles.button}>Calculate</Button>
            <Button mode="outlined" onPress={clearAll} style={styles.clearButton}>Clear</Button>
          </View>

          {dpFittings !== '' && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>Results</Text>
              <Text style={styles.resultValue}>ΔP (fittings): {dpFittings} in. w.g.</Text>
              <Text style={styles.resultValue}>Equivalent length: {leFt} ft</Text>
              <Text style={styles.resultValue}>ΔP (straight): {dpStraight} in. w.g.</Text>
              <Text style={styles.resultValue}>ΔP (total): {dpTotal} in. w.g.</Text>
            </View>
          )}
        </View>
      </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerContainer: { marginBottom: 20, overflow: 'hidden', borderRadius: 24 },
  header: { borderRadius: 24, elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 },
  headerGradient: { backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: 24, borderRadius: 24 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#000000', marginBottom: 8 },
  headerSubtitle: { fontSize: 16, color: '#000000', opacity: 0.8 },
  liquidCard: { backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: 20, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
  cardContent: { padding: 20 },
  formulaContainer: { backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.2)' },
  formulaTitle: { fontSize: 18, fontWeight: 'bold', color: '#22c55e', marginBottom: 8 },
  formulaText: { fontSize: 14, color: '#000000', lineHeight: 20, marginBottom: 8 },
  formulaDescription: { fontSize: 13, color: '#000000', opacity: 0.8, textAlign: 'center' },
  shapeSelector: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  shapeButton: { flex: 1, marginHorizontal: 4, backgroundColor: '#22c55e' },
  inputRow: { marginBottom: 12 },
  input: { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, marginBottom: 16 },
  button: { flex: 1, marginRight: 8, backgroundColor: '#22c55e' },
  clearButton: { flex: 1, marginLeft: 8, borderColor: '#22c55e' },
  resultContainer: { backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.2)' },
  resultLabel: { fontSize: 16, fontWeight: 'bold', color: '#22c55e', marginBottom: 8 },
  resultValue: { fontSize: 15, color: '#000000', marginBottom: 4 },
});

export default AirflowFittingLossEquivalentLengthScreen;

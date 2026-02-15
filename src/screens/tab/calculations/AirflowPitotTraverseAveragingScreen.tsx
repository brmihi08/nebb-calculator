import React, { useMemo, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Title, Paragraph, TextInput, Button, Surface, Text } from 'react-native-paper';
import { screenBackground } from '../../../theme/screenStyles';
import { calcVelocityFpmFromVelocityPressure } from '../../../lib/calcs';

function parseNumberList(raw: string): number[] {
  return raw
    .split(/[^0-9eE.+-]+/)
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => Number(s))
    .filter(n => Number.isFinite(n));
}

const AirflowPitotTraverseAveragingScreen = () => {
  const [velocityPressures, setVelocityPressures] = useState('');
  const [density, setDensity] = useState('0.075');
  const [ductArea, setDuctArea] = useState('');

  const [avgVp, setAvgVp] = useState('');
  const [avgVelocity, setAvgVelocity] = useState('');
  const [avgCfm, setAvgCfm] = useState('');

  const readings = useMemo(() => parseNumberList(velocityPressures), [velocityPressures]);

  const calculate = () => {
    const rho = Number(density);
    if (!Number.isFinite(rho) || rho <= 0) {
      Alert.alert('Error', 'Air density must be a number greater than zero');
      return;
    }

    if (readings.length < 2) {
      Alert.alert('Error', 'Enter at least 2 velocity pressure readings');
      return;
    }
    if (readings.some(v => v < 0)) {
      Alert.alert('Error', 'Velocity pressure readings cannot be negative');
      return;
    }

    const vpAvg = readings.reduce((sum, v) => sum + v, 0) / readings.length;
    const vAvg = calcVelocityFpmFromVelocityPressure(vpAvg, rho);
    if (!Number.isFinite(vAvg)) {
      Alert.alert('Error', 'Unable to compute velocity from the given inputs');
      return;
    }

    setAvgVp(vpAvg.toFixed(4));
    setAvgVelocity(vAvg.toFixed(1));

    if (ductArea.trim() !== '') {
      const area = Number(ductArea);
      if (!Number.isFinite(area) || area <= 0) {
        Alert.alert('Error', 'Duct area must be a number greater than zero');
        return;
      }
      const cfm = vAvg * area;
      setAvgCfm(cfm.toFixed(1));
    } else {
      setAvgCfm('');
    }
  };

  const clearAll = () => {
    setVelocityPressures('');
    setDensity('0.075');
    setDuctArea('');
    setAvgVp('');
    setAvgVelocity('');
    setAvgCfm('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: screenBackground }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Pitot Traverse Averaging</Title>
            <Paragraph style={styles.headerSubtitle}>
              Average velocity pressure readings and calculate average velocity (and CFM)
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formulas</Title>
              <Text style={styles.formulaText}>Pv(avg) = (Pv1 + Pv2 + … + Pvn) / n</Text>
              <Text style={styles.formulaText}>V(avg) = 4005 × √(Pv(avg) × (0.075 / ρ))</Text>
              <Text style={styles.formulaText}>CFM = V(avg) × Area</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: Pv = velocity pressure (in. w.g.), ρ = air density (lb/ft³)
              </Paragraph>
            </View>

            <TextInput
              label="Velocity Pressure Readings (in. w.g.)"
              value={velocityPressures}
              onChangeText={setVelocityPressures}
              mode="outlined"
              multiline
              numberOfLines={4}
              placeholder="Example: 0.012, 0.011, 0.013, 0.010"
              style={styles.multilineInput}
            />

            <View style={styles.inputRow}>
              <TextInput
                label="Air Density ρ (lb/ft³)"
                value={density}
                onChangeText={setDensity}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
                placeholder="0.075 standard air"
              />
              <TextInput
                label="Duct Area (ft²) (optional)"
                value={ductArea}
                onChangeText={setDuctArea}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={calculate} style={styles.button} labelStyle={styles.buttonLabel}>
                Calculate
              </Button>
              <Button mode="outlined" onPress={clearAll} style={styles.clearButton} labelStyle={styles.clearButtonLabel}>
                Clear All
              </Button>
            </View>

            {(avgVp || avgVelocity || avgCfm) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Results</Text>
                {avgVp !== '' && <Text style={styles.resultValue}>Average Pv: {avgVp} in. w.g.</Text>}
                {avgVelocity !== '' && <Text style={styles.resultValue}>Average Velocity: {avgVelocity} FPM</Text>}
                {avgCfm !== '' && <Text style={styles.resultValue}>Airflow: {avgCfm} CFM</Text>}
                <Text style={styles.helperText}>Readings parsed: {readings.length}</Text>
              </View>
            )}
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerContainer: { marginBottom: 20, overflow: 'hidden', borderRadius: 24 },
  header: {
    borderRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    backgroundColor: '#22c55e',
  },
  headerGradient: { padding: 24, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 8 },
  headerSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.9)', textAlign: 'center' },
  section: { marginBottom: 20 },
  liquidCard: {
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    backgroundColor: '#fff',
  },
  cardContent: { padding: 20 },
  formulaContainer: { marginBottom: 20, padding: 16, backgroundColor: '#f8fafc', borderRadius: 16 },
  formulaTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
  formulaText: { fontSize: 16, fontWeight: '600', color: '#22c55e', marginBottom: 6, textAlign: 'center' },
  formulaDescription: { fontSize: 14, color: '#6b7280', textAlign: 'center', marginTop: 8 },
  multilineInput: { marginBottom: 12, backgroundColor: '#fff' },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  input: { flex: 1, marginHorizontal: 4, backgroundColor: '#fff' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  button: { flex: 1, marginRight: 8, backgroundColor: '#22c55e', borderRadius: 12, paddingVertical: 4 },
  buttonLabel: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  clearButton: { flex: 1, marginLeft: 8, borderColor: '#22c55e', borderRadius: 12, paddingVertical: 4 },
  clearButtonLabel: { fontSize: 16, fontWeight: 'bold', color: '#22c55e' },
  resultContainer: { padding: 16, backgroundColor: '#f0fdf4', borderRadius: 16, borderWidth: 1, borderColor: '#22c55e' },
  resultLabel: { fontSize: 18, fontWeight: 'bold', color: '#166534', marginBottom: 12, textAlign: 'center' },
  resultValue: { fontSize: 16, color: '#166534', marginBottom: 6, textAlign: 'center', fontWeight: '600' },
  helperText: { fontSize: 12, color: '#6b7280', textAlign: 'center', marginTop: 8 },
});

export default AirflowPitotTraverseAveragingScreen;

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Title, Paragraph, TextInput, Button, Surface, Text } from 'react-native-paper';

const AirflowDuctLeakageClassScreen = () => {
  const [leakageClass, setLeakageClass] = useState('');
  const [testPressure, setTestPressure] = useState('');
  const [surfaceArea, setSurfaceArea] = useState('');
  const [exponent, setExponent] = useState('0.65');

  const [leakageCfm, setLeakageCfm] = useState('');

  const calculate = () => {
    const cl = Number(leakageClass);
    const p = Number(testPressure);
    const a = Number(surfaceArea);
    const n = Number(exponent);

    if (!Number.isFinite(cl) || cl < 0) {
      Alert.alert('Error', 'Leakage Class must be a number (0 or greater)');
      return;
    }
    if (!Number.isFinite(p) || p < 0) {
      Alert.alert('Error', 'Test Pressure must be a number (0 or greater)');
      return;
    }
    if (!Number.isFinite(a) || a <= 0) {
      Alert.alert('Error', 'Duct Surface Area must be a number greater than zero');
      return;
    }
    if (!Number.isFinite(n) || n <= 0 || n > 2) {
      Alert.alert('Error', 'Exponent n must be a reasonable number greater than zero');
      return;
    }

    // Common duct leakage class relationship (SMACNA-style):
    // Leakage (CFM) = CL * (P^n) * (Area / 100)
    const q = cl * Math.pow(p, n) * (a / 100);
    setLeakageCfm(q.toFixed(1));
  };

  const clearAll = () => {
    setLeakageClass('');
    setTestPressure('');
    setSurfaceArea('');
    setExponent('0.65');
    setLeakageCfm('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Duct Leakage (Class Method)</Title>
            <Paragraph style={styles.headerSubtitle}>
              Estimate duct leakage airflow using leakage class, test pressure, and duct surface area
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>Q = CL × P^n × (A / 100)</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: Q = leakage (CFM), CL = leakage class, P = test pressure (in. w.g.),
                A = duct surface area (ft²), n ≈ 0.65 typical
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Leakage Class (CL)"
                value={leakageClass}
                onChangeText={setLeakageClass}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="Example: 6"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Test Pressure P (in. w.g.)"
                value={testPressure}
                onChangeText={setTestPressure}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="Example: 1.0"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Duct Surface Area A (ft²)"
                value={surfaceArea}
                onChangeText={setSurfaceArea}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Exponent n"
                value={exponent}
                onChangeText={setExponent}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="0.65 typical"
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

            {leakageCfm !== '' && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Result</Text>
                <Text style={styles.resultValue}>Estimated Leakage: {leakageCfm} CFM</Text>
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
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 8 },
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
  formulaText: { fontSize: 18, fontWeight: 'bold', color: '#22c55e', textAlign: 'center', marginBottom: 8 },
  formulaDescription: { fontSize: 14, color: '#6b7280', textAlign: 'center' },
  inputRow: { marginBottom: 16 },
  input: { backgroundColor: '#fff' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, marginBottom: 20 },
  button: { flex: 1, marginRight: 8, backgroundColor: '#22c55e', borderRadius: 12, paddingVertical: 4 },
  buttonLabel: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  clearButton: { flex: 1, marginLeft: 8, borderColor: '#22c55e', borderRadius: 12, paddingVertical: 4 },
  clearButtonLabel: { fontSize: 16, fontWeight: 'bold', color: '#22c55e' },
  resultContainer: { padding: 16, backgroundColor: '#f0fdf4', borderRadius: 16, borderWidth: 1, borderColor: '#22c55e' },
  resultLabel: { fontSize: 18, fontWeight: 'bold', color: '#166534', marginBottom: 12, textAlign: 'center' },
  resultValue: { fontSize: 16, color: '#166534', marginBottom: 6, textAlign: 'center', fontWeight: '600' },
});

export default AirflowDuctLeakageClassScreen;

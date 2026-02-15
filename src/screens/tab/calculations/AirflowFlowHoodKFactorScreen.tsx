import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Title, Paragraph, TextInput, Button, Surface, Text } from 'react-native-paper';

const AirflowFlowHoodKFactorScreen = () => {
  const [kFactor, setKFactor] = useState('');
  const [deltaP, setDeltaP] = useState('');
  const [flow, setFlow] = useState('');

  const calculateMissing = () => {
    const values = [kFactor, deltaP, flow];
    const filledCount = values.filter(v => v.trim() !== '').length;

    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      return;
    }
    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Q = K * sqrt(ΔP)
    if (flow.trim() === '') {
      const k = Number(kFactor);
      const dp = Number(deltaP);
      if (!Number.isFinite(k) || k <= 0) {
        Alert.alert('Error', 'K-factor must be a number greater than zero');
        return;
      }
      if (!Number.isFinite(dp) || dp < 0) {
        Alert.alert('Error', 'ΔP must be a number (0 or greater)');
        return;
      }
      const q = k * Math.sqrt(dp);
      setFlow(q.toFixed(1));
      return;
    }

    if (kFactor.trim() === '') {
      const q = Number(flow);
      const dp = Number(deltaP);
      if (!Number.isFinite(q) || q < 0) {
        Alert.alert('Error', 'Flow must be a number (0 or greater)');
        return;
      }
      if (!Number.isFinite(dp) || dp <= 0) {
        Alert.alert('Error', 'ΔP must be a number greater than zero to solve for K');
        return;
      }
      const k = q / Math.sqrt(dp);
      setKFactor(k.toFixed(4));
      return;
    }

    if (deltaP.trim() === '') {
      const q = Number(flow);
      const k = Number(kFactor);
      if (!Number.isFinite(q) || q < 0) {
        Alert.alert('Error', 'Flow must be a number (0 or greater)');
        return;
      }
      if (!Number.isFinite(k) || k <= 0) {
        Alert.alert('Error', 'K-factor must be a number greater than zero');
        return;
      }
      const dp = Math.pow(q / k, 2);
      setDeltaP(dp.toFixed(5));
      return;
    }
  };

  const clearAll = () => {
    setKFactor('');
    setDeltaP('');
    setFlow('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Flow Hood K-Factor</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate flow from hood K-factor and differential pressure (or solve for K)
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>Q = K × √(ΔP)</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: Q = flow (CFM), K = hood factor, ΔP = differential pressure (in. w.g.)
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="K-Factor"
                value={kFactor}
                onChangeText={setKFactor}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="ΔP (in. w.g.)"
                value={deltaP}
                onChangeText={setDeltaP}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Flow (CFM)"
                value={flow}
                onChangeText={setFlow}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={calculateMissing} style={styles.button} labelStyle={styles.buttonLabel}>
                Calculate
              </Button>
              <Button mode="outlined" onPress={clearAll} style={styles.clearButton} labelStyle={styles.clearButtonLabel}>
                Clear All
              </Button>
            </View>

            {(kFactor || deltaP || flow) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values</Text>
                {kFactor !== '' && <Text style={styles.resultValue}>K: {kFactor}</Text>}
                {deltaP !== '' && <Text style={styles.resultValue}>ΔP: {deltaP} in. w.g.</Text>}
                {flow !== '' && <Text style={styles.resultValue}>Q: {flow} CFM</Text>}
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
  formulaText: { fontSize: 20, fontWeight: 'bold', color: '#22c55e', textAlign: 'center', marginBottom: 8 },
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

export default AirflowFlowHoodKFactorScreen;

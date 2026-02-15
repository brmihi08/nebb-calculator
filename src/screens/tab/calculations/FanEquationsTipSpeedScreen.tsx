import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Title, Paragraph, TextInput, Button, Surface, Text } from 'react-native-paper';
import { screenBackground } from '../../../theme/screenStyles';

const FanEquationsTipSpeedScreen = () => {
  const [diameterIn, setDiameterIn] = useState('');
  const [rpm, setRpm] = useState('');
  const [tipSpeedFpm, setTipSpeedFpm] = useState('');
  const [tipSpeedMs, setTipSpeedMs] = useState('');

  const calculate = () => {
    const d = Number(diameterIn);
    const r = Number(rpm);

    if (!Number.isFinite(d) || d <= 0) {
      Alert.alert('Error', 'Fan diameter must be a number greater than zero');
      return;
    }
    if (!Number.isFinite(r) || r <= 0) {
      Alert.alert('Error', 'RPM must be a number greater than zero');
      return;
    }

    // Tip speed (ft/min) = π * D(in)/12 * RPM
    const fpm = (Math.PI * (d / 12)) * r;
    const ms = fpm * 0.00508;

    setTipSpeedFpm(fpm.toFixed(0));
    setTipSpeedMs(ms.toFixed(2));
  };

  const clearAll = () => {
    setDiameterIn('');
    setRpm('');
    setTipSpeedFpm('');
    setTipSpeedMs('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: screenBackground }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Fan Tip Speed</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate fan wheel tip speed from diameter and RPM
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>Tip Speed (FPM) = π × (D/12) × RPM</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: D = fan diameter (inches). Output is feet per minute.
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Fan Diameter (in.)"
                value={diameterIn}
                onChangeText={setDiameterIn}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="RPM"
                value={rpm}
                onChangeText={setRpm}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
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

            {tipSpeedFpm !== '' && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Result</Text>
                <Text style={styles.resultValue}>Tip Speed: {tipSpeedFpm} FPM</Text>
                <Text style={styles.resultValue}>Tip Speed: {tipSpeedMs} m/s</Text>
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
    backgroundColor: '#8b5cf6',
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
  formulaText: { fontSize: 16, fontWeight: 'bold', color: '#8b5cf6', textAlign: 'center', marginBottom: 8 },
  formulaDescription: { fontSize: 14, color: '#6b7280', textAlign: 'center' },
  inputRow: { marginBottom: 16 },
  input: { backgroundColor: '#fff' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, marginBottom: 20 },
  button: { flex: 1, marginRight: 8, backgroundColor: '#8b5cf6', borderRadius: 12, paddingVertical: 4 },
  buttonLabel: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  clearButton: { flex: 1, marginLeft: 8, borderColor: '#8b5cf6', borderRadius: 12, paddingVertical: 4 },
  clearButtonLabel: { fontSize: 16, fontWeight: 'bold', color: '#8b5cf6' },
  resultContainer: { padding: 16, backgroundColor: '#f5f3ff', borderRadius: 16, borderWidth: 1, borderColor: '#8b5cf6' },
  resultLabel: { fontSize: 18, fontWeight: 'bold', color: '#5b21b6', marginBottom: 12, textAlign: 'center' },
  resultValue: { fontSize: 16, color: '#5b21b6', marginBottom: 6, textAlign: 'center', fontWeight: '600' },
});

export default FanEquationsTipSpeedScreen;

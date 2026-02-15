import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Paragraph, Surface, Text, TextInput, Title } from 'react-native-paper';
import { screenBackground } from '../../../theme/screenStyles';

const AirflowHoodFaceVelocityScreen = () => {
  const [cfm, setCfm] = useState('');
  const [widthIn, setWidthIn] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [areaFt2, setAreaFt2] = useState('');
  const [velocityFpm, setVelocityFpm] = useState('');

  const calculate = () => {
    // At least 2 of: cfm, area, velocity
    const filled = [cfm !== '', areaFt2 !== '', velocityFpm !== ''].filter(Boolean).length;
    if (filled < 2) {
      Alert.alert('Error', 'Fill at least two of CFM, Area, or Velocity to calculate the missing value.');
      return;
    }
    if (filled === 3) {
      Alert.alert('Info', 'All three are filled. Clear one to calculate it.');
      return;
    }

    // If width+height provided, compute area and use it if area is blank
    let area = areaFt2 !== '' ? parseFloat(areaFt2) : NaN;
    if (areaFt2 === '' && widthIn !== '' && heightIn !== '') {
      const w = parseFloat(widthIn);
      const h = parseFloat(heightIn);
      if (w <= 0 || h <= 0) {
        Alert.alert('Error', 'Width and Height must be > 0');
        return;
      }
      area = (w * h) / 144;
      setAreaFt2(area.toFixed(3));
    }

    const q = cfm !== '' ? parseFloat(cfm) : NaN;
    const v = velocityFpm !== '' ? parseFloat(velocityFpm) : NaN;

    if (areaFt2 !== '' && (!Number.isFinite(area) || area <= 0)) {
      Alert.alert('Error', 'Area must be > 0');
      return;
    }

    // V = Q/A ; Q = V*A ; A = Q/V
    if (velocityFpm === '') {
      if (!Number.isFinite(q) || !Number.isFinite(area) || area === 0) {
        Alert.alert('Error', 'Need CFM and Area to calculate Velocity');
        return;
      }
      setVelocityFpm((q / area).toFixed(0));
    } else if (cfm === '') {
      if (!Number.isFinite(v) || !Number.isFinite(area)) {
        Alert.alert('Error', 'Need Velocity and Area to calculate CFM');
        return;
      }
      setCfm((v * area).toFixed(0));
    } else if (areaFt2 === '') {
      if (!Number.isFinite(q) || !Number.isFinite(v) || v === 0) {
        Alert.alert('Error', 'Need CFM and Velocity to calculate Area');
        return;
      }
      const a = q / v;
      setAreaFt2(a.toFixed(3));
    }
  };

  const clearAll = () => {
    setCfm('');
    setWidthIn('');
    setHeightIn('');
    setAreaFt2('');
    setVelocityFpm('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: screenBackground }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Hood Face Velocity</Title>
            <Paragraph style={styles.headerSubtitle}>
              Face velocity uses V = Q / A. Enter opening size to compute area.
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>V (fpm) = Q (cfm) / A (ft²)</Text>
              <Paragraph style={styles.formulaDescription}>A (ft²) = Width(in) × Height(in) / 144</Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput label="CFM" value={cfm} onChangeText={setCfm} keyboardType="numeric" style={styles.input} mode="outlined" />
            </View>

            <View style={styles.inputRow}>
              <TextInput label="Width (in)" value={widthIn} onChangeText={setWidthIn} keyboardType="numeric" style={styles.input} mode="outlined" />
              <TextInput label="Height (in)" value={heightIn} onChangeText={setHeightIn} keyboardType="numeric" style={styles.input} mode="outlined" />
            </View>

            <View style={styles.inputRow}>
              <TextInput label="Area (ft²)" value={areaFt2} onChangeText={setAreaFt2} keyboardType="numeric" style={styles.input} mode="outlined" />
            </View>

            <View style={styles.inputRow}>
              <TextInput label="Face Velocity (fpm)" value={velocityFpm} onChangeText={setVelocityFpm} keyboardType="numeric" style={styles.input} mode="outlined" />
            </View>

            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={calculate} style={styles.button}>
                Calculate
              </Button>
              <Button mode="outlined" onPress={clearAll} style={styles.clearButton}>
                Clear
              </Button>
            </View>
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
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  headerGradient: { backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: 24, borderRadius: 24 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#000000', marginBottom: 8 },
  headerSubtitle: { fontSize: 16, color: '#000000', opacity: 0.8 },
  section: { marginBottom: 20 },
  liquidCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardContent: { padding: 20 },
  formulaContainer: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  formulaTitle: { fontSize: 18, fontWeight: 'bold', color: '#22c55e', marginBottom: 8 },
  formulaText: { fontSize: 16, color: '#000000', textAlign: 'center', marginBottom: 6 },
  formulaDescription: { fontSize: 13, color: '#000000', opacity: 0.8, textAlign: 'center' },
  inputRow: { marginBottom: 14, flexDirection: 'row', gap: 10 },
  input: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.8)' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, marginBottom: 16 },
  button: { flex: 1, marginRight: 8, backgroundColor: '#22c55e' },
  clearButton: { flex: 1, marginLeft: 8, borderColor: '#22c55e' },
});

export default AirflowHoodFaceVelocityScreen;

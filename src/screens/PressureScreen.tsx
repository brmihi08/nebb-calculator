import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Paragraph, Text, TextInput, Title } from 'react-native-paper';
import {
  CalcCard,
  CalcScreen,
  CalcSection,
  FormulaBlock,
  ResultBlock,
  formulaTextStyles,
  resultTextStyles,
} from '../components/nebb';
import {
  calcVelocityFpmFromVelocityPressure,
  calcVelocityPressureInWgFromVelocity,
} from '../lib/calcs';

const ACCENT_COLOR = '#3b82f6'; // Blue for Pressure
const PressureScreen = () => {
  const [totalPressure, setTotalPressure] = useState('');
  const [staticPressure, setStaticPressure] = useState('');
  const [velocityPressure, setVelocityPressure] = useState('');
  const [velocity, setVelocity] = useState('');
  const [density, setDensity] = useState('0.075'); // Default air density at sea level

  const calculateStaticPressure = () => {
    if (!totalPressure || !velocityPressure) {
      Alert.alert('Error', 'Please enter both Total Pressure and Velocity Pressure values');
      return;
    }
    const tp = parseFloat(totalPressure);
    const vp = parseFloat(velocityPressure);
    const sp = tp - vp;
    setStaticPressure(sp.toFixed(2));
  };

  const calculateVelocityPressure = () => {
    if (!totalPressure || !staticPressure) {
      Alert.alert('Error', 'Please enter both Total Pressure and Static Pressure values');
      return;
    }
    const tp = parseFloat(totalPressure);
    const sp = parseFloat(staticPressure);
    const vp = tp - sp;
    setVelocityPressure(vp.toFixed(2));
  };

  const calculateTotalPressure = () => {
    if (!staticPressure || !velocityPressure) {
      Alert.alert('Error', 'Please enter both Static Pressure and Velocity Pressure values');
      return;
    }
    const sp = parseFloat(staticPressure);
    const vp = parseFloat(velocityPressure);
    const tp = sp + vp;
    setTotalPressure(tp.toFixed(2));
  };

  const calculateVelocityFromPressure = () => {
    if (!velocityPressure || !density) {
      Alert.alert('Error', 'Please enter both Velocity Pressure and Air Density values');
      return;
    }
    const vp = parseFloat(velocityPressure);
    const rho = parseFloat(density);
    if (!Number.isFinite(vp) || vp < 0) {
      Alert.alert('Error', 'Velocity pressure must be a number ≥ 0');
      return;
    }
    if (!Number.isFinite(rho) || rho <= 0) {
      Alert.alert('Error', 'Air density must be a number > 0');
      return;
    }

    // NEBB fundamental relationship (Pitot):
    // V(fpm) = 4005 * sqrt(VP * 0.075 / rho)
    const velFpm = calcVelocityFpmFromVelocityPressure(vp, rho);
    setVelocity(velFpm.toFixed(2));
  };

  const calculateVelocityPressureFromVelocity = () => {
    if (!velocity || !density) {
      Alert.alert('Error', 'Please enter both Velocity and Air Density values');
      return;
    }
    const velFpm = parseFloat(velocity);
    const rho = parseFloat(density);
    if (!Number.isFinite(velFpm) || velFpm < 0) {
      Alert.alert('Error', 'Velocity must be a number ≥ 0');
      return;
    }
    if (!Number.isFinite(rho) || rho <= 0) {
      Alert.alert('Error', 'Air density must be a number > 0');
      return;
    }

    // VP(in.w.g.) = (V/4005)^2 * (rho/0.075)
    const vp = calcVelocityPressureInWgFromVelocity(velFpm, rho);
    setVelocityPressure(vp.toFixed(3));
  };

  const clearAll = () => {
    setTotalPressure('');
    setStaticPressure('');
    setVelocityPressure('');
    setVelocity('');
    setDensity('0.075');
  };

  const formulas = [
    {
      title: 'Total Pressure',
      formula: 'TP = SP + VP',
      description: 'Total pressure equals static pressure plus velocity pressure',
    },
    {
      title: 'Static Pressure',
      formula: 'SP = TP - VP',
      description: 'Static pressure equals total pressure minus velocity pressure',
    },
    {
      title: 'Velocity Pressure',
      formula: 'VP = TP - SP',
      description: 'Velocity pressure equals total pressure minus static pressure',
    },
    {
      title: 'Velocity from Velocity Pressure',
      formula: 'V (FPM) = 4005 × √(VP × 0.075 / ρ)',
      description: 'Calculate velocity from velocity pressure and air density',
    },
    {
      title: 'Velocity Pressure from Velocity',
      formula: 'VP = (ρ × V²) / (2 × g)',
      description: 'Calculate velocity pressure from velocity and air density',
    },
  ];

  const pressureUnits = [
    { label: 'Inches of Water (in. w.c.)', value: 'inwc' },
    { label: 'Pascals (Pa)', value: 'pa' },
    { label: 'Pounds per Square Foot (psf)', value: 'psf' },
  ];

  return (
    <CalcScreen title="Pressure Calculations" subtitle="Professional pressure calculations for NEBB certified technicians">
      <CalcSection>
        <Title style={styles.sectionTitle}>Pressure Relationships</Title>
        <CalcCard>
          <FormulaBlock accentColor={ACCENT_COLOR} title="Formulas">
            <Text style={formulaTextStyles.formulaText}>TP = SP + VP</Text>
            <Text style={formulaTextStyles.formulaText}>SP = TP - VP</Text>
            <Text style={formulaTextStyles.formulaText}>VP = TP - SP</Text>
          </FormulaBlock>

          <View style={styles.inputRow}>
            <TextInput
              label="Total Pressure (in. w.c.)"
              value={totalPressure}
              onChangeText={setTotalPressure}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Static Pressure (in. w.c.)"
              value={staticPressure}
              onChangeText={setStaticPressure}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>
          <View style={styles.inputRow}>
            <TextInput
              label="Velocity Pressure (in. w.c.)"
              value={velocityPressure}
              onChangeText={setVelocityPressure}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>
          <View style={styles.buttonRow}>
            <Button
              mode="contained"
              onPress={calculateStaticPressure}
              style={[styles.button, { backgroundColor: ACCENT_COLOR }]}
            >
              Calculate SP
            </Button>
            <Button
              mode="contained"
              onPress={calculateVelocityPressure}
              style={[styles.button, { backgroundColor: ACCENT_COLOR }]}
            >
              Calculate VP
            </Button>
          </View>
          <Button
            mode="contained"
            onPress={calculateTotalPressure}
            style={[styles.fullWidthButton, { backgroundColor: ACCENT_COLOR }]}
          >
            Calculate TP
          </Button>
          {!!staticPressure && !!velocityPressure && !!totalPressure && (
            <ResultBlock accentColor={ACCENT_COLOR} label="Calculated Pressures:">
              {!!totalPressure && <Text style={resultTextStyles.value}>Total Pressure: {totalPressure} in. w.c.</Text>}
              {!!staticPressure && <Text style={resultTextStyles.value}>Static Pressure: {staticPressure} in. w.c.</Text>}
              {!!velocityPressure && <Text style={resultTextStyles.value}>Velocity Pressure: {velocityPressure} in. w.c.</Text>}
            </ResultBlock>
          )}
        </CalcCard>
      </CalcSection>

      <CalcSection>
        <Title style={styles.sectionTitle}>Velocity Calculations</Title>
        <CalcCard>
          <FormulaBlock accentColor={ACCENT_COLOR} title="Formulas">
            <Text style={formulaTextStyles.formulaText}>V (FPM) = 4005 × √(VP × 0.075 / ρ)</Text>
            <Text style={formulaTextStyles.formulaText}>VP (in. w.c.) = (V / 4005)² × (ρ / 0.075)</Text>
          </FormulaBlock>

          <View style={styles.inputRow}>
            <TextInput
              label="Velocity (ft/min)"
              value={velocity}
              onChangeText={setVelocity}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Air Density (lb/ft³)"
              value={density}
              onChangeText={setDensity}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>
          <View style={styles.buttonRow}>
            <Button
              mode="contained"
              onPress={calculateVelocityFromPressure}
              style={[styles.button, { backgroundColor: ACCENT_COLOR }]}
            >
              V from VP
            </Button>
            <Button
              mode="contained"
              onPress={calculateVelocityPressureFromVelocity}
              style={[styles.button, { backgroundColor: ACCENT_COLOR }]}
            >
              VP from V
            </Button>
          </View>
          {!!velocity && !!velocityPressure && (
            <ResultBlock accentColor={ACCENT_COLOR} label="Calculated Values:">
              {!!velocity && <Text style={resultTextStyles.value}>Velocity: {velocity} ft/min</Text>}
              {!!velocityPressure && <Text style={resultTextStyles.value}>Velocity Pressure: {velocityPressure} in. w.c.</Text>}
            </ResultBlock>
          )}
        </CalcCard>
      </CalcSection>

      <CalcSection>
        <Title style={styles.sectionTitle}>NEBB Pressure Formulas</Title>
        {formulas.map((formula, index) => (
          <CalcCard key={index} style={{ marginBottom: 12 }}>
            <Title style={styles.formulaTitle}>{formula.title}</Title>
            <Text style={styles.formulaText}>{formula.formula}</Text>
            <Paragraph style={styles.formulaDescription}>
              {formula.description}
            </Paragraph>
          </CalcCard>
        ))}
      </CalcSection>

      <CalcSection>
        <Title style={styles.sectionTitle}>Common Air Densities</Title>
        <CalcCard>
          <View style={styles.densityRow}>
            <Text style={styles.densityLabel}>Sea Level (0 ft):</Text>
            <Text style={styles.densityValue}>0.075 lb/ft³</Text>
          </View>
          <View style={styles.densityRow}>
            <Text style={styles.densityLabel}>1000 ft elevation:</Text>
            <Text style={styles.densityValue}>0.071 lb/ft³</Text>
          </View>
          <View style={styles.densityRow}>
            <Text style={styles.densityLabel}>2000 ft elevation:</Text>
            <Text style={styles.densityValue}>0.067 lb/ft³</Text>
          </View>
          <View style={styles.densityRow}>
            <Text style={styles.densityLabel}>5000 ft elevation:</Text>
            <Text style={styles.densityValue}>0.062 lb/ft³</Text>
          </View>
        </CalcCard>
      </CalcSection>

      <Button
        mode="outlined"
        onPress={clearAll}
        style={[styles.clearButton, { borderColor: ACCENT_COLOR }]}
        textColor={ACCENT_COLOR}
        icon="refresh"
      >
        Clear All
      </Button>
    </CalcScreen>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000000',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 16,
  },
  fullWidthButton: {
    marginBottom: 16,
    borderRadius: 16,
  },
  formulaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formulaText: {
    fontSize: 14,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    color: ACCENT_COLOR,
    fontWeight: '500',
  },
  formulaDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  densityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  densityLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  densityValue: {
    fontSize: 14,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  clearButton: {
    marginTop: 16,
    marginBottom: 32,
    borderRadius: 16,
    borderWidth: 2,
  },
});

export default PressureScreen;






















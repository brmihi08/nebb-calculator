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
import { Ionicons } from '@expo/vector-icons';

const ACCENT_COLOR = '#22c55e'; // Green for Airflow

const AirflowScreen = () => {
  const [cfm, setCfm] = useState('');
  const [area, setArea] = useState('');
  const [velocity, setVelocity] = useState('');
  const [ductWidth, setDuctWidth] = useState('');
  const [ductHeight, setDuctHeight] = useState('');
  const [ductArea, setDuctArea] = useState('');

  const calculateVelocity = () => {
    if (!cfm || !area) {
      Alert.alert('Error', 'Please enter both CFM and Area values');
      return;
    }
    const cfmValue = parseFloat(cfm);
    const areaValue = parseFloat(area);
    if (areaValue === 0) {
      Alert.alert('Error', 'Area cannot be zero');
      return;
    }
    const velocityValue = cfmValue / areaValue;
    setVelocity(velocityValue.toFixed(2));
  };

  const calculateCFM = () => {
    if (!velocity || !area) {
      Alert.alert('Error', 'Please enter both Velocity and Area values');
      return;
    }
    const velocityValue = parseFloat(velocity);
    const areaValue = parseFloat(area);
    const cfmValue = velocityValue * areaValue;
    setCfm(cfmValue.toFixed(2));
  };

  const calculateDuctArea = () => {
    if (!ductWidth || !ductHeight) {
      Alert.alert('Error', 'Please enter both Width and Height values');
      return;
    }
    const width = parseFloat(ductWidth);
    const height = parseFloat(ductHeight);
    const areaValue = (width * height) / 144; // Convert to square feet
    setDuctArea(areaValue.toFixed(3));
  };

  const clearAll = () => {
    setCfm('');
    setArea('');
    setVelocity('');
    setDuctWidth('');
    setDuctHeight('');
    setDuctArea('');
  };

  const formulas = [
    {
      title: 'Velocity Calculation',
      formula: 'Velocity (ft/min) = CFM / Area (ft²)',
      description: 'Calculate air velocity from airflow rate and duct area',
    },
    {
      title: 'CFM Calculation',
      formula: 'CFM = Velocity (ft/min) × Area (ft²)',
      description: 'Calculate airflow rate from velocity and duct area',
    },
    {
      title: 'Duct Area',
      formula: 'Area (ft²) = (Width × Height) / 144',
      description: 'Calculate duct area from dimensions (inches to ft²)',
    },
    {
      title: 'Equivalent Duct Diameter',
      formula: 'D = 1.3 × (W × H)^0.625 / (W + H)^0.25',
      description: 'Calculate equivalent round duct diameter',
    },
  ];

  return (
    <CalcScreen title="Airflow Calculations" subtitle="Professional airflow calculations for NEBB certified technicians">
      <CalcSection>
        <Title style={styles.sectionTitle}>Velocity Calculator</Title>
        <CalcCard>
          <FormulaBlock accentColor={ACCENT_COLOR} title="Formula">
            <Text style={formulaTextStyles.formulaText}>Velocity = CFM / Area</Text>
            <Text style={formulaTextStyles.formulaText}>CFM = Velocity × Area</Text>
          </FormulaBlock>

          <View style={styles.inputRow}>
            <TextInput
              label="CFM"
              value={cfm}
              onChangeText={setCfm}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Area (ft²)"
              value={area}
              onChangeText={setArea}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>
          <View style={styles.buttonRow}>
            <Button
              mode="contained"
              onPress={calculateVelocity}
              style={[styles.button, { backgroundColor: ACCENT_COLOR }]}
            >
              Calculate Velocity
            </Button>
            <Button
              mode="contained"
              onPress={calculateCFM}
              style={[styles.button, { backgroundColor: ACCENT_COLOR }]}
            >
              Calculate CFM
            </Button>
          </View>
          {!!velocity && (
            <ResultBlock accentColor={ACCENT_COLOR} label="Velocity:">
              <Text style={resultTextStyles.value}>{velocity} ft/min</Text>
            </ResultBlock>
          )}
        </CalcCard>
      </CalcSection>

      <CalcSection>
        <Title style={styles.sectionTitle}>Duct Area Calculator</Title>
        <CalcCard>
          <FormulaBlock accentColor={ACCENT_COLOR} title="Formula">
            <Text style={formulaTextStyles.formulaText}>Area (ft²) = (Width × Height) / 144</Text>
          </FormulaBlock>

          <View style={styles.inputRow}>
            <TextInput
              label="Width (inches)"
              value={ductWidth}
              onChangeText={setDuctWidth}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Height (inches)"
              value={ductHeight}
              onChangeText={setDuctHeight}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>
          <Button
            mode="contained"
            onPress={calculateDuctArea}
            style={[styles.button, { backgroundColor: ACCENT_COLOR }]}
          >
            Calculate Area
          </Button>
          {!!ductArea && (
            <ResultBlock accentColor={ACCENT_COLOR} label="Duct Area:">
              <Text style={resultTextStyles.value}>{ductArea} ft²</Text>
            </ResultBlock>
          )}
        </CalcCard>
      </CalcSection>

      <CalcSection>
        <Title style={styles.sectionTitle}>NEBB Airflow Formulas</Title>
        {formulas.map((formula, index) => (
          <CalcCard key={index} style={{ marginBottom: 12 }}>
            <Title style={styles.formulaTitle}>{formula.title}</Title>
            <Text style={styles.formulaText}>{formula.formula}</Text>
            <Paragraph style={styles.formulaDescription}>{formula.description}</Paragraph>
          </CalcCard>
        ))}
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
  formulaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formulaText: {
    fontSize: 14,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
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
  clearButton: {
    marginTop: 16,
    marginBottom: 32,
    borderRadius: 16,
    borderWidth: 2,
  },
});

export default AirflowScreen;






















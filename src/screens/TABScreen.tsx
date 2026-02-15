import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Paragraph, Text, TextInput, Title } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import {
  CalcCard,
  CalcScreen,
  CalcSection,
  FormulaBlock,
  ResultBlock,
  formulaTextStyles,
  resultTextStyles,
} from '../components/nebb';

const TABScreen = () => {
  const [cfm, setCfm] = useState('');
  const [area, setArea] = useState('');
  const [velocity, setVelocity] = useState('');
  const [totalPressure, setTotalPressure] = useState('');
  const [staticPressure, setStaticPressure] = useState('');
  const [velocityPressure, setVelocityPressure] = useState('');
  const [dryBulb, setDryBulb] = useState('');
  const [wetBulb, setWetBulb] = useState('');
  const [relativeHumidity, setRelativeHumidity] = useState('');

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

  const calculateRelativeHumidity = () => {
    if (!dryBulb || !wetBulb) {
      Alert.alert('Error', 'Please enter both Dry Bulb and Wet Bulb temperatures');
      return;
    }
    const db = parseFloat(dryBulb);
    const wb = parseFloat(wetBulb);

    if (wb > db) {
      Alert.alert('Error', 'Wet bulb temperature cannot be higher than dry bulb temperature');
      return;
    }

    const depression = db - wb;
    const rh = 100 - depression * 5;
    setRelativeHumidity(Math.max(0, Math.min(100, rh)).toFixed(1));
  };

  const clearAll = () => {
    setCfm('');
    setArea('');
    setVelocity('');
    setTotalPressure('');
    setStaticPressure('');
    setVelocityPressure('');
    setDryBulb('');
    setWetBulb('');
    setRelativeHumidity('');
  };

  const tabProcedures = [
    {
      title: 'Airflow Measurement',
      description: 'Measure and verify airflow rates in ducts and air handling units',
      icon: 'airplane',
      color: '#22c55e',
    },
    {
      title: 'Pressure Testing',
      description: 'Test static, total, and velocity pressure relationships',
      icon: 'speedometer',
      color: '#3b82f6',
    },
    {
      title: 'Temperature & Humidity',
      description: 'Measure dry bulb, wet bulb, and calculate relative humidity',
      icon: 'thermometer',
      color: '#f59e0b',
    },
    {
      title: 'System Balancing',
      description: 'Balance air distribution systems to design specifications',
      icon: 'scale',
      color: '#8b5cf6',
    },
  ];

  const formulas = [
    {
      title: 'Velocity Calculation',
      formula: 'Velocity (ft/min) = CFM / Area (ft²)',
      description: 'Calculate air velocity from airflow rate and duct area',
    },
    {
      title: 'Static Pressure',
      formula: 'SP = TP - VP',
      description: 'Calculate static pressure from total and velocity pressure',
    },
    {
      title: 'Relative Humidity',
      formula: 'RH = 100 - (5 × (Tdb - Twb))',
      description: 'Calculate relative humidity from dry and wet bulb temperatures',
    },
  ];

  return (
    <CalcScreen
      title="TAB Procedures"
      subtitle="Testing, Adjusting, and Balancing calculations for NEBB certified technicians"
    >
      <CalcSection>
        <Title style={styles.sectionTitle}>TAB Procedures</Title>
        {tabProcedures.map((procedure, index) => (
          <CalcCard key={`${procedure.title}-${index}`}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: procedure.color }]}>
                <Ionicons name={procedure.icon as any} size={24} color="white" />
              </View>
              <View style={styles.cardText}>
                <Title style={styles.cardTitle}>{procedure.title}</Title>
                <Paragraph style={styles.cardDescription}>{procedure.description}</Paragraph>
              </View>
            </View>
          </CalcCard>
        ))}
      </CalcSection>

      <CalcSection>
        <Title style={styles.sectionTitle}>Airflow Calculator</Title>
        <CalcCard>
          <FormulaBlock accentColor="#22c55e" title="Formula">
            <Text style={formulaTextStyles.formulaText}>Velocity = CFM / Area</Text>
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

          <Button mode="contained" onPress={calculateVelocity} style={[styles.button, { backgroundColor: '#22c55e' }]}>
            Calculate Velocity
          </Button>

          {!!velocity && (
            <ResultBlock accentColor="#22c55e" label="Velocity:">
              <Text style={resultTextStyles.value}>{velocity} ft/min</Text>
            </ResultBlock>
          )}
        </CalcCard>
      </CalcSection>

      <CalcSection>
        <Title style={styles.sectionTitle}>Pressure Calculator</Title>
        <CalcCard>
          <FormulaBlock accentColor="#3b82f6" title="Formula">
            <Text style={formulaTextStyles.formulaText}>SP = TP - VP</Text>
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
              label="Velocity Pressure (in. w.c.)"
              value={velocityPressure}
              onChangeText={setVelocityPressure}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>

          <Button mode="contained" onPress={calculateStaticPressure} style={[styles.button, { backgroundColor: '#3b82f6' }]}>
            Calculate Static Pressure
          </Button>

          {!!staticPressure && (
            <ResultBlock accentColor="#3b82f6" label="Static Pressure:">
              <Text style={resultTextStyles.value}>{staticPressure} in. w.c.</Text>
            </ResultBlock>
          )}
        </CalcCard>
      </CalcSection>

      <CalcSection>
        <Title style={styles.sectionTitle}>Temperature & Humidity</Title>
        <CalcCard>
          <FormulaBlock accentColor="#f59e0b" title="Formula">
            <Text style={formulaTextStyles.formulaText}>RH = 100 - (5 × (Tdb - Twb))</Text>
          </FormulaBlock>

          <View style={styles.inputRow}>
            <TextInput
              label="Dry Bulb (°F)"
              value={dryBulb}
              onChangeText={setDryBulb}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Wet Bulb (°F)"
              value={wetBulb}
              onChangeText={setWetBulb}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>

          <Button
            mode="contained"
            onPress={calculateRelativeHumidity}
            style={[styles.button, { backgroundColor: '#f59e0b' }]}
          >
            Calculate Relative Humidity
          </Button>

          {!!relativeHumidity && (
            <ResultBlock accentColor="#f59e0b" label="Relative Humidity:">
              <Text style={resultTextStyles.value}>{relativeHumidity}%</Text>
            </ResultBlock>
          )}
        </CalcCard>
      </CalcSection>

      <CalcSection>
        <Title style={styles.sectionTitle}>NEBB TAB Formulas</Title>
        {formulas.map((formula, index) => (
          <CalcCard key={`${formula.title}-${index}`}>
            <Title style={styles.formulaTitle}>{formula.title}</Title>
            <Text style={styles.formulaText}>{formula.formula}</Text>
            <Paragraph style={styles.formulaDescription}>{formula.description}</Paragraph>
          </CalcCard>
        ))}
      </CalcSection>

      <Button
        mode="outlined"
        onPress={clearAll}
        style={[styles.clearButton, { borderColor: '#22c55e' }]}
        textColor="#22c55e"
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    opacity: 0.8,
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
  button: {
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
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    color: '#22c55e',
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

export default TABScreen;

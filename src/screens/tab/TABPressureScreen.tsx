import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Paragraph, Text, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import {
  CalcCard,
  CalcScreen,
  CalcSection,
  FormulaBlock,
  formulaTextStyles,
} from '../../components/nebb';

const ACCENT = '#22c55e';

const TABPressureScreen = () => {
  const navigation = useNavigation();

  const pressureCalculations = [
    {
      title: 'Total Pressure',
      description: 'Calculate total pressure, static pressure, or velocity pressure relationships',
      formula: 'Pt = Ps + Pv',
      where: 'Pt = Total Pressure, Ps = Static Pressure, Pv = Velocity Pressure (all in inches w.g.)',
      screenName: 'AirflowTotalPressure',
    },
    {
      title: 'Coil Delta P',
      description: 'Calculate pressure drop across heating/cooling coils using Cv values',
      formula: 'ΔP = (GPM / Cv)² × SG',
      where: 'GPM = Flow Rate (GPM), Cv = Valve Coefficient, ΔP = Pressure Drop (PSI), SG = Specific Gravity',
      screenName: 'HydronicDeltaPCoilDeltaP',
    },
    {
      title: 'Cv and GPM',
      description: 'Calculate flow rate or valve coefficient using pressure drop',
      formula: 'GPM = Cv × √(ΔP / SG)',
      where: 'GPM = Flow Rate (GPM), Cv = Valve Coefficient, ΔP = Pressure Drop (PSI), SG = Specific Gravity',
      screenName: 'HydronicDeltaPCvandGPM',
    },
    {
      title: 'Fan Horsepower',
      description: 'Calculate fan horsepower from airflow and static pressure',
      formula: 'HP = (CFM × SP) / (6356 × η)',
      where: 'HP = Horsepower, CFM = Air Flow, SP = Static Pressure (inches w.g.), η = Fan Efficiency',
      screenName: 'ElectricalMotorCalculationsFanHorsepower',
    },
  ];

  return (
    <CalcScreen
      title="Pressure Calculations"
      subtitle="Essential pressure calculations for TAB testing and system analysis"
    >
      <CalcSection>
        <CalcCard>
          <Title style={styles.overviewTitle}>Pressure Fundamentals</Title>
          <Paragraph style={styles.overviewText}>
            Pressure measurements are critical in TAB testing for understanding system performance, identifying issues, and
            ensuring proper operation. These calculations help determine total pressure, static pressure, velocity pressure,
            and pressure drops across various system components.
          </Paragraph>
        </CalcCard>
      </CalcSection>

      <CalcSection>
        {pressureCalculations.map((calc, index) => (
          <CalcCard key={`${calc.title}-${index}`}>
            <Title style={styles.calcTitle}>{calc.title}</Title>
            <Paragraph style={styles.calcDescription}>{calc.description}</Paragraph>

            <FormulaBlock accentColor={ACCENT} title="Formula" description={calc.where}>
              <Text style={formulaTextStyles.formulaText}>{calc.formula}</Text>
            </FormulaBlock>

            <Button
              mode="contained"
              style={[styles.calculateButton, { backgroundColor: ACCENT }]}
              onPress={() => navigation.navigate(calc.screenName as never)}
            >
              Calculate {calc.title}
            </Button>
          </CalcCard>
        ))}
      </CalcSection>

      <CalcSection>
        <CalcCard>
          <Title style={styles.infoTitle}>Important Notes</Title>
          <View style={styles.bullets}>
            <Text style={styles.bullet}>• All pressure measurements should be taken with calibrated instruments</Text>
            <Text style={styles.bullet}>• Ensure proper unit conversions when working with different pressure units</Text>
            <Text style={styles.bullet}>• Consider temperature and altitude effects on pressure readings</Text>
            <Text style={styles.bullet}>• Verify pressure readings are within acceptable ranges for your system</Text>
          </View>
        </CalcCard>
      </CalcSection>
    </CalcScreen>
  );
};

const styles = StyleSheet.create({
  overviewTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: ACCENT,
  },
  overviewText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
  },
  calcTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000000',
  },
  calcDescription: {
    fontSize: 14,
    marginBottom: 16,
    color: '#666666',
    lineHeight: 20,
  },
  calculateButton: {
    marginTop: 8,
    borderRadius: 12,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#ff6b35',
  },
  bullets: {
    gap: 6,
  },
  bullet: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
  },
});

export default TABPressureScreen;

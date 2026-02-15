import React from 'react';
import { StyleSheet } from 'react-native';
import { Paragraph, Text, Title } from 'react-native-paper';
import {
  CalcCard,
  CalcScreen,
  CalcSection,
} from '../../components/nebb';

const ACCENT_COLOR = '#2196F3'; // Blue for Cleanroom

const CleanroomFormulasScreen = () => {
  const formulas = [
    {
      title: 'Air Changes Required',
      formula: 'CFM = (Room Volume × Air Changes/Hour) / 60',
      description: 'Calculate required airflow for cleanroom air changes',
    },
    {
      title: 'Particle Concentration',
      formula: 'Concentration = Particle Count / Sample Volume',
      description: 'Calculate particle concentration per cubic foot',
    },
    {
      title: 'Cleanroom Classification',
      formula: 'ISO Class = Based on particles ≥ 0.5 μm per ft³',
      description: 'Determine cleanroom classification based on particle count',
    },
  ];

  return (
    <CalcScreen title="NEBB Cleanroom Formulas" subtitle="Key formulas for cleanroom testing and calculations">
      <CalcSection>
        {formulas.map((formula, index) => (
          <CalcCard key={index} style={{ marginBottom: 12 }}>
            <Title style={styles.formulaTitle}>{formula.title}</Title>
            <Text style={[styles.formulaText, { backgroundColor: `rgba(33, 150, 243, 0.1)`, color: ACCENT_COLOR }]}>{formula.formula}</Text>
            <Paragraph style={styles.formulaDescription}>
              {formula.description}
            </Paragraph>
          </CalcCard>
        ))}
      </CalcSection>
    </CalcScreen>
  );
};

const styles = StyleSheet.create({
  formulaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formulaText: {
    fontSize: 14,
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
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
});

export default CleanroomFormulasScreen;

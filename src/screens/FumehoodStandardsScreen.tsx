import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Paragraph, Text } from 'react-native-paper';
import {
  CalcCard,
  CalcScreen,
  CalcSection,
  FormulaBlock,
  formulaTextStyles,
} from '../components/nebb';

const ACCENT_COLOR = '#22c55e';

const FumehoodStandardsScreen = () => {
  const faceVelocityFormula = {
    title: 'Face Velocity',
    formula: 'V = Q / A',
    description: 'Where: V = Face velocity (FPM), Q = Volumetric flow rate (CFM), A = Sash opening area (ft²)',
    reference: 'ANSI/ASHRAE 110-2016, Section 6.2.1',
  };

  const multiPointFormula = {
    title: 'Multi-Point Average Velocity',
    formula: 'V_avg = (V₁ + V₂ + ... + Vₙ) / n',
    description: 'Average of velocity readings taken at center of equal grid areas across sash opening',
    reference: 'ANSI/ASHRAE 110-2016, Section 6.2.2',
  };

  const controlLevelFormula = {
    title: 'Control Level (As Installed)',
    formula: 'CL = 0.00004 × (SF)² × (C_e)²',
    description: 'Where: SF = Sash face velocity (FPM), C_e = Tracer gas concentration ratio',
    reference: 'ANSI/ASHRAE 110-2016, Section 7.2',
  };

  const requiredCFMFormula = {
    title: 'Required Exhaust CFM',
    formula: 'Q = V_target × A',
    description: 'Calculate required exhaust to achieve target face velocity at specific sash opening',
    reference: 'ANSI/ASHRAE 110-2016, Section 6.2',
  };

  const velocityLimits = [
    { type: 'Standard Fume Hood', min: 80, max: 120, unit: 'FPM' },
    { type: 'High Performance', min: 60, max: 100, unit: 'FPM' },
    { type: 'Variable Air Volume (VAV)', min: 60, max: 100, unit: 'FPM' },
    { type: 'Radioisotope', min: 100, max: 150, unit: 'FPM' },
    { type: 'Perchloric Acid', min: 150, max: 200, unit: 'FPM' },
  ];

  const standards = [
    {
      standard: 'ANSI/ASHRAE 110-2016',
      title: 'Method of Testing Performance of Laboratory Fume Hoods',
      sections: [
        'Section 6.2: Face Velocity Test',
        'Section 6.3: Flow Visualization (Smoke Test)',
        'Section 7.0: Tracer Gas Containment Test',
      ],
    },
    {
      standard: 'NEBB Fume Hood Testing',
      title: 'Procedural Standards for Fume Hood Performance Testing',
      sections: [
        'Multi-point velocity grid (minimum 12-16 points)',
        'Velocity measurement accuracy: ±5% or ±5 FPM',
        'Document sash position for all readings',
      ],
    },
    {
      standard: 'OSHA 29 CFR 1910.1450',
      title: 'Occupational Exposure to Hazardous Chemicals',
      sections: [
        'Requires proper functioning fume hoods',
        'Regular inspection and maintenance',
        'Employee training on proper use',
      ],
    },
  ];

  return (
    <CalcScreen
      title="Fume Hood Standards"
      subtitle="ANSI/ASHRAE 110 & NEBB Procedural Standards"
    >
      <CalcSection>
          <Title style={styles.sectionTitle}>Standard Face Velocity Ranges</Title>
          {velocityLimits.map((item, index) => (
            <CalcCard key={index} style={styles.card}>
              <View style={styles.velocityRow}>
                <Text style={styles.velType}>{item.type}</Text>
                <Text style={styles.velRange}>
                  {item.min} - {item.max} {item.unit}
                </Text>
              </View>
            </CalcCard>
          ))}
        </CalcSection>

      <CalcSection>
        <Title style={styles.sectionTitle}>Key Formulas</Title>

        <FormulaBlock accentColor={ACCENT_COLOR} title={faceVelocityFormula.title} description={faceVelocityFormula.description}>
          <Text style={formulaTextStyles.formulaText}>{faceVelocityFormula.formula}</Text>
        </FormulaBlock>

        <View style={styles.formulaSpacer} />

        <FormulaBlock accentColor={ACCENT_COLOR} title={multiPointFormula.title} description={multiPointFormula.description}>
          <Text style={formulaTextStyles.formulaText}>{multiPointFormula.formula}</Text>
        </FormulaBlock>

        <View style={styles.formulaSpacer} />

        <FormulaBlock accentColor={ACCENT_COLOR} title={requiredCFMFormula.title} description={requiredCFMFormula.description}>
          <Text style={formulaTextStyles.formulaText}>{requiredCFMFormula.formula}</Text>
        </FormulaBlock>

        <View style={styles.formulaSpacer} />

        <FormulaBlock accentColor={ACCENT_COLOR} title={controlLevelFormula.title} description={controlLevelFormula.description}>
          <Text style={formulaTextStyles.formulaText}>{controlLevelFormula.formula}</Text>
        </FormulaBlock>
      </CalcSection>

      <CalcSection>
        <Title style={styles.sectionTitle}>Applicable Standards</Title>
        {standards.map((std) => (
          <CalcCard key={std.standard} style={styles.card}>
            <Title style={styles.standardTitle}>{std.standard}</Title>
            <Paragraph style={styles.standardSubtitle}>{std.title}</Paragraph>
            {std.sections.map((section) => (
              <Text key={section} style={styles.sectionItem}>• {section}</Text>
            ))}
          </CalcCard>
        ))}
      </CalcSection>
    </CalcScreen>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
    letterSpacing: -0.3,
  },
  card: {
    borderRadius: 20,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    backgroundColor: '#ffffff',
    marginBottom: 16,
    padding: 16,
  },
  velocityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  velType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  velRange: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22c55e',
  },
  formulaSpacer: {
    height: 16,
  },
  standardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1976D2',
    marginBottom: 4,
  },
  standardSubtitle: {
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.8,
  },
  sectionItem: {
    fontSize: 13,
    color: '#555',
    marginLeft: 8,
    marginTop: 4,
  },
});

export default FumehoodStandardsScreen;

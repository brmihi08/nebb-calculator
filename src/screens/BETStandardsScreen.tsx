import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Title, Paragraph, Text } from 'react-native-paper';
import {
  CalcCard,
  CalcScreen,
  CalcSection,
  FormulaBlock,
  formulaTextStyles,
} from '../components/nebb';

const ACCENT_COLOR = '#FF9800';

const BETStandardsScreen = () => {
  const elaFormula = {
    title: 'Effective Leakage Area (ELA)',
    formula: 'ELA = Q / (C × ΔPⁿ)',
    description:
      'Where: Q = airflow at the test pressure, C = flow coefficient, ΔP = pressure difference, n = flow exponent (often ~0.65). Ensure units are consistent with the referenced test method.',
    reference: 'ASTM E779-20, Section 10.1',
  };

  const achFormula = {
    title: 'Air Changes per Hour (ACH)',
    formula: 'ACH = (Q × 60) / V',
    description:
      'Where: Q = airflow at reference pressure (CFM), V = building volume (ft³), 60 = min/hr conversion factor.',
    reference: 'ASTM E779-20, Section 10.2',
  };

  const specificLeakageFormula = {
    title: 'Specific Leakage Area (SLA)',
    formula: 'SLA = (ELA / A_floor) × 10,000',
    description:
      'Where: ELA = effective leakage area (in²), A_floor = floor area (ft²). Result commonly reported as (in²/ft²) × 10,000.',
    reference: 'ASTM E779-20, Section 10.3',
  };

  const cfm50Formula = {
    title: 'CFM50 Normalization',
    formula: 'CFM50/ft² = Q₅₀ / A_envelope',
    description:
      'Where: Q₅₀ = airflow at 50 Pa (CFM), A_envelope = exterior envelope area (ft²).',
    reference: 'ASTM E1827-21, Method A',
  };

  const leakageClasses = [
    { class: 'Very Tight', ach50: '< 1.0', cfm50ft2: '< 0.25' },
    { class: 'Tight', ach50: '1.0 - 3.0', cfm50ft2: '0.25 - 0.50' },
    { class: 'Moderate', ach50: '3.0 - 5.0', cfm50ft2: '0.50 - 1.00' },
    { class: 'Leaky', ach50: '5.0 - 10.0', cfm50ft2: '1.00 - 2.00' },
    { class: 'Very Leaky', ach50: '> 10.0', cfm50ft2: '> 2.00' },
  ];

  const standards = [
    {
      standard: 'ASTM E779-20',
      title: 'Standard Test Method for Determining Air Leakage Rate by Fan Pressurization',
      keyPoints: [
        'Single-point or multi-point testing',
        'Common reference pressure: 50 Pa (≈ 0.20 in. w.c.)',
        'Uses multiple ΔP points and regression to determine flow coefficient and exponent',
        'Apply corrections per method (e.g., temperature/air density as applicable)',
      ],
    },
    {
      standard: 'ASTM E1827-21',
      title: 'Standard Test Methods for Determining Airtightness of Buildings',
      keyPoints: [
        'Method A: Single-point test at 50 Pa',
        'Method B: Two-point test (e.g., 50 Pa and 25 Pa)',
        'Method C: Multi-point test (typically 5–6 points)',
        'Determines flow exponent (n) when using multi-point data',
      ],
    },
    {
      standard: 'ASHRAE 90.1-2022',
      title: 'Energy Standard for Buildings Except Low-Rise Residential',
      keyPoints: [
        'Includes air-barrier and envelope leakage performance requirements (when adopted by code)',
        'Example whole-building leakage criterion commonly cited: ≤ 0.40 cfm/ft² at 75 Pa (verify project edition/section)',
        'Air-barrier testing requirements depend on adoption/enforcement; verify project specifications and authority having jurisdiction (AHJ)',
      ],
    },
    {
      standard: 'NEBB Environmental Envelope Testing',
      title: 'Procedural Standards for Environmental Envelope Testing',
      keyPoints: [
        'Blower door setup and calibration',
        'Building preparation requirements',
        'Data recording and reporting',
        'Quality control procedures',
      ],
    },
  ];

  return (
    <CalcScreen
      title="BET Standards & Formulas"
      subtitle="ASTM E779, ASTM E1827, ASHRAE 90.1 & NEBB Standards"
    >
      <ScrollView>
        <CalcSection>
          <Title style={styles.sectionTitle}>Leakage Classification (ACH50)</Title>
          {leakageClasses.map((item) => (
            <CalcCard key={item.class} style={styles.card}
            >
              <View style={styles.leakageRow}>
                <Text style={styles.leakClass}>{item.class}</Text>
                <View style={styles.leakValues}>
                  <Text style={styles.leakValue}>ACH50: {item.ach50}</Text>
                  <Text style={styles.leakValueSmall}>CFM50/ft²: {item.cfm50ft2}</Text>
                </View>
              </View>
            </CalcCard>
          ))}
        </CalcSection>

        <CalcSection>
          <Title style={styles.sectionTitle}>Key Formulas</Title>

          <FormulaBlock accentColor={ACCENT_COLOR} title={elaFormula.title} description={elaFormula.description}>
            <Text style={formulaTextStyles.formulaText}>{elaFormula.formula}</Text>
            <Text style={formulaTextStyles.formulaSubText}>{elaFormula.reference}</Text>
          </FormulaBlock>

          <View style={styles.formulaSpacer} />

          <FormulaBlock accentColor={ACCENT_COLOR} title={achFormula.title} description={achFormula.description}>
            <Text style={formulaTextStyles.formulaText}>{achFormula.formula}</Text>
            <Text style={formulaTextStyles.formulaSubText}>{achFormula.reference}</Text>
          </FormulaBlock>

          <View style={styles.formulaSpacer} />

          <FormulaBlock
            accentColor={ACCENT_COLOR}
            title={specificLeakageFormula.title}
            description={specificLeakageFormula.description}
          >
            <Text style={formulaTextStyles.formulaText}>{specificLeakageFormula.formula}</Text>
            <Text style={formulaTextStyles.formulaSubText}>{specificLeakageFormula.reference}</Text>
          </FormulaBlock>

          <View style={styles.formulaSpacer} />

          <FormulaBlock accentColor={ACCENT_COLOR} title={cfm50Formula.title} description={cfm50Formula.description}>
            <Text style={formulaTextStyles.formulaText}>{cfm50Formula.formula}</Text>
            <Text style={formulaTextStyles.formulaSubText}>{cfm50Formula.reference}</Text>
          </FormulaBlock>
        </CalcSection>

        <CalcSection>
          <Title style={styles.sectionTitle}>Applicable Standards</Title>
          {standards.map((std) => (
            <CalcCard key={std.standard} style={styles.card}>
              <Title style={styles.standardTitle}>{std.standard}</Title>
              <Paragraph style={styles.standardSubtitle}>{std.title}</Paragraph>
              {std.keyPoints.map((point) => (
                <Text key={point} style={styles.pointItem}>
                  • {point}
                </Text>
              ))}
            </CalcCard>
          ))}
        </CalcSection>
      </ScrollView>
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
  leakageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leakClass: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  leakValues: {
    alignItems: 'flex-end',
  },
  leakValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF9800',
  },
  leakValueSmall: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
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
  pointItem: {
    fontSize: 13,
    color: '#555',
    marginLeft: 8,
    marginTop: 4,
  },
});

export default BETStandardsScreen;

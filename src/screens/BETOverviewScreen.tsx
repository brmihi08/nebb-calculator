import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Paragraph, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import {
  CalcCard,
  CalcScreen,
  CalcSection,
} from '../components/nebb';

const ACCENT_COLOR = '#FF9800'; // Orange for BET

const BETOverviewScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const betCategories = [
    {
      title: 'Air Changes Calculator',
      description: 'Calculate air changes per hour from blower door airflow',
      icon: 'sync-outline',
      screen: 'BETAirChanges',
    },
    {
      title: 'Effective Leakage Area',
      description: 'Calculate ELA from pressure differential and flow (CFM50/CFM25)',
      icon: 'filter-outline',
      screen: 'BETEffectiveLeakageArea',
    },
    {
      title: 'Air Tightness Index',
      description: 'Calculate envelope leakage per surface area (ASTM E779)',
      icon: 'speedometer-outline',
      screen: 'BETAirTightnessIndex',
    },
    {
      title: 'ACH50 / ACH25',
      description: 'Air changes at 50/25 Pa pressurization',
      icon: 'bar-chart-outline',
      screen: 'BETACHCalculator',
    },
    {
      title: 'Blower Door Procedures',
      description: 'ASTM E779, ASTM E1827, and NEBB testing protocols',
      icon: 'clipboard-outline',
      screen: 'BETProcedures',
    },
  ];

  const standards = [
    {
      title: 'ASTM E779-20',
      description: 'Standard Test Method for Determining Air Leakage Rate',
      icon: 'document-text-outline',
      screen: 'BETASTME779',
    },
    {
      title: 'ASTM E1827-21',
      description: 'Standard Test Methods for Determining Airtightness',
      icon: 'document-outline',
      screen: 'BETASTME1827',
    },
    {
      title: 'ASHRAE 90.1',
      description: 'Energy Standard for Buildings - Envelope Requirements',
      icon: 'leaf-outline',
      screen: 'BETASHRAE901',
    },
    {
      title: 'NEBB Envelope Testing',
      description: 'NEBB Procedural Standards for Environmental Envelope Testing',
      icon: 'shield-checkmark-outline',
      screen: 'BETNEBBStandards',
    },
  ];

  return (
    <CalcScreen
      title="Building Envelope Testing"
      subtitle="Blower door, infiltration, and air tightness per ASTM & NEBB standards"
    >
      <CalcSection>
        <Title style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>BET Calculators</Title>
        {betCategories.map((category, index) => (
          <CalcCard
            key={index}
            style={[styles.card, { marginBottom: 16, backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}
            onPress={() => navigation.navigate(category.screen)}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: ACCENT_COLOR }]}>
                <Ionicons name={category.icon as any} size={24} color="white" />
              </View>
              <View style={styles.cardText}>
                <Title style={[styles.cardTitle, { color: theme.colors.onSurface }]}>{category.title}</Title>
                <Paragraph style={[styles.cardDescription, { color: theme.colors.onSurfaceVariant }]}>
                  {category.description}
                </Paragraph>
              </View>
            </View>
          </CalcCard>
        ))}
      </CalcSection>

      <CalcSection>
        <Title style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Standards & References</Title>
        {standards.map((standard, index) => (
          <CalcCard
            key={index}
            style={[styles.card, { marginBottom: 16, backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}
            onPress={() => navigation.navigate(standard.screen)}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: '#1976D2' }]}>
                <Ionicons name={standard.icon as any} size={24} color="white" />
              </View>
              <View style={styles.cardText}>
                <Title style={[styles.cardTitle, { color: theme.colors.onSurface }]}>{standard.title}</Title>
                <Paragraph style={[styles.cardDescription, { color: theme.colors.onSurfaceVariant }]}>
                  {standard.description}
                </Paragraph>
              </View>
            </View>
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
    letterSpacing: -0.3,
  },
  card: {
    borderRadius: 20,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    borderWidth: 1,
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
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
});

export default BETOverviewScreen;

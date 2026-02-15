import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Paragraph, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import {
  CalcCard,
  CalcScreen,
  CalcSection,
} from '../components/nebb';

const ACCENT_COLOR = '#2196F3'; // Blue for Cleanroom

const CleanroomOverviewScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const cleanroomCategories = [
    {
      title: 'Air Changes Calculator',
      description: 'Calculate required airflow for cleanroom air changes',
      icon: 'sync',
      screen: 'CleanroomAirChanges',
    },
    {
      title: 'Particle Counting',
      description: 'Calculate particle concentration and classify cleanroom areas',
      icon: 'flask-outline',
      screen: 'CleanroomParticleCounting',
    },
    {
      title: 'Cleanroom Classifications',
      description: 'Review ISO classifications and particle limits',
      icon: 'analytics-outline',
      screen: 'CleanroomClassifications',
    },
    {
      title: 'Environmental Monitoring',
      description: 'Monitor pressure, temperature, and humidity for cleanrooms',
      icon: 'thermometer-outline',
      screen: 'CleanroomEnvironmentalMonitoring',
    },
    {
      title: 'NEBB Cleanroom Formulas',
      description: 'Reference key formulas for cleanroom testing',
      icon: 'calculator-outline',
      screen: 'CleanroomFormulas',
    },
  ];

  return (
    <CalcScreen
      title="Cleanroom Testing"
      subtitle="Overview and tools for NEBB cleanroom calculations and standards"
    >
      <CalcSection>
        <Title style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Cleanroom Tools</Title>
        {cleanroomCategories.map((category, index) => (
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

export default CleanroomOverviewScreen;
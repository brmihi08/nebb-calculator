import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Paragraph, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import {
  CalcCard,
  CalcScreen,
  CalcSection,
} from '../components/nebb';

const ACCENT_COLOR = '#22c55e'; // Green for Fumehood

const FumehoodOverviewScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const fumehoodCategories = [
    {
      title: 'Face Velocity Calculator',
      description: 'Calculate face velocity from CFM and opening area',
      icon: 'speedometer-outline',
      screen: 'FumehoodFaceVelocity',
    },
    {
      title: 'Multi-Point Average',
      description: 'Average velocity readings across sash opening (NEBB Method)',
      icon: 'grid-outline',
      screen: 'FumehoodMultiPointAverage',
    },
    {
      title: 'Face Area Calculator',
      description: 'Calculate sash opening area from dimensions',
      icon: 'resize-outline',
      screen: 'FumehoodFaceArea',
    },
    {
      title: 'Pressure Differential',
      description: 'Monitor room-to-hood pressure relationships',
      icon: 'thermometer-outline',
      screen: 'FumehoodPressureDifferential',
    },
    {
      title: 'Fume Hood Types & Standards',
      description: 'ANSI/ASHRAE 110 reference and hood classifications',
      icon: 'book-outline',
      screen: 'FumehoodTypes',
    },
  ];

  const standards = [
    {
      title: 'ANSI/ASHRAE 110-2016',
      description: 'Method of Testing Performance of Laboratory Fume Hoods',
      icon: 'document-text-outline',
      screen: 'FumehoodStandards',
    },
    {
      title: 'NEBB Fume Hood Testing',
      description: 'NEBB Procedural Standards for Fume Hood Performance Testing',
      icon: 'shield-checkmark-outline',
      screen: 'FumehoodNEBBStandards',
    },
  ];

  return (
    <CalcScreen
      title="Fume Hood Testing"
      subtitle="NEBB & ANSI/ASHRAE 110 compliant fume hood performance calculations"
    >
      <CalcSection>
        <Title style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Fume Hood Calculators</Title>
        {fumehoodCategories.map((category, index) => (
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

export default FumehoodOverviewScreen;

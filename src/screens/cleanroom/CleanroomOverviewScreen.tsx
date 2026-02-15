import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Paragraph, Text, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { CalcCard, CalcScreen, CalcSection } from '../../components/nebb';

const CleanroomOverviewScreen = () => {
  const navigation = useNavigation();

  const cleanroomCategories = [
    {
      title: 'Classifications',
      description: 'NEBB-ready particle classification reference (ISO classes shown as secondary standard info)',
      icon: '📊',
      color: '#3b82f6',
      screen: 'CleanroomClassifications',
      features: [
        'NEBB-friendly classification reference table',
        'Particle count limits per cubic meter',
        'Particle count limits per cubic foot',
        'Secondary: ISO Class 1 through ISO Class 9',
      ],
    },
    {
      title: 'Calculations',
      description: 'Air changes, particle counting, and environmental monitoring',
      icon: '🧮',
      color: '#22c55e',
      screen: 'CleanroomCalculations',
      features: [
        'Air changes per hour calculator',
        'Particle concentration calculations',
        'Environmental monitoring tools',
        'CFM requirements calculator',
      ],
    },
    {
      title: 'Scan Rate',
      description: 'Particle counter scan rate and sampling calculations',
      icon: '📏',
      color: '#8b5cf6',
      screen: 'CleanroomScanRate',
      features: [
        'Scan rate calculator',
        'Flow rate calculations',
        'Sampling time calculator',
        'Particle concentration from counts',
      ],
    },
  ];

  const handleNavigation = (screen: string) => {
    try {
      navigation.navigate(screen as never);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <CalcScreen
      title="Cleanroom Testing"
      subtitle="Professional cleanroom measurements and calculations for NEBB certified technicians"
    >
      <CalcSection>
        <Title style={styles.sectionTitle}>Calculation Categories</Title>

        {cleanroomCategories.map((category, index) => (
          <Pressable key={index} onPress={() => handleNavigation(category.screen)} style={({ pressed }) => [styles.cardWrap, pressed && styles.pressed]}>
            <CalcCard>
                <View style={styles.cardHeader}>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <View style={styles.cardTitleContainer}>
                    <Title style={[styles.cardTitle, { color: category.color }]}>{category.title}</Title>
                    <Paragraph style={styles.cardDescription}>{category.description}</Paragraph>
                  </View>
                </View>

                <View style={styles.featuresContainer}>
                  {category.features.map((feature, featureIndex) => (
                    <Text key={featureIndex} style={styles.featureText}>
                      • {feature}
                    </Text>
                  ))}
                </View>

                <View style={styles.navigationButton}>
                  <Text style={[styles.navigationText, { color: category.color }]}>View {category.title} →</Text>
                </View>
            </CalcCard>
          </Pressable>
        ))}
      </CalcSection>

      <CalcSection>
        <Title style={styles.sectionTitle}>About Cleanroom Testing</Title>
        <CalcCard>
          <Paragraph style={styles.aboutText}>
            NEBB cleanroom testing and reporting help verify that controlled environments meet the project requirements for particle
            concentration, airflow (ACH), and environmental conditions.
          </Paragraph>
          <Paragraph style={styles.aboutText}>
            NEBB certified technicians perform comprehensive testing including (standards such as ISO/USP/ASHRAE may apply per project
            and are used as secondary references when required):
          </Paragraph>
          <Paragraph style={styles.aboutText}>• Particle counting and classification verification</Paragraph>
          <Paragraph style={styles.aboutText}>• Air changes per hour calculations</Paragraph>
          <Paragraph style={styles.aboutText}>• Environmental monitoring (temperature, humidity, pressure)</Paragraph>
          <Paragraph style={styles.aboutText}>• Scan rate and sampling volume calculations</Paragraph>
        </CalcCard>
      </CalcSection>
    </CalcScreen>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  cardWrap: {
    marginBottom: 16,
  },
  pressed: {
    opacity: 0.85,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.7,
  },
  featuresContainer: {
    marginBottom: 16,
    marginLeft: 48,
  },
  featureText: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.8,
    marginBottom: 4,
  },
  navigationButton: {
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  navigationText: {
    fontSize: 16,
    fontWeight: '600',
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
});

export default CleanroomOverviewScreen;

import React from 'react';
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Card, Title, Paragraph, Surface, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { liquidLayout } from '../../theme/liquidLayout';

const BETOverviewScreen = () => {
  const navigation = useNavigation();

  const betCategories = [
    {
      title: 'Procedures',
      description: 'ASTM E1827 and E779 testing procedures and standards',
      icon: '📋',
      color: '#3b82f6',
      screen: 'BETProcedures',
      features: [
        'ASTM E1827 depressurization procedures',
        'ASTM E779 pressurization procedures',
        'Blower door testing setup',
        'Testing protocols and standards',
      ],
    },
    {
      title: 'Calculations',
      description: 'Air leakage, effective leakage area, and air tightness calculations',
      icon: '🧮',
      color: '#22c55e',
      screen: 'BETCalculations',
      features: [
        'ASTM E779 pressurization calculations',
        'ASTM E1827 depressurization calculations',
        'Air leakage rate calculator',
        'Effective leakage area calculator',
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
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Building Envelope Testing</Title>
            <Paragraph style={styles.headerSubtitle}>
              Professional building envelope testing for NEBB certified technicians
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Calculation Categories</Title>

        {betCategories.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => handleNavigation(category.screen)}
            style={({ pressed }) => [pressed && styles.cardPressed]}
          >
            <Surface style={styles.liquidCard}>
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <View style={styles.cardTitleContainer}>
                    <Title style={[styles.cardTitle, { color: category.color }]}>
                      {category.title}
                    </Title>
                    <Paragraph style={styles.cardDescription}>
                      {category.description}
                    </Paragraph>
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
                  <Text style={[styles.navigationText, { color: category.color }]}>
                    View {category.title} →
                  </Text>
                </View>
              </View>
            </Surface>
          </Pressable>
        ))}
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>About Building Envelope Testing</Title>
        <Card style={styles.aboutCard}>
          <Card.Content>
            <Paragraph style={styles.aboutText}>
              Building Envelope Testing (BET) measures the air tightness of building envelopes
              using blower door testing according to ASTM E1827 and ASTM E779 standards.
            </Paragraph>
            <Paragraph style={styles.aboutText}>
              NEBB certified technicians perform comprehensive testing including:
            </Paragraph>
            <Paragraph style={styles.aboutText}>• Pressurization testing (ASTM E779)</Paragraph>
            <Paragraph style={styles.aboutText}>• Depressurization testing (ASTM E1827)</Paragraph>
            <Paragraph style={styles.aboutText}>• Air leakage rate measurements</Paragraph>
            <Paragraph style={styles.aboutText}>• Effective leakage area calculations</Paragraph>
            <Paragraph style={styles.aboutText}>
              • Air changes per hour at various pressure differentials
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...liquidLayout,

  cardPressed: {
    opacity: 0.8,
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
  aboutCard: {
    borderRadius: 12,
    elevation: 2,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
});

export default BETOverviewScreen;

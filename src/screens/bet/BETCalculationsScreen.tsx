import React from 'react';
import { View, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { Title, Paragraph, Surface, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { liquidLayout } from '../../theme/liquidLayout';

const BETCalculationsScreen = () => {
  const navigation = useNavigation();

  const betCalculations = [
    {
      title: 'ASTM E779 Pressurization',
      description: 'Calculate air leakage rate from pressurization test data',
      icon: '📈',
      color: '#3b82f6',
      screen: 'BETPressurization',
    },
    {
      title: 'ASTM E1827 Depressurization',
      description: 'Calculate air leakage rate from depressurization test data',
      icon: '📉',
      color: '#22c55e',
      screen: 'BETDepressurization',
    },
    {
      title: 'Multi-Point Regression (C & n)',
      description: 'Determine flow coefficient (C) and exponent (n) from multiple test points',
      icon: '📊',
      color: '#0ea5e9',
      screen: 'BETRegression',
    },
    {
      title: 'Air Leakage Rate',
      description: 'Calculate air leakage rate at standard conditions',
      icon: '💨',
      color: '#8b5cf6',
      screen: 'BETAirLeakageRate',
    },
    {
      title: 'Effective Leakage Area',
      description: 'Calculate effective leakage area from test data',
      icon: '📐',
      color: '#f59e0b',
      screen: 'BETEffectiveLeakageArea',
    },
    {
      title: 'Air Changes Per Hour',
      description: 'Calculate air changes per hour at various pressures',
      icon: '🔄',
      color: '#ef4444',
      screen: 'BETAirChangesPerHour',
    },
  ];

  const handleCalculationPress = (calculation: string) => {
    const screenMap: { [key: string]: string } = {
      'ASTM E779 Pressurization': 'BETPressurization',
      'ASTM E1827 Depressurization': 'BETDepressurization',
      'Multi-Point Regression (C & n)': 'BETRegression',
      'Air Leakage Rate': 'BETAirLeakageRate',
      'Effective Leakage Area': 'BETEffectiveLeakageArea',
      'Air Changes Per Hour': 'BETAirChangesPerHour',
    };

    const screenName = screenMap[calculation];
    if (screenName) {
      navigation.navigate(screenName as never);
    } else {
      Alert.alert('Coming Soon', `${calculation} calculator will be available soon!`);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>BET Calculations</Title>
            <Paragraph style={styles.headerSubtitle}>
              Building envelope testing calculations and measurements
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Calculation Tools</Title>

        {betCalculations.map((calculation, index) => (
          <Pressable key={index} onPress={() => handleCalculationPress(calculation.title)}>
            <Surface style={styles.liquidCard}>
              <View style={styles.cardContent}>
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.calculationIcon}>{calculation.icon}</Text>
                  <View style={styles.cardTitleContainer}>
                    <Title style={[styles.cardTitle, { color: calculation.color }]}>
                      {calculation.title}
                    </Title>
                    <Paragraph style={styles.cardDescription}>
                      {calculation.description}
                    </Paragraph>
                  </View>
                  <Text style={[styles.calculationArrow, { color: calculation.color }]}>→</Text>
                </View>
              </View>
            </Surface>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...liquidLayout,
  calculationIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  calculationArrow: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default BETCalculationsScreen;

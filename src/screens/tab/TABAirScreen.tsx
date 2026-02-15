import React from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { Paragraph, Text, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { CalcCard, CalcScreen, CalcSection } from '../../components/nebb';

const TABAirScreen = () => {
  const navigation = useNavigation();

  const airCategories = [
    {
      title: 'Airflow & Velocity',
      description: 'Basic airflow calculations and measurements',
      icon: '💨',
      color: '#22c55e',
      calculations: [
        'Volumetric Flow Rate',
        'Total Pressure',
        'Velocity of Air',
        'Pitot Traverse Averaging',
        'Flow Hood K-Factor',
        'Duct Leakage (Class)',
        'Air Changes',
        'Duct Area',
        'Hood Face Velocity',
      ],
    },
    {
      title: 'Ductwork Losses',
      description: 'Friction loss, fitting loss, and equivalent length',
      icon: '🧮',
      color: '#16a34a',
      calculations: ['Duct Friction Loss', 'Fitting Loss & Equivalent Length', 'Filter Loading ΔP'],
    },
    {
      title: 'Air Temperature',
      description: 'Temperature and psychrometric calculations',
      icon: '🌡️',
      color: '#ef4444',
      calculations: [
        'Mixed Air Temperature',
        'Mixed Air Enthalpy',
        'Outside Air Percentage',
        'Psychrometrics (ASHRAE)',
        'Mixed Air (Psychrometrics)',
      ],
    },
    {
      title: 'Heat Transfer',
      description: 'Heat transfer and energy calculations',
      icon: '🔥',
      color: '#f97316',
      calculations: [
        'Heat Transfer (Total)',
        'Sensible Heat Transfer',
        'Latent Heat Transfer',
        'Sensible Heat Ratio',
        'Q Btuh',
      ],
    },
    {
      title: 'Fan Equations',
      description: 'Fan performance and affinity laws',
      icon: '🔄',
      color: '#8b5cf6',
      calculations: ['Fan Affinity Laws', 'Tip Speed'],
    },
    {
      title: 'Sheave Equations',
      description: 'Pulley and belt calculations',
      icon: '⚙️',
      color: '#6b7280',
      calculations: ['RPM and PD', 'Fan Belt Length'],
    },
    {
      title: 'Tools',
      description: 'Quick field conversions and utilities',
      icon: '🧰',
      color: '#0ea5e9',
      calculations: ['Unit Converter'],
    },
  ];

  const handleCalculationPress = (category: string, calculation: string) => {
    // Map calculation names to actual screen names
    const screenMap: { [key: string]: string } = {
      'Volumetric Flow Rate': 'AirflowVolumetricFlowRate',
      'Total Pressure': 'AirflowTotalPressure',
      'Velocity of Air': 'AirflowVelocityOfAir',
      'Pitot Traverse Averaging': 'AirflowPitotTraverseAveraging',
      'Flow Hood K-Factor': 'AirflowFlowHoodKFactor',
      'Duct Leakage (Class)': 'AirflowDuctLeakageClass',
      'Air Changes': 'AirflowAirChanges',
      'Duct Area': 'AirflowDuctArea',
      'Mixed Air Temperature': 'AirflowMixedAirTemperature',
      'Mixed Air Enthalpy': 'AirTemperatureMixedAirEnthalpy',
      'Outside Air Percentage': 'AirTemperatureOutsideAirPercentage',
      'Psychrometrics (ASHRAE) [Legacy]': 'AirTemperaturePsychrometrics',
      'Mixed Air (Psychrometrics) [Legacy]': 'AirTemperaturePsychrometrics',
      'Heat Transfer (Total)': 'HeatTransferHeatTransferTotal',
      'Sensible Heat Transfer': 'HeatTransferSensibleHeatTransfer',
      'Latent Heat Transfer': 'HeatTransferLatentHeatTransfer',
      'Sensible Heat Ratio': 'HeatTransferSensibleHeatRatio',
      'Q Btuh': 'HeatTransferQBtuh',
      'Fan Affinity Laws': 'FanEquationsFanAffinityLaws',
      'Tip Speed': 'FanEquationsTipSpeed',
      'RPM and PD': 'SheaveEquationsRPMandPD',
      'Fan Belt Length': 'SheaveEquationsFanBeltLength',
      'Hood Face Velocity': 'AirflowHoodFaceVelocity',
      'Fitting Loss & Equivalent Length': 'AirflowFittingLossEquivalentLength',
      'Duct Friction Loss': 'DuctFrictionLoss',
      'Filter Loading ΔP': 'FilterPressureDrop',
      'Psychrometrics (ASHRAE)': 'PsychrometricsDewPointEnthalpy',
      'Mixed Air (Psychrometrics)': 'PsychrometricsMixedAir',
      'Unit Converter': 'UnitConversions',
    };

    const screenName = screenMap[calculation];
    if (screenName) {
      navigation.navigate(screenName as never);
    } else {
      Alert.alert('Coming Soon', `${calculation} calculator will be available soon!`);
    }
  };

  return (
    <CalcScreen
      title="Air Calculations"
      subtitle="Airflow, temperature, heat transfer, and fan equations for TAB procedures"
    >
      <CalcSection>
        <Title style={styles.sectionTitle}>Air Categories</Title>

        {airCategories.map((category, index) => (
          <CalcCard key={`${category.title}-${index}`}>
            <View style={styles.cardHeader}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <View style={styles.cardTitleContainer}>
                <Title style={[styles.cardTitle, { color: category.color }]}>{category.title}</Title>
                <Paragraph style={styles.cardDescription}>{category.description}</Paragraph>
              </View>
            </View>

            <View style={styles.calculationsContainer}>
              {category.calculations.map((calculation, calcIndex) => (
                <Pressable key={calcIndex} onPress={() => handleCalculationPress(category.title, calculation)}>
                  <View style={styles.calculationItem}>
                    <View style={styles.calculationContent}>
                      <Text style={styles.calculationText}>{calculation}</Text>
                      <Text style={[styles.calculationArrow, { color: category.color }]}>→</Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </CalcCard>
        ))}
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.7,
  },
  calculationsContainer: {
    gap: 8,
  },
  calculationItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  calculationContent: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calculationText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  calculationArrow: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TABAirScreen;

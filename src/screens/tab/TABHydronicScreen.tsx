import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Pressable,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  useTheme,
  Surface,
  Text,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const TABHydronicScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const hydronicCategories = [
    {
      title: 'Pump Laws',
      description: 'Pump performance and efficiency calculations',
      icon: '⚡',
      color: '#3b82f6',
      calculations: [
        'Water Horsepower',
        'Brake Horsepower',
        'Pump Efficiency'
      ]
    },
    {
      title: 'Delta P, Cv, and GPM',
      description: 'Pressure drop and flow rate calculations',
      icon: '📊',
      color: '#06b6d4',
      calculations: [
        'Coil Delta P',
        'Cv and GPM'
      ]
    },
    {
      title: 'Heat Transfer',
      description: 'Heat transfer calculations for hydronic systems',
      icon: '🔥',
      color: '#f97316',
      calculations: [
        'Heat Transfer Calculations'
      ]
    },
    {
      title: 'Boiler',
      description: 'Boiler performance and operating calculations',
      icon: '🏭',
      color: '#dc2626',
      calculations: [
        'Output',
        'Fire Rate',
        'Operating Cost'
      ]
    }
  ];

  const handleCalculationPress = (category: string, calculation: string) => {
    // Map calculation names to actual screen names
    const screenMap: { [key: string]: string } = {
      'Water Horsepower': 'HydronicPumpLawsWaterHorsepower',
      'Brake Horsepower': 'HydronicPumpLawsBrakeHorsepower',
      'Pump Efficiency': 'HydronicPumpEfficiency',
      'Coil Delta P': 'HydronicDeltaPCoilDeltaP',
      'Cv and GPM': 'HydronicDeltaPCvandGPM',
      'Heat Transfer Calculations': 'HydronicHeatTransferHeatTransferCalculations',
      'Output': 'HydronicBoilerOutput',
      'Fire Rate': 'HydronicBoilerFireRate',
      'Operating Cost': 'HydronicBoilerOperatingCost'
    };
    
    const screenName = screenMap[calculation];
    if (screenName) {
      navigation.navigate(screenName as never);
    } else {
      // For calculations that don't have screens yet, show a placeholder
      Alert.alert('Coming Soon', `${calculation} calculator will be available soon!`);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Hydronic Calculations</Title>
            <Paragraph style={styles.headerSubtitle}>
              Pump laws, efficiency, heat transfer, and boiler calculations for TAB procedures
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Hydronic Categories</Title>
        
        {hydronicCategories.map((category, index) => (
          <Surface key={index} style={styles.liquidCard}>
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
              
              <View style={styles.calculationsContainer}>
                {category.calculations.map((calculation, calcIndex) => (
                  <Pressable 
                    key={calcIndex} 
                    onPress={() => handleCalculationPress(category.title, calculation)}
                  >
                    <Surface style={styles.calculationItem}>
                      <View style={styles.calculationContent}>
                        <Text style={styles.calculationText}>{calculation}</Text>
                        <Text style={[styles.calculationArrow, { color: category.color }]}>
                          →
                        </Text>
                      </View>
                    </Surface>
                  </Pressable>
                ))}
              </View>
            </View>
          </Surface>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 24,
  },
  header: {
    borderRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  headerGradient: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 24,
    borderRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#000000',
    opacity: 0.8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  liquidCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardContent: {
    padding: 20,
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

export default TABHydronicScreen;

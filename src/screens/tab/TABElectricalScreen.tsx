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

const TABElectricalScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const electricalCategories = [
    {
      title: 'Power',
      description: 'Power calculations and relationships',
      icon: '⚡',
      color: '#f59e0b',
      calculations: [
        'Power Calculations'
      ]
    },
    {
      title: 'Volts/Amps/Ohms',
      description: 'Electrical relationships and Ohm\'s Law',
      icon: '🔌',
      color: '#8b5cf6',
      calculations: [
        'Electrical Relationships'
      ]
    },
    {
      title: 'Motor Calculations',
      description: 'Motor performance and efficiency calculations',
      icon: '🔧',
      color: '#06b6d4',
      calculations: [
        'Brake Horsepower',
        'FLA',
        'Fan Horsepower'
      ]
    },
    {
      title: 'Electrical Systems',
      description: 'System-level electrical calculations',
      icon: '🏗️',
      color: '#dc2626',
      calculations: [
        'Total Resistance',
        'Primary/Secondary',
        'Voltage Drop'
      ]
    }
  ];

  const handleCalculationPress = (category: string, calculation: string) => {
    // Map calculation names to actual screen names
    const screenMap: { [key: string]: string } = {
      'Power Calculations': 'ElectricalPowerPowerCalculations',
      'Electrical Relationships': 'ElectricalVoltsAmpsOhms',
      'Brake Horsepower': 'ElectricalMotorCalculationsBrakeHorsepower',
      'FLA': 'ElectricalMotorFLA',
      'Fan Horsepower': 'ElectricalMotorCalculationsFanHorsepower',
      'Total Resistance': 'ElectricalElectricalSystemsTotalResistance',
      'Primary/Secondary': 'ElectricalElectricalSystemsPrimarySecondary',
      'Voltage Drop': 'ElectricalElectricalSystemsVoltageDrop'
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
            <Title style={styles.headerTitle}>Electrical Calculations</Title>
            <Paragraph style={styles.headerSubtitle}>
              Power, electrical relationships, and motor calculations for TAB procedures
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Electrical Categories</Title>
        
        {electricalCategories.map((category, index) => (
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

export default TABElectricalScreen;

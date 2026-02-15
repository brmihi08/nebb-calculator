import React from 'react';
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Title, Paragraph, Surface, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { baseScreenStyles } from '../../theme/screenStyles';

const TABOverviewScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const tabCategories = [
    {
      title: 'Air',
      description: 'Airflow, temperature, heat transfer, and fan equations',
      icon: '🌬️',
      color: '#22c55e',
      subcategories: [
        {
          title: 'Airflow & Velocity',
          items: ['Volumetric Flow Rate', 'Total Pressure', 'Velocity of Air', 'Air Changes', 'Duct Area'],
        },
        {
          title: 'Air Temperature',
          items: ['Mixed Air Temperature', 'Mixed Air Enthalpy', 'Outside Air Percentage'],
        },
        {
          title: 'Heat Transfer',
          items: ['Heat Transfer (Total)', 'Sensible Heat Transfer', 'Latent Heat Transfer', 'Sensible Heat Ratio', 'Q Btuh'],
        },
        {
          title: 'Fan Equations',
          items: ['Fan Affinity Laws', 'Tip Speed'],
        },
        {
          title: 'Sheave Equations',
          items: ['RPM and PD', 'Fan Belt Length'],
        },
      ],
    },
    {
      title: 'Hydronic',
      description: 'Pump laws, efficiency, heat transfer, and boiler calculations',
      icon: '💧',
      color: '#3b82f6',
      subcategories: [
        {
          title: 'Pump Laws',
          items: ['Water Horsepower', 'Brake Horsepower', 'Pump Efficiency'],
        },
        {
          title: 'Delta P, Cv, and GPM',
          items: ['Coil Delta P', 'Cv and GPM'],
        },
        {
          title: 'Heat Transfer',
          items: ['Heat Transfer Calculations'],
        },
        {
          title: 'Boiler',
          items: ['Output', 'Fire Rate', 'Operating Cost'],
        },
      ],
    },
    {
      title: 'Electrical',
      description: 'Power, electrical relationships, and motor calculations',
      icon: '⚡',
      color: '#f59e0b',
      subcategories: [
        {
          title: 'Power',
          items: ['Power Calculations'],
        },
        {
          title: 'Volts/Amps/Ohms',
          items: ['Electrical Relationships'],
        },
        {
          title: 'Motor Calculations',
          items: ['Brake Horsepower', 'FLA', 'Fan Horsepower'],
        },
        {
          title: 'Electrical Systems',
          items: ['Total Resistance', 'Primary/Secondary', 'Voltage Drop'],
        },
      ],
    },
  ];

  const handleCategoryPress = (category: any) => {
    switch (category.title) {
      case 'Air':
        navigation.navigate('TABAir' as never);
        break;
      case 'Hydronic':
        navigation.navigate('TABHydronic' as never);
        break;
      case 'Electrical':
        navigation.navigate('TABElectrical' as never);
        break;
    }
  };

  return (
    <ScrollView style={baseScreenStyles.container}>
      <View style={baseScreenStyles.headerContainer}>
        <Surface style={baseScreenStyles.header}>
          <View style={baseScreenStyles.headerGradient}>
            <Title style={baseScreenStyles.headerTitle}>TAB Procedures</Title>
            <Paragraph style={baseScreenStyles.headerSubtitle}>
              Testing, Adjusting, and Balancing calculations for NEBB certified technicians
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={baseScreenStyles.section}>
        <Title style={baseScreenStyles.sectionTitle}>Calculation Categories</Title>

        {tabCategories.map((category, index) => (
          <Pressable key={index} onPress={() => handleCategoryPress(category)}>
            <Surface style={baseScreenStyles.liquidCard}>
              <View style={baseScreenStyles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <View style={styles.cardTitleContainer}>
                    <Title style={[styles.cardTitle, { color: category.color }]}>{category.title}</Title>
                    <Paragraph style={[styles.cardDescription, { color: theme.colors.onSurfaceVariant }]}>{category.description}</Paragraph>
                  </View>
                </View>

                <View style={styles.subcategoriesContainer}>
                  {category.subcategories.map((subcategory: any, subIndex: number) => (
                    <View key={subIndex} style={styles.subcategory}>
                      <Text style={[styles.subcategoryTitle, { color: theme.colors.onSurface }]}>{subcategory.title}</Text>
                      <View style={styles.itemsList}>
                        {subcategory.items.map((item: string, itemIndex: number) => (
                          <Text key={itemIndex} style={[styles.itemText, { color: theme.colors.onSurfaceVariant }]}>
                            • {item}
                          </Text>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>

                <View style={[styles.navigationButton, { borderTopColor: theme.colors.outline }]}>
                  <Text style={[styles.navigationText, { color: category.color }]}>View {category.title} Calculations →</Text>
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
    opacity: 0.7,
  },
  subcategoriesContainer: {
    marginBottom: 16,
  },
  subcategory: {
    marginBottom: 12,
  },
  subcategoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  itemsList: {
    marginLeft: 16,
  },
  itemText: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 2,
  },
  navigationButton: {
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  navigationText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TABOverviewScreen;

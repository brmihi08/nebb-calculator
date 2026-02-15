import React, { useMemo } from 'react';
import {
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  Title,
  Paragraph,
  Surface,
  Text,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { createLiquidStyles, LIQUID_BACKGROUND } from '../shared/liquidStyles';

const FumehoodOverviewScreen = () => {
  const navigation = useNavigation();
  const styles = useMemo(() => createLiquidStyles('#22c55e'), []);

  const fumehoodCategories = [
    {
      title: 'Types',
      description: 'Standard, high performance, radioisotope, and perchloric acid fume hoods',
      icon: '🔬',
      color: '#3b82f6',
      screen: 'FumehoodTypes',
      features: [
        'Standard fume hood specifications',
        'High performance hood details',
        'Radioisotope hood requirements',
        'Perchloric acid hood specifications',
      ],
    },
    {
      title: 'Calculations',
      description: 'Face velocity, CFM, face area, and pressure differential calculations',
      icon: '🧮',
      color: '#22c55e',
      screen: 'FumehoodCalculations',
      features: [
        'Face velocity calculator',
        'Multi-point average face velocity',
        'Face area calculator',
        'Pressure differential measurements',
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
    <ScrollView style={[styles.container, { backgroundColor: LIQUID_BACKGROUND }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Fume Hood Testing</Title>
            <Paragraph style={styles.headerSubtitle}>
              Professional fume hood measurements and calculations for NEBB certified technicians
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Overview</Title>

        {fumehoodCategories.map((category) => (
          <Pressable
            key={category.title}
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
                    <Paragraph style={styles.cardDescription}>{category.description}</Paragraph>
                  </View>
                </View>

                <View style={styles.featuresContainer}>
                  {category.features.map((feature) => (
                    <Text key={feature} style={styles.featureText}>
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
        <Title style={styles.sectionTitle}>About Fume Hood Testing</Title>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <Paragraph style={{ fontSize: 14, lineHeight: 20, marginBottom: 12 }}>
              Fume hood testing ensures that laboratory ventilation systems provide adequate
              containment and protection for personnel working with hazardous materials.
            </Paragraph>
            <Paragraph style={{ fontSize: 14, lineHeight: 20, marginBottom: 12 }}>
              NEBB certified technicians perform comprehensive testing including:
            </Paragraph>
            <Text style={{ fontSize: 14, color: '#000000', opacity: 0.8, marginBottom: 6 }}>
              • Face velocity measurements and verification
            </Text>
            <Text style={{ fontSize: 14, color: '#000000', opacity: 0.8, marginBottom: 6 }}>
              • Airflow rate (CFM) calculations
            </Text>
            <Text style={{ fontSize: 14, color: '#000000', opacity: 0.8, marginBottom: 6 }}>
              • Pressure differential measurements
            </Text>
            <Text style={{ fontSize: 14, color: '#000000', opacity: 0.8 }}>
              • Containment testing and smoke visualization
            </Text>
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

export default FumehoodOverviewScreen;

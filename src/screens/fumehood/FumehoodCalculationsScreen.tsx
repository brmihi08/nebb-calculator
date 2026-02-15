import React, { useMemo } from 'react';
import {
  View,
  ScrollView,
  Alert,
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

const FumehoodCalculationsScreen = () => {
  const navigation = useNavigation();
  const styles = useMemo(() => createLiquidStyles('#22c55e'), []);

  const tools = [
    {
      title: 'Face Velocity & CFM',
      color: '#22c55e',
      screen: 'FumehoodFaceVelocity',
    },
    {
      title: 'Multi-Point Average (Face Velocity)',
      color: '#22c55e',
      screen: 'FumehoodMultiPointAverage',
    },
    {
      title: 'Face Area',
      color: '#3b82f6',
      screen: 'FumehoodFaceArea',
    },
    {
      title: 'Pressure Differential',
      color: '#8b5cf6',
      screen: 'FumehoodPressureDifferential',
    },
  ];

  const handlePress = (tool: (typeof tools)[number]) => {
    try {
      navigation.navigate(tool.screen as never);
    } catch (e) {
      Alert.alert('Navigation Error', 'Unable to open this tool.');
      console.error(e);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: LIQUID_BACKGROUND }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Fume Hood Calculations</Title>
            <Paragraph style={styles.headerSubtitle}>
              Face velocity, multi-point averaging, pressure differential, and area calculations
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Calculation Tools</Title>

        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.categoryIcon}>🧮</Text>
              <View style={styles.cardTitleContainer}>
                <Title style={[styles.cardTitle, { color: '#22c55e' }]}>Tools</Title>
                <Paragraph style={styles.cardDescription}>
                  Select a calculator to get started.
                </Paragraph>
              </View>
            </View>

            <View style={styles.calculationsContainer}>
              {tools.map((tool) => (
                <Pressable key={tool.title} onPress={() => handlePress(tool)}>
                  <Surface style={styles.calculationItem}>
                    <View style={styles.calculationContent}>
                      <Text style={styles.calculationText}>{tool.title}</Text>
                      <Text style={[styles.calculationArrow, { color: tool.color }]}>→</Text>
                    </View>
                  </Surface>
                </Pressable>
              ))}
            </View>
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

export default FumehoodCalculationsScreen;

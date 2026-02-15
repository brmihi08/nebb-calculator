import React from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { Paragraph, Text, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { CalcCard, CalcScreen, CalcSection } from '../../components/nebb';

const CleanroomCalculationsScreen = () => {
  const navigation = useNavigation();

  const cleanroomCalculations = [
    {
      title: 'Air Changes Per Hour',
      description: 'Calculate air changes, airflow, or room volume',
      icon: '🌬️',
      color: '#22c55e',
      screen: 'CleanroomAirChangesPerHour',
    },
    {
      title: 'ACH Verification',
      description: 'Compare measured CFM vs target ACH and calculate offsets',
      icon: '✅',
      color: '#10b981',
      screen: 'CleanroomAirChangeVerification',
    },
    {
      title: 'Room Area & Volume',
      description: 'Calculate room area and volume from dimensions',
      icon: '📐',
      color: '#f59e0b',
      screen: 'CleanroomRoomVolume',
    },
    {
      title: 'Particle Concentration',
      description: 'Calculate particle concentration from count and sample volume',
      icon: '🔬',
      color: '#3b82f6',
      screen: 'CleanroomParticleConcentration',
    },
    {
      title: 'Sampling Locations',
      description: 'NEBB planning tool for minimum particle count sample locations',
      icon: '📍',
      color: '#6366f1',
      screen: 'CleanroomSamplingLocations',
    },
    {
      title: 'Pressure Differential',
      description: 'NEBB reporting conversion (Pa ⇄ in.w.g)',
      icon: '🧭',
      color: '#f43f5e',
      screen: 'CleanroomPressureDifferential',
    },
  ];

  const handleCalculationPress = (calculation: string) => {
    const screenMap: { [key: string]: string } = {
      'Air Changes Per Hour': 'CleanroomAirChangesPerHour',
      'ACH Verification': 'CleanroomAirChangeVerification',
      'Room Area & Volume': 'CleanroomRoomVolume',
      'Particle Concentration': 'CleanroomParticleConcentration',
      'Sampling Locations': 'CleanroomSamplingLocations',
      'Pressure Differential': 'CleanroomPressureDifferential',
    };

    const screenName = screenMap[calculation];
    if (screenName) {
      navigation.navigate(screenName as never);
    } else {
      Alert.alert('Coming Soon', `${calculation} calculator will be available soon!`);
    }
  };

  return (
    <CalcScreen title="Cleanroom Calculations" subtitle="Air changes, particle counting, and environmental monitoring">
      <CalcSection>
        <Title style={styles.sectionTitle}>Calculation Tools</Title>

        {cleanroomCalculations.map((calculation, index) => (
          <View key={index} style={styles.cardWrap}>
            <Pressable onPress={() => handleCalculationPress(calculation.title)} style={({ pressed }) => [pressed && styles.pressed]}>
              <CalcCard>
                <View style={styles.cardHeader}>
                  <Text style={styles.icon}>{calculation.icon}</Text>
                  <View style={styles.cardTitleContainer}>
                    <Title style={[styles.cardTitle, { color: calculation.color }]}>{calculation.title}</Title>
                    <Paragraph style={styles.cardDescription}>{calculation.description}</Paragraph>
                  </View>
                  <Text style={[styles.arrow, { color: calculation.color }]}>→</Text>
                </View>
              </CalcCard>
            </Pressable>
          </View>
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
  cardWrap: {
    marginBottom: 16,
  },
  pressed: {
    opacity: 0.85,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
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
  arrow: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CleanroomCalculationsScreen;

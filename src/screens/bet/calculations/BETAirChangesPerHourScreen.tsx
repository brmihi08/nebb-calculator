import React, { useState } from 'react';
import { calcAchFromCfm, calcCfmFromAch } from '../../../lib/calcs/airChanges';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Title,
  Paragraph,
  TextInput,
  Button,
  Surface,
  Text,
} from 'react-native-paper';
import { screenBackground } from '../../../theme/screenStyles';
import { liquidLayout, liquidCalcLayout, makeCalcAccentStyles } from '../../../theme/liquidLayout';

const ACCENT = '#ef4444';

const BETAirChangesPerHourScreen = () => {
  const [airflowRate, setAirflowRate] = useState('');
  const [buildingVolume, setBuildingVolume] = useState('');
  const [airChangesPerHour, setAirChangesPerHour] = useState('');

  const calculateMissingValue = () => {
    const values = [airflowRate, buildingVolume, airChangesPerHour];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // ACH = (Q × 60) / Volume
    // Where: ACH = Air Changes Per Hour, Q = Airflow Rate (CFM), Volume = Building Volume (ft³)
    if (airChangesPerHour === '') {
      const q = parseFloat(airflowRate);
      const volume = parseFloat(buildingVolume);
      if (volume === 0) {
        Alert.alert('Error', 'Building volume cannot be zero');
        return;
      }
      const ach = calcAchFromCfm(volume, q);
      setAirChangesPerHour(ach.toFixed(2));
    } else if (airflowRate === '') {
      const ach = parseFloat(airChangesPerHour);
      const volume = parseFloat(buildingVolume);
      const q = calcCfmFromAch(volume, ach);
      setAirflowRate(q.toFixed(2));
    } else if (buildingVolume === '') {
      const q = parseFloat(airflowRate);
      const ach = parseFloat(airChangesPerHour);
      if (ach === 0) {
        Alert.alert('Error', 'Air changes per hour cannot be zero');
        return;
      }
      const volume = (q * 60) / ach;
      setBuildingVolume(volume.toFixed(2));
    }
  };

  const clearAll = () => {
    setAirflowRate('');
    setBuildingVolume('');
    setAirChangesPerHour('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: screenBackground }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Air Changes Per Hour</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate air changes per hour from airflow rate and building volume
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>ACH = (Q × 60) / Volume</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: ACH = Air Changes Per Hour, Q = Airflow Rate (CFM), Volume = Building Volume (ft³)
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Airflow Rate (CFM)"
                value={airflowRate}
                onChangeText={setAirflowRate}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Building Volume (ft³)"
                value={buildingVolume}
                onChangeText={setBuildingVolume}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Air Changes Per Hour (ACH)"
                value={airChangesPerHour}
                onChangeText={setAirChangesPerHour}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={calculateMissingValue}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Calculate
              </Button>
              <Button
                mode="outlined"
                onPress={clearAll}
                style={styles.clearButton}
                labelStyle={styles.clearButtonLabel}
              >
                Clear All
              </Button>
            </View>

            {(airflowRate || buildingVolume || airChangesPerHour) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {airflowRate && <Text style={styles.resultValue}>Airflow Rate: {airflowRate} CFM</Text>}
                {buildingVolume && <Text style={styles.resultValue}>Building Volume: {buildingVolume} ft³</Text>}
                {airChangesPerHour && <Text style={styles.resultValue}>Air Changes/Hour: {airChangesPerHour} ACH</Text>}
              </View>
            )}
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <Title style={styles.infoTitle}>Typical ACH Values</Title>
            <Paragraph style={styles.infoText}>
              • Tight buildings: &lt; 0.5 ACH50
            </Paragraph>
            <Paragraph style={styles.infoText}>
              • Standard buildings: 0.5 - 2.0 ACH50
            </Paragraph>
            <Paragraph style={styles.infoText}>
              • Leaky buildings: &gt; 2.0 ACH50
            </Paragraph>
            <Paragraph style={styles.infoText}>
              • Passive House: ≤ 0.05 ACH50
            </Paragraph>
            <Paragraph style={styles.infoText}>
              Note: ACH50 = Air changes per hour at 50 Pa pressure differential
            </Paragraph>
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...liquidLayout,
  ...liquidCalcLayout,
  ...makeCalcAccentStyles(ACCENT),

  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000000',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    color: '#000000',
    opacity: 0.9,
  },
});

export default BETAirChangesPerHourScreen;




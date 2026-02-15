import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph, Text, TextInput, Title } from 'react-native-paper';
import {
  CalcCard,
  CalcScreen,
  CalcSection,
} from '../../components/nebb';

const ACCENT_COLOR = '#2196F3'; // Blue for Cleanroom

const CleanroomEnvironmentalMonitoringScreen = () => {
  const [pressureDifferential, setPressureDifferential] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');

  return (
    <CalcScreen title="Environmental Monitoring" subtitle="Monitor pressure differential, temperature, and humidity">
      <CalcSection>
        <CalcCard>
          <View style={styles.inputRow}>
            <TextInput
              label="Pressure Differential (Pa)"
              value={pressureDifferential}
              onChangeText={setPressureDifferential}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Temperature (°F)"
              value={temperature}
              onChangeText={setTemperature}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>
          <View style={styles.inputRow}>
            <TextInput
              label="Relative Humidity (%)"
              value={humidity}
              onChangeText={setHumidity}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>
        </CalcCard>
      </CalcSection>
    </CalcScreen>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
  },
});

export default CleanroomEnvironmentalMonitoringScreen;

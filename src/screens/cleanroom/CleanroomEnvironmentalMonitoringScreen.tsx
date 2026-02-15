import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph, Text, TextInput, Title, useTheme } from 'react-native-paper';
import {
  CalcCard,
  CalcScreen,
  CalcSection,
} from '../../components/nebb';

const ACCENT_COLOR = '#2196F3'; // Blue for Cleanroom

const inputStyle = (theme: { colors: { surfaceVariant: string; onSurface: string; onSurfaceVariant: string } }) => ({
  backgroundColor: theme.colors.surfaceVariant,
  color: theme.colors.onSurface,
});
const inputColors = (theme: { colors: { onSurface: string; onSurfaceVariant: string } }) => ({
  textColor: theme.colors.onSurface,
  placeholderTextColor: theme.colors.onSurfaceVariant,
});

const CleanroomEnvironmentalMonitoringScreen = () => {
  const theme = useTheme();
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
              mode="outlined"
              style={[styles.input, inputStyle(theme)]}
              {...inputColors(theme)}
            />
            <TextInput
              label="Temperature (°F)"
              value={temperature}
              onChangeText={setTemperature}
              keyboardType="numeric"
              mode="outlined"
              style={[styles.input, inputStyle(theme)]}
              {...inputColors(theme)}
            />
          </View>
          <View style={styles.inputRow}>
            <TextInput
              label="Relative Humidity (%)"
              value={humidity}
              onChangeText={setHumidity}
              keyboardType="numeric"
              mode="outlined"
              style={[styles.input, inputStyle(theme)]}
              {...inputColors(theme)}
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
    borderRadius: 12,
  },
});

export default CleanroomEnvironmentalMonitoringScreen;

import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Paragraph, Text, TextInput, Title, useTheme } from 'react-native-paper';
import {
  CalcCard,
  CalcScreen,
  CalcSection,
  FormulaBlock,
  ResultBlock,
  formulaTextStyles,
  resultTextStyles,
} from '../../components/nebb';

const ACCENT_COLOR = '#2196F3'; // Blue for Cleanroom

const CleanroomParticleCountingScreen = () => {
  const theme = useTheme();
  const [particleCount, setParticleCount] = useState('');
  const [sampleVolume, setSampleVolume] = useState('');
  const [particleConcentration, setParticleConcentration] = useState('');

  const calculateParticleConcentration = () => {
    if (!particleCount || !sampleVolume) {
      Alert.alert('Error', 'Please enter both Particle Count and Sample Volume');
      return;
    }
    const count = parseFloat(particleCount);
    const volume = parseFloat(sampleVolume);
    if (volume === 0) {
      Alert.alert('Error', 'Sample volume cannot be zero');
      return;
    }
    const concentration = count / volume;
    setParticleConcentration(concentration.toFixed(2));
  };

  const clearAll = () => {
    setParticleCount('');
    setSampleVolume('');
    setParticleConcentration('');
  };

  return (
    <CalcScreen title="Particle Counting Calculator" subtitle="Calculate particle concentration per cubic foot">
      <CalcSection>
        <CalcCard>
          <FormulaBlock accentColor={ACCENT_COLOR} title="Formula">
            <Text style={formulaTextStyles.formulaText}>Concentration = Particle Count / Sample Volume</Text>
          </FormulaBlock>

          <View style={styles.inputRow}>
            <TextInput
              label="Particle Count"
              value={particleCount}
              onChangeText={setParticleCount}
              keyboardType="numeric"
              mode="outlined"
              style={[styles.input, { backgroundColor: theme.colors.surfaceVariant, color: theme.colors.onSurface }]}
              textColor={theme.colors.onSurface}
              placeholderTextColor={theme.colors.onSurfaceVariant}
            />
            <TextInput
              label="Sample Volume (ft³)"
              value={sampleVolume}
              onChangeText={setSampleVolume}
              keyboardType="numeric"
              mode="outlined"
              style={[styles.input, { backgroundColor: theme.colors.surfaceVariant, color: theme.colors.onSurface }]}
              textColor={theme.colors.onSurface}
              placeholderTextColor={theme.colors.onSurfaceVariant}
            />
          </View>
          <Button
            mode="contained"
            onPress={calculateParticleConcentration}
            style={[styles.button, { backgroundColor: ACCENT_COLOR }]}
          >
            Calculate Concentration
          </Button>
          {!!particleConcentration && (
            <ResultBlock accentColor={ACCENT_COLOR} label="Particle Concentration:">
              <Text style={resultTextStyles.value}>{particleConcentration} particles/ft³</Text>
            </ResultBlock>
          )}
        </CalcCard>
      </CalcSection>

      <Button
        mode="outlined"
        onPress={clearAll}
        style={[styles.clearButton, { borderColor: ACCENT_COLOR }]}
        textColor={ACCENT_COLOR}
        icon="refresh"
      >
        Clear All
      </Button>
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
  button: {
    marginBottom: 16,
    borderRadius: 16,
  },
  clearButton: {
    marginTop: 16,
    marginBottom: 32,
    borderRadius: 16,
    borderWidth: 2,
  },
});

export default CleanroomParticleCountingScreen;

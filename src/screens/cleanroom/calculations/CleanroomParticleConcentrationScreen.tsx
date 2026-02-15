import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Title, Paragraph, TextInput, Button, Surface, Text, useTheme } from 'react-native-paper';
import { parseNumber, requirePositive, requireNonNegative, round } from '../../../utils/cleanroom';
import { makeCalculatorStyles } from '../../../theme/screenStyles';

const styles = makeCalculatorStyles('#3b82f6');

const CleanroomParticleConcentrationScreen = () => {
  const theme = useTheme();
  const [particleCount, setParticleCount] = useState('');
  const [sampleVolume, setSampleVolume] = useState('');
  const [particleConcentration, setParticleConcentration] = useState('');
  const inputColors = { textColor: theme.colors.onSurface, placeholderTextColor: theme.colors.onSurfaceVariant };

  const calculateMissingValue = () => {
    const values = [particleCount, sampleVolume, particleConcentration];
    const filledCount = values.filter((v) => v.trim() !== '').length;

    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // NEBB-first equation:
    // Concentration = Particle Count / Sample Volume
    if (particleConcentration.trim() === '') {
      const count = parseNumber(particleCount, 'Particle count');
      if ('error' in count) return Alert.alert('Error', count.error);
      const countOk = requireNonNegative(count.value, 'Particle count');
      if ('error' in countOk) return Alert.alert('Error', countOk.error);

      const vol = parseNumber(sampleVolume, 'Sample volume (ft³)');
      if ('error' in vol) return Alert.alert('Error', vol.error);
      const volOk = requirePositive(vol.value, 'Sample volume');
      if ('error' in volOk) return Alert.alert('Error', volOk.error);

      setParticleConcentration(String(round(count.value / vol.value, 2)));
      return;
    }

    if (particleCount.trim() === '') {
      const conc = parseNumber(particleConcentration, 'Particle concentration (particles/ft³)');
      if ('error' in conc) return Alert.alert('Error', conc.error);
      const concOk = requireNonNegative(conc.value, 'Particle concentration');
      if ('error' in concOk) return Alert.alert('Error', concOk.error);

      const vol = parseNumber(sampleVolume, 'Sample volume (ft³)');
      if ('error' in vol) return Alert.alert('Error', vol.error);
      const volOk = requirePositive(vol.value, 'Sample volume');
      if ('error' in volOk) return Alert.alert('Error', volOk.error);

      setParticleCount(String(round(conc.value * vol.value, 2)));
      return;
    }

    if (sampleVolume.trim() === '') {
      const count = parseNumber(particleCount, 'Particle count');
      if ('error' in count) return Alert.alert('Error', count.error);
      const countOk = requireNonNegative(count.value, 'Particle count');
      if ('error' in countOk) return Alert.alert('Error', countOk.error);

      const conc = parseNumber(particleConcentration, 'Particle concentration (particles/ft³)');
      if ('error' in conc) return Alert.alert('Error', conc.error);
      const concOk = requirePositive(conc.value, 'Particle concentration');
      if ('error' in concOk) return Alert.alert('Error', concOk.error);

      setSampleVolume(String(round(count.value / conc.value, 2)));
    }
  };

  const clearAll = () => {
    setParticleCount('');
    setSampleVolume('');
    setParticleConcentration('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: screenBackground }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Particle Concentration</Title>
            <Paragraph style={styles.headerSubtitle}>Calculate particle concentration from count and sample volume</Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>Concentration = Particle Count / Sample Volume</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: Concentration = particles/ft³, Particle Count = total particles, Sample Volume = ft³
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Particle Count"
                value={particleCount}
                onChangeText={setParticleCount}
                keyboardType="numeric"
                style={[styles.input, { backgroundColor: theme.colors.surfaceVariant }]}
                mode="outlined"
                {...inputColors}
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Sample Volume (ft³)"
                value={sampleVolume}
                onChangeText={setSampleVolume}
                keyboardType="numeric"
                style={[styles.input, { backgroundColor: theme.colors.surfaceVariant }]}
                mode="outlined"
                {...inputColors}
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Particle Concentration (particles/ft³)"
                value={particleConcentration}
                onChangeText={setParticleConcentration}
                keyboardType="numeric"
                style={[styles.input, { backgroundColor: theme.colors.surfaceVariant }]}
                mode="outlined"
                {...inputColors}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={calculateMissingValue} style={styles.button} labelStyle={styles.buttonLabel}>
                Calculate
              </Button>
              <Button mode="outlined" onPress={clearAll} style={styles.clearButton} labelStyle={styles.clearButtonLabel}>
                Clear All
              </Button>
            </View>

            {(particleCount || sampleVolume || particleConcentration) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {particleCount && <Text style={styles.resultValue}>Particle Count: {particleCount}</Text>}
                {sampleVolume && <Text style={styles.resultValue}>Sample Volume: {sampleVolume} ft³</Text>}
                {particleConcentration && (
                  <Text style={styles.resultValue}>Concentration: {particleConcentration} particles/ft³</Text>
                )}
              </View>
            )}
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

export default CleanroomParticleConcentrationScreen;

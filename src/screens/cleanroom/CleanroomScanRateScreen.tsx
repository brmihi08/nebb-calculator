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

const ACCENT = '#8b5cf6';

const CleanroomScanRateScreen = () => {
  const theme = useTheme();
  const inputStyle = [styles.input, { backgroundColor: theme.colors.surfaceVariant, color: theme.colors.onSurface }];
  const inputColors = { textColor: theme.colors.onSurface, placeholderTextColor: theme.colors.onSurfaceVariant };
  // Scan Rate Calculations
  const [scanRate, setScanRate] = useState('');
  const [sampleVolume, setSampleVolume] = useState('');
  const [scanTime, setScanTime] = useState('');
  const [particleCount, setParticleCount] = useState('');
  const [concentration, setConcentration] = useState('');

  // Flow Rate Calculations
  const [flowRate, setFlowRate] = useState('');
  const [flowTime, setFlowTime] = useState('');
  const [totalVolume, setTotalVolume] = useState('');

  // Sampling Time Calculations
  const [samplingTime, setSamplingTime] = useState('');
  const [requiredVolume, setRequiredVolume] = useState('');
  const [samplingFlowRate, setSamplingFlowRate] = useState('');

  // Smart calculation for Scan Rate
  const calculateScanRate = () => {
    const values = [scanRate, sampleVolume, scanTime];
    const filledCount = values.filter((v) => v !== '').length;

    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Scan Rate = Sample Volume / Scan Time
    if (scanRate === '') {
      const volume = parseFloat(sampleVolume);
      const time = parseFloat(scanTime);
      if (time === 0) {
        Alert.alert('Error', 'Scan time cannot be zero');
        return;
      }
      const rate = volume / time;
      setScanRate(rate.toFixed(2));
    } else if (sampleVolume === '') {
      const rate = parseFloat(scanRate);
      const time = parseFloat(scanTime);
      const volume = rate * time;
      setSampleVolume(volume.toFixed(2));
    } else if (scanTime === '') {
      const rate = parseFloat(scanRate);
      const volume = parseFloat(sampleVolume);
      if (rate === 0) {
        Alert.alert('Error', 'Scan rate cannot be zero');
        return;
      }
      const time = volume / rate;
      setScanTime(time.toFixed(2));
    }
  };

  // Smart calculation for Flow Rate
  const calculateFlowRate = () => {
    const values = [flowRate, flowTime, totalVolume];
    const filledCount = values.filter((v) => v !== '').length;

    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Flow Rate = Total Volume / Flow Time
    if (flowRate === '') {
      const volume = parseFloat(totalVolume);
      const time = parseFloat(flowTime);
      if (time === 0) {
        Alert.alert('Error', 'Flow time cannot be zero');
        return;
      }
      const rate = volume / time;
      setFlowRate(rate.toFixed(2));
    } else if (totalVolume === '') {
      const rate = parseFloat(flowRate);
      const time = parseFloat(flowTime);
      const volume = rate * time;
      setTotalVolume(volume.toFixed(2));
    } else if (flowTime === '') {
      const rate = parseFloat(flowRate);
      const volume = parseFloat(totalVolume);
      if (rate === 0) {
        Alert.alert('Error', 'Flow rate cannot be zero');
        return;
      }
      const time = volume / rate;
      setFlowTime(time.toFixed(2));
    }
  };

  // Smart calculation for Sampling Time
  const calculateSamplingTime = () => {
    const values = [samplingTime, requiredVolume, samplingFlowRate];
    const filledCount = values.filter((v) => v !== '').length;

    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Sampling Time = Required Volume / Sampling Flow Rate
    if (samplingTime === '') {
      const volume = parseFloat(requiredVolume);
      const rate = parseFloat(samplingFlowRate);
      if (rate === 0) {
        Alert.alert('Error', 'Sampling flow rate cannot be zero');
        return;
      }
      const time = volume / rate;
      setSamplingTime(time.toFixed(2));
    } else if (requiredVolume === '') {
      const time = parseFloat(samplingTime);
      const rate = parseFloat(samplingFlowRate);
      const volume = rate * time;
      setRequiredVolume(volume.toFixed(2));
    } else if (samplingFlowRate === '') {
      const time = parseFloat(samplingTime);
      const volume = parseFloat(requiredVolume);
      if (time === 0) {
        Alert.alert('Error', 'Sampling time cannot be zero');
        return;
      }
      const rate = volume / time;
      setSamplingFlowRate(rate.toFixed(2));
    }
  };

  // Calculate particle concentration
  const calculateConcentration = () => {
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
    const conc = count / volume;
    setConcentration(conc.toFixed(2));
  };

  const clearAll = () => {
    setScanRate('');
    setSampleVolume('');
    setScanTime('');
    setParticleCount('');
    setConcentration('');
    setFlowRate('');
    setFlowTime('');
    setTotalVolume('');
    setSamplingTime('');
    setRequiredVolume('');
    setSamplingFlowRate('');
  };

  const formulas = [
    {
      title: 'Scan Rate',
      formula: 'Scan Rate = Sample Volume / Scan Time',
      description: 'Calculate particle counter scan rate in ft³/min',
    },
    {
      title: 'Flow Rate',
      formula: 'Flow Rate = Total Volume / Flow Time',
      description: 'Calculate particle counter flow rate',
    },
    {
      title: 'Sampling Time',
      formula: 'Sampling Time = Required Volume / Flow Rate',
      description: 'Calculate required sampling time for specific volume',
    },
    {
      title: 'Particle Concentration',
      formula: 'Concentration = Particle Count / Sample Volume',
      description: 'Calculate particle concentration per cubic foot',
    },
  ];

  return (
    <CalcScreen
      title="Particle Counter Scan Rate"
      subtitle="Smart calculator for particle counter scan rate and sampling calculations"
    >
      <CalcSection>
        <Title style={styles.sectionTitle}>Scan Rate Calculator</Title>
        <CalcCard>
          <FormulaBlock accentColor={ACCENT} title="Formula">
            <Text style={formulaTextStyles.formulaText}>Scan Rate = Sample Volume / Scan Time</Text>
          </FormulaBlock>

          <View style={styles.inputRow}>
            <TextInput
              label="Scan Rate (ft³/min)"
              value={scanRate}
              onChangeText={setScanRate}
              keyboardType="numeric"
              style={[inputStyle, styles.inputHalf]} {...inputColors}
              mode="outlined"
            />
            <TextInput
              label="Sample Volume (ft³)"
              value={sampleVolume}
              onChangeText={setSampleVolume}
              keyboardType="numeric"
              style={[inputStyle, styles.inputHalf]} {...inputColors}
              mode="outlined"
            />
          </View>

          <View style={styles.inputRow}>
            <TextInput
              label="Scan Time (min)"
              value={scanTime}
              onChangeText={setScanTime}
              keyboardType="numeric"
              style={inputStyle} {...inputColors}
              mode="outlined"
            />
          </View>

          <Button
            mode="contained"
            onPress={calculateScanRate}
            style={[styles.singleButton, { backgroundColor: ACCENT }]}
            labelStyle={styles.buttonLabel}
          >
            Calculate
          </Button>
        </CalcCard>
      </CalcSection>

      <CalcSection>
        <Title style={styles.sectionTitle}>Flow Rate Calculator</Title>
        <CalcCard>
          <FormulaBlock accentColor={ACCENT} title="Formula">
            <Text style={formulaTextStyles.formulaText}>Flow Rate = Total Volume / Flow Time</Text>
          </FormulaBlock>

          <View style={styles.inputRow}>
            <TextInput
              label="Flow Rate (ft³/min)"
              value={flowRate}
              onChangeText={setFlowRate}
              keyboardType="numeric"
              style={[inputStyle, styles.inputHalf]} {...inputColors}
              mode="outlined"
            />
            <TextInput
              label="Total Volume (ft³)"
              value={totalVolume}
              onChangeText={setTotalVolume}
              keyboardType="numeric"
              style={[inputStyle, styles.inputHalf]} {...inputColors}
              mode="outlined"
            />
          </View>

          <View style={styles.inputRow}>
            <TextInput
              label="Flow Time (min)"
              value={flowTime}
              onChangeText={setFlowTime}
              keyboardType="numeric"
              style={inputStyle} {...inputColors}
              mode="outlined"
            />
          </View>

          <Button
            mode="contained"
            onPress={calculateFlowRate}
            style={[styles.singleButton, { backgroundColor: ACCENT }]}
            labelStyle={styles.buttonLabel}
          >
            Calculate
          </Button>
        </CalcCard>
      </CalcSection>

      <CalcSection>
        <Title style={styles.sectionTitle}>Sampling Time Calculator</Title>
        <CalcCard>
          <FormulaBlock accentColor={ACCENT} title="Formula">
            <Text style={formulaTextStyles.formulaText}>Sampling Time = Required Volume / Flow Rate</Text>
          </FormulaBlock>

          <View style={styles.inputRow}>
            <TextInput
              label="Sampling Time (min)"
              value={samplingTime}
              onChangeText={setSamplingTime}
              keyboardType="numeric"
              style={[inputStyle, styles.inputHalf]} {...inputColors}
              mode="outlined"
            />
            <TextInput
              label="Required Volume (ft³)"
              value={requiredVolume}
              onChangeText={setRequiredVolume}
              keyboardType="numeric"
              style={[inputStyle, styles.inputHalf]} {...inputColors}
              mode="outlined"
            />
          </View>

          <View style={styles.inputRow}>
            <TextInput
              label="Sampling Flow Rate (ft³/min)"
              value={samplingFlowRate}
              onChangeText={setSamplingFlowRate}
              keyboardType="numeric"
              style={inputStyle} {...inputColors}
              mode="outlined"
            />
          </View>

          <Button
            mode="contained"
            onPress={calculateSamplingTime}
            style={[styles.singleButton, { backgroundColor: ACCENT }]}
            labelStyle={styles.buttonLabel}
          >
            Calculate
          </Button>
        </CalcCard>
      </CalcSection>

      <CalcSection>
        <Title style={styles.sectionTitle}>Particle Concentration</Title>
        <CalcCard>
          <FormulaBlock accentColor={ACCENT} title="Formula">
            <Text style={formulaTextStyles.formulaText}>Concentration = Particle Count / Sample Volume</Text>
          </FormulaBlock>

          <View style={styles.inputRow}>
            <TextInput
              label="Particle Count"
              value={particleCount}
              onChangeText={setParticleCount}
              keyboardType="numeric"
              style={[inputStyle, styles.inputHalf]} {...inputColors}
              mode="outlined"
            />
            <TextInput
              label="Sample Volume (ft³)"
              value={sampleVolume}
              onChangeText={setSampleVolume}
              keyboardType="numeric"
              style={[inputStyle, styles.inputHalf]} {...inputColors}
              mode="outlined"
            />
          </View>

          <Button
            mode="contained"
            onPress={calculateConcentration}
            style={[styles.singleButton, { backgroundColor: ACCENT }]}
            labelStyle={styles.buttonLabel}
          >
            Calculate Concentration
          </Button>

          {concentration && (
            <ResultBlock accentColor={ACCENT} label="Concentration:">
              <Text style={resultTextStyles.value}>{concentration} particles/ft³</Text>
            </ResultBlock>
          )}
        </CalcCard>
      </CalcSection>

      <CalcSection>
        <Title style={styles.sectionTitle}>NEBB Scan Rate Formulas</Title>
        {formulas.map((formula, index) => (
          <View key={index} style={styles.formulaCardWrap}>
            <CalcCard>
              <Title style={styles.formulaTitle}>{formula.title}</Title>
              <Text style={styles.formulaInline}>{formula.formula}</Text>
              <Paragraph style={styles.formulaDescription}>{formula.description}</Paragraph>
            </CalcCard>
          </View>
        ))}
      </CalcSection>

      <CalcSection>
        <Button
          mode="outlined"
          onPress={clearAll}
          style={[styles.clearAllButton, { borderColor: ACCENT }]}
          labelStyle={[styles.clearAllLabel, { color: ACCENT }]}
          icon="refresh"
        >
          Clear All
        </Button>
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
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginHorizontal: 4,
  },
  inputHalf: {
    flex: 1,
  },
  singleButton: {
    marginBottom: 4,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  formulaCardWrap: {
    marginBottom: 12,
  },
  formulaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  formulaInline: {
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.04)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    color: '#000000',
  },
  formulaDescription: {
    fontSize: 14,
    opacity: 0.8,
    color: '#000000',
  },
  clearAllButton: {
    marginBottom: 12,
  },
  clearAllLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CleanroomScanRateScreen;

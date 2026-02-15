import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Title,
  Paragraph,
  Button,
} from 'react-native-paper';
import { screenBackground } from '../../../theme/screenStyles';
import { CopyableValueRow, NumericField, FormulaBlock, ResultBlock } from '../../../components/nebb';
import { formatNumber } from '../../../utils/format';

const ElectricalElectricalSystemsVoltageDropScreen = () => {
  const [resistance, setResistance] = useState('');
  const [current, setCurrent] = useState('');
  const [voltageDrop, setVoltageDrop] = useState('');

  const calculateMissingValue = () => {
    const values = [resistance, current, voltageDrop];
    const filledCount = values.filter(v => v !== '').length;

    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values');
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one to calculate it.');
      return;
    }

    try {
      // V = I × R (Ohm's Law)
      if (voltageDrop === '') {
        const r = parseFloat(resistance);
        const i = parseFloat(current);
        const v = i * r;
        setVoltageDrop(formatNumber(v, { decimals: 2 }));
      } else if (current === '') {
        const r = parseFloat(resistance);
        const v = parseFloat(voltageDrop);
        if (r === 0) {
          Alert.alert('Error', 'Resistance cannot be zero');
          return;
        }
        const i = v / r;
        setCurrent(formatNumber(i, { decimals: 2 }));
      } else if (resistance === '') {
        const i = parseFloat(current);
        const v = parseFloat(voltageDrop);
        if (i === 0) {
          Alert.alert('Error', 'Current cannot be zero');
          return;
        }
        const r = v / i;
        setResistance(formatNumber(r, { decimals: 2 }));
      }
    } catch (error) {
      Alert.alert('Error', 'Invalid input values');
    }
  };

  const reset = () => {
    setResistance('');
    setCurrent('');
    setVoltageDrop('');
  };

  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.section}>
        <Title style={styles.title}>Voltage Drop</Title>
        <Paragraph style={styles.subtitle}>
          Calculate voltage drop across conductors using Ohm's Law
        </Paragraph>
      </View>

      <View style={styles.section}>
        <FormulaBlock
          formula="V = I × R"
          description="Where: V = Voltage Drop (V), I = Current (A), R = Resistance (Ω)"
        />
      </View>

      <View style={styles.section}>
        <NumericField
          label="Resistance (Ω)"
          value={resistance}
          onChangeText={setResistance}
          placeholder="Enter resistance"
        />
        <NumericField
          label="Current (A)"
          value={current}
          onChangeText={setCurrent}
          placeholder="Enter current"
          style={{ marginTop: 12 }}
        />
        <NumericField
          label="Voltage Drop (V)"
          value={voltageDrop}
          onChangeText={setVoltageDrop}
          placeholder="Enter voltage drop"
          style={{ marginTop: 12 }}
        />
      </View>

      <View style={styles.buttonGroup}>
        <Button mode="contained" onPress={calculateMissingValue}>
          Calculate
        </Button>
        <Button mode="outlined" onPress={reset} style={{ marginLeft: 8 }}>
          Reset
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: screenBackground,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },
});

export default ElectricalElectricalSystemsVoltageDropScreen;

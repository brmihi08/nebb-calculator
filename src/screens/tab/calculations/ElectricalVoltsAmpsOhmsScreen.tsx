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
  TextInput,
  Button,
  useTheme,
  Surface,
  Text,
} from 'react-native-paper';

const ElectricalVoltsAmpsOhmsScreen = () => {
  const theme = useTheme();
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');
  const [power, setPower] = useState('');

  const calculateMissingValue = () => {
    const values = [voltage, current, resistance, power];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing ones');
      return;
    }

    if (filledCount === 4) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Ohm's Law: V = I × R, P = V × I, P = I² × R, P = V² / R
    if (voltage === '') {
      if (current && resistance) {
        const i = parseFloat(current);
        const r = parseFloat(resistance);
        const v = i * r;
        setVoltage(v.toFixed(2));
      } else if (power && current) {
        const p = parseFloat(power);
        const i = parseFloat(current);
        if (i === 0) {
          Alert.alert('Error', 'Current cannot be zero');
          return;
        }
        const v = p / i;
        setVoltage(v.toFixed(2));
      } else if (power && resistance) {
        const p = parseFloat(power);
        const r = parseFloat(resistance);
        if (r === 0) {
          Alert.alert('Error', 'Resistance cannot be zero');
          return;
        }
        const v = Math.sqrt(p * r);
        setVoltage(v.toFixed(2));
      }
    } else if (current === '') {
      if (voltage && resistance) {
        const v = parseFloat(voltage);
        const r = parseFloat(resistance);
        if (r === 0) {
          Alert.alert('Error', 'Resistance cannot be zero');
          return;
        }
        const i = v / r;
        setCurrent(i.toFixed(3));
      } else if (power && voltage) {
        const p = parseFloat(power);
        const v = parseFloat(voltage);
        if (v === 0) {
          Alert.alert('Error', 'Voltage cannot be zero');
          return;
        }
        const i = p / v;
        setCurrent(i.toFixed(3));
      } else if (power && resistance) {
        const p = parseFloat(power);
        const r = parseFloat(resistance);
        if (r === 0) {
          Alert.alert('Error', 'Resistance cannot be zero');
          return;
        }
        const i = Math.sqrt(p / r);
        setCurrent(i.toFixed(3));
      }
    } else if (resistance === '') {
      if (voltage && current) {
        const v = parseFloat(voltage);
        const i = parseFloat(current);
        if (i === 0) {
          Alert.alert('Error', 'Current cannot be zero');
          return;
        }
        const r = v / i;
        setResistance(r.toFixed(2));
      } else if (voltage && power) {
        const v = parseFloat(voltage);
        const p = parseFloat(power);
        if (p === 0) {
          Alert.alert('Error', 'Power cannot be zero');
          return;
        }
        const r = Math.pow(v, 2) / p;
        setResistance(r.toFixed(2));
      } else if (current && power) {
        const i = parseFloat(current);
        const p = parseFloat(power);
        if (i === 0) {
          Alert.alert('Error', 'Current cannot be zero');
          return;
        }
        const r = p / Math.pow(i, 2);
        setResistance(r.toFixed(2));
      }
    } else if (power === '') {
      if (voltage && current) {
        const v = parseFloat(voltage);
        const i = parseFloat(current);
        const p = v * i;
        setPower(p.toFixed(2));
      } else if (voltage && resistance) {
        const v = parseFloat(voltage);
        const r = parseFloat(resistance);
        if (r === 0) {
          Alert.alert('Error', 'Resistance cannot be zero');
          return;
        }
        const p = Math.pow(v, 2) / r;
        setPower(p.toFixed(2));
      } else if (current && resistance) {
        const i = parseFloat(current);
        const r = parseFloat(resistance);
        const p = Math.pow(i, 2) * r;
        setPower(p.toFixed(2));
      }
    }
  };

  const clearAll = () => {
    setVoltage('');
    setCurrent('');
    setResistance('');
    setPower('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Volts/Amps/Ohms</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate electrical relationships using Ohm's Law and Power formulas
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formulas</Title>
              <Text style={styles.formulaText}>V = I × R</Text>
              <Text style={styles.formulaText}>P = V × I</Text>
              <Text style={styles.formulaText}>P = I² × R</Text>
              <Text style={styles.formulaText}>P = V² / R</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: V = Voltage (V), I = Current (A), R = Resistance (Ω), P = Power (W)
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Voltage (V)"
                value={voltage}
                onChangeText={setVoltage}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Current (A)"
                value={current}
                onChangeText={setCurrent}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Resistance (Ω)"
                value={resistance}
                onChangeText={setResistance}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Power (W)"
                value={power}
                onChangeText={setPower}
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

            {(voltage || current || resistance || power) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {voltage && <Text style={styles.resultValue}>Voltage: {voltage} V</Text>}
                {current && <Text style={styles.resultValue}>Current: {current} A</Text>}
                {resistance && <Text style={styles.resultValue}>Resistance: {resistance} Ω</Text>}
                {power && <Text style={styles.resultValue}>Power: {power} W</Text>}
              </View>
            )}
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 24,
  },
  header: {
    borderRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  headerGradient: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 24,
    borderRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#000000',
    opacity: 0.8,
  },
  section: {
    marginBottom: 20,
  },
  liquidCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardContent: {
    padding: 20,
  },
  formulaContainer: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  formulaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginBottom: 8,
  },
  formulaText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 4,
  },
  formulaDescription: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 8,
  },
  inputRow: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#f59e0b',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    flex: 1,
    marginLeft: 8,
    borderColor: '#f59e0b',
  },
  clearButtonLabel: {
    fontSize: 16,
    color: '#f59e0b',
  },
  resultContainer: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
});

export default ElectricalVoltsAmpsOhmsScreen;

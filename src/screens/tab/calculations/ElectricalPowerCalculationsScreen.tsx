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

const ElectricalPowerCalculationsScreen = () => {
  const theme = useTheme();
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [powerFactor, setPowerFactor] = useState('');
  const [phases, setPhases] = useState('');
  const [realPower, setRealPower] = useState('');
  const [apparentPower, setApparentPower] = useState('');

  const calculatePower = () => {
    if (!voltage || !current) {
      Alert.alert('Error', 'Please enter both voltage and current');
      return;
    }

    const v = parseFloat(voltage);
    const i = parseFloat(current);
    const pf = powerFactor ? parseFloat(powerFactor) : 1.0;
    const ph = phases ? parseFloat(phases) : 1;

    if (pf < 0 || pf > 1) {
      Alert.alert('Error', 'Power factor must be between 0 and 1');
      return;
    }

    if (ph !== 1 && ph !== 3) {
      Alert.alert('Error', 'Phases must be 1 or 3');
      return;
    }

    let apparentPowerCalc, realPowerCalc;

    if (ph === 3) {
      // Three-phase power calculations
      apparentPowerCalc = Math.sqrt(3) * v * i;
      realPowerCalc = Math.sqrt(3) * v * i * pf;
    } else {
      // Single-phase power calculations
      apparentPowerCalc = v * i;
      realPowerCalc = v * i * pf;
    }

    setApparentPower(apparentPowerCalc.toFixed(2));
    setRealPower(realPowerCalc.toFixed(2));

    // Set default values if not provided
    if (!powerFactor) setPowerFactor('1.0');
    if (!phases) setPhases('1');
  };

  const clearAll = () => {
    setVoltage('');
    setCurrent('');
    setPowerFactor('');
    setPhases('');
    setRealPower('');
    setApparentPower('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Power Calculations</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate real and apparent power for single and three-phase systems
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formulas</Title>
              <Text style={styles.formulaText}>Single Phase:</Text>
              <Text style={styles.formulaSubText}>P = V × I × PF (Real Power)</Text>
              <Text style={styles.formulaSubText}>S = V × I (Apparent Power)</Text>
              <Text style={styles.formulaText}>Three Phase:</Text>
              <Text style={styles.formulaSubText}>P = √3 × V × I × PF (Real Power)</Text>
              <Text style={styles.formulaSubText}>S = √3 × V × I (Apparent Power)</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: P = Real Power (W), S = Apparent Power (VA), V = Voltage, I = Current, PF = Power Factor
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
                label="Power Factor"
                value={powerFactor}
                onChangeText={setPowerFactor}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="1.0 (default)"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Phases"
                value={phases}
                onChangeText={setPhases}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="1 or 3 (default: 1)"
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={calculatePower}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Calculate Power
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

            {(realPower || apparentPower) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Calculated Values:</Text>
                {realPower && <Text style={styles.resultValue}>Real Power: {realPower} W</Text>}
                {apparentPower && <Text style={styles.resultValue}>Apparent Power: {apparentPower} VA</Text>}
                {voltage && <Text style={styles.resultValue}>Voltage: {voltage} V</Text>}
                {current && <Text style={styles.resultValue}>Current: {current} A</Text>}
                {powerFactor && <Text style={styles.resultValue}>Power Factor: {powerFactor}</Text>}
                {phases && <Text style={styles.resultValue}>Phases: {phases}</Text>}
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 4,
  },
  formulaSubText: {
    fontSize: 14,
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

export default ElectricalPowerCalculationsScreen;






















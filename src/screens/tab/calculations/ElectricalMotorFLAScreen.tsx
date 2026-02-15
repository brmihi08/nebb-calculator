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

const ElectricalMotorFLAScreen = () => {
  const theme = useTheme();
  const [horsepower, setHorsepower] = useState('');
  const [voltage, setVoltage] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [powerFactor, setPowerFactor] = useState('');
  const [phases, setPhases] = useState('');
  const [fullLoadAmps, setFullLoadAmps] = useState('');

  const calculateMissingValue = () => {
    if (!horsepower || !voltage) {
      Alert.alert('Error', 'Please enter both horsepower and voltage');
      return;
    }

    const hp = parseFloat(horsepower);
    const v = parseFloat(voltage);
    const eff = efficiency ? parseFloat(efficiency) : 90; // Default 90% efficiency
    const pf = powerFactor ? parseFloat(powerFactor) : 0.85; // Default 0.85 power factor
    const ph = phases ? parseFloat(phases) : 3; // Default 3-phase

    if (hp <= 0) {
      Alert.alert('Error', 'Horsepower must be greater than zero');
      return;
    }

    if (v <= 0) {
      Alert.alert('Error', 'Voltage must be greater than zero');
      return;
    }

    if (eff <= 0 || eff > 100) {
      Alert.alert('Error', 'Efficiency must be between 0 and 100%');
      return;
    }

    if (pf <= 0 || pf > 1) {
      Alert.alert('Error', 'Power factor must be between 0 and 1');
      return;
    }

    if (ph !== 1 && ph !== 3) {
      Alert.alert('Error', 'Phases must be 1 or 3');
      return;
    }

    // FLA = (HP × 746) / (V × Eff × PF × √3) for 3-phase
    // FLA = (HP × 746) / (V × Eff × PF) for 1-phase
    let fla;
    if (ph === 3) {
      fla = (hp * 746) / (v * (eff / 100) * pf * Math.sqrt(3));
    } else {
      fla = (hp * 746) / (v * (eff / 100) * pf);
    }

    setFullLoadAmps(fla.toFixed(2));

    // Set default values if not provided
    if (!efficiency) setEfficiency('90');
    if (!powerFactor) setPowerFactor('0.85');
    if (!phases) setPhases('3');
  };

  const clearAll = () => {
    setHorsepower('');
    setVoltage('');
    setEfficiency('');
    setPowerFactor('');
    setPhases('');
    setFullLoadAmps('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Motor Full Load Amps</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate motor full load current based on horsepower, voltage, efficiency, and power factor
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formulas</Title>
              <Text style={styles.formulaText}>Three Phase:</Text>
              <Text style={styles.formulaSubText}>FLA = (HP × 746) / (V × Eff × PF × √3)</Text>
              <Text style={styles.formulaText}>Single Phase:</Text>
              <Text style={styles.formulaSubText}>FLA = (HP × 746) / (V × Eff × PF)</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: FLA = Full Load Amps, HP = Horsepower, V = Voltage, Eff = Efficiency (%), PF = Power Factor
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Horsepower (HP)"
                value={horsepower}
                onChangeText={setHorsepower}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
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
                label="Efficiency (%)"
                value={efficiency}
                onChangeText={setEfficiency}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="90 (default)"
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
                placeholder="0.85 (default)"
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
                placeholder="3 (default)"
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={calculateMissingValue}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Calculate FLA
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

            {fullLoadAmps && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Calculated Values:</Text>
                <Text style={styles.resultValue}>Full Load Amps: {fullLoadAmps} A</Text>
                {horsepower && <Text style={styles.resultValue}>Horsepower: {horsepower} HP</Text>}
                {voltage && <Text style={styles.resultValue}>Voltage: {voltage} V</Text>}
                {efficiency && <Text style={styles.resultValue}>Efficiency: {efficiency}%</Text>}
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
    marginBottom: 8,
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

export default ElectricalMotorFLAScreen;

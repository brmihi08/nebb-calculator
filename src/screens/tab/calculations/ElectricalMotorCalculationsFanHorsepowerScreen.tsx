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
import { screenBackground } from '../../../theme/screenStyles';

const ElectricalMotorCalculationsFanHorsepowerScreen = () => {
  const theme = useTheme();
  const [airFlow, setAirFlow] = useState('');
  const [staticPressure, setStaticPressure] = useState('');
  const [fanEfficiency, setFanEfficiency] = useState('');
  const [fanHorsepower, setFanHorsepower] = useState('');

  const calculateMissingValue = () => {
    const values = [airFlow, staticPressure, fanEfficiency, fanHorsepower];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 3) {
      Alert.alert('Error', 'Please fill in at least 3 values to calculate the missing one');
      return;
    }

    if (filledCount === 4) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Fan HP = (CFM × SP) / (6356 × Efficiency)
    if (fanHorsepower === '') {
      if (airFlow && staticPressure && fanEfficiency) {
        const cfm = parseFloat(airFlow);
        const sp = parseFloat(staticPressure);
        const eff = parseFloat(fanEfficiency);
        
        if (cfm <= 0) {
          Alert.alert('Error', 'Air flow must be greater than zero');
          return;
        }
        if (sp < 0) {
          Alert.alert('Error', 'Static pressure cannot be negative');
          return;
        }
        if (eff <= 0 || eff > 100) {
          Alert.alert('Error', 'Fan efficiency must be between 0 and 100%');
          return;
        }
        
        const hp = (cfm * sp) / (6356 * (eff / 100));
        setFanHorsepower(hp.toFixed(3));
      }
    } else if (airFlow === '') {
      if (staticPressure && fanEfficiency && fanHorsepower) {
        const sp = parseFloat(staticPressure);
        const eff = parseFloat(fanEfficiency);
        const hp = parseFloat(fanHorsepower);
        
        if (sp <= 0) {
          Alert.alert('Error', 'Static pressure must be greater than zero');
          return;
        }
        if (eff <= 0 || eff > 100) {
          Alert.alert('Error', 'Fan efficiency must be between 0 and 100%');
          return;
        }
        if (hp <= 0) {
          Alert.alert('Error', 'Fan horsepower must be greater than zero');
          return;
        }
        
        const cfm = (hp * 6356 * (eff / 100)) / sp;
        setAirFlow(cfm.toFixed(0));
      }
    } else if (staticPressure === '') {
      if (airFlow && fanEfficiency && fanHorsepower) {
        const cfm = parseFloat(airFlow);
        const eff = parseFloat(fanEfficiency);
        const hp = parseFloat(fanHorsepower);
        
        if (cfm <= 0) {
          Alert.alert('Error', 'Air flow must be greater than zero');
          return;
        }
        if (eff <= 0 || eff > 100) {
          Alert.alert('Error', 'Fan efficiency must be between 0 and 100%');
          return;
        }
        if (hp <= 0) {
          Alert.alert('Error', 'Fan horsepower must be greater than zero');
          return;
        }
        
        const sp = (hp * 6356 * (eff / 100)) / cfm;
        setStaticPressure(sp.toFixed(2));
      }
    } else if (fanEfficiency === '') {
      if (airFlow && staticPressure && fanHorsepower) {
        const cfm = parseFloat(airFlow);
        const sp = parseFloat(staticPressure);
        const hp = parseFloat(fanHorsepower);
        
        if (cfm <= 0) {
          Alert.alert('Error', 'Air flow must be greater than zero');
          return;
        }
        if (sp <= 0) {
          Alert.alert('Error', 'Static pressure must be greater than zero');
          return;
        }
        if (hp <= 0) {
          Alert.alert('Error', 'Fan horsepower must be greater than zero');
          return;
        }
        
        const eff = ((cfm * sp) / (6356 * hp)) * 100;
        if (eff > 100) {
          Alert.alert('Error', 'Calculated efficiency exceeds 100%. Please check your values.');
          return;
        }
        setFanEfficiency(eff.toFixed(1));
      }
    }
  };

  const clearAll = () => {
    setAirFlow('');
    setStaticPressure('');
    setFanEfficiency('');
    setFanHorsepower('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: screenBackground }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Fan Horsepower</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate fan horsepower based on air flow, static pressure, and efficiency
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>Fan HP = (CFM × SP) / (6356 × Efficiency)</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: Fan HP = Fan Horsepower, CFM = Air Flow Rate, SP = Static Pressure (inches w.g.), Efficiency = Fan Efficiency (%)
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Air Flow (CFM)"
                value={airFlow}
                onChangeText={setAirFlow}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Static Pressure (inches w.g.)"
                value={staticPressure}
                onChangeText={setStaticPressure}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Fan Efficiency (%)"
                value={fanEfficiency}
                onChangeText={setFanEfficiency}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="0-100"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Fan Horsepower (HP)"
                value={fanHorsepower}
                onChangeText={setFanHorsepower}
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

            {(airFlow || staticPressure || fanEfficiency || fanHorsepower) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {airFlow && <Text style={styles.resultValue}>Air Flow: {airFlow} CFM</Text>}
                {staticPressure && <Text style={styles.resultValue}>Static Pressure: {staticPressure} inches w.g.</Text>}
                {fanEfficiency && <Text style={styles.resultValue}>Fan Efficiency: {fanEfficiency}%</Text>}
                {fanHorsepower && <Text style={styles.resultValue}>Fan Horsepower: {fanHorsepower} HP</Text>}
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  formulaDescription: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.8,
    textAlign: 'center',
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

export default ElectricalMotorCalculationsFanHorsepowerScreen;

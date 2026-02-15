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

const HydronicPumpEfficiencyScreen = () => {
  const theme = useTheme();
  const [waterHorsepower, setWaterHorsepower] = useState('');
  const [brakeHorsepower, setBrakeHorsepower] = useState('');
  const [pumpEfficiency, setPumpEfficiency] = useState('');

  const calculateMissingValue = () => {
    const values = [waterHorsepower, brakeHorsepower, pumpEfficiency];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Efficiency = (WHP / BHP) × 100
    if (pumpEfficiency === '') {
      if (waterHorsepower && brakeHorsepower) {
        const whp = parseFloat(waterHorsepower);
        const bhp = parseFloat(brakeHorsepower);
        if (bhp <= 0) {
          Alert.alert('Error', 'Brake horsepower must be greater than zero');
          return;
        }
        const eff = (whp / bhp) * 100;
        if (eff > 100) {
          Alert.alert('Error', 'Calculated efficiency exceeds 100%. Please check your values.');
          return;
        }
        setPumpEfficiency(eff.toFixed(1));
      }
    } else if (waterHorsepower === '') {
      if (brakeHorsepower && pumpEfficiency) {
        const bhp = parseFloat(brakeHorsepower);
        const eff = parseFloat(pumpEfficiency);
        if (eff < 0 || eff > 100) {
          Alert.alert('Error', 'Pump efficiency must be between 0 and 100%');
          return;
        }
        const whp = (bhp * eff) / 100;
        setWaterHorsepower(whp.toFixed(3));
      }
    } else if (brakeHorsepower === '') {
      if (waterHorsepower && pumpEfficiency) {
        const whp = parseFloat(waterHorsepower);
        const eff = parseFloat(pumpEfficiency);
        if (eff <= 0 || eff > 100) {
          Alert.alert('Error', 'Pump efficiency must be between 0 and 100%');
          return;
        }
        const bhp = whp / (eff / 100);
        setBrakeHorsepower(bhp.toFixed(3));
      }
    }
  };

  const clearAll = () => {
    setWaterHorsepower('');
    setBrakeHorsepower('');
    setPumpEfficiency('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Pump Efficiency</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate pump efficiency based on water horsepower and brake horsepower
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>Efficiency = (WHP / BHP) × 100</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: Efficiency = Pump Efficiency (%), WHP = Water Horsepower (HP), BHP = Brake Horsepower (HP)
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Water Horsepower (HP)"
                value={waterHorsepower}
                onChangeText={setWaterHorsepower}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Brake Horsepower (HP)"
                value={brakeHorsepower}
                onChangeText={setBrakeHorsepower}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Pump Efficiency (%)"
                value={pumpEfficiency}
                onChangeText={setPumpEfficiency}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="0-100"
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

            {(waterHorsepower || brakeHorsepower || pumpEfficiency) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {waterHorsepower && <Text style={styles.resultValue}>Water Horsepower: {waterHorsepower} HP</Text>}
                {brakeHorsepower && <Text style={styles.resultValue}>Brake Horsepower: {brakeHorsepower} HP</Text>}
                {pumpEfficiency && <Text style={styles.resultValue}>Pump Efficiency: {pumpEfficiency}%</Text>}
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
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  formulaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 8,
  },
  formulaText: {
    fontSize: 20,
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
    backgroundColor: '#3b82f6',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    flex: 1,
    marginLeft: 8,
    borderColor: '#3b82f6',
  },
  clearButtonLabel: {
    fontSize: 16,
    color: '#3b82f6',
  },
  resultContainer: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
});

export default HydronicPumpEfficiencyScreen;

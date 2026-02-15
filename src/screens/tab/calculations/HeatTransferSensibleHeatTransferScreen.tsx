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

const HeatTransferSensibleHeatTransferScreen = () => {
  const theme = useTheme();
  const [airFlow, setAirFlow] = useState('');
  const [temperatureDifference, setTemperatureDifference] = useState('');
  const [sensibleHeatTransfer, setSensibleHeatTransfer] = useState('');

  const calculateMissingValue = () => {
    const values = [airFlow, temperatureDifference, sensibleHeatTransfer];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Sensible Heat Transfer = 1.08 × CFM × ΔT
    if (sensibleHeatTransfer === '') {
      if (airFlow && temperatureDifference) {
        const cfm = parseFloat(airFlow);
        const deltaT = parseFloat(temperatureDifference);
        if (cfm <= 0) {
          Alert.alert('Error', 'Air flow must be greater than zero');
          return;
        }
        const qSensible = 1.08 * cfm * deltaT;
        setSensibleHeatTransfer(qSensible.toFixed(0));
      }
    } else if (airFlow === '') {
      if (sensibleHeatTransfer && temperatureDifference) {
        const qSensible = parseFloat(sensibleHeatTransfer);
        const deltaT = parseFloat(temperatureDifference);
        if (deltaT === 0) {
          Alert.alert('Error', 'Temperature difference cannot be zero');
          return;
        }
        const cfm = qSensible / (1.08 * deltaT);
        setAirFlow(cfm.toFixed(1));
      }
    } else if (temperatureDifference === '') {
      if (airFlow && sensibleHeatTransfer) {
        const cfm = parseFloat(airFlow);
        const qSensible = parseFloat(sensibleHeatTransfer);
        if (cfm <= 0) {
          Alert.alert('Error', 'Air flow must be greater than zero');
          return;
        }
        const deltaT = qSensible / (1.08 * cfm);
        setTemperatureDifference(deltaT.toFixed(1));
      }
    }
  };

  const clearAll = () => {
    setAirFlow('');
    setTemperatureDifference('');
    setSensibleHeatTransfer('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: screenBackground }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Sensible Heat Transfer</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate sensible heat transfer rate based on air flow and temperature difference
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>Q Sensible = 1.08 × CFM × ΔT</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: Q Sensible = Sensible Heat Transfer (BTU/hr), CFM = Air Flow Rate, ΔT = Temperature Difference (°F)
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
                label="Temperature Difference (°F)"
                value={temperatureDifference}
                onChangeText={setTemperatureDifference}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Sensible Heat Transfer (BTU/hr)"
                value={sensibleHeatTransfer}
                onChangeText={setSensibleHeatTransfer}
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

            {(airFlow || temperatureDifference || sensibleHeatTransfer) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {airFlow && <Text style={styles.resultValue}>Air Flow: {airFlow} CFM</Text>}
                {temperatureDifference && <Text style={styles.resultValue}>Temperature Difference: {temperatureDifference}°F</Text>}
                {sensibleHeatTransfer && <Text style={styles.resultValue}>Sensible Heat Transfer: {sensibleHeatTransfer} BTU/hr</Text>}
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
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  formulaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22c55e',
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
    backgroundColor: '#22c55e',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    flex: 1,
    marginLeft: 8,
    borderColor: '#22c55e',
  },
  clearButtonLabel: {
    fontSize: 16,
    color: '#22c55e',
  },
  resultContainer: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
});

export default HeatTransferSensibleHeatTransferScreen;

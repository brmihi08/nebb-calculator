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

const HeatTransferLatentHeatTransferScreen = () => {
  const theme = useTheme();
  const [airFlow, setAirFlow] = useState('');
  const [humidityDifference, setHumidityDifference] = useState('');
  const [latentHeatTransfer, setLatentHeatTransfer] = useState('');

  const calculateMissingValue = () => {
    const values = [airFlow, humidityDifference, latentHeatTransfer];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Latent Heat Transfer = 0.68 × CFM × ΔW
    if (latentHeatTransfer === '') {
      if (airFlow && humidityDifference) {
        const cfm = parseFloat(airFlow);
        const deltaW = parseFloat(humidityDifference);
        if (cfm <= 0) {
          Alert.alert('Error', 'Air flow must be greater than zero');
          return;
        }
        const qLatent = 0.68 * cfm * deltaW;
        setLatentHeatTransfer(qLatent.toFixed(0));
      }
    } else if (airFlow === '') {
      if (latentHeatTransfer && humidityDifference) {
        const qLatent = parseFloat(latentHeatTransfer);
        const deltaW = parseFloat(humidityDifference);
        if (deltaW === 0) {
          Alert.alert('Error', 'Humidity difference cannot be zero');
          return;
        }
        const cfm = qLatent / (0.68 * deltaW);
        setAirFlow(cfm.toFixed(1));
      }
    } else if (humidityDifference === '') {
      if (airFlow && latentHeatTransfer) {
        const cfm = parseFloat(airFlow);
        const qLatent = parseFloat(latentHeatTransfer);
        if (cfm <= 0) {
          Alert.alert('Error', 'Air flow must be greater than zero');
          return;
        }
        const deltaW = qLatent / (0.68 * cfm);
        setHumidityDifference(deltaW.toFixed(4));
      }
    }
  };

  const clearAll = () => {
    setAirFlow('');
    setHumidityDifference('');
    setLatentHeatTransfer('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: screenBackground }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Latent Heat Transfer</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate latent heat transfer rate based on air flow and humidity difference
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>Q Latent = 0.68 × CFM × ΔW</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: Q Latent = Latent Heat Transfer (BTU/hr), CFM = Air Flow Rate, ΔW = Humidity Ratio Difference (lb moisture/lb dry air)
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
                label="Humidity Difference (lb/lb)"
                value={humidityDifference}
                onChangeText={setHumidityDifference}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="e.g., 0.0050"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Latent Heat Transfer (BTU/hr)"
                value={latentHeatTransfer}
                onChangeText={setLatentHeatTransfer}
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

            {(airFlow || humidityDifference || latentHeatTransfer) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {airFlow && <Text style={styles.resultValue}>Air Flow: {airFlow} CFM</Text>}
                {humidityDifference && <Text style={styles.resultValue}>Humidity Difference: {humidityDifference} lb/lb</Text>}
                {latentHeatTransfer && <Text style={styles.resultValue}>Latent Heat Transfer: {latentHeatTransfer} BTU/hr</Text>}
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

export default HeatTransferLatentHeatTransferScreen;

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

const HeatTransferTotalHeatTransferScreen = () => {
  const theme = useTheme();
  const [airFlow, setAirFlow] = useState('');
  const [enthalpyDifference, setEnthalpyDifference] = useState('');
  const [totalHeatTransfer, setTotalHeatTransfer] = useState('');

  const calculateMissingValue = () => {
    const values = [airFlow, enthalpyDifference, totalHeatTransfer];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Total Heat Transfer = 4.5 × CFM × ΔH
    if (totalHeatTransfer === '') {
      if (airFlow && enthalpyDifference) {
        const cfm = parseFloat(airFlow);
        const deltaH = parseFloat(enthalpyDifference);
        if (cfm <= 0) {
          Alert.alert('Error', 'Air flow must be greater than zero');
          return;
        }
        const qTotal = 4.5 * cfm * deltaH;
        setTotalHeatTransfer(qTotal.toFixed(0));
      }
    } else if (airFlow === '') {
      if (totalHeatTransfer && enthalpyDifference) {
        const qTotal = parseFloat(totalHeatTransfer);
        const deltaH = parseFloat(enthalpyDifference);
        if (deltaH === 0) {
          Alert.alert('Error', 'Enthalpy difference cannot be zero');
          return;
        }
        const cfm = qTotal / (4.5 * deltaH);
        setAirFlow(cfm.toFixed(1));
      }
    } else if (enthalpyDifference === '') {
      if (airFlow && totalHeatTransfer) {
        const cfm = parseFloat(airFlow);
        const qTotal = parseFloat(totalHeatTransfer);
        if (cfm <= 0) {
          Alert.alert('Error', 'Air flow must be greater than zero');
          return;
        }
        const deltaH = qTotal / (4.5 * cfm);
        setEnthalpyDifference(deltaH.toFixed(2));
      }
    }
  };

  const clearAll = () => {
    setAirFlow('');
    setEnthalpyDifference('');
    setTotalHeatTransfer('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: screenBackground }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Total Heat Transfer</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate total heat transfer rate based on air flow and enthalpy difference
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>Q Total = 4.5 × CFM × ΔH</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: Q Total = Total Heat Transfer (BTU/hr), CFM = Air Flow Rate, ΔH = Enthalpy Difference (BTU/lb)
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
                label="Enthalpy Difference (BTU/lb)"
                value={enthalpyDifference}
                onChangeText={setEnthalpyDifference}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Total Heat Transfer (BTU/hr)"
                value={totalHeatTransfer}
                onChangeText={setTotalHeatTransfer}
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

            {(airFlow || enthalpyDifference || totalHeatTransfer) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {airFlow && <Text style={styles.resultValue}>Air Flow: {airFlow} CFM</Text>}
                {enthalpyDifference && <Text style={styles.resultValue}>Enthalpy Difference: {enthalpyDifference} BTU/lb</Text>}
                {totalHeatTransfer && <Text style={styles.resultValue}>Total Heat Transfer: {totalHeatTransfer} BTU/hr</Text>}
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

export default HeatTransferTotalHeatTransferScreen;

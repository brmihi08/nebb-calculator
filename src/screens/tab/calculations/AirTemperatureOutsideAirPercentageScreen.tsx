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

const AirTemperatureOutsideAirPercentageScreen = () => {
  const theme = useTheme();
  const [outsideAirFlow, setOutsideAirFlow] = useState('');
  const [totalAirFlow, setTotalAirFlow] = useState('');
  const [outsideAirPercentage, setOutsideAirPercentage] = useState('');

  const calculateMissingValue = () => {
    const values = [outsideAirFlow, totalAirFlow, outsideAirPercentage];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // OA% = (OA CFM / Total CFM) × 100
    if (outsideAirPercentage === '') {
      if (outsideAirFlow && totalAirFlow) {
        const oa = parseFloat(outsideAirFlow);
        const total = parseFloat(totalAirFlow);
        if (total <= 0) {
          Alert.alert('Error', 'Total air flow must be greater than zero');
          return;
        }
        if (oa > total) {
          Alert.alert('Error', 'Outside air flow cannot exceed total air flow');
          return;
        }
        const oaPercent = (oa / total) * 100;
        setOutsideAirPercentage(oaPercent.toFixed(1));
      }
    } else if (outsideAirFlow === '') {
      if (totalAirFlow && outsideAirPercentage) {
        const total = parseFloat(totalAirFlow);
        const oaPercent = parseFloat(outsideAirPercentage);
        if (oaPercent < 0 || oaPercent > 100) {
          Alert.alert('Error', 'Outside air percentage must be between 0 and 100%');
          return;
        }
        const oa = (total * oaPercent) / 100;
        setOutsideAirFlow(oa.toFixed(1));
      }
    } else if (totalAirFlow === '') {
      if (outsideAirFlow && outsideAirPercentage) {
        const oa = parseFloat(outsideAirFlow);
        const oaPercent = parseFloat(outsideAirPercentage);
        if (oaPercent <= 0 || oaPercent > 100) {
          Alert.alert('Error', 'Outside air percentage must be between 0 and 100%');
          return;
        }
        const total = (oa * 100) / oaPercent;
        setTotalAirFlow(total.toFixed(1));
      }
    }
  };

  const clearAll = () => {
    setOutsideAirFlow('');
    setTotalAirFlow('');
    setOutsideAirPercentage('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: screenBackground }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Outside Air Percentage</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate outside air percentage based on outside air flow and total air flow
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>OA% = (OA CFM / Total CFM) × 100</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: OA% = Outside Air Percentage (%), OA CFM = Outside Air Flow (CFM), Total CFM = Total Air Flow (CFM)
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Outside Air Flow (CFM)"
                value={outsideAirFlow}
                onChangeText={setOutsideAirFlow}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Total Air Flow (CFM)"
                value={totalAirFlow}
                onChangeText={setTotalAirFlow}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Outside Air Percentage (%)"
                value={outsideAirPercentage}
                onChangeText={setOutsideAirPercentage}
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

            {(outsideAirFlow || totalAirFlow || outsideAirPercentage) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {outsideAirFlow && <Text style={styles.resultValue}>Outside Air Flow: {outsideAirFlow} CFM</Text>}
                {totalAirFlow && <Text style={styles.resultValue}>Total Air Flow: {totalAirFlow} CFM</Text>}
                {outsideAirPercentage && <Text style={styles.resultValue}>OA Percentage: {outsideAirPercentage}%</Text>}
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

export default AirTemperatureOutsideAirPercentageScreen;

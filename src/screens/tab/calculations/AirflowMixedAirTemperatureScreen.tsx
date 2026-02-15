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

const AirflowMixedAirTemperatureScreen = () => {
  const theme = useTheme();
  const [outsideAirTemp, setOutsideAirTemp] = useState('');
  const [returnAirTemp, setReturnAirTemp] = useState('');
  const [outsideAirPercentage, setOutsideAirPercentage] = useState('');
  const [mixedAirTemp, setMixedAirTemp] = useState('');

  const calculateMissingValue = () => {
    const values = [outsideAirTemp, returnAirTemp, outsideAirPercentage, mixedAirTemp];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 3) {
      Alert.alert('Error', 'Please fill in at least 3 values to calculate the missing one');
      return;
    }

    if (filledCount === 4) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Mixed Air Temp = (OA% × OA Temp) + ((100 - OA%) × RA Temp) / 100
    if (mixedAirTemp === '') {
      if (outsideAirTemp && returnAirTemp && outsideAirPercentage) {
        const oaTemp = parseFloat(outsideAirTemp);
        const raTemp = parseFloat(returnAirTemp);
        const oaPercent = parseFloat(outsideAirPercentage);
        
        if (oaPercent < 0 || oaPercent > 100) {
          Alert.alert('Error', 'Outside air percentage must be between 0 and 100%');
          return;
        }
        
        const mixedTemp = (oaPercent * oaTemp + (100 - oaPercent) * raTemp) / 100;
        setMixedAirTemp(mixedTemp.toFixed(1));
      }
    } else if (outsideAirTemp === '') {
      if (returnAirTemp && outsideAirPercentage && mixedAirTemp) {
        const raTemp = parseFloat(returnAirTemp);
        const oaPercent = parseFloat(outsideAirPercentage);
        const mixedTemp = parseFloat(mixedAirTemp);
        
        if (oaPercent < 0 || oaPercent > 100) {
          Alert.alert('Error', 'Outside air percentage must be between 0 and 100%');
          return;
        }
        
        if (oaPercent === 0) {
          Alert.alert('Error', 'Cannot calculate outside air temperature when OA% is 0%');
          return;
        }
        
        const oaTemp = ((mixedTemp * 100) - ((100 - oaPercent) * raTemp)) / oaPercent;
        setOutsideAirTemp(oaTemp.toFixed(1));
      }
    } else if (returnAirTemp === '') {
      if (outsideAirTemp && outsideAirPercentage && mixedAirTemp) {
        const oaTemp = parseFloat(outsideAirTemp);
        const oaPercent = parseFloat(outsideAirPercentage);
        const mixedTemp = parseFloat(mixedAirTemp);
        
        if (oaPercent < 0 || oaPercent > 100) {
          Alert.alert('Error', 'Outside air percentage must be between 0 and 100%');
          return;
        }
        
        if (oaPercent === 100) {
          Alert.alert('Error', 'Cannot calculate return air temperature when OA% is 100%');
          return;
        }
        
        const raTemp = ((mixedTemp * 100) - (oaPercent * oaTemp)) / (100 - oaPercent);
        setReturnAirTemp(raTemp.toFixed(1));
      }
    } else if (outsideAirPercentage === '') {
      if (outsideAirTemp && returnAirTemp && mixedAirTemp) {
        const oaTemp = parseFloat(outsideAirTemp);
        const raTemp = parseFloat(returnAirTemp);
        const mixedTemp = parseFloat(mixedAirTemp);
        
        if (oaTemp === raTemp) {
          Alert.alert('Error', 'Outside air and return air temperatures cannot be the same');
          return;
        }
        
        const oaPercent = ((mixedTemp - raTemp) / (oaTemp - raTemp)) * 100;
        
        if (oaPercent < 0 || oaPercent > 100) {
          Alert.alert('Error', 'Calculated outside air percentage is outside valid range (0-100%)');
          return;
        }
        
        setOutsideAirPercentage(oaPercent.toFixed(1));
      }
    }
  };

  const clearAll = () => {
    setOutsideAirTemp('');
    setReturnAirTemp('');
    setOutsideAirPercentage('');
    setMixedAirTemp('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Mixed Air Temperature</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate mixed air temperature based on outside air, return air, and mixing percentages
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>MAT = (OA% × OA Temp) + ((100 - OA%) × RA Temp) / 100</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: MAT = Mixed Air Temperature (°F), OA% = Outside Air Percentage (%), OA Temp = Outside Air Temperature (°F), RA Temp = Return Air Temperature (°F)
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Outside Air Temperature (°F)"
                value={outsideAirTemp}
                onChangeText={setOutsideAirTemp}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Return Air Temperature (°F)"
                value={returnAirTemp}
                onChangeText={setReturnAirTemp}
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
                placeholder="0-100"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Mixed Air Temperature (°F)"
                value={mixedAirTemp}
                onChangeText={setMixedAirTemp}
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

            {(outsideAirTemp || returnAirTemp || outsideAirPercentage || mixedAirTemp) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {outsideAirTemp && <Text style={styles.resultValue}>Outside Air: {outsideAirTemp}°F</Text>}
                {returnAirTemp && <Text style={styles.resultValue}>Return Air: {returnAirTemp}°F</Text>}
                {outsideAirPercentage && <Text style={styles.resultValue}>OA Percentage: {outsideAirPercentage}%</Text>}
                {mixedAirTemp && <Text style={styles.resultValue}>Mixed Air: {mixedAirTemp}°F</Text>}
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

export default AirflowMixedAirTemperatureScreen;

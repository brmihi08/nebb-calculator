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

const AirTemperatureMixedAirEnthalpyScreen = () => {
  const theme = useTheme();
  const [outsideAirEnthalpy, setOutsideAirEnthalpy] = useState('');
  const [returnAirEnthalpy, setReturnAirEnthalpy] = useState('');
  const [outsideAirPercentage, setOutsideAirPercentage] = useState('');
  const [mixedAirEnthalpy, setMixedAirEnthalpy] = useState('');

  const calculateMissingValue = () => {
    const values = [outsideAirEnthalpy, returnAirEnthalpy, outsideAirPercentage, mixedAirEnthalpy];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 3) {
      Alert.alert('Error', 'Please fill in at least 3 values to calculate the missing one');
      return;
    }

    if (filledCount === 4) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Mixed Air Enthalpy = (OA% × OA Enthalpy) + ((100 - OA%) × RA Enthalpy) / 100
    if (mixedAirEnthalpy === '') {
      if (outsideAirEnthalpy && returnAirEnthalpy && outsideAirPercentage) {
        const oaEnthalpy = parseFloat(outsideAirEnthalpy);
        const raEnthalpy = parseFloat(returnAirEnthalpy);
        const oaPercent = parseFloat(outsideAirPercentage);
        
        if (oaPercent < 0 || oaPercent > 100) {
          Alert.alert('Error', 'Outside air percentage must be between 0 and 100%');
          return;
        }
        
        const mixedEnthalpy = (oaPercent * oaEnthalpy + (100 - oaPercent) * raEnthalpy) / 100;
        setMixedAirEnthalpy(mixedEnthalpy.toFixed(2));
      }
    } else if (outsideAirEnthalpy === '') {
      if (returnAirEnthalpy && outsideAirPercentage && mixedAirEnthalpy) {
        const raEnthalpy = parseFloat(returnAirEnthalpy);
        const oaPercent = parseFloat(outsideAirPercentage);
        const mixedEnthalpy = parseFloat(mixedAirEnthalpy);
        
        if (oaPercent < 0 || oaPercent > 100) {
          Alert.alert('Error', 'Outside air percentage must be between 0 and 100%');
          return;
        }
        
        if (oaPercent === 0) {
          Alert.alert('Error', 'Cannot calculate outside air enthalpy when OA% is 0%');
          return;
        }
        
        const oaEnthalpy = ((mixedEnthalpy * 100) - ((100 - oaPercent) * raEnthalpy)) / oaPercent;
        setOutsideAirEnthalpy(oaEnthalpy.toFixed(2));
      }
    } else if (returnAirEnthalpy === '') {
      if (outsideAirEnthalpy && outsideAirPercentage && mixedAirEnthalpy) {
        const oaEnthalpy = parseFloat(outsideAirEnthalpy);
        const oaPercent = parseFloat(outsideAirPercentage);
        const mixedEnthalpy = parseFloat(mixedAirEnthalpy);
        
        if (oaPercent < 0 || oaPercent > 100) {
          Alert.alert('Error', 'Outside air percentage must be between 0 and 100%');
          return;
        }
        
        if (oaPercent === 100) {
          Alert.alert('Error', 'Cannot calculate return air enthalpy when OA% is 100%');
          return;
        }
        
        const raEnthalpy = ((mixedEnthalpy * 100) - (oaPercent * oaEnthalpy)) / (100 - oaPercent);
        setReturnAirEnthalpy(raEnthalpy.toFixed(2));
      }
    } else if (outsideAirPercentage === '') {
      if (outsideAirEnthalpy && returnAirEnthalpy && mixedAirEnthalpy) {
        const oaEnthalpy = parseFloat(outsideAirEnthalpy);
        const raEnthalpy = parseFloat(returnAirEnthalpy);
        const mixedEnthalpy = parseFloat(mixedAirEnthalpy);
        
        if (oaEnthalpy === raEnthalpy) {
          Alert.alert('Error', 'Outside air and return air enthalpy cannot be the same');
          return;
        }
        
        const oaPercent = ((mixedEnthalpy - raEnthalpy) / (oaEnthalpy - raEnthalpy)) * 100;
        
        if (oaPercent < 0 || oaPercent > 100) {
          Alert.alert('Error', 'Calculated outside air percentage is outside valid range (0-100%)');
          return;
        }
        
        setOutsideAirPercentage(oaPercent.toFixed(1));
      }
    }
  };

  const clearAll = () => {
    setOutsideAirEnthalpy('');
    setReturnAirEnthalpy('');
    setOutsideAirPercentage('');
    setMixedAirEnthalpy('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Mixed Air Enthalpy</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate mixed air enthalpy based on outside air, return air, and mixing percentages
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>MAE = (OA% × OA Enthalpy) + ((100 - OA%) × RA Enthalpy) / 100</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: MAE = Mixed Air Enthalpy (BTU/lb), OA% = Outside Air Percentage (%), OA Enthalpy = Outside Air Enthalpy (BTU/lb), RA Enthalpy = Return Air Enthalpy (BTU/lb)
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Outside Air Enthalpy (BTU/lb)"
                value={outsideAirEnthalpy}
                onChangeText={setOutsideAirEnthalpy}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Return Air Enthalpy (BTU/lb)"
                value={returnAirEnthalpy}
                onChangeText={setReturnAirEnthalpy}
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
                label="Mixed Air Enthalpy (BTU/lb)"
                value={mixedAirEnthalpy}
                onChangeText={setMixedAirEnthalpy}
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

            {(outsideAirEnthalpy || returnAirEnthalpy || outsideAirPercentage || mixedAirEnthalpy) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {outsideAirEnthalpy && <Text style={styles.resultValue}>Outside Air: {outsideAirEnthalpy} BTU/lb</Text>}
                {returnAirEnthalpy && <Text style={styles.resultValue}>Return Air: {returnAirEnthalpy} BTU/lb</Text>}
                {outsideAirPercentage && <Text style={styles.resultValue}>OA Percentage: {outsideAirPercentage}%</Text>}
                {mixedAirEnthalpy && <Text style={styles.resultValue}>Mixed Air: {mixedAirEnthalpy} BTU/lb</Text>}
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

export default AirTemperatureMixedAirEnthalpyScreen;

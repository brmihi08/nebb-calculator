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

const HydronicDeltaPCoilDeltaPScreen = () => {
  const theme = useTheme();
  const [flowRate, setFlowRate] = useState('');
  const [cvValue, setCvValue] = useState('');
  const [specificGravity, setSpecificGravity] = useState('');
  const [deltaP, setDeltaP] = useState('');

  const calculateMissingValue = () => {
    const values = [flowRate, cvValue, specificGravity, deltaP];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 3) {
      Alert.alert('Error', 'Please fill in at least 3 values to calculate the missing one');
      return;
    }

    if (filledCount === 4) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // GPM = Cv × √(ΔP / SG)
    if (flowRate === '') {
      if (cvValue && deltaP && specificGravity) {
        const cv = parseFloat(cvValue);
        const dp = parseFloat(deltaP);
        const sg = parseFloat(specificGravity);
        
        if (cv <= 0) {
          Alert.alert('Error', 'Cv value must be greater than zero');
          return;
        }
        if (dp < 0) {
          Alert.alert('Error', 'Delta P cannot be negative');
          return;
        }
        if (sg <= 0) {
          Alert.alert('Error', 'Specific gravity must be greater than zero');
          return;
        }
        
        const gpm = cv * Math.sqrt(dp / sg);
        setFlowRate(gpm.toFixed(1));
      }
    } else if (cvValue === '') {
      if (flowRate && deltaP && specificGravity) {
        const gpm = parseFloat(flowRate);
        const dp = parseFloat(deltaP);
        const sg = parseFloat(specificGravity);
        
        if (gpm <= 0) {
          Alert.alert('Error', 'Flow rate must be greater than zero');
          return;
        }
        if (dp <= 0) {
          Alert.alert('Error', 'Delta P must be greater than zero');
          return;
        }
        if (sg <= 0) {
          Alert.alert('Error', 'Specific gravity must be greater than zero');
          return;
        }
        
        const cv = gpm / Math.sqrt(dp / sg);
        setCvValue(cv.toFixed(1));
      }
    } else if (deltaP === '') {
      if (flowRate && cvValue && specificGravity) {
        const gpm = parseFloat(flowRate);
        const cv = parseFloat(cvValue);
        const sg = parseFloat(specificGravity);
        
        if (gpm <= 0) {
          Alert.alert('Error', 'Flow rate must be greater than zero');
          return;
        }
        if (cv <= 0) {
          Alert.alert('Error', 'Cv value must be greater than zero');
          return;
        }
        if (sg <= 0) {
          Alert.alert('Error', 'Specific gravity must be greater than zero');
          return;
        }
        
        const dp = sg * Math.pow(gpm / cv, 2);
        setDeltaP(dp.toFixed(2));
      }
    } else if (specificGravity === '') {
      if (flowRate && cvValue && deltaP) {
        const gpm = parseFloat(flowRate);
        const cv = parseFloat(cvValue);
        const dp = parseFloat(deltaP);
        
        if (gpm <= 0) {
          Alert.alert('Error', 'Flow rate must be greater than zero');
          return;
        }
        if (cv <= 0) {
          Alert.alert('Error', 'Cv value must be greater than zero');
          return;
        }
        if (dp <= 0) {
          Alert.alert('Error', 'Delta P must be greater than zero');
          return;
        }
        
        const sg = dp / Math.pow(gpm / cv, 2);
        setSpecificGravity(sg.toFixed(3));
      }
    }
  };

  const clearAll = () => {
    setFlowRate('');
    setCvValue('');
    setSpecificGravity('');
    setDeltaP('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Coil Delta P</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate pressure drop across heating/cooling coils using Cv values
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>GPM = Cv × √(ΔP / SG)</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: GPM = Flow Rate (GPM), Cv = Valve Coefficient, ΔP = Pressure Drop (PSI), SG = Specific Gravity
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Flow Rate (GPM)"
                value={flowRate}
                onChangeText={setFlowRate}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Cv Value"
                value={cvValue}
                onChangeText={setCvValue}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Specific Gravity"
                value={specificGravity}
                onChangeText={setSpecificGravity}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="1.0 for water"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Delta P (PSI)"
                value={deltaP}
                onChangeText={setDeltaP}
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

            {(flowRate || cvValue || specificGravity || deltaP) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {flowRate && <Text style={styles.resultValue}>Flow Rate: {flowRate} GPM</Text>}
                {cvValue && <Text style={styles.resultValue}>Cv Value: {cvValue}</Text>}
                {specificGravity && <Text style={styles.resultValue}>Specific Gravity: {specificGravity}</Text>}
                {deltaP && <Text style={styles.resultValue}>Delta P: {deltaP} PSI</Text>}
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

export default HydronicDeltaPCoilDeltaPScreen;

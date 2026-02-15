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

const HeatTransferSensibleHeatRatioScreen = () => {
  const theme = useTheme();
  const [sensibleHeat, setSensibleHeat] = useState('');
  const [totalHeat, setTotalHeat] = useState('');
  const [sensibleHeatRatio, setSensibleHeatRatio] = useState('');

  const calculateMissingValue = () => {
    const values = [sensibleHeat, totalHeat, sensibleHeatRatio];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // SHR = Sensible Heat / Total Heat
    if (sensibleHeatRatio === '') {
      if (sensibleHeat && totalHeat) {
        const qs = parseFloat(sensibleHeat);
        const qt = parseFloat(totalHeat);
        if (qt <= 0) {
          Alert.alert('Error', 'Total heat must be greater than zero');
          return;
        }
        if (qs > qt) {
          Alert.alert('Error', 'Sensible heat cannot exceed total heat');
          return;
        }
        const shr = qs / qt;
        if (shr > 1) {
          Alert.alert('Error', 'Sensible heat ratio cannot exceed 1.0');
          return;
        }
        setSensibleHeatRatio(shr.toFixed(3));
      }
    } else if (sensibleHeat === '') {
      if (totalHeat && sensibleHeatRatio) {
        const qt = parseFloat(totalHeat);
        const shr = parseFloat(sensibleHeatRatio);
        if (shr < 0 || shr > 1) {
          Alert.alert('Error', 'Sensible heat ratio must be between 0 and 1');
          return;
        }
        const qs = qt * shr;
        setSensibleHeat(qs.toFixed(0));
      }
    } else if (totalHeat === '') {
      if (sensibleHeat && sensibleHeatRatio) {
        const qs = parseFloat(sensibleHeat);
        const shr = parseFloat(sensibleHeatRatio);
        if (shr <= 0 || shr > 1) {
          Alert.alert('Error', 'Sensible heat ratio must be between 0 and 1');
          return;
        }
        const qt = qs / shr;
        setTotalHeat(qt.toFixed(0));
      }
    }
  };

  const clearAll = () => {
    setSensibleHeat('');
    setTotalHeat('');
    setSensibleHeatRatio('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: screenBackground }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Sensible Heat Ratio</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate sensible heat ratio (SHR) based on sensible and total heat loads
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>SHR = Sensible Heat / Total Heat</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: SHR = Sensible Heat Ratio (0-1), Sensible Heat = Sensible Heat Load (BTU/hr), Total Heat = Total Heat Load (BTU/hr)
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Sensible Heat (BTU/hr)"
                value={sensibleHeat}
                onChangeText={setSensibleHeat}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Total Heat (BTU/hr)"
                value={totalHeat}
                onChangeText={setTotalHeat}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Sensible Heat Ratio"
                value={sensibleHeatRatio}
                onChangeText={setSensibleHeatRatio}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="0.000 - 1.000"
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

            {(sensibleHeat || totalHeat || sensibleHeatRatio) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {sensibleHeat && <Text style={styles.resultValue}>Sensible Heat: {sensibleHeat} BTU/hr</Text>}
                {totalHeat && <Text style={styles.resultValue}>Total Heat: {totalHeat} BTU/hr</Text>}
                {sensibleHeatRatio && <Text style={styles.resultValue}>SHR: {sensibleHeatRatio}</Text>}
                {sensibleHeatRatio && (
                  <Text style={styles.resultValue}>
                    SHR Percentage: {(parseFloat(sensibleHeatRatio || '0') * 100).toFixed(1)}%
                  </Text>
                )}
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

export default HeatTransferSensibleHeatRatioScreen;

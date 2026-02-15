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
  Button,
  Surface,
  Text,
  Snackbar,
} from 'react-native-paper';
import { CopyableValueRow, NumericField } from '../../../components/nebb';
import { formatNumber } from '../../../utils/format';
import { screenBackground } from '../../../theme/screenStyles';

const AirflowVolumetricFlowRateScreen = () => {
  const [velocity, setVelocity] = useState('');
  const [area, setArea] = useState('');
  const [flowRate, setFlowRate] = useState('');
  const [snack, setSnack] = useState('');

  const calculateMissingValue = () => {
    const values = [velocity, area, flowRate];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Q = V × A (Flow Rate = Velocity × Area)
    if (flowRate === '') {
      if (velocity && area) {
        const v = parseFloat(velocity);
        const a = parseFloat(area);
        const q = v * a;
        setFlowRate(formatNumber(q, { decimals: 2 }));
      }
    } else if (velocity === '') {
      if (flowRate && area) {
        const q = parseFloat(flowRate);
        const a = parseFloat(area);
        if (a === 0) {
          Alert.alert('Error', 'Area cannot be zero');
          return;
        }
        const v = q / a;
        setVelocity(formatNumber(v, { decimals: 2 }));
      }
    } else if (area === '') {
      if (flowRate && velocity) {
        const q = parseFloat(flowRate);
        const v = parseFloat(velocity);
        if (v === 0) {
          Alert.alert('Error', 'Velocity cannot be zero');
          return;
        }
        const a = q / v;
        setArea(formatNumber(a, { decimals: 2 }));
      }
    }
  };

  const clearAll = () => {
    setVelocity('');
    setArea('');
    setFlowRate('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: screenBackground }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Volumetric Flow Rate</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate flow rate, velocity, or duct area using Q = V × A
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>Q = V × A</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: Q = Flow Rate (CFM), V = Velocity (FPM), A = Area (ft²)
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <NumericField
                label="Velocity"
                value={velocity}
                onChangeText={setVelocity}
                rightText="FPM"
                maxDecimals={2}
                onSubmitEditing={calculateMissingValue}
              />
            </View>

            <View style={styles.inputRow}>
              <NumericField
                label="Area"
                value={area}
                onChangeText={setArea}
                rightText="ft²"
                maxDecimals={3}
                onSubmitEditing={calculateMissingValue}
              />
            </View>

            <View style={styles.inputRow}>
              <NumericField
                label="Flow Rate"
                value={flowRate}
                onChangeText={setFlowRate}
                rightText="CFM"
                maxDecimals={2}
                onSubmitEditing={calculateMissingValue}
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

            {(velocity || area || flowRate) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Results:</Text>
                {!!velocity && (
                  <CopyableValueRow label="Velocity" value={`${velocity} FPM`} onCopied={() => setSnack('Copied')} />
                )}
                {!!area && <CopyableValueRow label="Area" value={`${area} ft²`} onCopied={() => setSnack('Copied')} />}
                {!!flowRate && (
                  <CopyableValueRow label="Flow Rate" value={`${flowRate} CFM`} onCopied={() => setSnack('Copied')} />
                )}
              </View>
            )}

            <Snackbar visible={!!snack} onDismiss={() => setSnack('')} duration={1200}>
              {snack}
            </Snackbar>
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
    fontSize: 24,
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

export default AirflowVolumetricFlowRateScreen;

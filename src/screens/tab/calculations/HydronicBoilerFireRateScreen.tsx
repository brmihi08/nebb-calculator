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
} from 'react-native-paper';
import { CopyableValueRow, NumericField, FormulaBlock, ResultBlock } from '../../../components/nebb';
import { formatNumber } from '../../../utils/format';

const HydronicBoilerFireRateScreen = () => {
  const [output, setOutput] = useState('');
  const [hHv, setHHv] = useState('');
  const [fireRate, setFireRate] = useState('');

  const calculate = () => {
    if (!output || !hHv) {
      Alert.alert('Error', 'Please fill in all values');
      return;
    }

    try {
      const out = parseFloat(output);
      const hhv = parseFloat(hHv);

      if (out <= 0 || hhv <= 0) {
        Alert.alert('Error', 'Values must be greater than zero');
        return;
      }

      // Fire Rate = Output ÷ HHV
      const rate = out / hhv;
      setFireRate(formatNumber(rate, { decimals: 4 }));
    } catch (error) {
      Alert.alert('Error', 'Invalid input values');
    }
  };

  const reset = () => {
    setOutput('');
    setHHv('');
    setFireRate('');
  };

  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.section}>
        <Title style={styles.title}>Boiler Fire Rate</Title>
        <Paragraph style={styles.subtitle}>
          Calculate fuel consumption rate based on boiler output
        </Paragraph>
      </View>

      <View style={styles.section}>
        <FormulaBlock
          formula="Fire Rate = Output ÷ HHV"
          description="Where: Output = Boiler Output (BTU/h), HHV = Higher Heating Value"
        />
      </View>

      <View style={styles.section}>
        <NumericField
          label="Boiler Output (BTU/h)"
          value={output}
          onChangeText={setOutput}
          placeholder="Enter output"
        />
        <NumericField
          label="HHV (BTU/lb or BTU/gal)"
          value={hHv}
          onChangeText={setHHv}
          placeholder="Enter HHV"
          style={{ marginTop: 12 }}
        />
      </View>

      {fireRate && (
        <View style={styles.section}>
          <ResultBlock
            label="Fire Rate"
            value={fireRate}
            unit="lbs/h or gal/h"
          />
          <CopyableValueRow label="Result" value={fireRate} unit="lbs/h or gal/h" />
        </View>
      )}

      <View style={styles.buttonGroup}>
        <Button mode="contained" onPress={calculate}>
          Calculate
        </Button>
        <Button mode="outlined" onPress={reset} style={{ marginLeft: 8 }}>
          Reset
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8f0',
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },
});

export default HydronicBoilerFireRateScreen;

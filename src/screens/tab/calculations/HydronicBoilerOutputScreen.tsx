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

const HydronicBoilerOutputScreen = () => {
  const [inputBtu, setInputBtu] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [output, setOutput] = useState('');

  const calculate = () => {
    if (!inputBtu || !efficiency) {
      Alert.alert('Error', 'Please fill in all values');
      return;
    }

    try {
      const input = parseFloat(inputBtu);
      const eff = parseFloat(efficiency);

      if (input <= 0 || eff <= 0 || eff > 100) {
        Alert.alert('Error', 'Invalid input values');
        return;
      }

      // Output = Input × (Efficiency / 100)
      const out = input * (eff / 100);
      setOutput(formatNumber(out, { decimals: 2 }));
    } catch (error) {
      Alert.alert('Error', 'Invalid input values');
    }
  };

  const reset = () => {
    setInputBtu('');
    setEfficiency('');
    setOutput('');
  };

  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.section}>
        <Title style={styles.title}>Boiler Output</Title>
        <Paragraph style={styles.subtitle}>
          Calculate boiler heat output based on fuel input and efficiency
        </Paragraph>
      </View>

      <View style={styles.section}>
        <FormulaBlock
          formula="Output = Input × (Efficiency ÷ 100)"
          description="Where: Input = Input BTU/h, Efficiency = Boiler Efficiency (%)"
        />
      </View>

      <View style={styles.section}>
        <NumericField
          label="Input (BTU/h)"
          value={inputBtu}
          onChangeText={setInputBtu}
          placeholder="Enter input BTU/h"
        />
        <NumericField
          label="Efficiency (%)"
          value={efficiency}
          onChangeText={setEfficiency}
          placeholder="Enter efficiency (0-100)"
          style={{ marginTop: 12 }}
        />
      </View>

      {output && (
        <View style={styles.section}>
          <ResultBlock
            label="Boiler Output"
            value={output}
            unit="BTU/h"
          />
          <CopyableValueRow label="Result" value={output} unit="BTU/h" />
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

export default HydronicBoilerOutputScreen;

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
import { screenBackground } from '../../../theme/screenStyles';
import { CopyableValueRow, NumericField, FormulaBlock, ResultBlock } from '../../../components/nebb';
import { formatNumber } from '../../../utils/format';

const HeatTransferQBtuhScreen = () => {
  const [cfm, setCfm] = useState('');
  const [tempDiff, setTempDiff] = useState('');
  const [result, setResult] = useState('');
  const [snack, setSnack] = useState('');

  const calculate = () => {
    if (!cfm || !tempDiff) {
      Alert.alert('Error', 'Please fill in all values');
      return;
    }

    try {
      const c = parseFloat(cfm);
      const t = parseFloat(tempDiff);

      if (c <= 0 || t <= 0) {
        Alert.alert('Error', 'Values must be greater than zero');
        return;
      }

      // Q = CFM × 1.08 × ΔT
      const q = c * 1.08 * t;
      setResult(formatNumber(q, { decimals: 2 }));
    } catch (error) {
      Alert.alert('Error', 'Invalid input values');
    }
  };

  const reset = () => {
    setCfm('');
    setTempDiff('');
    setResult('');
  };

  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.section}>
        <Title style={styles.title}>Q BTU/h Calculation</Title>
        <Paragraph style={styles.subtitle}>
          Calculate sensible heating or cooling load in BTU/hour
        </Paragraph>
      </View>

      <View style={styles.section}>
        <FormulaBlock
          formula="Q = CFM × 1.08 × ΔT"
          description="Where: CFM = Cubic Feet per Minute, ΔT = Temperature Difference (°F)"
        />
      </View>

      <View style={styles.section}>
        <NumericField
          label="CFM (Cubic Feet per Minute)"
          value={cfm}
          onChangeText={setCfm}
          placeholder="Enter CFM"
        />
        <NumericField
          label="Temperature Difference (°F)"
          value={tempDiff}
          onChangeText={setTempDiff}
          placeholder="Enter ΔT"
          style={{ marginTop: 12 }}
        />
      </View>

      {result && (
        <View style={styles.section}>
          <ResultBlock
            label="Heating/Cooling Load"
            value={result}
            unit="BTU/h"
          />
          <CopyableValueRow label="Result" value={result} unit="BTU/h" />
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
    backgroundColor: screenBackground,
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

export default HeatTransferQBtuhScreen;

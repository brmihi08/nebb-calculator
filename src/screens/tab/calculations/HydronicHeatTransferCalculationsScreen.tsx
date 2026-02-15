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
import { screenBackground } from '../../../theme/screenStyles';
import { CopyableValueRow, NumericField, FormulaBlock, ResultBlock } from '../../../components/nebb';
import { formatNumber } from '../../../utils/format';

const HydronicHeatTransferCalculationsScreen = () => {
  const [gpm, setGpm] = useState('');
  const [tempDiff, setTempDiff] = useState('');
  const [result, setResult] = useState('');

  const calculate = () => {
    if (!gpm || !tempDiff) {
      Alert.alert('Error', 'Please fill in all values');
      return;
    }

    try {
      const g = parseFloat(gpm);
      const t = parseFloat(tempDiff);

      if (g <= 0 || t <= 0) {
        Alert.alert('Error', 'Values must be greater than zero');
        return;
      }

      // Q = GPM × 500 × ΔT
      // (500 = 8.34 lbs/gal × 60 min/hr ÷ 1000 BTU factor)
      const q = g * 500 * t;
      setResult(formatNumber(q, { decimals: 2 }));
    } catch (error) {
      Alert.alert('Error', 'Invalid input values');
    }
  };

  const reset = () => {
    setGpm('');
    setTempDiff('');
    setResult('');
  };

  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.section}>
        <Title style={styles.title}>Hydronic Heat Transfer</Title>
        <Paragraph style={styles.subtitle}>
          Calculate heating/cooling load in hydronic systems
        </Paragraph>
      </View>

      <View style={styles.section}>
        <FormulaBlock
          formula="Q = GPM × 500 × ΔT"
          description="Where: GPM = Gallons per Minute, ΔT = Temperature Difference (°F)"
        />
      </View>

      <View style={styles.section}>
        <NumericField
          label="Flow Rate (GPM)"
          value={gpm}
          onChangeText={setGpm}
          placeholder="Enter GPM"
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

export default HydronicHeatTransferCalculationsScreen;

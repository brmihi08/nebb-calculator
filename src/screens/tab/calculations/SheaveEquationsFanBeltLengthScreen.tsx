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

const SheaveEquationsFanBeltLengthScreen = () => {
  const [pd1, setPd1] = useState('');
  const [pd2, setPd2] = useState('');
  const [centerDistance, setCenterDistance] = useState('');
  const [beltLength, setBeltLength] = useState('');

  const calculate = () => {
    if (!pd1 || !pd2 || !centerDistance) {
      Alert.alert('Error', 'Please fill in all values');
      return;
    }

    try {
      const p1 = parseFloat(pd1);
      const p2 = parseFloat(pd2);
      const cd = parseFloat(centerDistance);

      if (p1 <= 0 || p2 <= 0 || cd <= 0) {
        Alert.alert('Error', 'Values must be greater than zero');
        return;
      }

      // Belt Length = 2 × C + 1.57 × (PD1 + PD2) - ((PD1 - PD2)² / (4 × C))
      const pdSum = p1 + p2;
      const pdDiff = p1 - p2;
      const result = 2 * cd + 1.57 * pdSum - (Math.pow(pdDiff, 2) / (4 * cd));

      setBeltLength(formatNumber(result, { decimals: 2 }));
    } catch (error) {
      Alert.alert('Error', 'Invalid input values');
    }
  };

  const reset = () => {
    setPd1('');
    setPd2('');
    setCenterDistance('');
    setBeltLength('');
  };

  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.section}>
        <Title style={styles.title}>Fan Belt Length</Title>
        <Paragraph style={styles.subtitle}>
          Calculate the required length for V-belt or serpentine belts
        </Paragraph>
      </View>

      <View style={styles.section}>
        <FormulaBlock
          formula="L = 2C + 1.57(PD₁ + PD₂) - (PD₁ - PD₂)² / (4C)"
          description="Where: C = Center distance, PD = Pulley Diameter"
        />
      </View>

      <View style={styles.section}>
        <NumericField
          label="Pulley Diameter 1 (in)"
          value={pd1}
          onChangeText={setPd1}
          placeholder="Enter PD 1"
        />
        <NumericField
          label="Pulley Diameter 2 (in)"
          value={pd2}
          onChangeText={setPd2}
          placeholder="Enter PD 2"
          style={{ marginTop: 12 }}
        />
        <NumericField
          label="Center Distance (in)"
          value={centerDistance}
          onChangeText={setCenterDistance}
          placeholder="Enter center distance"
          style={{ marginTop: 12 }}
        />
      </View>

      {beltLength && (
        <View style={styles.section}>
          <ResultBlock
            label="Required Belt Length"
            value={beltLength}
            unit="in"
          />
          <CopyableValueRow label="Result" value={beltLength} unit="in" />
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

export default SheaveEquationsFanBeltLengthScreen;

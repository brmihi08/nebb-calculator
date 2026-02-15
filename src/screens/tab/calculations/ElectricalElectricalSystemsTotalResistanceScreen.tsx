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
  SegmentedButtons,
} from 'react-native-paper';
import { screenBackground } from '../../../theme/screenStyles';
import { CopyableValueRow, NumericField, FormulaBlock, ResultBlock } from '../../../components/nebb';
import { formatNumber } from '../../../utils/format';

const ElectricalElectricalSystemsTotalResistanceScreen = () => {
  const [resistanceType, setResistanceType] = useState('series');
  const [r1, setR1] = useState('');
  const [r2, setR2] = useState('');
  const [r3, setR3] = useState('');
  const [total, setTotal] = useState('');

  const calculate = () => {
    const values = [r1, r2, r3].filter(v => v !== '');

    if (values.length < 2) {
      Alert.alert('Error', 'Please fill in at least 2 resistance values');
      return;
    }

    try {
      const resistances = values.map(v => parseFloat(v));

      if (resistances.some(r => r < 0)) {
        Alert.alert('Error', 'Resistance values must be non-negative');
        return;
      }

      let result = 0;

      if (resistanceType === 'series') {
        // Series: RT = R1 + R2 + R3 + ...
        result = resistances.reduce((sum, r) => sum + r, 0);
      } else {
        // Parallel: 1/RT = 1/R1 + 1/R2 + 1/R3 + ...
        const inverseSum = resistances.reduce((sum, r) => {
          if (r === 0) {
            throw new Error('Cannot have zero resistance in parallel');
          }
          return sum + (1 / r);
        }, 0);
        result = 1 / inverseSum;
      }

      setTotal(formatNumber(result, { decimals: 2 }));
    } catch (error) {
      Alert.alert('Error', 'Invalid input values');
    }
  };

  const reset = () => {
    setR1('');
    setR2('');
    setR3('');
    setTotal('');
  };

  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.section}>
        <Title style={styles.title}>Total Resistance</Title>
        <Paragraph style={styles.subtitle}>
          Calculate series or parallel resistance networks
        </Paragraph>
      </View>

      <View style={styles.section}>
        <SegmentedButtons
          value={resistanceType}
          onValueChange={setResistanceType}
          buttons={[
            {
              value: 'series',
              label: 'Series',
            },
            {
              value: 'parallel',
              label: 'Parallel',
            },
          ]}
        />
      </View>

      <View style={styles.section}>
        {resistanceType === 'series' ? (
          <FormulaBlock
            formula="RT = R₁ + R₂ + R₃ + ..."
            description="For resistances connected in series"
          />
        ) : (
          <FormulaBlock
            formula="1/RT = 1/R₁ + 1/R₂ + 1/R₃ + ..."
            description="For resistances connected in parallel"
          />
        )}
      </View>

      <View style={styles.section}>
        <NumericField
          label="Resistance 1 (Ω)"
          value={r1}
          onChangeText={setR1}
          placeholder="Enter R1"
        />
        <NumericField
          label="Resistance 2 (Ω)"
          value={r2}
          onChangeText={setR2}
          placeholder="Enter R2"
          style={{ marginTop: 12 }}
        />
        <NumericField
          label="Resistance 3 (Ω) - Optional"
          value={r3}
          onChangeText={setR3}
          placeholder="Enter R3"
          style={{ marginTop: 12 }}
        />
      </View>

      {total && (
        <View style={styles.section}>
          <ResultBlock
            label="Total Resistance"
            value={total}
            unit="Ω"
          />
          <CopyableValueRow label="Result" value={total} unit="Ω" />
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

export default ElectricalElectricalSystemsTotalResistanceScreen;

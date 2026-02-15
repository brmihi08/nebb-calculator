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

const ElectricalElectricalSystemsPrimarySecondaryScreen = () => {
  const [primaryVoltage, setPrimaryVoltage] = useState('');
  const [primaryCurrent, setPrimaryCurrent] = useState('');
  const [secondaryVoltage, setSecondaryVoltage] = useState('');
  const [secondaryCurrent, setSecondaryCurrent] = useState('');

  const calculateMissingValue = () => {
    const values = [primaryVoltage, primaryCurrent, secondaryVoltage, secondaryCurrent];
    const filledCount = values.filter(v => v !== '').length;

    if (filledCount < 3) {
      Alert.alert('Error', 'Please fill in at least 3 values');
      return;
    }

    if (filledCount === 4) {
      Alert.alert('Info', 'All values are filled. Clear one to calculate it.');
      return;
    }

    try {
      // Transformer relationship: VP × IP = VS × IS (ignoring losses)
      if (secondaryCurrent === '') {
        const pv = parseFloat(primaryVoltage);
        const pc = parseFloat(primaryCurrent);
        const sv = parseFloat(secondaryVoltage);
        if (sv === 0) {
          Alert.alert('Error', 'Secondary voltage cannot be zero');
          return;
        }
        const sc = (pv * pc) / sv;
        setSecondaryCurrent(formatNumber(sc, { decimals: 2 }));
      } else if (secondaryVoltage === '') {
        const pv = parseFloat(primaryVoltage);
        const pc = parseFloat(primaryCurrent);
        const sc = parseFloat(secondaryCurrent);
        if (sc === 0) {
          Alert.alert('Error', 'Secondary current cannot be zero');
          return;
        }
        const sv = (pv * pc) / sc;
        setSecondaryVoltage(formatNumber(sv, { decimals: 2 }));
      } else if (primaryCurrent === '') {
        const pv = parseFloat(primaryVoltage);
        const sv = parseFloat(secondaryVoltage);
        const sc = parseFloat(secondaryCurrent);
        if (pv === 0) {
          Alert.alert('Error', 'Primary voltage cannot be zero');
          return;
        }
        const pc = (sv * sc) / pv;
        setPrimaryCurrent(formatNumber(pc, { decimals: 2 }));
      } else if (primaryVoltage === '') {
        const pc = parseFloat(primaryCurrent);
        const sv = parseFloat(secondaryVoltage);
        const sc = parseFloat(secondaryCurrent);
        if (pc === 0) {
          Alert.alert('Error', 'Primary current cannot be zero');
          return;
        }
        const pv = (sv * sc) / pc;
        setPrimaryVoltage(formatNumber(pv, { decimals: 2 }));
      }
    } catch (error) {
      Alert.alert('Error', 'Invalid input values');
    }
  };

  const reset = () => {
    setPrimaryVoltage('');
    setPrimaryCurrent('');
    setSecondaryVoltage('');
    setSecondaryCurrent('');
  };

  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.section}>
        <Title style={styles.title}>Primary/Secondary Transformer</Title>
        <Paragraph style={styles.subtitle}>
          Calculate transformer primary and secondary voltage and current relationships
        </Paragraph>
      </View>

      <View style={styles.section}>
        <FormulaBlock
          formula="Vₚ × Iₚ = Vₛ × Iₛ"
          description="Where: V = Voltage, I = Current, p = Primary, s = Secondary"
        />
      </View>

      <View style={styles.section}>
        <NumericField
          label="Primary Voltage (V)"
          value={primaryVoltage}
          onChangeText={setPrimaryVoltage}
          placeholder="Enter primary voltage"
        />
        <NumericField
          label="Primary Current (A)"
          value={primaryCurrent}
          onChangeText={setPrimaryCurrent}
          placeholder="Enter primary current"
          style={{ marginTop: 12 }}
        />
        <NumericField
          label="Secondary Voltage (V)"
          value={secondaryVoltage}
          onChangeText={setSecondaryVoltage}
          placeholder="Enter secondary voltage"
          style={{ marginTop: 12 }}
        />
        <NumericField
          label="Secondary Current (A)"
          value={secondaryCurrent}
          onChangeText={setSecondaryCurrent}
          placeholder="Enter secondary current"
          style={{ marginTop: 12 }}
        />
      </View>

      <View style={styles.buttonGroup}>
        <Button mode="contained" onPress={calculateMissingValue}>
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

export default ElectricalElectricalSystemsPrimarySecondaryScreen;

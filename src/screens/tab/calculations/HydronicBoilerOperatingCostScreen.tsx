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

const HydronicBoilerOperatingCostScreen = () => {
  const [fireRate, setFireRate] = useState('');
  const [fuelCost, setFuelCost] = useState('');
  const [hours, setHours] = useState('');
  const [cost, setCost] = useState('');

  const calculate = () => {
    if (!fireRate || !fuelCost || !hours) {
      Alert.alert('Error', 'Please fill in all values');
      return;
    }

    try {
      const fr = parseFloat(fireRate);
      const fc = parseFloat(fuelCost);
      const h = parseFloat(hours);

      if (fr <= 0 || fc < 0 || h <= 0) {
        Alert.alert('Error', 'Invalid input values');
        return;
      }

      // Operating Cost = Fire Rate × Fuel Cost × Hours
      const totalCost = fr * fc * h;
      setCost(formatNumber(totalCost, { decimals: 2 }));
    } catch (error) {
      Alert.alert('Error', 'Invalid input values');
    }
  };

  const reset = () => {
    setFireRate('');
    setFuelCost('');
    setHours('');
    setCost('');
  };

  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.section}>
        <Title style={styles.title}>Boiler Operating Cost</Title>
        <Paragraph style={styles.subtitle}>
          Calculate operating costs based on fuel consumption and rates
        </Paragraph>
      </View>

      <View style={styles.section}>
        <FormulaBlock
          formula="Cost = Fire Rate × Fuel Cost × Hours"
          description="Where: Fire Rate = lbs/h or gal/h, Fuel Cost = $/lb or $/gal, Hours = Operating hours"
        />
      </View>

      <View style={styles.section}>
        <NumericField
          label="Fire Rate (lbs/h or gal/h)"
          value={fireRate}
          onChangeText={setFireRate}
          placeholder="Enter fire rate"
        />
        <NumericField
          label="Fuel Cost ($/lb or $/gal)"
          value={fuelCost}
          onChangeText={setFuelCost}
          placeholder="Enter fuel cost"
          style={{ marginTop: 12 }}
        />
        <NumericField
          label="Operating Hours"
          value={hours}
          onChangeText={setHours}
          placeholder="Enter hours"
          style={{ marginTop: 12 }}
        />
      </View>

      {cost && (
        <View style={styles.section}>
          <ResultBlock
            label="Operating Cost"
            value={cost}
            unit="$"
          />
          <CopyableValueRow label="Result" value={cost} unit="$" />
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

export default HydronicBoilerOperatingCostScreen;

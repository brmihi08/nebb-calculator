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
import { CopyableValueRow, NumericField, FormulaBlock, ResultBlock } from '../../../components/nebb';
import { formatNumber } from '../../../utils/format';

const SheaveEquationsRPMandPDScreen = () => {
  const [driverRpm, setDriverRpm] = useState('');
  const [driverPd, setDriverPd] = useState('');
  const [drivenPd, setDrivenPd] = useState('');
  const [drivenRpm, setDrivenRpm] = useState('');
  const [snack, setSnack] = useState('');

  const calculateMissingValue = () => {
    const values = [driverRpm, driverPd, drivenPd, drivenRpm];
    const filledCount = values.filter(v => v !== '').length;

    if (filledCount < 3) {
      Alert.alert('Error', 'Please fill in at least 3 values to calculate the missing one');
      return;
    }

    if (filledCount === 4) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    try {
      // RPM1 × PD1 = RPM2 × PD2
      if (drivenRpm === '') {
        const drpm = parseFloat(driverRpm);
        const dpd = parseFloat(driverPd);
        const d2pd = parseFloat(drivenPd);
        if (d2pd === 0) {
          Alert.alert('Error', 'Driven PD cannot be zero');
          return;
        }
        const d2rpm = (drpm * dpd) / d2pd;
        setDrivenRpm(formatNumber(d2rpm, { decimals: 2 }));
      } else if (drivenPd === '') {
        const drpm = parseFloat(driverRpm);
        const dpd = parseFloat(driverPd);
        const d2rpm = parseFloat(drivenRpm);
        if (d2rpm === 0) {
          Alert.alert('Error', 'Driven RPM cannot be zero');
          return;
        }
        const d2pd = (drpm * dpd) / d2rpm;
        setDrivenPd(formatNumber(d2pd, { decimals: 2 }));
      } else if (driverPd === '') {
        const drpm = parseFloat(driverRpm);
        const d2pd = parseFloat(drivenPd);
        const d2rpm = parseFloat(drivenRpm);
        if (drpm === 0) {
          Alert.alert('Error', 'Driver RPM cannot be zero');
          return;
        }
        const dpd = (d2rpm * d2pd) / drpm;
        setDriverPd(formatNumber(dpd, { decimals: 2 }));
      } else if (driverRpm === '') {
        const dpd = parseFloat(driverPd);
        const d2pd = parseFloat(drivenPd);
        const d2rpm = parseFloat(drivenRpm);
        if (dpd === 0) {
          Alert.alert('Error', 'Driver PD cannot be zero');
          return;
        }
        const drpm = (d2rpm * d2pd) / dpd;
        setDriverRpm(formatNumber(drpm, { decimals: 2 }));
      }
    } catch (error) {
      Alert.alert('Error', 'Invalid input values');
    }
  };

  const reset = () => {
    setDriverRpm('');
    setDriverPd('');
    setDrivenPd('');
    setDrivenRpm('');
  };

  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.section}>
        <Title style={styles.title}>RPM and Pulley Diameter</Title>
        <Paragraph style={styles.subtitle}>
          Calculate sheave/pulley relationships for belt-driven equipment
        </Paragraph>
      </View>

      <View style={styles.section}>
        <FormulaBlock
          formula="RPM₁ × PD₁ = RPM₂ × PD₂"
          description="Where: RPM = Motor speed, PD = Pulley Diameter"
        />
      </View>

      <View style={styles.section}>
        <NumericField
          label="Driver RPM"
          value={driverRpm}
          onChangeText={setDriverRpm}
          placeholder="Enter driver RPM"
        />
        <NumericField
          label="Driver PD (Pulley Diameter)"
          value={driverPd}
          onChangeText={setDriverPd}
          placeholder="Enter driver PD"
          style={{ marginTop: 12 }}
        />
        <NumericField
          label="Driven PD (Pulley Diameter)"
          value={drivenPd}
          onChangeText={setDrivenPd}
          placeholder="Enter driven PD"
          style={{ marginTop: 12 }}
        />
        <NumericField
          label="Driven RPM"
          value={drivenRpm}
          onChangeText={setDrivenRpm}
          placeholder="Enter driven RPM"
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

export default SheaveEquationsRPMandPDScreen;

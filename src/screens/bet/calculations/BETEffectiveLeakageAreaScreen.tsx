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
  TextInput,
  Button,
  Surface,
  Text,
} from 'react-native-paper';
import { screenBackground } from '../../../theme/screenStyles';
import { liquidLayout, liquidCalcLayout, makeCalcAccentStyles } from '../../../theme/liquidLayout';
import { PressureUnit, paToInWc, pressureToPa } from '../../../utils/bet';

const ACCENT = '#f59e0b';

const BETEffectiveLeakageAreaScreen = () => {
  const [airflowRate, setAirflowRate] = useState('');
  const [pressure, setPressure] = useState('');
  const [pressureUnit, setPressureUnit] = useState<PressureUnit>('Pa');
  const [dischargeCoefficient, setDischargeCoefficient] = useState('0.61');
  const [effectiveLeakageAreaIn2, setEffectiveLeakageAreaIn2] = useState('');
  const [effectiveLeakageAreaFt2, setEffectiveLeakageAreaFt2] = useState('');

  const ORIFICE_CONSTANT_CFM = 1096; // Q(cfm) ≈ C_d × A(ft²) × 1096 × √(ΔP[in. w.c.])

  const calculateEffectiveLeakageArea = () => {
    if (!airflowRate || !pressure) {
      Alert.alert('Error', 'Please enter Airflow Rate and Pressure');
      return;
    }

    const q = parseFloat(airflowRate);
    const pInput = parseFloat(pressure);
    const cd = dischargeCoefficient ? parseFloat(dischargeCoefficient) : 0.61;

    if (!Number.isFinite(q) || !Number.isFinite(pInput) || !Number.isFinite(cd)) {
      Alert.alert('Error', 'Please enter valid numeric values');
      return;
    }

    const pPa = pressureToPa(pInput, pressureUnit);

    if (pPa <= 0) {
      Alert.alert('Error', 'Pressure must be greater than zero');
      return;
    }

    if (cd <= 0 || cd > 1.2) {
      Alert.alert('Error', 'Discharge coefficient (C_d) should be > 0 (typical range ~0.6–1.0)');
      return;
    }

    const pInWC = paToInWc(pPa);

    // A(ft²) = Q / (C_d × 1096 × √(ΔP[in. w.c.]))
    const aFt2 = q / (cd * ORIFICE_CONSTANT_CFM * Math.sqrt(pInWC));
    const aIn2 = aFt2 * 144;

    setEffectiveLeakageAreaFt2(aFt2.toFixed(4));
    setEffectiveLeakageAreaIn2(aIn2.toFixed(2));
  };

  const clearAll = () => {
    setAirflowRate('');
    setPressure('');
    setPressureUnit('Pa');
    setDischargeCoefficient('0.61');
    setEffectiveLeakageAreaIn2('');
    setEffectiveLeakageAreaFt2('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: screenBackground }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Effective Leakage Area</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate effective leakage area from airflow rate and pressure differential
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>A = Q / (C_d × 1096 × √(ΔP))</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: A = Effective Leakage Area, Q = Airflow Rate (CFM), C_d = Discharge Coefficient,
                ΔP = Pressure Differential (in. w.c.). Uses an orifice-based approximation with standard air.
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Airflow Rate (CFM)"
                value={airflowRate}
                onChangeText={setAirflowRate}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label={`Pressure Differential (${pressureUnit === 'Pa' ? 'Pa' : 'in. w.c.'})`}
                value={pressure}
                onChangeText={setPressure}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder={pressureUnit === 'Pa' ? '50' : '0.20'}
              />
              <View style={styles.unitToggleRow}>
                <Button
                  mode={pressureUnit === 'Pa' ? 'contained' : 'outlined'}
                  compact
                  onPress={() => setPressureUnit('Pa')}
                  style={styles.unitToggleButton}
                >
                  Pa
                </Button>
                <Button
                  mode={pressureUnit === 'in_w_c' ? 'contained' : 'outlined'}
                  compact
                  onPress={() => setPressureUnit('in_w_c')}
                  style={styles.unitToggleButton}
                >
                  in. w.c.
                </Button>
              </View>
              {!!pressure && Number.isFinite(parseFloat(pressure)) && (
                <Paragraph style={styles.unitHint}>
                  {pressureUnit === 'Pa'
                    ? `≈ ${paToInWc(parseFloat(pressure)).toFixed(3)} in. w.c.`
                    : `≈ ${pressureToPa(parseFloat(pressure), 'in_w_c').toFixed(1)} Pa`}
                </Paragraph>
              )}
              <Paragraph style={styles.unitHint}>
                Common reference points: 50 Pa (≈ 0.20 in. w.c.) and 0.30 in. w.c. (≈ 75 Pa)
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Discharge Coefficient (C_d)"
                value={dischargeCoefficient}
                onChangeText={setDischargeCoefficient}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="0.61"
              />
              <Paragraph style={styles.unitHint}>
                Typical C_d ≈ 0.61 for a sharp-edged orifice; use project/test procedure if specified.
              </Paragraph>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={calculateEffectiveLeakageArea}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Calculate ELA
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

            {(effectiveLeakageAreaIn2 || effectiveLeakageAreaFt2) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Effective Leakage Area:</Text>
                {!!effectiveLeakageAreaIn2 && (
                  <Text style={styles.resultValue}>{effectiveLeakageAreaIn2} in²</Text>
                )}
                {!!effectiveLeakageAreaFt2 && (
                  <Text style={styles.resultSubValue}>{effectiveLeakageAreaFt2} ft²</Text>
                )}
              </View>
            )}
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <Title style={styles.infoTitle}>Effective Leakage Area Notes</Title>
            <Paragraph style={styles.infoText}>
              • Effective Leakage Area (ELA) represents the equivalent area of a single sharp-edged 
              orifice that would produce the same airflow at the same pressure
            </Paragraph>
            <Paragraph style={styles.infoText}>
              • Discharge coefficient (C_d) typically ranges from 0.6 to 1.0
            </Paragraph>
            <Paragraph style={styles.infoText}>
              • Default value of C_d = 1.0 is commonly used for calculations
            </Paragraph>
            <Paragraph style={styles.infoText}>
              • ELA is useful for comparing building airtightness across different building sizes
            </Paragraph>
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...liquidLayout,
  ...liquidCalcLayout,
  ...makeCalcAccentStyles(ACCENT),

  unitHint: {
    marginTop: 6,
    fontSize: 12,
    color: '#000000',
    opacity: 0.6,
  },
  unitToggleRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  unitToggleButton: {
    flex: 1,
  },

  resultValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  resultSubValue: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.8,
    marginTop: 4,
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000000',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    color: '#000000',
    opacity: 0.9,
  },
});

export default BETEffectiveLeakageAreaScreen;




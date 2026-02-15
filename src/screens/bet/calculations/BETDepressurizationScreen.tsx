import React, { useState, useEffect } from 'react';
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
import { liquidLayout, liquidCalcLayout, makeCalcAccentStyles } from '../../../theme/liquidLayout';

const ACCENT = '#22c55e';

const BETDepressurizationScreen = () => {
  const [pressure, setPressure] = useState('');
  const [flowCoefficient, setFlowCoefficient] = useState('');
  const [flowExponent, setFlowExponent] = useState('');
  const [airflowRate, setAirflowRate] = useState('');
  const [pressureUncertainty, setPressureUncertainty] = useState('');
  const [flowCoefficientUncertainty, setFlowCoefficientUncertainty] = useState('');
  const [flowExponentUncertainty, setFlowExponentUncertainty] = useState('');
  const [airflowUncertainty, setAirflowUncertainty] = useState('');
  const [combinedUncertainty, setCombinedUncertainty] = useState<number | null>(null);
  const [expandedUncertainty, setExpandedUncertainty] = useState<number | null>(null);

  const calculateMissingValue = () => {
    const values = [pressure, flowCoefficient, flowExponent, airflowRate];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 3) {
      Alert.alert('Error', 'Please fill in at least 3 values to calculate the missing one');
      return;
    }

    if (filledCount === 4) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Q = C × (ΔP)^n (same formula as pressurization)
    // Where: Q = Airflow Rate (CFM), C = Flow Coefficient, ΔP = Pressure (Pa), n = Flow Exponent
    const p = pressure ? parseFloat(pressure) : 0;
    const c = flowCoefficient ? parseFloat(flowCoefficient) : 0;
    const n = flowExponent ? parseFloat(flowExponent) : 0;
    const q = airflowRate ? parseFloat(airflowRate) : 0;

    if (airflowRate === '') {
      if (c === 0 || p === 0) {
        Alert.alert('Error', 'Flow coefficient and pressure cannot be zero');
        return;
      }
      const qValue = c * Math.pow(p, n);
      setAirflowRate(qValue.toFixed(2));
    } else if (flowCoefficient === '') {
      if (q === 0 || p === 0) {
        Alert.alert('Error', 'Airflow rate and pressure cannot be zero');
        return;
      }
      const cValue = q / Math.pow(p, n);
      setFlowCoefficient(cValue.toFixed(4));
    } else if (pressure === '') {
      if (c === 0 || q === 0) {
        Alert.alert('Error', 'Flow coefficient and airflow rate cannot be zero');
        return;
      }
      if (n === 0) {
        Alert.alert('Error', 'Flow exponent cannot be zero');
        return;
      }
      const pValue = Math.pow(q / c, 1 / n);
      setPressure(pValue.toFixed(2));
    } else if (flowExponent === '') {
      Alert.alert('Info', 'Flow exponent (n) is typically determined from multiple test points. Use default value of 0.65 if unknown.');
    }

    // Calculate uncertainty if values are available
    calculateUncertainty();
  };

  useEffect(() => {
    calculateUncertainty();
  }, [pressure, flowCoefficient, flowExponent, airflowRate, pressureUncertainty, flowCoefficientUncertainty, flowExponentUncertainty, airflowUncertainty]);

  const calculateUncertainty = () => {
    if (!pressure || !flowCoefficient || !flowExponent || !airflowRate) {
      setCombinedUncertainty(null);
      setExpandedUncertainty(null);
      return;
    }

    const p = parseFloat(pressure);
    const c = parseFloat(flowCoefficient);
    const n = parseFloat(flowExponent);
    const q = parseFloat(airflowRate);

    // Get uncertainty values (use defaults if not provided)
    const u_p = pressureUncertainty ? parseFloat(pressureUncertainty) : p * 0.02; // Default 2% uncertainty
    const u_C = flowCoefficientUncertainty ? parseFloat(flowCoefficientUncertainty) : c * 0.05; // Default 5% uncertainty
    const u_n = flowExponentUncertainty ? parseFloat(flowExponentUncertainty) : 0.05; // Default 0.05 uncertainty

    // Calculate combined uncertainty using error propagation
    // For Q = C × (ΔP)^n
    // Relative uncertainty: u_Q/Q = sqrt((u_C/C)^2 + (n × u_p/p)^2 + (ln(ΔP) × u_n)^2)
    const relativeUncertaintyC = Math.pow(u_C / c, 2);
    const relativeUncertaintyP = Math.pow((n * u_p) / p, 2);
    const relativeUncertaintyN = Math.pow(Math.log(p) * u_n, 2);
    
    const combinedRelativeUncertainty = Math.sqrt(relativeUncertaintyC + relativeUncertaintyP + relativeUncertaintyN);
    const combined = q * combinedRelativeUncertainty;
    setCombinedUncertainty(combined);

    // Expanded uncertainty (k=2 for 95% confidence)
    const expanded = combined * 2;
    setExpandedUncertainty(expanded);
  };

  const clearAll = () => {
    setPressure('');
    setFlowCoefficient('');
    setFlowExponent('');
    setAirflowRate('');
    setPressureUncertainty('');
    setFlowCoefficientUncertainty('');
    setFlowExponentUncertainty('');
    setAirflowUncertainty('');
    setCombinedUncertainty(null);
    setExpandedUncertainty(null);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>ASTM E1827 Depressurization</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate air leakage rate from depressurization test data using Q = C × (ΔP)^n
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>Q = C × (ΔP)^n</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: Q = Airflow Rate (CFM), C = Flow Coefficient, ΔP = Pressure (Pa), n = Flow Exponent (typically 0.5-0.7)
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Pressure Differential (Pa)"
                value={pressure}
                onChangeText={setPressure}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Flow Coefficient (C)"
                value={flowCoefficient}
                onChangeText={setFlowCoefficient}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Flow Exponent (n)"
                value={flowExponent}
                onChangeText={setFlowExponent}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="0.65 (default)"
              />
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

            <View style={styles.uncertaintySection}>
              <Title style={styles.uncertaintyTitle}>Measurement Uncertainty</Title>
              <Paragraph style={styles.uncertaintyDescription}>
                Enter uncertainty values (absolute or leave blank for default estimates)
              </Paragraph>

              <View style={styles.inputRow}>
                <TextInput
                  label="Pressure Uncertainty (Pa)"
                  value={pressureUncertainty}
                  onChangeText={setPressureUncertainty}
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                  placeholder="Auto: 2% of pressure"
                />
              </View>

              <View style={styles.inputRow}>
                <TextInput
                  label="Flow Coefficient Uncertainty"
                  value={flowCoefficientUncertainty}
                  onChangeText={setFlowCoefficientUncertainty}
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                  placeholder="Auto: 5% of coefficient"
                />
              </View>

              <View style={styles.inputRow}>
                <TextInput
                  label="Flow Exponent Uncertainty"
                  value={flowExponentUncertainty}
                  onChangeText={setFlowExponentUncertainty}
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                  placeholder="Auto: 0.05"
                />
              </View>

              <View style={styles.inputRow}>
                <TextInput
                  label="Airflow Measurement Uncertainty (CFM)"
                  value={airflowUncertainty}
                  onChangeText={setAirflowUncertainty}
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                  placeholder="Auto: 3% of airflow"
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={calculateMissingValue}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Calculate
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

            {(pressure || flowCoefficient || flowExponent || airflowRate) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {pressure && <Text style={styles.resultValue}>Pressure: {pressure} Pa</Text>}
                {flowCoefficient && <Text style={styles.resultValue}>Flow Coefficient: {flowCoefficient}</Text>}
                {flowExponent && <Text style={styles.resultValue}>Flow Exponent: {flowExponent}</Text>}
                {airflowRate && <Text style={styles.resultValue}>Airflow Rate: {airflowRate} CFM</Text>}
              </View>
            )}

            {combinedUncertainty !== null && (
              <View style={styles.uncertaintyResultContainer}>
                <Text style={styles.uncertaintyResultLabel}>Uncertainty Analysis:</Text>
                <Text style={styles.uncertaintyResultValue}>
                  Combined Uncertainty: ±{combinedUncertainty.toFixed(2)} CFM
                </Text>
                <Text style={styles.uncertaintyResultValue}>
                  Relative Uncertainty: ±{((combinedUncertainty / parseFloat(airflowRate)) * 100).toFixed(2)}%
                </Text>
                {expandedUncertainty !== null && (
                  <>
                    <Text style={styles.uncertaintyResultValue}>
                      Expanded Uncertainty (k=2, 95%): ±{expandedUncertainty.toFixed(2)} CFM
                    </Text>
                    <Text style={styles.uncertaintyResultValue}>
                      Airflow Rate: {airflowRate} ± {expandedUncertainty.toFixed(2)} CFM (95% confidence)
                    </Text>
                  </>
                )}
              </View>
            )}
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <Title style={styles.infoTitle}>ASTM E1827 Notes</Title>
            <Paragraph style={styles.infoText}>
              • Uses orifice blower door for depressurization testing
            </Paragraph>
            <Paragraph style={styles.infoText}>
              • Flow exponent (n) typically ranges from 0.5 (laminar) to 0.7 (turbulent)
            </Paragraph>
            <Paragraph style={styles.infoText}>
              • Default value of n = 0.65 is commonly used
            </Paragraph>
            <Paragraph style={styles.infoText}>
              • Test at multiple pressure points (10, 20, 30, 40, 50, 60 Pa)
            </Paragraph>
            <Paragraph style={styles.infoText}>
              • Flow coefficient (C) is determined from test data regression
            </Paragraph>
            <Paragraph style={styles.infoText}>
              • Measurement uncertainty follows ASTM E1827 guidelines
            </Paragraph>
            <Paragraph style={styles.infoText}>
              • Combined uncertainty uses error propagation: u_Q/Q = √[(u_C/C)² + (n×u_p/p)² + (ln(ΔP)×u_n)²]
            </Paragraph>
            <Paragraph style={styles.infoText}>
              • Expanded uncertainty (k=2) provides 95% confidence interval
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
  uncertaintySection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: ACCENT + '4D',
  },
  uncertaintyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ACCENT,
    marginBottom: 8,
  },
  uncertaintyDescription: {
    fontSize: 13,
    color: '#000000',
    opacity: 0.7,
    marginBottom: 16,
  },
  uncertaintyResultContainer: {
    backgroundColor: ACCENT + '26',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: ACCENT + '4D',
  },
  uncertaintyResultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ACCENT,
    marginBottom: 8,
  },
  uncertaintyResultValue: {
    fontSize: 15,
    color: '#000000',
    marginBottom: 4,
    fontWeight: '500',
  },
});

export default BETDepressurizationScreen;


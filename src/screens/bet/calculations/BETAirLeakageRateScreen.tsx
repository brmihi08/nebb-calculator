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
import {
  PressureUnit,
  calcAchFromCfm,
  calcCfmPerFt2,
  calcFlowAtPressure,
  formatPressurePair,
  paToInWc,
  pressureToPa,
  validateFlowExponent,
} from '../../../utils/bet';

const ACCENT = '#8b5cf6';

const BETAirLeakageRateScreen = () => {
  const [airflowRate, setAirflowRate] = useState('');
  const [testPressure, setTestPressure] = useState('');
  const [standardPressure, setStandardPressure] = useState('');
  const [flowExponent, setFlowExponent] = useState('');
  const [airLeakageRate, setAirLeakageRate] = useState('');

  // Pressure input units (NEBB commonly references 0.30 in. w.c.)
  const [testPressureUnit, setTestPressureUnit] = useState<PressureUnit>('Pa');
  const [standardPressureUnit, setStandardPressureUnit] = useState<PressureUnit>('Pa');

  // Optional normalization inputs
  const [buildingVolume, setBuildingVolume] = useState(''); // ft³
  const [envelopeArea, setEnvelopeArea] = useState(''); // ft²

  // Derived common references
  const [qAt50Pa, setQAt50Pa] = useState<string>('');
  const [qAt75Pa, setQAt75Pa] = useState<string>('');
  const [qAt030InWc, setQAt030InWc] = useState<string>('');
  const [ach50, setAch50] = useState<string>('');
  const [cfm50PerFt2, setCfm50PerFt2] = useState<string>('');
  const [cfm030PerFt2, setCfm030PerFt2] = useState<string>('');
  const [airflowUncertainty, setAirflowUncertainty] = useState('');
  const [testPressureUncertainty, setTestPressureUncertainty] = useState('');
  const [standardPressureUncertainty, setStandardPressureUncertainty] = useState('');
  const [flowExponentUncertainty, setFlowExponentUncertainty] = useState('');
  const [combinedUncertainty, setCombinedUncertainty] = useState<number | null>(null);
  const [expandedUncertainty, setExpandedUncertainty] = useState<number | null>(null);

  const calculateAirLeakageRate = () => {
    if (!airflowRate || !testPressure || !standardPressure || !flowExponent) {
      Alert.alert('Error', 'Please fill in all required values');
      return;
    }

    const qTest = parseFloat(airflowRate);
    const pTestInput = parseFloat(testPressure);
    const pStandardInput = parseFloat(standardPressure);
    const n = parseFloat(flowExponent);

    if (!Number.isFinite(qTest) || !Number.isFinite(pTestInput) || !Number.isFinite(pStandardInput) || !Number.isFinite(n)) {
      Alert.alert('Error', 'Please enter valid numeric values');
      return;
    }

    const nValidation = validateFlowExponent(n);
    if (!nValidation.ok) {
      Alert.alert('Error', nValidation.error);
      return;
    }

    const pTestPa = pressureToPa(pTestInput, testPressureUnit);
    const pStandardPa = pressureToPa(pStandardInput, standardPressureUnit);

    if (pTestPa <= 0 || pStandardPa <= 0) {
      Alert.alert('Error', 'Pressures must be greater than zero');
      return;
    }

    // Q_ref = Q_test × (P_ref / P_test)^n
    const qStandard = calcFlowAtPressure(qTest, pTestPa, pStandardPa, n);
    setAirLeakageRate(qStandard.toFixed(2));

    // NEBB-first common reference points
    const p50Pa = 50;
    const p75Pa = 75;
    const p030InWcPa = pressureToPa(0.3, 'in_w_c');

    const q50 = calcFlowAtPressure(qTest, pTestPa, p50Pa, n);
    const q75 = calcFlowAtPressure(qTest, pTestPa, p75Pa, n);
    const q030 = calcFlowAtPressure(qTest, pTestPa, p030InWcPa, n);

    setQAt50Pa(q50.toFixed(2));
    setQAt75Pa(q75.toFixed(2));
    setQAt030InWc(q030.toFixed(2));

    // Normalizations
    const volumeFt3 = buildingVolume ? parseFloat(buildingVolume) : NaN;
    if (Number.isFinite(volumeFt3) && volumeFt3 > 0) {
      setAch50(calcAchFromCfm(volumeFt3, q50).toFixed(2));
    } else {
      setAch50('');
    }

    const areaFt2 = envelopeArea ? parseFloat(envelopeArea) : NaN;
    if (Number.isFinite(areaFt2) && areaFt2 > 0) {
      setCfm50PerFt2(calcCfmPerFt2(q50, areaFt2).toFixed(3));
      setCfm030PerFt2(calcCfmPerFt2(q030, areaFt2).toFixed(3));
    } else {
      setCfm50PerFt2('');
      setCfm030PerFt2('');
    }

    // Calculate uncertainty
    calculateUncertainty();
  };

  useEffect(() => {
    calculateUncertainty();
  }, [airflowRate, testPressure, standardPressure, flowExponent, airLeakageRate, airflowUncertainty, testPressureUncertainty, standardPressureUncertainty, flowExponentUncertainty, testPressureUnit, standardPressureUnit]);

  const calculateUncertainty = () => {
    if (!airflowRate || !testPressure || !standardPressure || !flowExponent || !airLeakageRate) {
      setCombinedUncertainty(null);
      setExpandedUncertainty(null);
      return;
    }

    const qTest = parseFloat(airflowRate);
    const pTestInput = parseFloat(testPressure);
    const pStandardInput = parseFloat(standardPressure);
    const n = parseFloat(flowExponent);
    const qStandard = parseFloat(airLeakageRate);

    const pTest = pressureToPa(pTestInput, testPressureUnit);
    const pStandard = pressureToPa(pStandardInput, standardPressureUnit);

    // Get uncertainty values (use defaults if not provided)
    const u_Q_test = airflowUncertainty ? parseFloat(airflowUncertainty) : qTest * 0.03; // Default 3%
    const u_p_test = testPressureUncertainty ? parseFloat(testPressureUncertainty) : pTest * 0.02; // Default 2%
    const u_p_standard = standardPressureUncertainty ? parseFloat(standardPressureUncertainty) : pStandard * 0.02; // Default 2%
    const u_n = flowExponentUncertainty ? parseFloat(flowExponentUncertainty) : 0.05; // Default 0.05

    // Uncertainty propagation for Q_standard = Q_test × (P_standard / P_test)^n
    // Relative uncertainty: u_Q_standard/Q_standard = sqrt((u_Q_test/Q_test)^2 + (n × u_p_test/p_test)^2 + (n × u_p_standard/p_standard)^2 + (ln(P_standard/P_test) × u_n)^2)
    const relativeUncertaintyQ = Math.pow(u_Q_test / qTest, 2);
    const relativeUncertaintyPTest = Math.pow((n * u_p_test) / pTest, 2);
    const relativeUncertaintyPStandard = Math.pow((n * u_p_standard) / pStandard, 2);
    const relativeUncertaintyN = Math.pow(Math.log(pStandard / pTest) * u_n, 2);

    const combinedRelativeUncertainty = Math.sqrt(relativeUncertaintyQ + relativeUncertaintyPTest + relativeUncertaintyPStandard + relativeUncertaintyN);
    const combined = qStandard * combinedRelativeUncertainty;
    setCombinedUncertainty(combined);

    // Expanded uncertainty (k=2 for 95% confidence)
    const expanded = combined * 2;
    setExpandedUncertainty(expanded);
  };

  const clearAll = () => {
    setAirflowRate('');
    setTestPressure('');
    setStandardPressure('');
    setFlowExponent('');
    setAirLeakageRate('');

    setTestPressureUnit('Pa');
    setStandardPressureUnit('Pa');

    setBuildingVolume('');
    setEnvelopeArea('');
    setQAt50Pa('');
    setQAt75Pa('');
    setQAt030InWc('');
    setAch50('');
    setCfm50PerFt2('');
    setCfm030PerFt2('');

    setAirflowUncertainty('');
    setTestPressureUncertainty('');
    setStandardPressureUncertainty('');
    setFlowExponentUncertainty('');
    setCombinedUncertainty(null);
    setExpandedUncertainty(null);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Air Leakage Rate</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate air leakage rate at standard conditions (typically 75 Pa or 0.30 in. w.c.)
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>Q_standard = Q_test × (P_standard / P_test)^n</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: Q_standard = Air leakage at standard pressure, Q_test = Measured airflow, 
                P_standard = Standard pressure (75 Pa), P_test = Test pressure, n = Flow exponent
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Airflow Rate at Test (CFM)"
                value={airflowRate}
                onChangeText={setAirflowRate}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label={`Test Pressure (${testPressureUnit === 'Pa' ? 'Pa' : 'in. w.c.'})`}
                value={testPressure}
                onChangeText={setTestPressure}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder={testPressureUnit === 'Pa' ? '50' : '0.20'}
              />
              <View style={styles.unitToggleRow}>
                <Button
                  mode={testPressureUnit === 'Pa' ? 'contained' : 'outlined'}
                  compact
                  onPress={() => setTestPressureUnit('Pa')}
                  style={styles.unitToggleButton}
                >
                  Pa
                </Button>
                <Button
                  mode={testPressureUnit === 'in_w_c' ? 'contained' : 'outlined'}
                  compact
                  onPress={() => setTestPressureUnit('in_w_c')}
                  style={styles.unitToggleButton}
                >
                  in. w.c.
                </Button>
              </View>
              {!!testPressure && Number.isFinite(parseFloat(testPressure)) && (
                <Paragraph style={styles.unitHint}>
                  {testPressureUnit === 'Pa'
                    ? `≈ ${paToInWc(parseFloat(testPressure)).toFixed(3)} in. w.c.`
                    : `≈ ${pressureToPa(parseFloat(testPressure), 'in_w_c').toFixed(1)} Pa`}
                </Paragraph>
              )}
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label={`Standard / Reference Pressure (${standardPressureUnit === 'Pa' ? 'Pa' : 'in. w.c.'})`}
                value={standardPressure}
                onChangeText={setStandardPressure}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder={standardPressureUnit === 'Pa' ? '75' : '0.30'}
              />
              <View style={styles.unitToggleRow}>
                <Button
                  mode={standardPressureUnit === 'Pa' ? 'contained' : 'outlined'}
                  compact
                  onPress={() => setStandardPressureUnit('Pa')}
                  style={styles.unitToggleButton}
                >
                  Pa
                </Button>
                <Button
                  mode={standardPressureUnit === 'in_w_c' ? 'contained' : 'outlined'}
                  compact
                  onPress={() => setStandardPressureUnit('in_w_c')}
                  style={styles.unitToggleButton}
                >
                  in. w.c.
                </Button>
              </View>
              {!!standardPressure && Number.isFinite(parseFloat(standardPressure)) && (
                <Paragraph style={styles.unitHint}>
                  {standardPressureUnit === 'Pa'
                    ? `≈ ${paToInWc(parseFloat(standardPressure)).toFixed(3)} in. w.c.`
                    : `≈ ${pressureToPa(parseFloat(standardPressure), 'in_w_c').toFixed(1)} Pa`}
                </Paragraph>
              )}
              <Paragraph style={styles.unitHint}>
                Common reference for enclosure leakage reporting: 0.30 in. w.c. (≈ 75 Pa)
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Flow Exponent (n)"
                value={flowExponent}
                onChangeText={setFlowExponent}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="0.65"
              />
            </View>

            <View style={styles.normalizationSection}>
              <Title style={styles.normalizationTitle}>Optional Normalization</Title>
              <Paragraph style={styles.normalizationDescription}>
                Enter building volume and/or envelope area to compute ACH50 and CFM50/ft².
              </Paragraph>

              <View style={styles.inputRow}>
                <TextInput
                  label="Building Volume (ft³)"
                  value={buildingVolume}
                  onChangeText={setBuildingVolume}
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                  placeholder="e.g., 250000"
                />
              </View>

              <View style={styles.inputRow}>
                <TextInput
                  label="Envelope / Exterior Surface Area (ft²)"
                  value={envelopeArea}
                  onChangeText={setEnvelopeArea}
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                  placeholder="e.g., 40000"
                />
              </View>
            </View>

            <View style={styles.uncertaintySection}>
              <Title style={styles.uncertaintyTitle}>Measurement Uncertainty</Title>
              <Paragraph style={styles.uncertaintyDescription}>
                Enter uncertainty values (absolute or leave blank for default estimates)
              </Paragraph>

              <View style={styles.inputRow}>
                <TextInput
                  label="Airflow Uncertainty (CFM)"
                  value={airflowUncertainty}
                  onChangeText={setAirflowUncertainty}
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                  placeholder="Auto: 3% of airflow"
                />
              </View>

              <View style={styles.inputRow}>
                <TextInput
                  label="Test Pressure Uncertainty (Pa)"
                  value={testPressureUncertainty}
                  onChangeText={setTestPressureUncertainty}
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                  placeholder="Auto: 2% of pressure"
                />
              </View>

              <View style={styles.inputRow}>
                <TextInput
                  label="Standard Pressure Uncertainty (Pa)"
                  value={standardPressureUncertainty}
                  onChangeText={setStandardPressureUncertainty}
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                  placeholder="Auto: 2% of pressure"
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
            </View>

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={calculateAirLeakageRate}
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

            {airLeakageRate && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Air Leakage Rate at Standard Conditions:</Text>
                <Text style={styles.resultValue}>{airLeakageRate} CFM @ {standardPressure || '75'} Pa</Text>
                <Text style={styles.resultSubValue}>
                  ({(() => {
                    const pStandardInput = parseFloat(standardPressure || '75');
                    const pStandardPa = Number.isFinite(pStandardInput)
                      ? pressureToPa(pStandardInput, standardPressureUnit)
                      : 75;
                    const pair = formatPressurePair(pStandardPa);
                    return `${pair.inWc} / ${pair.pa}`;
                  })()})
                </Text>

                {!!qAt030InWc && (
                  <Text style={styles.resultValue}>CFM @ 0.30 in. w.c.: {qAt030InWc}</Text>
                )}
                {!!qAt50Pa && (
                  <Text style={styles.resultValue}>CFM50 (Q₅₀): {qAt50Pa}</Text>
                )}
                {!!qAt75Pa && (
                  <Text style={styles.resultValue}>CFM75 (Q₇₅): {qAt75Pa}</Text>
                )}
                {!!ach50 && (
                  <Text style={styles.resultValue}>ACH50: {ach50} 1/hr</Text>
                )}
                {!!cfm50PerFt2 && (
                  <Text style={styles.resultValue}>CFM50/ft²: {cfm50PerFt2}</Text>
                )}
                {!!cfm030PerFt2 && (
                  <Text style={styles.resultValue}>CFM @ 0.30 in. w.c. per ft²: {cfm030PerFt2}</Text>
                )}
              </View>
            )}

            {combinedUncertainty !== null && (
              <View style={styles.uncertaintyResultContainer}>
                <Text style={styles.uncertaintyResultLabel}>Uncertainty Analysis:</Text>
                <Text style={styles.uncertaintyResultValue}>
                  Combined Uncertainty: ±{combinedUncertainty.toFixed(2)} CFM
                </Text>
                <Text style={styles.uncertaintyResultValue}>
                  Relative Uncertainty: ±{((combinedUncertainty / parseFloat(airLeakageRate)) * 100).toFixed(2)}%
                </Text>
                {expandedUncertainty !== null && (
                  <>
                    <Text style={styles.uncertaintyResultValue}>
                      Expanded Uncertainty (k=2, 95%): ±{expandedUncertainty.toFixed(2)} CFM
                    </Text>
                    <Text style={styles.uncertaintyResultValue}>
                      Air Leakage Rate: {airLeakageRate} ± {expandedUncertainty.toFixed(2)} CFM (95% confidence)
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
            <Title style={styles.infoTitle}>Standard Conditions</Title>
            <Paragraph style={styles.infoText}>
              • ASHRAE 90.1: 0.30 in. w.c. (75 Pa)
            </Paragraph>
            <Paragraph style={styles.infoText}>
              • IECC: 0.30 in. w.c. (75 Pa)
            </Paragraph>
            <Paragraph style={styles.infoText}>
              • ENERGY STAR: 0.30 in. w.c. (75 Pa)
            </Paragraph>
            <Paragraph style={styles.infoText}>
              • Flow exponent typically ranges from 0.5 to 0.7
            </Paragraph>
            <Paragraph style={styles.infoText}>
              • Measurement uncertainty accounts for all input parameter uncertainties
            </Paragraph>
            <Paragraph style={styles.infoText}>
              • Combined uncertainty uses error propagation for power law relationships
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

  normalizationSection: {
    marginTop: 8,
    marginBottom: 8,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: ACCENT + '26',
  },
  normalizationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ACCENT,
    marginBottom: 8,
  },
  normalizationDescription: {
    fontSize: 13,
    color: '#000000',
    opacity: 0.7,
    marginBottom: 16,
  },

  resultValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  resultSubValue: {
    fontSize: 13,
    color: '#000000',
    opacity: 0.7,
    marginBottom: 10,
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

export default BETAirLeakageRateScreen;


import React, { useMemo, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  TextInput,
  Button,
  useTheme,
  Surface,
  Text,
} from 'react-native-paper';

type SashUnit = 'ft' | 'in';

const toNumber = (value: string): number | null => {
  const cleaned = value.replace(/,/g, '').trim();
  if (!cleaned) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
};

const assertPositive = (label: string, n: number | null): number | null => {
  if (n === null) {
    Alert.alert('Error', `Please enter a valid ${label} value`);
    return null;
  }
  if (n <= 0) {
    Alert.alert('Error', `${label} must be greater than zero`);
    return null;
  }
  return n;
};

const toFeet = (value: number, unit: SashUnit): number => (unit === 'in' ? value / 12 : value);

const FumehoodScreen = () => {
  const theme = useTheme();

  const [faceVelocity, setFaceVelocity] = useState('');
  const [faceArea, setFaceArea] = useState('');
  const [cfm, setCfm] = useState('');

  const [targetFaceVelocity, setTargetFaceVelocity] = useState('100');
  const [requiredCfm, setRequiredCfm] = useState('');

  const [sashHeight, setSashHeight] = useState('');
  const [sashWidth, setSashWidth] = useState('');
  const [sashUnit, setSashUnit] = useState<SashUnit>('ft');
  const [faceAreaCalculated, setFaceAreaCalculated] = useState('');

  const [pressureDifferential, setPressureDifferential] = useState('');
  const [roomPressure, setRoomPressure] = useState('');
  const [hoodPressure, setHoodPressure] = useState('');

  const effectiveFaceArea = useMemo(() => {
    const direct = toNumber(faceArea);
    if (direct !== null && Number.isFinite(direct) && direct > 0) return direct;

    const calc = toNumber(faceAreaCalculated);
    if (calc !== null && Number.isFinite(calc) && calc > 0) return calc;

    return null;
  }, [faceArea, faceAreaCalculated]);

  const calculateCFM = () => {
    const velocity = assertPositive('Face Velocity (FPM)', toNumber(faceVelocity));
    if (velocity === null) return;

    const area = assertPositive('Face Area (ft²)', effectiveFaceArea);
    if (area === null) return;

    const cfmValue = velocity * area;
    setCfm(cfmValue.toFixed(2));
  };

  const calculateFaceVelocity = () => {
    const cfmValue = assertPositive('CFM', toNumber(cfm));
    if (cfmValue === null) return;

    const area = assertPositive('Face Area (ft²)', effectiveFaceArea);
    if (area === null) return;

    const velocity = cfmValue / area;
    setFaceVelocity(velocity.toFixed(2));
  };

  const calculateFaceArea = () => {
    const rawHeight = assertPositive(`Sash Height (${sashUnit})`, toNumber(sashHeight));
    if (rawHeight === null) return;

    const rawWidth = assertPositive(`Sash Width (${sashUnit})`, toNumber(sashWidth));
    if (rawWidth === null) return;

    const heightFt = toFeet(rawHeight, sashUnit);
    const widthFt = toFeet(rawWidth, sashUnit);
    const area = heightFt * widthFt;
    setFaceAreaCalculated(area.toFixed(3));
  };

  const calculateRequiredCfm = () => {
    const target = assertPositive('Target Face Velocity (FPM)', toNumber(targetFaceVelocity));
    if (target === null) return;

    const area = assertPositive('Face Area (ft²)', effectiveFaceArea);
    if (area === null) return;

    setRequiredCfm((target * area).toFixed(2));
  };

  const calculatePressureDifferential = () => {
    if (!roomPressure || !hoodPressure) {
      Alert.alert('Error', 'Please enter both Room Pressure and Hood Pressure values');
      return;
    }

    const room = toNumber(roomPressure);
    const hood = toNumber(hoodPressure);

    if (room === null || hood === null) {
      Alert.alert('Error', 'Please enter valid numeric pressure values');
      return;
    }

    const differential = room - hood;
    setPressureDifferential(differential.toFixed(2));
  };

  const clearAll = () => {
    setFaceVelocity('');
    setFaceArea('');
    setCfm('');

    setTargetFaceVelocity('100');
    setRequiredCfm('');

    setSashHeight('');
    setSashWidth('');
    setSashUnit('ft');
    setFaceAreaCalculated('');

    setPressureDifferential('');
    setRoomPressure('');
    setHoodPressure('');
  };

  const fumehoodTypes = [
    {
      type: 'Standard Fume Hood',
      faceVelocity: '80-120 FPM',
      description: 'General laboratory use, chemical handling',
      color: '#4CAF50',
    },
    {
      type: 'High Performance',
      faceVelocity: '60-100 FPM',
      description: 'Energy efficient, reduced airflow',
      color: '#2196F3',
    },
    {
      type: 'Radioisotope Hood',
      faceVelocity: '100-150 FPM',
      description: 'Radioactive material handling',
      color: '#FF9800',
    },
    {
      type: 'Perchloric Acid Hood',
      faceVelocity: '150-200 FPM',
      description: 'Perchloric acid and explosive materials',
      color: '#F44336',
    },
  ];

  const formulas = [
    {
      title: 'Face Velocity',
      formula: 'Face Velocity (FPM) = CFM / Face Area (ft²)',
      description: 'Calculate face velocity from airflow and face area',
    },
    {
      title: 'CFM Calculation',
      formula: 'CFM = Face Velocity (FPM) × Face Area (ft²)',
      description: 'Calculate airflow from face velocity and area',
    },
    {
      title: 'Face Area',
      formula: 'Face Area (ft²) = Sash Height (ft) × Sash Width (ft)  (or inches ÷ 12)',
      description: 'Calculate face area from sash opening dimensions',
    },
    {
      title: 'Required CFM (Target Velocity)',
      formula: 'Required CFM = Target Face Velocity (FPM) × Face Area (ft²)',
      description: 'Calculate required exhaust airflow to achieve a target face velocity',
    },
    {
      title: 'Pressure Differential',
      formula: 'ΔP = Room Pressure - Hood Pressure',
      description: 'Calculate pressure differential across fume hood',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={styles.header}>
        <Title style={styles.headerTitle}>Fume Hood Calculations</Title>
        <Paragraph style={styles.headerSubtitle}>
          Professional fume hood measurements and calculations for NEBB certified technicians
        </Paragraph>
      </Surface>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Fume Hood Types</Title>
        {fumehoodTypes.map((hood, index) => (
          <Card key={index} style={[styles.card, { marginBottom: 12 }]}>
            <Card.Content>
              <View style={styles.hoodHeader}>
                <View style={[styles.hoodBadge, { backgroundColor: hood.color }]}>
                  <Text style={styles.hoodText}>{hood.type}</Text>
                </View>
              </View>
              <Text style={styles.velocityText}>Face Velocity: {hood.faceVelocity}</Text>
              <Paragraph style={styles.hoodDescription}>{hood.description}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>NEBB Face Velocity / Exhaust Flow</Title>
        <Card style={styles.card}>
          <Card.Content>
            {faceAreaCalculated ? (
              <Surface style={[styles.resultContainer, { marginBottom: 12 }]}>
                <Text style={styles.resultLabel}>Calculated Face Area:</Text>
                <Text style={styles.resultValue}>{faceAreaCalculated} ft²</Text>
              </Surface>
            ) : null}

            <View style={styles.inputRow}>
              <TextInput
                label="Face Velocity (FPM)"
                value={faceVelocity}
                onChangeText={setFaceVelocity}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Face Area (ft²) (optional if calculated below)"
                value={faceArea}
                onChangeText={setFaceArea}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.buttonRow}>
              <Button mode="contained" onPress={calculateCFM} style={styles.button}>
                Calculate CFM
              </Button>
              <Button mode="contained" onPress={calculateFaceVelocity} style={styles.button}>
                Calculate Velocity
              </Button>
            </View>

            {(cfm || faceVelocity) && (
              <Surface style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Results:</Text>
                <Text style={styles.resultValue}>
                  {cfm ? `${cfm} CFM` : ''}
                  {cfm && faceVelocity ? '  •  ' : ''}
                  {faceVelocity ? `${faceVelocity} FPM` : ''}
                </Text>
              </Surface>
            )}

            <View style={{ height: 16 }} />

            <Title style={styles.subSectionTitle}>Required CFM (Target Face Velocity)</Title>

            <View style={styles.inputRow}>
              <TextInput
                label="Target Face Velocity (FPM)"
                value={targetFaceVelocity}
                onChangeText={setTargetFaceVelocity}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Face Area Used (ft²)"
                value={effectiveFaceArea ? effectiveFaceArea.toString() : ''}
                editable={false}
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.buttonRow}>
              <Button mode="contained" onPress={calculateRequiredCfm} style={styles.button}>
                Calculate Required CFM
              </Button>
              <Button
                mode="outlined"
                onPress={() => {
                  if (!requiredCfm) return;
                  setCfm(requiredCfm);
                }}
                style={styles.button}
                disabled={!requiredCfm}
              >
                Copy to CFM
              </Button>
            </View>

            {requiredCfm ? (
              <Surface style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Required CFM:</Text>
                <Text style={styles.resultValue}>{requiredCfm} CFM</Text>
              </Surface>
            ) : null}
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Face Area (Sash Opening)</Title>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.buttonRow}>
              <Button
                mode={sashUnit === 'ft' ? 'contained' : 'outlined'}
                onPress={() => setSashUnit('ft')}
                style={styles.button}
              >
                Feet
              </Button>
              <Button
                mode={sashUnit === 'in' ? 'contained' : 'outlined'}
                onPress={() => setSashUnit('in')}
                style={styles.button}
              >
                Inches
              </Button>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label={`Sash Height (${sashUnit})`}
                value={sashHeight}
                onChangeText={setSashHeight}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label={`Sash Width (${sashUnit})`}
                value={sashWidth}
                onChangeText={setSashWidth}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.buttonRow}>
              <Button mode="contained" onPress={calculateFaceArea} style={styles.button}>
                Calculate Face Area
              </Button>
              <Button
                mode="outlined"
                onPress={() => {
                  if (!faceAreaCalculated) return;
                  setFaceArea(faceAreaCalculated);
                }}
                style={styles.button}
                disabled={!faceAreaCalculated}
              >
                Copy to Face Area
              </Button>
            </View>

            {faceAreaCalculated && (
              <Surface style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Face Area:</Text>
                <Text style={styles.resultValue}>{faceAreaCalculated} ft²</Text>
              </Surface>
            )}
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Pressure Differential</Title>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.inputRow}>
              <TextInput
                label="Room Pressure (in. w.c.)"
                value={roomPressure}
                onChangeText={setRoomPressure}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Hood Pressure (in. w.c.)"
                value={hoodPressure}
                onChangeText={setHoodPressure}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>
            <Button mode="contained" onPress={calculatePressureDifferential} style={styles.button}>
              Calculate Differential
            </Button>
            {pressureDifferential && (
              <Surface style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Pressure Differential:</Text>
                <Text style={styles.resultValue}>{pressureDifferential} in. w.c.</Text>
              </Surface>
            )}
          </Card.Content>
        </Card>
      </View>

      <Button mode="outlined" onPress={clearAll} style={styles.clearButton} icon="refresh">
        Clear All
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    borderRadius: 12,
    elevation: 2,
  },
  hoodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  hoodBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  hoodText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  velocityText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  hoodDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginHorizontal: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  resultContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f0f8ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    flexShrink: 1,
    textAlign: 'right',
  },
  formulaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formulaText: {
    fontSize: 14,
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  formulaDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  clearButton: {
    marginTop: 16,
    marginBottom: 32,
  },
});

export default FumehoodScreen;

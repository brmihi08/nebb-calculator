import React, { useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';

const BETScreen = () => {
  const theme = useTheme();
  const [buildingVolume, setBuildingVolume] = useState('');
  const [pressureDifferential, setPressureDifferential] = useState('');
  const [airflowRate, setAirflowRate] = useState('');
  const [airChangesPerHour, setAirChangesPerHour] = useState('');
  const [leakageArea, setLeakageArea] = useState('');
  const [flowExponent, setFlowExponent] = useState('0.65');
  const [effectiveLeakageArea, setEffectiveLeakageArea] = useState('');
  const [exteriorSurfaceArea, setExteriorSurfaceArea] = useState('');
  const [airTightnessIndex, setAirTightnessIndex] = useState('');

  const calculateAirChangesPerHour = () => {
    if (!airflowRate || !buildingVolume) {
      Alert.alert('Error', 'Please enter both Airflow Rate and Building Volume values');
      return;
    }
    const flow = parseFloat(airflowRate);
    const volume = parseFloat(buildingVolume);
    if (volume === 0) {
      Alert.alert('Error', 'Building volume cannot be zero');
      return;
    }
    const ach = (flow * 60) / volume; // Convert CFM to air changes per hour
    setAirChangesPerHour(ach.toFixed(2));
  };

  const calculateEffectiveLeakageArea = () => {
    if (!airflowRate || !pressureDifferential || !flowExponent) {
      Alert.alert('Error', 'Please enter Airflow Rate, Pressure Differential, and Flow Exponent values');
      return;
    }
    const flow = parseFloat(airflowRate);
    const pressure = parseFloat(pressureDifferential);
    const exponent = parseFloat(flowExponent);
    
    if (pressure === 0) {
      Alert.alert('Error', 'Pressure differential cannot be zero');
      return;
    }
    
    // ELA calculation based on orifice flow equation
    const ela = flow / (Math.pow(pressure, exponent) * 261);
    setEffectiveLeakageArea(ela.toFixed(3));
  };

  const calculateAirTightnessIndex = () => {
    if (!effectiveLeakageArea || !exteriorSurfaceArea) {
      Alert.alert('Error', 'Please enter both Effective Leakage Area and Exterior Surface Area values');
      return;
    }
    const ela = parseFloat(effectiveLeakageArea);
    const esa = parseFloat(exteriorSurfaceArea);
    if (esa === 0) {
      Alert.alert('Error', 'Exterior surface area cannot be zero');
      return;
    }
    const ati = ela / esa;
    setAirTightnessIndex(ati.toFixed(4));
  };

  const clearAll = () => {
    setBuildingVolume('');
    setPressureDifferential('');
    setAirflowRate('');
    setAirChangesPerHour('');
    setLeakageArea('');
    setFlowExponent('0.65');
    setEffectiveLeakageArea('');
    setExteriorSurfaceArea('');
    setAirTightnessIndex('');
  };

  const betProcedures = [
    {
      title: 'Blower Door Testing',
      description: 'Measure building air tightness and infiltration rates',
      icon: 'home',
      color: '#4CAF50',
    },
    {
      title: 'Pressure Testing',
      description: 'Test building envelope under various pressure conditions',
      icon: 'speedometer',
      color: '#2196F3',
    },
    {
      title: 'Infiltration Measurement',
      description: 'Calculate air infiltration rates and air changes per hour',
      icon: 'airplane',
      color: '#FF9800',
    },
    {
      title: 'Leakage Analysis',
      description: 'Analyze building envelope leakage characteristics',
              icon: 'business-outline',
      color: '#9C27B0',
    },
  ];

  const airTightnessStandards = [
    {
      standard: 'ASHRAE 90.1',
      requirement: '≤ 0.40 cfm/ft² @ 0.30 in. w.c.',
      description: 'Commercial building energy standard',
      color: '#4CAF50',
    },
    {
      standard: 'ENERGY STAR',
      requirement: '≤ 0.25 cfm/ft² @ 0.30 in. w.c.',
      description: 'Residential energy efficiency program',
      color: '#2196F3',
    },
    {
      standard: 'Passive House',
      requirement: '≤ 0.05 ACH50',
      description: 'Ultra-low energy building standard',
      color: '#FF9800',
    },
    {
      standard: 'LEED v4',
      requirement: '≤ 0.25 cfm/ft² @ 0.30 in. w.c.',
      description: 'Leadership in Energy and Environmental Design',
      color: '#9C27B0',
    },
  ];

  const formulas = [
    {
      title: 'Air Changes Per Hour',
      formula: 'ACH = (Airflow Rate × 60) / Building Volume',
      description: 'Calculate air changes per hour from airflow rate',
    },
    {
      title: 'Effective Leakage Area',
      formula: 'ELA = Q / (ΔP^n × 261)',
      description: 'Calculate effective leakage area from airflow and pressure',
    },
    {
      title: 'Air Tightness Index',
      formula: 'ATI = ELA / Exterior Surface Area',
      description: 'Calculate air tightness index for building envelope',
    },
    {
      title: 'Infiltration Rate',
      formula: 'Infiltration = ELA × (ΔP^n) × 261',
      description: 'Calculate infiltration rate from leakage area and pressure',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={styles.header}>
        <Title style={styles.headerTitle}>Building Envelope Testing</Title>
        <Paragraph style={styles.headerSubtitle}>
          Professional building envelope testing calculations for NEBB certified technicians
        </Paragraph>
      </Surface>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>BET Procedures</Title>
        {betProcedures.map((procedure, index) => (
          <Card key={index} style={[styles.card, { marginBottom: 16 }]}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, { backgroundColor: procedure.color }]}>
                  <Ionicons name={procedure.icon as any} size={24} color="white" />
                </View>
                <View style={styles.cardText}>
                  <Title style={styles.cardTitle}>{procedure.title}</Title>
                  <Paragraph style={styles.cardDescription}>
                    {procedure.description}
                  </Paragraph>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Air Changes Calculator</Title>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.inputRow}>
              <TextInput
                label="Airflow Rate (CFM)"
                value={airflowRate}
                onChangeText={setAirflowRate}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Building Volume (ft³)"
                value={buildingVolume}
                onChangeText={setBuildingVolume}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>
            <Button
              mode="contained"
              onPress={calculateAirChangesPerHour}
              style={styles.button}
            >
              Calculate Air Changes/Hour
            </Button>
            {airChangesPerHour && (
              <Surface style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Air Changes/Hour:</Text>
                <Text style={styles.resultValue}>{airChangesPerHour} ACH</Text>
              </Surface>
            )}
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Effective Leakage Area</Title>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.inputRow}>
              <TextInput
                label="Airflow Rate (CFM)"
                value={airflowRate}
                onChangeText={setAirflowRate}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Pressure Differential (in. w.c.)"
                value={pressureDifferential}
                onChangeText={setPressureDifferential}
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
              />
            </View>
            <Button
              mode="contained"
              onPress={calculateEffectiveLeakageArea}
              style={styles.button}
            >
              Calculate ELA
            </Button>
            {effectiveLeakageArea && (
              <Surface style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Effective Leakage Area:</Text>
                <Text style={styles.resultValue}>{effectiveLeakageArea} ft²</Text>
              </Surface>
            )}
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Air Tightness Index</Title>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.inputRow}>
              <TextInput
                label="Effective Leakage Area (ft²)"
                value={effectiveLeakageArea}
                onChangeText={setEffectiveLeakageArea}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Exterior Surface Area (ft²)"
                value={exteriorSurfaceArea}
                onChangeText={setExteriorSurfaceArea}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>
            <Button
              mode="contained"
              onPress={calculateAirTightnessIndex}
              style={styles.button}
            >
              Calculate ATI
            </Button>
            {airTightnessIndex && (
              <Surface style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Air Tightness Index:</Text>
                <Text style={styles.resultValue}>{airTightnessIndex} ft²/ft²</Text>
              </Surface>
            )}
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Air Tightness Standards</Title>
        {airTightnessStandards.map((standard, index) => (
          <Card key={index} style={[styles.card, { marginBottom: 12 }]}>
            <Card.Content>
              <View style={styles.standardHeader}>
                <View style={[styles.standardBadge, { backgroundColor: standard.color }]}>
                  <Text style={styles.standardText}>{standard.standard}</Text>
                </View>
              </View>
              <Text style={styles.requirementText}>{standard.requirement}</Text>
              <Paragraph style={styles.standardDescription}>
                {standard.description}
              </Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>NEBB BET Formulas</Title>
        {formulas.map((formula, index) => (
          <Card key={index} style={[styles.card, { marginBottom: 12 }]}>
            <Card.Content>
              <Title style={styles.formulaTitle}>{formula.title}</Title>
              <Text style={styles.formulaText}>{formula.formula}</Text>
              <Paragraph style={styles.formulaDescription}>
                {formula.description}
              </Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>

      <Button
        mode="outlined"
        onPress={clearAll}
        style={styles.clearButton}
        icon="refresh"
      >
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
  card: {
    borderRadius: 12,
    elevation: 2,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
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
  button: {
    marginBottom: 16,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  standardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  standardBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  standardText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  requirementText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  standardDescription: {
    fontSize: 14,
    opacity: 0.8,
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

export default BETScreen;

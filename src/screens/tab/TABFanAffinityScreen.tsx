import React, { useState, useEffect } from 'react';
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

const TABFanAffinityScreen = () => {
  const theme = useTheme();
  
  // Fan Affinity Law 1: Flow vs Speed
  const [flow1, setFlow1] = useState('');
  const [flow2, setFlow2] = useState('');
  const [speed1, setSpeed1] = useState('');
  const [speed2, setSpeed2] = useState('');
  const [flowResult, setFlowResult] = useState('');
  const [speedResult, setSpeedResult] = useState('');

  // Fan Affinity Law 2: Pressure vs Speed
  const [pressure1, setPressure1] = useState('');
  const [pressure2, setPressure2] = useState('');
  const [pressureSpeed1, setPressureSpeed1] = useState('');
  const [pressureSpeed2, setPressureSpeed2] = useState('');
  const [pressureResult, setPressureResult] = useState('');
  const [pressureSpeedResult, setPressureSpeedResult] = useState('');

  // Fan Affinity Law 3: Power vs Speed
  const [power1, setPower1] = useState('');
  const [power2, setPower2] = useState('');
  const [powerSpeed1, setPowerSpeed1] = useState('');
  const [powerSpeed2, setPowerSpeed2] = useState('');
  const [powerResult, setPowerResult] = useState('');
  const [powerSpeedResult, setPowerSpeedResult] = useState('');

  // Smart calculation for Flow vs Speed
  const calculateFlowSpeed = () => {
    const values = [flow1, flow2, speed1, speed2];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 3) {
      Alert.alert('Error', 'Please fill in at least 3 values to calculate the missing one');
      return;
    }

    if (filledCount === 4) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Flow Law: Q2/Q1 = N2/N1
    if (flow1 === '') {
      // Calculate flow1
      const q2 = parseFloat(flow2);
      const n1 = parseFloat(speed1);
      const n2 = parseFloat(speed2);
      if (n2 === 0) {
        Alert.alert('Error', 'Speed 2 cannot be zero');
        return;
      }
      const q1 = (q2 * n1) / n2;
      setFlow1(q1.toFixed(2));
      setFlowResult(`Q₁ = ${q1.toFixed(2)} CFM`);
    } else if (flow2 === '') {
      // Calculate flow2
      const q1 = parseFloat(flow1);
      const n1 = parseFloat(speed1);
      const n2 = parseFloat(speed2);
      if (n1 === 0) {
        Alert.alert('Error', 'Speed 1 cannot be zero');
        return;
      }
      const q2 = (q1 * n2) / n1;
      setFlow2(q2.toFixed(2));
      setFlowResult(`Q₂ = ${q2.toFixed(2)} CFM`);
    } else if (speed1 === '') {
      // Calculate speed1
      const q1 = parseFloat(flow1);
      const q2 = parseFloat(flow2);
      const n2 = parseFloat(speed2);
      if (q2 === 0) {
        Alert.alert('Error', 'Flow 2 cannot be zero');
        return;
      }
      const n1 = (n2 * q1) / q2;
      setSpeed1(n1.toFixed(2));
      setSpeedResult(`N₁ = ${n1.toFixed(2)} RPM`);
    } else if (speed2 === '') {
      // Calculate speed2
      const q1 = parseFloat(flow1);
      const q2 = parseFloat(flow2);
      const n1 = parseFloat(speed1);
      if (q1 === 0) {
        Alert.alert('Error', 'Flow 1 cannot be zero');
        return;
      }
      const n2 = (n1 * q2) / q1;
      setSpeed2(n2.toFixed(2));
      setSpeedResult(`N₂ = ${n2.toFixed(2)} RPM`);
    }
  };

  // Smart calculation for Pressure vs Speed
  const calculatePressureSpeed = () => {
    const values = [pressure1, pressure2, pressureSpeed1, pressureSpeed2];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 3) {
      Alert.alert('Error', 'Please fill in at least 3 values to calculate the missing one');
      return;
    }

    if (filledCount === 4) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Pressure Law: P2/P1 = (N2/N1)²
    if (pressure1 === '') {
      // Calculate pressure1
      const p2 = parseFloat(pressure2);
      const n1 = parseFloat(pressureSpeed1);
      const n2 = parseFloat(pressureSpeed2);
      if (n2 === 0) {
        Alert.alert('Error', 'Speed 2 cannot be zero');
        return;
      }
      const p1 = p2 / Math.pow(n2 / n1, 2);
      setPressure1(p1.toFixed(3));
      setPressureResult(`P₁ = ${p1.toFixed(3)} in. w.c.`);
    } else if (pressure2 === '') {
      // Calculate pressure2
      const p1 = parseFloat(pressure1);
      const n1 = parseFloat(pressureSpeed1);
      const n2 = parseFloat(pressureSpeed2);
      if (n1 === 0) {
        Alert.alert('Error', 'Speed 1 cannot be zero');
        return;
      }
      const p2 = p1 * Math.pow(n2 / n1, 2);
      setPressure2(p2.toFixed(3));
      setPressureResult(`P₂ = ${p2.toFixed(3)} in. w.c.`);
    } else if (pressureSpeed1 === '') {
      // Calculate speed1
      const p1 = parseFloat(pressure1);
      const p2 = parseFloat(pressure2);
      const n2 = parseFloat(pressureSpeed2);
      if (p2 === 0) {
        Alert.alert('Error', 'Pressure 2 cannot be zero');
        return;
      }
      const n1 = n2 / Math.sqrt(p2 / p1);
      setPressureSpeed1(n1.toFixed(2));
      setPressureSpeedResult(`N₁ = ${n1.toFixed(2)} RPM`);
    } else if (pressureSpeed2 === '') {
      // Calculate speed2
      const p1 = parseFloat(pressure1);
      const p2 = parseFloat(pressure2);
      const n1 = parseFloat(pressureSpeed1);
      if (p1 === 0) {
        Alert.alert('Error', 'Pressure 1 cannot be zero');
        return;
      }
      const n2 = n1 * Math.sqrt(p2 / p1);
      setPressureSpeed2(n2.toFixed(2));
      setPressureSpeedResult(`N₂ = ${n2.toFixed(2)} RPM`);
    }
  };

  // Smart calculation for Power vs Speed
  const calculatePowerSpeed = () => {
    const values = [power1, power2, powerSpeed1, powerSpeed2];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 3) {
      Alert.alert('Error', 'Please fill in at least 3 values to calculate the missing one');
      return;
    }

    if (filledCount === 4) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Power Law: HP2/HP1 = (N2/N1)³
    if (power1 === '') {
      // Calculate power1
      const hp2 = parseFloat(power2);
      const n1 = parseFloat(powerSpeed1);
      const n2 = parseFloat(powerSpeed2);
      if (n2 === 0) {
        Alert.alert('Error', 'Speed 2 cannot be zero');
        return;
      }
      const hp1 = hp2 / Math.pow(n2 / n1, 3);
      setPower1(hp1.toFixed(3));
      setPowerResult(`HP₁ = ${hp1.toFixed(3)} HP`);
    } else if (power2 === '') {
      // Calculate power2
      const hp1 = parseFloat(power1);
      const n1 = parseFloat(powerSpeed1);
      const n2 = parseFloat(powerSpeed2);
      if (n1 === 0) {
        Alert.alert('Error', 'Speed 1 cannot be zero');
        return;
      }
      const hp2 = hp1 * Math.pow(n2 / n1, 3);
      setPower2(hp2.toFixed(3));
      setPowerResult(`HP₂ = ${hp2.toFixed(3)} HP`);
    } else if (powerSpeed1 === '') {
      // Calculate speed1
      const hp1 = parseFloat(power1);
      const hp2 = parseFloat(power2);
      const n2 = parseFloat(powerSpeed2);
      if (hp2 === 0) {
        Alert.alert('Error', 'Power 2 cannot be zero');
        return;
      }
      const n1 = n2 / Math.pow(hp2 / hp1, 1/3);
      setPowerSpeed1(n1.toFixed(2));
      setPowerSpeedResult(`N₁ = ${n1.toFixed(2)} RPM`);
    } else if (powerSpeed2 === '') {
      // Calculate speed2
      const hp1 = parseFloat(power1);
      const hp2 = parseFloat(power2);
      const n1 = parseFloat(powerSpeed1);
      if (hp1 === 0) {
        Alert.alert('Error', 'Power 1 cannot be zero');
        return;
      }
      const n2 = n1 * Math.pow(hp2 / hp1, 1/3);
      setPowerSpeed2(n2.toFixed(2));
      setPowerSpeedResult(`N₂ = ${n2.toFixed(2)} RPM`);
    }
  };

  const clearAll = () => {
    setFlow1('');
    setFlow2('');
    setSpeed1('');
    setSpeed2('');
    setFlowResult('');
    setSpeedResult('');
    setPressure1('');
    setPressure2('');
    setPressureSpeed1('');
    setPressureSpeed2('');
    setPressureResult('');
    setPressureSpeedResult('');
    setPower1('');
    setPower2('');
    setPowerSpeed1('');
    setPowerSpeed2('');
    setPowerResult('');
    setPowerSpeedResult('');
  };

  const formulas = [
    {
      title: 'Flow vs Speed (1st Law)',
      formula: 'Q₂/Q₁ = N₂/N₁',
      description: 'Flow varies directly with fan speed',
    },
    {
      title: 'Pressure vs Speed (2nd Law)',
      formula: 'P₂/P₁ = (N₂/N₁)²',
      description: 'Pressure varies with the square of fan speed',
    },
    {
      title: 'Power vs Speed (3rd Law)',
      formula: 'HP₂/HP₁ = (N₂/N₁)³',
      description: 'Power varies with the cube of fan speed',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <Surface style={styles.header}>
        <View style={styles.headerGradient}>
          <Title style={styles.headerTitle}>Fan Affinity Laws</Title>
          <Paragraph style={styles.headerSubtitle}>
            Smart calculator for fan speed, flow, pressure, and power relationships
          </Paragraph>
        </View>
      </Surface>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Flow vs Speed (1st Law)</Title>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <Surface style={styles.formulaContainer}>
              <Text style={styles.formulaTitle}>Fan Affinity Law 1:</Text>
              <Text style={styles.formulaText}>Q₂/Q₁ = N₂/N₁</Text>
              <Text style={styles.formulaDescription}>
                Flow varies directly with speed
              </Text>
            </Surface>
            <View style={styles.inputRow}>
              <TextInput
                label="Flow 1 (CFM)"
                value={flow1}
                onChangeText={setFlow1}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Flow 2 (CFM)"
                value={flow2}
                onChangeText={setFlow2}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>
            <View style={styles.inputRow}>
              <TextInput
                label="Speed 1 (RPM)"
                value={speed1}
                onChangeText={setSpeed1}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Speed 2 (RPM)"
                value={speed2}
                onChangeText={setSpeed2}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>
            <Button
              mode="contained"
              onPress={calculateFlowSpeed}
              style={styles.button}
            >
              Calculate
            </Button>
            {(flowResult || speedResult) && (
              <Surface style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Result:</Text>
                <Text style={styles.resultValue}>{flowResult || speedResult}</Text>
              </Surface>
            )}
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Pressure vs Speed (2nd Law)</Title>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <Surface style={styles.formulaContainer}>
              <Text style={styles.formulaTitle}>Fan Affinity Law 2:</Text>
              <Text style={styles.formulaText}>P₂/P₁ = (N₂/N₁)²</Text>
              <Text style={styles.formulaDescription}>
                Pressure varies with the square of speed
              </Text>
            </Surface>
            <View style={styles.inputRow}>
              <TextInput
                label="Pressure 1 (in. w.c.)"
                value={pressure1}
                onChangeText={setPressure1}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Pressure 2 (in. w.c.)"
                value={pressure2}
                onChangeText={setPressure2}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>
            <View style={styles.inputRow}>
              <TextInput
                label="Speed 1 (RPM)"
                value={pressureSpeed1}
                onChangeText={setPressureSpeed1}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Speed 2 (RPM)"
                value={pressureSpeed2}
                onChangeText={setPressureSpeed2}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>
            <Button
              mode="contained"
              onPress={calculatePressureSpeed}
              style={styles.button}
            >
              Calculate
            </Button>
            {(pressureResult || pressureSpeedResult) && (
              <Surface style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Result:</Text>
                <Text style={styles.resultValue}>{pressureResult || pressureSpeedResult}</Text>
              </Surface>
            )}
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Power vs Speed (3rd Law)</Title>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <Surface style={styles.formulaContainer}>
              <Text style={styles.formulaTitle}>Fan Affinity Law 3:</Text>
              <Text style={styles.formulaText}>HP₂/HP₁ = (N₂/N₁)³</Text>
              <Text style={styles.formulaDescription}>
                Power varies with the cube of speed
              </Text>
            </Surface>
            <View style={styles.inputRow}>
              <TextInput
                label="Power 1 (HP)"
                value={power1}
                onChangeText={setPower1}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Power 2 (HP)"
                value={power2}
                onChangeText={setPower2}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>
            <View style={styles.inputRow}>
              <TextInput
                label="Speed 1 (RPM)"
                value={powerSpeed1}
                onChangeText={setPowerSpeed1}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Speed 2 (RPM)"
                value={powerSpeed2}
                onChangeText={setPowerSpeed2}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>
            <Button
              mode="contained"
              onPress={calculatePowerSpeed}
              style={styles.button}
            >
              Calculate
            </Button>
            {(powerResult || powerSpeedResult) && (
              <Surface style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Result:</Text>
                <Text style={styles.resultValue}>{powerResult || powerSpeedResult}</Text>
              </Surface>
            )}
          </View>
        </Surface>
      </View>

    
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>NEBB Fan Affinity Laws</Title>
        {formulas.map((formula, index) => (
          <Surface key={index} style={[styles.liquidCard, { marginBottom: 12 }]}>
            <View style={styles.cardContent}>
              <Title style={styles.formulaTitle}>{formula.title}</Title>
              <Text style={styles.formulaText}>{formula.formula}</Text>
              <Paragraph style={styles.formulaDescription}>
                {formula.description}
              </Paragraph>
            </View>
          </Surface>
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
    marginBottom: 20,
    borderRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    overflow: 'hidden',
  },
  headerGradient: {
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(20px)',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    color: '#000000',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.8,
    color: '#000000',
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
    letterSpacing: -0.3,
  },
  liquidCard: {
    borderRadius: 20,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardContent: {
    padding: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
  },
  button: {
    marginBottom: 20,
    borderRadius: 16,
    paddingVertical: 8,
    backgroundColor: '#22c55e',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultContainer: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  resultValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#22c55e',
  },
  formulaContainer: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.15)',
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
  },
  formulaTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000000',
  },
  formulaText: {
    fontSize: 16,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    color: '#22c55e',
    fontWeight: '500',
  },
  formulaDescription: {
    fontSize: 14,
    opacity: 0.8,
    color: '#000000',
    lineHeight: 20,
  },
  clearButton: {
    marginTop: 24,
    marginBottom: 40,
    borderRadius: 16,
    borderColor: '#22c55e',
    borderWidth: 2,
  },
});

export default TABFanAffinityScreen;

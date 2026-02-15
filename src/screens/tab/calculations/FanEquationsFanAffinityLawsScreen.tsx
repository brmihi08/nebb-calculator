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
  useTheme,
  Surface,
  Text,
} from 'react-native-paper';

const FanEquationsFanAffinityLawsScreen = () => {
  const theme = useTheme();
  
  // Law 1: Flow vs Speed
  const [flow1, setFlow1] = useState('');
  const [speed1, setSpeed1] = useState('');
  const [flow2, setFlow2] = useState('');
  const [speed2, setSpeed2] = useState('');

  // Law 2: Pressure vs Speed
  const [pressure1, setPressure1] = useState('');
  const [speed1P, setSpeed1P] = useState('');
  const [pressure2, setPressure2] = useState('');
  const [speed2P, setSpeed2P] = useState('');

  // Law 3: Power vs Speed
  const [power1, setPower1] = useState('');
  const [speed1Pow, setSpeed1Pow] = useState('');
  const [power2, setPower2] = useState('');
  const [speed2Pow, setSpeed2Pow] = useState('');

  const calculateLaw1 = () => {
    const values = [flow1, speed1, flow2, speed2];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 3) {
      Alert.alert('Error', 'Please fill in at least 3 values to calculate the missing one');
      return;
    }

    if (filledCount === 4) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Q2/Q1 = N2/N1 (Flow ratio = Speed ratio)
    if (flow2 === '') {
      if (flow1 && speed1 && speed2) {
        const q1 = parseFloat(flow1);
        const n1 = parseFloat(speed1);
        const n2 = parseFloat(speed2);
        if (n1 === 0) {
          Alert.alert('Error', 'Speed 1 cannot be zero');
          return;
        }
        const q2 = (q1 * n2) / n1;
        setFlow2(q2.toFixed(2));
      }
    } else if (speed2 === '') {
      if (flow1 && speed1 && flow2) {
        const q1 = parseFloat(flow1);
        const n1 = parseFloat(speed1);
        const q2 = parseFloat(flow2);
        if (q1 === 0) {
          Alert.alert('Error', 'Flow 1 cannot be zero');
          return;
        }
        const n2 = (n1 * q2) / q1;
        setSpeed2(n2.toFixed(2));
      }
    } else if (flow1 === '') {
      if (speed1 && flow2 && speed2) {
        const n1 = parseFloat(speed1);
        const q2 = parseFloat(flow2);
        const n2 = parseFloat(speed2);
        if (n2 === 0) {
          Alert.alert('Error', 'Speed 2 cannot be zero');
          return;
        }
        const q1 = (q2 * n1) / n2;
        setFlow1(q1.toFixed(2));
      }
    } else if (speed1 === '') {
      if (flow1 && flow2 && speed2) {
        const q1 = parseFloat(flow1);
        const q2 = parseFloat(flow2);
        const n2 = parseFloat(speed2);
        if (q2 === 0) {
          Alert.alert('Error', 'Flow 2 cannot be zero');
          return;
        }
        const n1 = (n2 * q1) / q2;
        setSpeed1(n1.toFixed(2));
      }
    }
  };

  const calculateLaw2 = () => {
    const values = [pressure1, speed1P, pressure2, speed2P];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 3) {
      Alert.alert('Error', 'Please fill in at least 3 values to calculate the missing one');
      return;
    }

    if (filledCount === 4) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // P2/P1 = (N2/N1)² (Pressure ratio = Speed ratio squared)
    if (pressure2 === '') {
      if (pressure1 && speed1P && speed2P) {
        const p1 = parseFloat(pressure1);
        const n1 = parseFloat(speed1P);
        const n2 = parseFloat(speed2P);
        if (n1 === 0) {
          Alert.alert('Error', 'Speed 1 cannot be zero');
          return;
        }
        const p2 = p1 * Math.pow(n2 / n1, 2);
        setPressure2(p2.toFixed(2));
      }
    } else if (speed2P === '') {
      if (pressure1 && speed1P && pressure2) {
        const p1 = parseFloat(pressure1);
        const n1 = parseFloat(speed1P);
        const p2 = parseFloat(pressure2);
        if (p1 === 0) {
          Alert.alert('Error', 'Pressure 1 cannot be zero');
          return;
        }
        const n2 = n1 * Math.sqrt(p2 / p1);
        setSpeed2P(n2.toFixed(2));
      }
    } else if (pressure1 === '') {
      if (speed1P && pressure2 && speed2P) {
        const n1 = parseFloat(speed1P);
        const p2 = parseFloat(pressure2);
        const n2 = parseFloat(speed2P);
        if (n2 === 0) {
          Alert.alert('Error', 'Speed 2 cannot be zero');
          return;
        }
        const p1 = p2 * Math.pow(n1 / n2, 2);
        setPressure1(p1.toFixed(2));
      }
    } else if (speed1P === '') {
      if (pressure1 && pressure2 && speed2P) {
        const p1 = parseFloat(pressure1);
        const p2 = parseFloat(pressure2);
        const n2 = parseFloat(speed2P);
        if (p2 === 0) {
          Alert.alert('Error', 'Pressure 2 cannot be zero');
          return;
        }
        const n1 = n2 * Math.sqrt(p1 / p2);
        setSpeed1P(n1.toFixed(2));
      }
    }
  };

  const calculateLaw3 = () => {
    const values = [power1, speed1Pow, power2, speed2Pow];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 3) {
      Alert.alert('Error', 'Please fill in at least 3 values to calculate the missing one');
      return;
    }

    if (filledCount === 4) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // HP2/HP1 = (N2/N1)³ (Power ratio = Speed ratio cubed)
    if (power2 === '') {
      if (power1 && speed1Pow && speed2Pow) {
        const hp1 = parseFloat(power1);
        const n1 = parseFloat(speed1Pow);
        const n2 = parseFloat(speed2Pow);
        if (n1 === 0) {
          Alert.alert('Error', 'Speed 1 cannot be zero');
          return;
        }
        const hp2 = hp1 * Math.pow(n2 / n1, 3);
        setPower2(hp2.toFixed(2));
      }
    } else if (speed2Pow === '') {
      if (power1 && speed1Pow && power2) {
        const hp1 = parseFloat(power1);
        const n1 = parseFloat(speed1Pow);
        const hp2 = parseFloat(power2);
        if (hp1 === 0) {
          Alert.alert('Error', 'Power 1 cannot be zero');
          return;
        }
        const n2 = n1 * Math.pow(hp2 / hp1, 1/3);
        setSpeed2Pow(n2.toFixed(2));
      }
    } else if (power1 === '') {
      if (speed1Pow && power2 && speed2Pow) {
        const n1 = parseFloat(speed1Pow);
        const hp2 = parseFloat(power2);
        const n2 = parseFloat(speed2Pow);
        if (n2 === 0) {
          Alert.alert('Error', 'Speed 2 cannot be zero');
          return;
        }
        const hp1 = hp2 * Math.pow(n1 / n2, 3);
        setPower1(hp1.toFixed(2));
      }
    } else if (speed1Pow === '') {
      if (power1 && power2 && speed2Pow) {
        const hp1 = parseFloat(power1);
        const hp2 = parseFloat(power2);
        const n2 = parseFloat(speed2Pow);
        if (hp2 === 0) {
          Alert.alert('Error', 'Power 2 cannot be zero');
          return;
        }
        const n1 = n2 * Math.pow(hp1 / hp2, 1/3);
        setSpeed1Pow(n1.toFixed(2));
      }
    }
  };

  const clearAll = () => {
    setFlow1('');
    setSpeed1('');
    setFlow2('');
    setSpeed2('');
    setPressure1('');
    setSpeed1P('');
    setPressure2('');
    setSpeed2P('');
    setPower1('');
    setSpeed1Pow('');
    setPower2('');
    setSpeed2Pow('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Fan Affinity Laws</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate fan performance changes with speed variations
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        {/* Law 1: Flow vs Speed */}
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Law 1: Flow vs Speed</Title>
              <Text style={styles.formulaText}>Q₂/Q₁ = N₂/N₁</Text>
              <Paragraph style={styles.formulaDescription}>
                Flow varies directly with speed
              </Paragraph>
            </View>

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
                label="Speed 1 (RPM)"
                value={speed1}
                onChangeText={setSpeed1}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Flow 2 (CFM)"
                value={flow2}
                onChangeText={setFlow2}
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
              onPress={calculateLaw1}
              style={styles.button}
              labelStyle={styles.buttonLabel}
            >
              Calculate Law 1
            </Button>
          </View>
        </Surface>

        {/* Law 2: Pressure vs Speed */}
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Law 2: Pressure vs Speed</Title>
              <Text style={styles.formulaText}>P₂/P₁ = (N₂/N₁)²</Text>
              <Paragraph style={styles.formulaDescription}>
                Pressure varies with speed squared
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Pressure 1 (inches w.g.)"
                value={pressure1}
                onChangeText={setPressure1}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Speed 1 (RPM)"
                value={speed1P}
                onChangeText={setSpeed1P}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Pressure 2 (inches w.g.)"
                value={pressure2}
                onChangeText={setPressure2}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Speed 2 (RPM)"
                value={speed2P}
                onChangeText={setSpeed2P}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <Button
              mode="contained"
              onPress={calculateLaw2}
              style={styles.button}
              labelStyle={styles.buttonLabel}
            >
              Calculate Law 2
            </Button>
          </View>
        </Surface>

        {/* Law 3: Power vs Speed */}
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Law 3: Power vs Speed</Title>
              <Text style={styles.formulaText}>HP₂/HP₁ = (N₂/N₁)³</Text>
              <Paragraph style={styles.formulaDescription}>
                Power varies with speed cubed
              </Paragraph>
            </View>

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
                label="Speed 1 (RPM)"
                value={speed1Pow}
                onChangeText={setSpeed1Pow}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Power 2 (HP)"
                value={power2}
                onChangeText={setPower2}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Speed 2 (RPM)"
                value={speed2Pow}
                onChangeText={setSpeed2Pow}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <Button
              mode="contained"
              onPress={calculateLaw3}
              style={styles.button}
              labelStyle={styles.buttonLabel}
            >
              Calculate Law 3
            </Button>
          </View>
        </Surface>

        <Button
          mode="outlined"
          onPress={clearAll}
          style={styles.clearButton}
          labelStyle={styles.clearButtonLabel}
        >
          Clear All
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 24,
  },
  header: {
    borderRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  headerGradient: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 24,
    borderRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#000000',
    opacity: 0.8,
  },
  section: {
    marginBottom: 20,
  },
  liquidCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardContent: {
    padding: 20,
  },
  formulaContainer: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  formulaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 8,
  },
  formulaText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  formulaDescription: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.8,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  button: {
    backgroundColor: '#22c55e',
    marginTop: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    borderColor: '#22c55e',
    marginTop: 16,
  },
  clearButtonLabel: {
    fontSize: 16,
    color: '#22c55e',
  },
});

export default FanEquationsFanAffinityLawsScreen;

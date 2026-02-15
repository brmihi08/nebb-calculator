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
import { screenBackground } from '../../../theme/screenStyles';

const AirflowTotalPressureScreen = () => {
  const theme = useTheme();
  const [staticPressure, setStaticPressure] = useState('');
  const [velocityPressure, setVelocityPressure] = useState('');
  const [totalPressure, setTotalPressure] = useState('');

  const calculateMissingValue = () => {
    const values = [staticPressure, velocityPressure, totalPressure];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Pt = Ps + Pv (Total Pressure = Static Pressure + Velocity Pressure)
    if (totalPressure === '') {
      if (staticPressure && velocityPressure) {
        const ps = parseFloat(staticPressure);
        const pv = parseFloat(velocityPressure);
        const pt = ps + pv;
        setTotalPressure(pt.toFixed(2));
      }
    } else if (staticPressure === '') {
      if (totalPressure && velocityPressure) {
        const pt = parseFloat(totalPressure);
        const pv = parseFloat(velocityPressure);
        const ps = pt - pv;
        setStaticPressure(ps.toFixed(2));
      }
    } else if (velocityPressure === '') {
      if (totalPressure && staticPressure) {
        const pt = parseFloat(totalPressure);
        const ps = parseFloat(staticPressure);
        const pv = pt - ps;
        setVelocityPressure(pv.toFixed(2));
      }
    }
  };

  const clearAll = () => {
    setStaticPressure('');
    setVelocityPressure('');
    setTotalPressure('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: screenBackground }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Total Pressure</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate total pressure, static pressure, or velocity pressure relationships
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>Pt = Ps + Pv</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: Pt = Total Pressure, Ps = Static Pressure, Pv = Velocity Pressure (all in inches w.g.)
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Static Pressure (inches w.g.)"
                value={staticPressure}
                onChangeText={setStaticPressure}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Velocity Pressure (inches w.g.)"
                value={velocityPressure}
                onChangeText={setVelocityPressure}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Total Pressure (inches w.g.)"
                value={totalPressure}
                onChangeText={setTotalPressure}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
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

            {(staticPressure || velocityPressure || totalPressure) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {staticPressure && <Text style={styles.resultValue}>Static Pressure: {staticPressure} inches w.g.</Text>}
                {velocityPressure && <Text style={styles.resultValue}>Velocity Pressure: {velocityPressure} inches w.g.</Text>}
                {totalPressure && <Text style={styles.resultValue}>Total Pressure: {totalPressure} inches w.g.</Text>}
              </View>
            )}
          </View>
        </Surface>
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
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#22c55e',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    flex: 1,
    marginLeft: 8,
    borderColor: '#22c55e',
  },
  clearButtonLabel: {
    fontSize: 16,
    color: '#22c55e',
  },
  resultContainer: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
});

export default AirflowTotalPressureScreen;

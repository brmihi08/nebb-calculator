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
import {
  calcAirDensityLbFt3FromVelocityAndPressure,
  calcVelocityFpmFromVelocityPressure,
  calcVelocityPressureInWgFromVelocity,
  STANDARD_AIR_DENSITY_LB_FT3,
} from '../../../lib/calcs';

const AirflowVelocityOfAirScreen = () => {
  const theme = useTheme();
  const [velocityPressure, setVelocityPressure] = useState('');
  const [velocity, setVelocity] = useState('');
  const [density, setDensity] = useState('');

  const calculateMissingValue = () => {
    const values = [velocityPressure, velocity, density];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // For standard air at ~70°F (rho = 0.075 lb/ft³):
    //   V = 4005 × √(Pv)
    // For non-standard density:
    //   V = 4005 × √(Pv × (0.075 / ρ))
    const standardDensity = STANDARD_AIR_DENSITY_LB_FT3;

    if (velocity === '') {
      if (velocityPressure && density) {
        const pv = parseFloat(velocityPressure);
        const rho = parseFloat(density);
        if (rho <= 0) {
          Alert.alert('Error', 'Air density must be greater than zero');
          return;
        }
        if (pv < 0) {
          Alert.alert('Error', 'Velocity pressure cannot be negative');
          return;
        }
        const v = calcVelocityFpmFromVelocityPressure(pv, rho);
        if (!Number.isFinite(v)) {
          Alert.alert('Error', 'Unable to compute velocity from the given inputs');
          return;
        }
        setVelocity(v.toFixed(1));
      } else if (velocityPressure && !density) {
        // Use standard air density
        const pv = parseFloat(velocityPressure);
        if (pv < 0) {
          Alert.alert('Error', 'Velocity pressure cannot be negative');
          return;
        }
        const v = calcVelocityFpmFromVelocityPressure(pv, standardDensity);
        if (!Number.isFinite(v)) {
          Alert.alert('Error', 'Unable to compute velocity from the given inputs');
          return;
        }
        setVelocity(v.toFixed(1));
        setDensity(standardDensity.toString());
      }
    } else if (velocityPressure === '') {
      if (velocity && density) {
        const v = parseFloat(velocity);
        const rho = parseFloat(density);
        if (rho <= 0) {
          Alert.alert('Error', 'Air density must be greater than zero');
          return;
        }
        if (v <= 0) {
          Alert.alert('Error', 'Velocity must be greater than zero');
          return;
        }
        const pv = calcVelocityPressureInWgFromVelocity(v, rho);
        if (!Number.isFinite(pv)) {
          Alert.alert('Error', 'Unable to compute velocity pressure from the given inputs');
          return;
        }
        setVelocityPressure(pv.toFixed(4));
      } else if (velocity && !density) {
        // Use standard air density
        const v = parseFloat(velocity);
        if (v <= 0) {
          Alert.alert('Error', 'Velocity must be greater than zero');
          return;
        }
        const pv = calcVelocityPressureInWgFromVelocity(v, standardDensity);
        if (!Number.isFinite(pv)) {
          Alert.alert('Error', 'Unable to compute velocity pressure from the given inputs');
          return;
        }
        setVelocityPressure(pv.toFixed(4));
        setDensity(standardDensity.toString());
      }
    } else if (density === '') {
      if (velocity && velocityPressure) {
        const v = parseFloat(velocity);
        const pv = parseFloat(velocityPressure);
        if (v <= 0) {
          Alert.alert('Error', 'Velocity must be greater than zero');
          return;
        }
        if (pv < 0) {
          Alert.alert('Error', 'Velocity pressure cannot be negative');
          return;
        }
        const rho = calcAirDensityLbFt3FromVelocityAndPressure(v, pv);
        if (!Number.isFinite(rho)) {
          Alert.alert('Error', 'Unable to compute air density from the given inputs');
          return;
        }
        setDensity(rho.toFixed(4));
      }
    }
  };

  const clearAll = () => {
    setVelocityPressure('');
    setVelocity('');
    setDensity('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: screenBackground }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Velocity of Air</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate air velocity from velocity pressure and air density
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>V = 4005 × √(Pv × (0.075 / ρ))</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: V = Velocity (FPM), Pv = Velocity Pressure (inches w.g.), ρ = Air Density (lb/ft³)
              </Paragraph>
              <Paragraph style={styles.formulaDescription}>
                Standard air at 70°F: ρ = 0.075 lb/ft³
              </Paragraph>
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
                label="Velocity (FPM)"
                value={velocity}
                onChangeText={setVelocity}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Air Density (lb/ft³)"
                value={density}
                onChangeText={setDensity}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="0.075 for standard air"
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

            {(velocityPressure || velocity || density) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {velocityPressure && <Text style={styles.resultValue}>Velocity Pressure: {velocityPressure} inches w.g.</Text>}
                {velocity && <Text style={styles.resultValue}>Velocity: {velocity} FPM</Text>}
                {density && <Text style={styles.resultValue}>Air Density: {density} lb/ft³</Text>}
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
    marginBottom: 4,
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

export default AirflowVelocityOfAirScreen;

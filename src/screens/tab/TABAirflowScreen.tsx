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

const TABAirflowScreen = () => {
  const theme = useTheme();
  const [cfm, setCfm] = useState('');
  const [area, setArea] = useState('');
  const [velocity, setVelocity] = useState('');
  const [ductWidth, setDuctWidth] = useState('');
  const [ductHeight, setDuctHeight] = useState('');
  const [ductArea, setDuctArea] = useState('');

  const calculateMissingValue = () => {
    const values = [cfm, area, velocity];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Velocity = CFM / Area
    if (velocity === '') {
      // Calculate velocity
      const cfmValue = parseFloat(cfm);
      const areaValue = parseFloat(area);
      if (areaValue === 0) {
        Alert.alert('Error', 'Area cannot be zero');
        return;
      }
      const velocityValue = cfmValue / areaValue;
      setVelocity(velocityValue.toFixed(2));
    } else if (cfm === '') {
      // Calculate CFM
      const velocityValue = parseFloat(velocity);
      const areaValue = parseFloat(area);
      const cfmValue = velocityValue * areaValue;
      setCfm(cfmValue.toFixed(2));
    } else if (area === '') {
      // Calculate area
      const cfmValue = parseFloat(cfm);
      const velocityValue = parseFloat(velocity);
      if (velocityValue === 0) {
        Alert.alert('Error', 'Velocity cannot be zero');
        return;
      }
      const areaValue = cfmValue / velocityValue;
      setArea(areaValue.toFixed(3));
    }
  };

  const calculateDuctArea = () => {
    if (!ductWidth || !ductHeight) {
      Alert.alert('Error', 'Please enter both Width and Height values');
      return;
    }
    const width = parseFloat(ductWidth);
    const height = parseFloat(ductHeight);
    const areaValue = (width * height) / 144; // Convert to square feet
    setDuctArea(areaValue.toFixed(3));
  };

  const clearAll = () => {
    setCfm('');
    setArea('');
    setVelocity('');
    setDuctWidth('');
    setDuctHeight('');
    setDuctArea('');
  };

  const formulas = [
    {
      title: 'Velocity Calculation',
      formula: 'Velocity (ft/min) = CFM / Area (ft²)',
      description: 'Calculate air velocity from airflow rate and duct area',
    },
    {
      title: 'CFM Calculation',
      formula: 'CFM = Velocity (ft/min) × Area (ft²)',
      description: 'Calculate airflow rate from velocity and duct area',
    },
    {
      title: 'Duct Area',
      formula: 'Area (ft²) = (Width × Height) / 144',
      description: 'Calculate duct area from dimensions (inches to ft²)',
    },
    {
      title: 'Equivalent Duct Diameter',
      formula: 'D = 1.3 × (W × H)^0.625 / (W + H)^0.25',
      description: 'Calculate equivalent round duct diameter',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={styles.header}>
        <View style={styles.headerGradient}>
          <Title style={styles.headerTitle}>Airflow Calculations</Title>
          <Paragraph style={styles.headerSubtitle}>
            Professional airflow calculations for NEBB TAB procedures
          </Paragraph>
        </View>
      </Surface>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Velocity Calculator</Title>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <Surface style={styles.formulaContainer}>
              <Text style={styles.formulaTitle}>Velocity Formula:</Text>
              <Text style={styles.formulaText}>Velocity = CFM / Area</Text>
              <Text style={styles.formulaDescription}>
                Calculate air velocity in feet per minute
              </Text>
            </Surface>
            <View style={styles.inputRow}>
              <TextInput
                label="CFM"
                value={cfm}
                onChangeText={setCfm}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Area (ft²)"
                value={area}
                onChangeText={setArea}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>
            <Button
              mode="contained"
              onPress={calculateMissingValue}
              style={styles.button}
            >
                              Calculate
            </Button>
            {velocity && (
              <Surface style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Result:</Text>
                <Text style={styles.resultValue}>{velocity} ft/min</Text>
              </Surface>
            )}
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Duct Area Calculator</Title>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <Surface style={styles.formulaContainer}>
              <Text style={styles.formulaTitle}>Duct Area Formula:</Text>
              <Text style={styles.formulaText}>Area = Width × Height / 144</Text>
              <Text style={styles.formulaDescription}>
                Calculate duct area in square feet from dimensions in inches
              </Text>
            </Surface>
            <View style={styles.inputRow}>
              <TextInput
                label="Width (inches)"
                value={ductWidth}
                onChangeText={setDuctWidth}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Height (inches)"
                value={ductHeight}
                onChangeText={setDuctHeight}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>
            <Button
              mode="contained"
              onPress={calculateDuctArea}
              style={styles.button}
            >
              Calculate Area
            </Button>
            {ductArea && (
              <Surface style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Result:</Text>
                <Text style={styles.resultValue}>{ductArea} ft²</Text>
              </Surface>
            )}
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>NEBB Airflow Formulas</Title>
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
    flex: 1,
    marginHorizontal: 4,
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
  clearButton: {
    marginTop: 24,
    marginBottom: 40,
    borderRadius: 16,
    borderColor: '#22c55e',
    borderWidth: 2,
  },
});

export default TABAirflowScreen;

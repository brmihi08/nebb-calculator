import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Paragraph, Text, TextInput, Title } from 'react-native-paper';

import {
  CalcCard,
  CalcScreen,
  CalcSection,
  FormulaBlock,
  ResultBlock,
  formulaTextStyles,
  resultTextStyles,
} from '../../components/nebb';

const ACCENT = '#22c55e';

const TABTemperatureScreen = () => {
  const [dryBulb, setDryBulb] = useState('');
  const [wetBulb, setWetBulb] = useState('');
  const [relativeHumidity, setRelativeHumidity] = useState('');
  const [dewPoint, setDewPoint] = useState('');
  const [enthalpy, setEnthalpy] = useState('');

  const calculateMissingValue = () => {
    const values = [dryBulb, wetBulb, relativeHumidity, dewPoint];
    const filledCount = values.filter(v => v !== '').length;

    if (filledCount < 3) {
      Alert.alert('Error', 'Please fill in at least 3 values to calculate the missing one');
      return;
    }

    if (filledCount === 4) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Calculate missing value based on what's available
    if (dewPoint === '') {
      if (dryBulb && relativeHumidity) {
        const db = parseFloat(dryBulb);
        const rh = parseFloat(relativeHumidity);
        if (rh < 0 || rh > 100) {
          Alert.alert('Error', 'Relative humidity must be between 0 and 100%');
          return;
        }
        const dp = db - (100 - rh) / 5;
        setDewPoint(dp.toFixed(1));
      }
    } else if (relativeHumidity === '') {
      if (dryBulb && wetBulb) {
        const db = parseFloat(dryBulb);
        const wb = parseFloat(wetBulb);

        if (wb > db) {
          Alert.alert('Error', 'Wet bulb temperature cannot be higher than dry bulb temperature');
          return;
        }

        const depression = db - wb;
        const rh = 100 - depression * 5;
        setRelativeHumidity(Math.max(0, Math.min(100, rh)).toFixed(1));
      }
    } else if (wetBulb === '') {
      if (dryBulb && relativeHumidity) {
        const db = parseFloat(dryBulb);
        const rh = parseFloat(relativeHumidity);
        const depression = (100 - rh) / 5;
        const wb = db - depression;
        setWetBulb(wb.toFixed(1));
      }
    } else if (dryBulb === '') {
      if (wetBulb && relativeHumidity) {
        const wb = parseFloat(wetBulb);
        const rh = parseFloat(relativeHumidity);
        const depression = (100 - rh) / 5;
        const db = wb + depression;
        setDryBulb(db.toFixed(1));
      }
    }
  };

  const calculateEnthalpy = () => {
    if (!dryBulb || !relativeHumidity) {
      Alert.alert('Error', 'Please enter both Dry Bulb Temperature and Relative Humidity');
      return;
    }
    const db = parseFloat(dryBulb);
    const rh = parseFloat(relativeHumidity);

    const enthalpyValue = 0.24 * db + (rh / 100) * (1061 + 0.444 * db);
    setEnthalpy(enthalpyValue.toFixed(2));
  };

  const clearAll = () => {
    setDryBulb('');
    setWetBulb('');
    setRelativeHumidity('');
    setDewPoint('');
    setEnthalpy('');
  };

  const formulas = [
    {
      title: 'Dew Point Temperature',
      formula: 'Td = Tdb - ((100 - RH) / 5)',
      description: 'Calculate dew point from dry bulb temperature and relative humidity',
    },
    {
      title: 'Relative Humidity from Wet Bulb',
      formula: 'RH = 100 - (5 × (Tdb - Twb))',
      description: 'Calculate relative humidity from dry and wet bulb temperatures',
    },
    {
      title: 'Enthalpy',
      formula: 'h = 0.24 × Tdb + (RH/100) × (1061 + 0.444 × Tdb)',
      description: 'Calculate air enthalpy in Btu/lb',
    },
  ];

  return (
    <CalcScreen
      title="Temperature & Humidity"
      subtitle="Professional psychrometric calculations for NEBB TAB procedures"
    >
      <CalcSection>
        <Title style={styles.sectionTitle}>Psychrometric Calculations</Title>
        <CalcCard>
          <FormulaBlock accentColor={ACCENT} title="Smart Fill" description="Enter 3 values, then calculate the missing one">
            <Text style={formulaTextStyles.formulaText}>Dry Bulb • Wet Bulb • RH • Dew Point</Text>
            <Text style={formulaTextStyles.formulaSubText}>
              Fill any 3, leave 1 blank.
            </Text>
          </FormulaBlock>

          <View style={styles.inputRow}>
            <TextInput
              label="Dry Bulb (°F)"
              value={dryBulb}
              onChangeText={setDryBulb}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Wet Bulb (°F)"
              value={wetBulb}
              onChangeText={setWetBulb}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>

          <View style={styles.inputRow}>
            <TextInput
              label="Relative Humidity (%)"
              value={relativeHumidity}
              onChangeText={setRelativeHumidity}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Dew Point (°F)"
              value={dewPoint}
              onChangeText={setDewPoint}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>

          <Button mode="contained" onPress={calculateMissingValue} style={[styles.button, { backgroundColor: ACCENT }]}>
            Calculate
          </Button>

          {(dryBulb || wetBulb || relativeHumidity || dewPoint) && (
            <ResultBlock accentColor={ACCENT} label="Current Values:">
              {!!dryBulb && <Text style={resultTextStyles.value}>Dry Bulb: {dryBulb} °F</Text>}
              {!!wetBulb && <Text style={resultTextStyles.value}>Wet Bulb: {wetBulb} °F</Text>}
              {!!relativeHumidity && (
                <Text style={resultTextStyles.value}>Relative Humidity: {relativeHumidity} %</Text>
              )}
              {!!dewPoint && <Text style={resultTextStyles.value}>Dew Point: {dewPoint} °F</Text>}
            </ResultBlock>
          )}
        </CalcCard>
      </CalcSection>

      <CalcSection>
        <Title style={styles.sectionTitle}>Enthalpy Calculator</Title>
        <CalcCard>
          <FormulaBlock accentColor={ACCENT} title="Enthalpy" description="Requires Dry Bulb and Relative Humidity">
            <Text style={formulaTextStyles.formulaText}>h = 0.24×Tdb + (RH/100)×(1061 + 0.444×Tdb)</Text>
          </FormulaBlock>

          <TextInput
            label="Enthalpy (Btu/lb)"
            value={enthalpy}
            onChangeText={setEnthalpy}
            keyboardType="numeric"
            style={styles.singleInput}
            mode="outlined"
          />

          <Button mode="contained" onPress={calculateEnthalpy} style={[styles.button, { backgroundColor: ACCENT }]}>
            Calculate Enthalpy
          </Button>

          {!!enthalpy && (
            <ResultBlock accentColor={ACCENT} label="Enthalpy:">
              <Text style={resultTextStyles.value}>{enthalpy} Btu/lb</Text>
            </ResultBlock>
          )}
        </CalcCard>
      </CalcSection>

      <CalcSection>
        <Title style={styles.sectionTitle}>NEBB Psychrometric Formulas</Title>
        {formulas.map((formula, index) => (
          <CalcCard key={`${formula.title}-${index}`}>
            <Title style={styles.formulaTitle}>{formula.title}</Title>
            <Text style={styles.formulaText}>{formula.formula}</Text>
            <Paragraph style={styles.formulaDescription}>{formula.description}</Paragraph>
          </CalcCard>
        ))}
      </CalcSection>

      <Button
        mode="outlined"
        onPress={clearAll}
        style={[styles.clearButton, { borderColor: ACCENT }]}
        textColor={ACCENT}
        icon="refresh"
      >
        Clear All
      </Button>
    </CalcScreen>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
    letterSpacing: -0.3,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
  },
  singleInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
    borderRadius: 16,
    paddingVertical: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  clearButton: {
    marginTop: 24,
    marginBottom: 40,
    borderRadius: 16,
    borderWidth: 2,
  },

  // Formula list cards
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
    color: ACCENT,
    fontWeight: '500',
  },
  formulaDescription: {
    fontSize: 14,
    opacity: 0.8,
    color: '#000000',
    lineHeight: 20,
  },
});

export default TABTemperatureScreen;

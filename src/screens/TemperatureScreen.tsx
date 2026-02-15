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
import {
  dewPointFromDryBulbRh,
  enthalpyBtuPerLbDryAir,
  fToC,
  humidityRatioFromRh,
} from '../lib/calcs';

const TemperatureScreen = () => {
  const theme = useTheme();
  const [dryBulb, setDryBulb] = useState('');
  const [wetBulb, setWetBulb] = useState('');
  const [relativeHumidity, setRelativeHumidity] = useState('');
  const [dewPoint, setDewPoint] = useState('');
  const [enthalpy, setEnthalpy] = useState('');
  const [specificVolume, setSpecificVolume] = useState('');

  const calculateDewPoint = () => {
    if (!dryBulb || !relativeHumidity) {
      Alert.alert('Error', 'Please enter both Dry Bulb Temperature and Relative Humidity');
      return;
    }
    const db = parseFloat(dryBulb);
    const rh = parseFloat(relativeHumidity);
    if (rh < 0 || rh > 100) {
      Alert.alert('Error', 'Relative humidity must be between 0 and 100%');
      return;
    }

    const { dewPoint: dpF } = dewPointFromDryBulbRh(db, rh, 'F');
    setDewPoint(dpF.toFixed(1));
  };

  const calculateRelativeHumidity = () => {
    if (!dryBulb || !wetBulb) {
      Alert.alert('Error', 'Please enter both Dry Bulb and Wet Bulb temperatures');
      return;
    }
    const db = parseFloat(dryBulb);
    const wb = parseFloat(wetBulb);
    
    if (wb > db) {
      Alert.alert('Error', 'Wet bulb temperature cannot be higher than dry bulb temperature');
      return;
    }
    
    // Simplified relative humidity calculation using wet bulb depression
    const depression = db - wb;
    const rh = 100 - (depression * 5);
    setRelativeHumidity(Math.max(0, Math.min(100, rh)).toFixed(1));
  };

  const calculateWetBulb = () => {
    if (!dryBulb || !relativeHumidity) {
      Alert.alert('Error', 'Please enter both Dry Bulb Temperature and Relative Humidity');
      return;
    }
    const db = parseFloat(dryBulb);
    const rh = parseFloat(relativeHumidity);
    
    // Simplified wet bulb calculation
    const wb = db - ((100 - rh) / 5);
    setWetBulb(wb.toFixed(1));
  };

  const calculateEnthalpy = () => {
    if (!dryBulb || !relativeHumidity) {
      Alert.alert('Error', 'Please enter both Dry Bulb Temperature and Relative Humidity');
      return;
    }
    const db = parseFloat(dryBulb);
    const rh = parseFloat(relativeHumidity);

    // Psychrometric relationship (I-P): h = 0.240*Tdb + W*(1061 + 0.444*Tdb)
    // where W is humidity ratio (lb water / lb dry air)
    const w = humidityRatioFromRh(fToC(db), rh);
    const enthalpyValue = enthalpyBtuPerLbDryAir(db, w);
    setEnthalpy(enthalpyValue.toFixed(2));
  };

  const calculateSpecificVolume = () => {
    if (!dryBulb || !relativeHumidity) {
      Alert.alert('Error', 'Please enter both Dry Bulb Temperature and Relative Humidity');
      return;
    }
    const db = parseFloat(dryBulb);
    const rh = parseFloat(relativeHumidity);
    
    // Simplified specific volume calculation (ft³/lb)
    const sv = 0.754 * (db + 460) / (14.7 - (rh / 100) * 0.3);
    setSpecificVolume(sv.toFixed(3));
  };

  const clearAll = () => {
    setDryBulb('');
    setWetBulb('');
    setRelativeHumidity('');
    setDewPoint('');
    setEnthalpy('');
    setSpecificVolume('');
  };

  const formulas = [
    {
      title: 'Dew Point Temperature',
      formula: 'Td = f(Tdb, RH) (psychrometric)',
      description: 'Calculate dew point from dry bulb temperature and relative humidity',
    },
    {
      title: 'Relative Humidity from Wet Bulb',
      formula: 'RH = 100 - (5 × (Tdb - Twb))',
      description: 'Calculate relative humidity from dry and wet bulb temperatures',
    },
    {
      title: 'Wet Bulb Temperature',
      formula: 'Twb = Tdb - ((100 - RH) / 5)',
      description: 'Calculate wet bulb temperature from dry bulb and relative humidity',
    },
    {
      title: 'Enthalpy',
      formula: 'h = 0.240×Tdb + W×(1061 + 0.444×Tdb)',
      description: 'Calculate air enthalpy in Btu/lb (W from Tdb & RH)',
    },
    {
      title: 'Specific Volume',
      formula: 'v = 0.754 × (Tdb + 460) / (P - φ × Pv)',
      description: 'Calculate specific volume in ft³/lb',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={styles.header}>
        <Title style={styles.headerTitle}>Temperature & Humidity</Title>
        <Paragraph style={styles.headerSubtitle}>
          Professional psychrometric calculations for NEBB certified technicians
        </Paragraph>
      </Surface>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Basic Psychrometric Calculations</Title>
        <Card style={styles.card}>
          <Card.Content>
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
            <View style={styles.buttonRow}>
              <Button
                mode="contained"
                onPress={calculateDewPoint}
                style={styles.button}
              >
                Calculate DP
              </Button>
              <Button
                mode="contained"
                onPress={calculateRelativeHumidity}
                style={styles.button}
              >
                Calculate RH
              </Button>
            </View>
            <Button
              mode="contained"
              onPress={calculateWetBulb}
              style={styles.fullWidthButton}
            >
              Calculate Wet Bulb
            </Button>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Advanced Properties</Title>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.inputRow}>
              <TextInput
                label="Enthalpy (Btu/lb)"
                value={enthalpy}
                onChangeText={setEnthalpy}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Specific Volume (ft³/lb)"
                value={specificVolume}
                onChangeText={setSpecificVolume}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>
            <View style={styles.buttonRow}>
              <Button
                mode="contained"
                onPress={calculateEnthalpy}
                style={styles.button}
              >
                Calculate Enthalpy
              </Button>
              <Button
                mode="contained"
                onPress={calculateSpecificVolume}
                style={styles.button}
              >
                Calculate Volume
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>NEBB Psychrometric Formulas</Title>
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

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Temperature Conversion</Title>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.conversionRow}>
              <Text style={styles.conversionLabel}>°F to °C:</Text>
              <Text style={styles.conversionFormula}>°C = (°F - 32) × 5/9</Text>
            </View>
            <View style={styles.conversionRow}>
              <Text style={styles.conversionLabel}>°C to °F:</Text>
              <Text style={styles.conversionFormula}>°F = (°C × 9/5) + 32</Text>
            </View>
            <View style={styles.conversionRow}>
              <Text style={styles.conversionLabel}>°F to °R:</Text>
              <Text style={styles.conversionFormula}>°R = °F + 460</Text>
            </View>
            <View style={styles.conversionRow}>
              <Text style={styles.conversionLabel}>°C to K:</Text>
              <Text style={styles.conversionFormula}>K = °C + 273.15</Text>
            </View>
          </Card.Content>
        </Card>
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
  fullWidthButton: {
    marginBottom: 16,
  },
  formulaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formulaText: {
    fontFamily: 'monospace',
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
  conversionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  conversionLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  conversionFormula: {
    fontSize: 14,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  clearButton: {
    marginTop: 16,
    marginBottom: 32,
  },
});

export default TemperatureScreen;






















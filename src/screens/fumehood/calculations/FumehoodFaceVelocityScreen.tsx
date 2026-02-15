import React, { useMemo, useState } from 'react';
import {
  View,
  ScrollView,
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
import { createLiquidStyles, LIQUID_BACKGROUND } from '../../shared/liquidStyles';

const FumehoodFaceVelocityScreen = () => {
  const styles = useMemo(() => createLiquidStyles('#22c55e'), []);

  const [faceVelocity, setFaceVelocity] = useState('');
  const [faceArea, setFaceArea] = useState('');
  const [cfm, setCfm] = useState('');

  const calculateMissingValue = () => {
    const values = [faceVelocity, faceArea, cfm];
    const filledCount = values.filter((v) => v !== '').length;

    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // CFM = Face Velocity × Face Area
    // Face Velocity = CFM / Face Area
    if (cfm === '') {
      const velocity = parseFloat(faceVelocity);
      const area = parseFloat(faceArea);
      const cfmValue = velocity * area;
      setCfm(cfmValue.toFixed(2));
    } else if (faceVelocity === '') {
      const cfmValue = parseFloat(cfm);
      const area = parseFloat(faceArea);
      if (area === 0) {
        Alert.alert('Error', 'Face area cannot be zero');
        return;
      }
      const velocity = cfmValue / area;
      setFaceVelocity(velocity.toFixed(2));
    } else if (faceArea === '') {
      const cfmValue = parseFloat(cfm);
      const velocity = parseFloat(faceVelocity);
      if (velocity === 0) {
        Alert.alert('Error', 'Face velocity cannot be zero');
        return;
      }
      const area = cfmValue / velocity;
      setFaceArea(area.toFixed(2));
    }
  };

  const clearAll = () => {
    setFaceVelocity('');
    setFaceArea('');
    setCfm('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: LIQUID_BACKGROUND }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Face Velocity & CFM</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate face velocity, CFM, or face area using CFM = Face Velocity × Face Area
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>CFM = Face Velocity × Face Area</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: CFM = Airflow (ft³/min), Face Velocity = ft/min, Face Area = ft²
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Face Velocity (ft/min)"
                value={faceVelocity}
                onChangeText={setFaceVelocity}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Face Area (ft²)"
                value={faceArea}
                onChangeText={setFaceArea}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="CFM"
                value={cfm}
                onChangeText={setCfm}
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

            {(faceVelocity || faceArea || cfm) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {faceVelocity && (
                  <Text style={styles.resultValue}>Face Velocity: {faceVelocity} ft/min</Text>
                )}
                {faceArea && <Text style={styles.resultValue}>Face Area: {faceArea} ft²</Text>}
                {cfm && <Text style={styles.resultValue}>CFM: {cfm} CFM</Text>}
              </View>
            )}
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

export default FumehoodFaceVelocityScreen;

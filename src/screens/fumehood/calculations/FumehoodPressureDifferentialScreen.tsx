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

const FumehoodPressureDifferentialScreen = () => {
  const styles = useMemo(() => createLiquidStyles('#22c55e'), []);

  const [roomPressure, setRoomPressure] = useState('');
  const [hoodPressure, setHoodPressure] = useState('');
  const [differential, setDifferential] = useState('');

  const calculateDifferential = () => {
    if (!roomPressure || !hoodPressure) {
      Alert.alert('Error', 'Please enter both Room Pressure and Hood Pressure values');
      return;
    }

    const room = parseFloat(roomPressure);
    const hood = parseFloat(hoodPressure);

    if (!Number.isFinite(room) || !Number.isFinite(hood)) {
      Alert.alert('Error', 'Please enter valid numeric pressure values');
      return;
    }

    setDifferential((room - hood).toFixed(3));
  };

  const clearAll = () => {
    setRoomPressure('');
    setHoodPressure('');
    setDifferential('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: LIQUID_BACKGROUND }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Pressure Differential</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate pressure differential using ΔP = Room Pressure − Hood Pressure
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>ΔP = Room Pressure − Hood Pressure</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: ΔP is in inches water column (in. w.c.) unless otherwise specified.
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Room Pressure (in. w.c.)"
                value={roomPressure}
                onChangeText={setRoomPressure}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Hood Pressure (in. w.c.)"
                value={hoodPressure}
                onChangeText={setHoodPressure}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={calculateDifferential}
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

            {differential !== '' && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Result:</Text>
                <Text style={styles.resultValue}>ΔP = {differential} in. w.c.</Text>
              </View>
            )}
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

export default FumehoodPressureDifferentialScreen;

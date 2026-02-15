import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import {
  CalcCard,
  CalcScreen,
  CalcSection,
  FormulaBlock,
  ResultBlock,
  formulaTextStyles,
  resultTextStyles,
} from '../../../components/nebb';
import {
  calcAchFromCfm,
  calcCfmFromAch,
  parseNumber,
  requireNonNegative,
  requirePositive,
  round,
} from '../../../utils/cleanroom';

const ACCENT = '#22c55e';

const CleanroomAirChangesPerHourScreen = () => {
  const [roomVolume, setRoomVolume] = useState('');
  const [airChanges, setAirChanges] = useState('');
  const [cfmRequired, setCfmRequired] = useState('');

  const calculateMissingValue = () => {
    const values = [roomVolume, airChanges, cfmRequired];
    const filledCount = values.filter((v) => v.trim() !== '').length;

    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // NEBB-first equation:
    // CFM = (Room Volume × Air Changes/Hour) / 60
    if (cfmRequired.trim() === '') {
      const v = parseNumber(roomVolume, 'Room volume (ft³)');
      if ('error' in v) return Alert.alert('Error', v.error);
      const vOk = requirePositive(v.value, 'Room volume');
      if ('error' in vOk) return Alert.alert('Error', vOk.error);

      const a = parseNumber(airChanges, 'Air changes per hour (ACH)');
      if ('error' in a) return Alert.alert('Error', a.error);
      const aOk = requirePositive(a.value, 'Air changes per hour');
      if ('error' in aOk) return Alert.alert('Error', aOk.error);

      setCfmRequired(String(round(calcCfmFromAch(v.value, a.value), 2)));
      return;
    }

    if (roomVolume.trim() === '') {
      const c = parseNumber(cfmRequired, 'Required CFM');
      if ('error' in c) return Alert.alert('Error', c.error);
      const cOk = requireNonNegative(c.value, 'Required CFM');
      if ('error' in cOk) return Alert.alert('Error', cOk.error);

      const a = parseNumber(airChanges, 'Air changes per hour (ACH)');
      if ('error' in a) return Alert.alert('Error', a.error);
      const aOk = requirePositive(a.value, 'Air changes per hour');
      if ('error' in aOk) return Alert.alert('Error', aOk.error);

      const volume = (c.value * 60) / a.value;
      setRoomVolume(String(round(volume, 2)));
      return;
    }

    if (airChanges.trim() === '') {
      const c = parseNumber(cfmRequired, 'Required CFM');
      if ('error' in c) return Alert.alert('Error', c.error);
      const cOk = requireNonNegative(c.value, 'Required CFM');
      if ('error' in cOk) return Alert.alert('Error', cOk.error);

      const v = parseNumber(roomVolume, 'Room volume (ft³)');
      if ('error' in v) return Alert.alert('Error', v.error);
      const vOk = requirePositive(v.value, 'Room volume');
      if ('error' in vOk) return Alert.alert('Error', vOk.error);

      setAirChanges(String(round(calcAchFromCfm(v.value, c.value), 2)));
    }
  };

  const clearAll = () => {
    setRoomVolume('');
    setAirChanges('');
    setCfmRequired('');
  };

  return (
    <CalcScreen
      title="Air Changes Per Hour"
      subtitle="Calculate air changes, airflow, or room volume using CFM = (Room Volume × Air Changes/Hour) / 60"
    >
      <CalcSection>
        <CalcCard>
          <FormulaBlock
            accentColor={ACCENT}
            title="Formula"
            description="Where: CFM = Required airflow, Room Volume = ft³, Air Changes/Hour = ACH"
          >
            <Text style={formulaTextStyles.formulaText}>CFM = (Room Volume × Air Changes/Hour) / 60</Text>
          </FormulaBlock>

          <View style={styles.inputRow}>
            <TextInput
              label="Room Volume (ft³)"
              value={roomVolume}
              onChangeText={setRoomVolume}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>

          <View style={styles.inputRow}>
            <TextInput
              label="Air Changes/Hour (ACH)"
              value={airChanges}
              onChangeText={setAirChanges}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>

          <View style={styles.inputRow}>
            <TextInput
              label="Required CFM"
              value={cfmRequired}
              onChangeText={setCfmRequired}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={calculateMissingValue}
              style={[styles.button, { backgroundColor: ACCENT }]}
              labelStyle={styles.buttonLabel}
            >
              Calculate
            </Button>
            <Button
              mode="outlined"
              onPress={clearAll}
              style={[styles.clearButton, { borderColor: ACCENT }]}
              labelStyle={[styles.clearButtonLabel, { color: ACCENT }]}
            >
              Clear All
            </Button>
          </View>

          {(roomVolume || airChanges || cfmRequired) && (
            <ResultBlock accentColor={ACCENT} label="Current Values:">
              {roomVolume && <Text style={resultTextStyles.value}>Room Volume: {roomVolume} ft³</Text>}
              {airChanges && <Text style={resultTextStyles.value}>Air Changes/Hour: {airChanges} ACH</Text>}
              {cfmRequired && <Text style={resultTextStyles.value}>Required CFM: {cfmRequired} CFM</Text>}
            </ResultBlock>
          )}
        </CalcCard>
      </CalcSection>
    </CalcScreen>
  );
};

const styles = StyleSheet.create({
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
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    flex: 1,
    marginLeft: 8,
  },
  clearButtonLabel: {
    fontSize: 16,
  },
});

export default CleanroomAirChangesPerHourScreen;

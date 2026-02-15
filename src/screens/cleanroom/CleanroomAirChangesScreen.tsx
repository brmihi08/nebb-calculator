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

const ACCENT_COLOR = '#2196F3'; // Blue for Cleanroom

const CleanroomAirChangesScreen = () => {
  const [roomVolume, setRoomVolume] = useState('');
  const [airChanges, setAirChanges] = useState('');
  const [cfmRequired, setCfmRequired] = useState('');

  const calculateCFMRequired = () => {
    if (!roomVolume || !airChanges) {
      Alert.alert('Error', 'Please enter both Room Volume and Air Changes per Hour');
      return;
    }
    const volume = parseFloat(roomVolume);
    const changes = parseFloat(airChanges);
    const cfm = (volume * changes) / 60; // Convert to CFM
    setCfmRequired(cfm.toFixed(2));
  };

  const clearAll = () => {
    setRoomVolume('');
    setAirChanges('');
    setCfmRequired('');
  };

  return (
    <CalcScreen title="Air Changes Calculator" subtitle="Calculate required airflow for cleanroom air changes">
      <CalcSection>
        <CalcCard>
          <FormulaBlock accentColor={ACCENT_COLOR} title="Formula">
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
            <TextInput
              label="Air Changes/Hour"
              value={airChanges}
              onChangeText={setAirChanges}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          </View>
          <Button
            mode="contained"
            onPress={calculateCFMRequired}
            style={[styles.button, { backgroundColor: ACCENT_COLOR }]}
          >
            Calculate Required CFM
          </Button>
          {!!cfmRequired && (
            <ResultBlock accentColor={ACCENT_COLOR} label="Required CFM:">
              <Text style={resultTextStyles.value}>{cfmRequired} CFM</Text>
            </ResultBlock>
          )}
        </CalcCard>
      </CalcSection>

      <Button
        mode="outlined"
        onPress={clearAll}
        style={[styles.clearButton, { borderColor: ACCENT_COLOR }]}
        textColor={ACCENT_COLOR}
        icon="refresh"
      >
        Clear All
      </Button>
    </CalcScreen>
  );
};

const styles = StyleSheet.create({
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
  button: {
    marginBottom: 16,
    borderRadius: 16,
  },
  clearButton: {
    marginTop: 16,
    marginBottom: 32,
    borderRadius: 16,
    borderWidth: 2,
  },
});

export default CleanroomAirChangesScreen;

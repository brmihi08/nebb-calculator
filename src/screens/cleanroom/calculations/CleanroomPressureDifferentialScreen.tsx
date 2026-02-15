import React, { useMemo, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Title, Paragraph, TextInput, Button, Surface, Text } from 'react-native-paper';
import { parseNumber, round, paToInWg, inWgToPa } from '../../../utils/cleanroom';
import { makeCalculatorStyles } from '../../../theme/screenStyles';

const styles = makeCalculatorStyles('#f43f5e');

const CleanroomPressureDifferentialScreen = () => {
  const [pa, setPa] = useState('');
  const [inWg, setInWg] = useState('');

  const computed = useMemo(() => {
    const paVal = pa.trim() ? parseNumber(pa, 'Pressure (Pa)') : null;
    const inVal = inWg.trim() ? parseNumber(inWg, 'Pressure (in.w.g)') : null;

    if (!paVal && !inVal) return null;
    if (paVal && 'error' in paVal) return null;
    if (inVal && 'error' in inVal) return null;

    if (paVal && !('error' in paVal)) {
      return { pa: paVal.value, inWg: paToInWg(paVal.value) };
    }
    if (inVal && !('error' in inVal)) {
      return { pa: inWgToPa(inVal.value), inWg: inVal.value };
    }

    return null;
  }, [pa, inWg]);

  const calculate = () => {
    const hasPa = pa.trim().length > 0;
    const hasIn = inWg.trim().length > 0;

    if (!hasPa && !hasIn) {
      Alert.alert('Error', 'Enter pressure differential in either Pa or in.w.g');
      return;
    }

    if (hasPa && hasIn) {
      Alert.alert('Info', 'Clear one value to calculate from the other.');
      return;
    }

    if (hasPa) {
      const p = parseNumber(pa, 'Pressure (Pa)');
      if ('error' in p) return Alert.alert('Error', p.error);
      setInWg(String(round(paToInWg(p.value), 4)));
    } else {
      const i = parseNumber(inWg, 'Pressure (in.w.g)');
      if ('error' in i) return Alert.alert('Error', i.error);
      setPa(String(round(inWgToPa(i.value), 2)));
    }
  };

  const clearAll = () => {
    setPa('');
    setInWg('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: screenBackground }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Pressure Differential (Reporting)</Title>
            <Paragraph style={styles.headerSubtitle}>
              NEBB-style reporting conversion for cleanroom differential pressure (Pa ⇄ in.w.g).
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Conversion</Title>
              <Text style={styles.formulaText}>in.w.g = Pa / 249.0889</Text>
              <Text style={styles.formulaText}>Pa = in.w.g × 249.0889</Text>
              <Paragraph style={styles.formulaDescription}>
                Use the units required by the TAB/cleanroom report. Secondary note: typical pressure cascades are often in the 5–15 Pa
                range between adjacent spaces, depending on design/program.
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Pressure (Pa)"
                value={pa}
                onChangeText={setPa}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Pressure (in.w.g)"
                value={inWg}
                onChangeText={setInWg}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={calculate} style={styles.button} labelStyle={styles.buttonLabel}>
                Convert
              </Button>
              <Button mode="outlined" onPress={clearAll} style={styles.clearButton} labelStyle={styles.clearButtonLabel}>
                Clear All
              </Button>
            </View>

            {computed && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Results:</Text>
                <Text style={styles.resultValue}>Pa: {round(computed.pa, 2)} Pa</Text>
                <Text style={styles.resultValue}>in.w.g: {round(computed.inWg, 4)} in.w.g</Text>
              </View>
            )}
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

export default CleanroomPressureDifferentialScreen;

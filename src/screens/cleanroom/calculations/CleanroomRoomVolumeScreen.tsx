import React, { useMemo, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Title, Paragraph, TextInput, Button, Surface, Text } from 'react-native-paper';
import {
  parseNumber,
  requirePositive,
  round,
  calcRoomAreaFt2,
  calcRoomVolumeFt3,
  ft2ToM2,
  ft3ToM3,
} from '../../../utils/cleanroom';
import { makeCalculatorStyles } from '../../../theme/screenStyles';

const styles = makeCalculatorStyles('#f59e0b');

const CleanroomRoomVolumeScreen = () => {
  const [lengthFt, setLengthFt] = useState('');
  const [widthFt, setWidthFt] = useState('');
  const [heightFt, setHeightFt] = useState('');

  const [areaFt2, setAreaFt2] = useState<string>('');
  const [volumeFt3, setVolumeFt3] = useState<string>('');

  const calculated = useMemo(() => {
    if (!lengthFt || !widthFt || !heightFt) return null;
    const l = parseNumber(lengthFt, 'Length');
    const w = parseNumber(widthFt, 'Width');
    const h = parseNumber(heightFt, 'Ceiling height');
    if ('error' in l || 'error' in w || 'error' in h) return null;
    if ('error' in requirePositive(l.value, 'Length')) return null;
    if ('error' in requirePositive(w.value, 'Width')) return null;
    if ('error' in requirePositive(h.value, 'Ceiling height')) return null;

    const area = calcRoomAreaFt2(l.value, w.value);
    const vol = calcRoomVolumeFt3(l.value, w.value, h.value);
    return {
      areaFt2: area,
      areaM2: ft2ToM2(area),
      volumeFt3: vol,
      volumeM3: ft3ToM3(vol),
    };
  }, [lengthFt, widthFt, heightFt]);

  const calculate = () => {
    const l = parseNumber(lengthFt, 'Length');
    const w = parseNumber(widthFt, 'Width');
    const h = parseNumber(heightFt, 'Ceiling height');

    const err = ('error' in l && l.error) || ('error' in w && w.error) || ('error' in h && h.error);
    if (err) {
      Alert.alert('Error', err);
      return;
    }

    const lv = (l as { value: number }).value;
    const wv = (w as { value: number }).value;
    const hv = (h as { value: number }).value;

    const lPos = requirePositive(lv, 'Length');
    const wPos = requirePositive(wv, 'Width');
    const hPos = requirePositive(hv, 'Ceiling height');

    const err2 =
      ('error' in lPos && lPos.error) || ('error' in wPos && wPos.error) || ('error' in hPos && hPos.error);
    if (err2) {
      Alert.alert('Error', err2);
      return;
    }

    const area = calcRoomAreaFt2(lv, wv);
    const vol = calcRoomVolumeFt3(lv, wv, hv);
    setAreaFt2(String(round(area, 2)));
    setVolumeFt3(String(round(vol, 2)));
  };

  const clearAll = () => {
    setLengthFt('');
    setWidthFt('');
    setHeightFt('');
    setAreaFt2('');
    setVolumeFt3('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Room Area & Volume</Title>
            <Paragraph style={styles.headerSubtitle}>
              Compute floor area and room volume from dimensions (used for ACH and particle count planning).
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formulas</Title>
              <Text style={styles.formulaText}>Area = L × W</Text>
              <Text style={styles.formulaText}>Volume = L × W × H</Text>
              <Paragraph style={styles.formulaDescription}>
                Enter dimensions in feet (ft). Results are shown in ft²/ft³ with metric equivalents.
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Length (ft)"
                value={lengthFt}
                onChangeText={setLengthFt}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>
            <View style={styles.inputRow}>
              <TextInput
                label="Width (ft)"
                value={widthFt}
                onChangeText={setWidthFt}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>
            <View style={styles.inputRow}>
              <TextInput
                label="Ceiling Height (ft)"
                value={heightFt}
                onChangeText={setHeightFt}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={calculate} style={styles.button} labelStyle={styles.buttonLabel}>
                Calculate
              </Button>
              <Button mode="outlined" onPress={clearAll} style={styles.clearButton} labelStyle={styles.clearButtonLabel}>
                Clear All
              </Button>
            </View>

            {(areaFt2 || volumeFt3 || calculated) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Results:</Text>
                {(areaFt2 || calculated) && (
                  <Text style={styles.resultValue}>
                    Area: {areaFt2 || round(calculated?.areaFt2 ?? 0, 2)} ft² ({round(calculated?.areaM2 ?? 0, 2)} m²)
                  </Text>
                )}
                {(volumeFt3 || calculated) && (
                  <Text style={styles.resultValue}>
                    Volume: {volumeFt3 || round(calculated?.volumeFt3 ?? 0, 2)} ft³ ({round(calculated?.volumeM3 ?? 0, 2)} m³)
                  </Text>
                )}
              </View>
            )}
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

export default CleanroomRoomVolumeScreen;

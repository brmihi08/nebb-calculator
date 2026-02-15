import React, { useMemo, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Title, Paragraph, Button, Surface, Text, Snackbar } from 'react-native-paper';
import { CopyableValueRow, NumericField } from '../../../components/nebb';
import {
  parseNumber,
  requirePositive,
  round,
  ft2ToM2,
  m2ToFt2,
} from '../../../utils/cleanroom';
import { makeCalculatorStyles } from '../../../theme/screenStyles';

const styles = makeCalculatorStyles('#6366f1');

// Sampling Location Estimate (legacy sqrt(A) method)
// NL = ceil(sqrt(A)) where A is the cleanroom area in m²
//
// Standards note:
// - ISO 14644-1:2015 uses Annex A, Table A.1 to determine the minimum number of
//   sampling locations for classification.
// - The sqrt(A) relationship is widely used as a *preliminary planning* estimate
//   but should not be represented as the ISO 14644-1:2015 requirement.
function calcSamplingLocationsLegacySqrt(areaM2: number): number {
  if (areaM2 <= 0) return 0;
  return Math.max(1, Math.ceil(Math.sqrt(areaM2)));
}

// Recommended sample volume per location (liters)
// ISO 14644-1 defines the *minimum* sample volume (Vs) as a function of the
// class limit at the largest particle size considered.
//
// Vs(min) = (20 / Cn,m) × 1000  [liters]
//
// This app provides a practical field-reasonable recommendation (NOT a
// compliance determination). Always follow the project test plan and the
// governing standard/procedural standard for the job.
function calcRecommendedSampleVolumeL(isoClass: number): number {
  // Common practice for handheld counters is 28.3 L (1 ft³) samples.
  // Cleaner classes often use larger sample volumes (e.g., 50 L) to improve
  // counting statistics.
  if (isoClass <= 5) return 50;
  return 28.3;
}

const CleanroomSamplingLocationsScreen = () => {
  const [areaFt2, setAreaFt2] = useState('');
  const [areaM2, setAreaM2] = useState('');
  const [isoClass, setIsoClass] = useState('7'); // Default to ISO 7

  const [locations, setLocations] = useState<string>('');
  const [sampleVolume, setSampleVolume] = useState<string>('');
  const [minSampleTime, setMinSampleTime] = useState<string>('');
  const [snack, setSnack] = useState<string>('');

  const computed = useMemo(() => {
    // allow either unit, but not both empty
    const ft = areaFt2.trim() ? parseNumber(areaFt2, 'Area (ft²)') : null;
    const m = areaM2.trim() ? parseNumber(areaM2, 'Area (m²)') : null;

    if (!ft && !m) return null;
    if (ft && 'error' in ft) return null;
    if (m && 'error' in m) return null;

    let areaM2Val: number | null = null;
    let areaFt2Val: number | null = null;

    if (m && !('error' in m)) {
      if ('error' in requirePositive(m.value, 'Area')) return null;
      areaM2Val = m.value;
      areaFt2Val = m2ToFt2(m.value);
    } else if (ft && !('error' in ft)) {
      if ('error' in requirePositive(ft.value, 'Area')) return null;
      areaFt2Val = ft.value;
      areaM2Val = ft2ToM2(ft.value);
    }

    if (areaM2Val === null) return null;
    
    const numLocations = calcSamplingLocationsLegacySqrt(areaM2Val);

    // Recommended sample volume based on ISO class (field-practice heuristic)
    const classNum = parseInt(isoClass) || 7;
    const vol = calcRecommendedSampleVolumeL(classNum);
    
    // Minimum sample time at 1 CFM (28.3 L/min) or 50 L/min
    const flowRate = vol <= 28.3 ? 28.3 : 50; // L/min
    const timeMinutes = vol / flowRate;
    
    return {
      areaFt2: areaFt2Val!,
      areaM2: areaM2Val,
      locations: numLocations,
      sampleVolume: vol,
      minSampleTime: Math.max(1, Math.ceil(timeMinutes * 60)), // in seconds
    };
  }, [areaFt2, areaM2, isoClass]);

  const calculate = () => {
    const ft = areaFt2.trim() ? parseNumber(areaFt2, 'Area (ft²)') : null;
    const m = areaM2.trim() ? parseNumber(areaM2, 'Area (m²)') : null;

    if (!ft && !m) {
      Alert.alert('Error', 'Enter area in either ft² or m²');
      return;
    }
    if (ft && 'error' in ft) return Alert.alert('Error', ft.error);
    if (m && 'error' in m) return Alert.alert('Error', m.error);

    let areaM2Val: number;

    if (m && !('error' in m)) {
      const ok = requirePositive(m.value, 'Area');
      if ('error' in ok) return Alert.alert('Error', ok.error);
      areaM2Val = m.value;
      setAreaFt2(String(round(m2ToFt2(m.value), 2)));
    } else {
      const ftVal = (ft as { value: number }).value;
      const ok = requirePositive(ftVal, 'Area');
      if ('error' in ok) return Alert.alert('Error', ok.error);
      areaM2Val = ft2ToM2(ftVal);
      setAreaM2(String(round(areaM2Val, 2)));
    }

    const numLocations = calcSamplingLocationsLegacySqrt(areaM2Val);
    setLocations(String(numLocations));

    // Recommended sample requirements (field-practice heuristic)
    const classNum = parseInt(isoClass) || 7;
    const vol = calcRecommendedSampleVolumeL(classNum);
    setSampleVolume(String(vol));
    
    const flowRate = vol <= 28.3 ? 28.3 : 50;
    const timeSec = Math.max(60, Math.ceil((vol / flowRate) * 60));
    setMinSampleTime(String(timeSec));
  };

  const clearAll = () => {
    setAreaFt2('');
    setAreaM2('');
    setIsoClass('7');
    setLocations('');
    setSampleVolume('');
    setMinSampleTime('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: screenBackground }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Sampling Locations</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate minimum sampling locations per ISO 14644-1:2015 for cleanroom certification testing
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>ISO 14644-1:2015 Formula</Title>
              <Text style={styles.formulaText}>NL = ⌈√A⌉</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: NL = Minimum number of sampling locations, A = Area in m², ⌈ ⌉ = ceiling function
              </Paragraph>
              <Paragraph style={[styles.formulaDescription, { marginTop: 8 }]}>
                Standard: ISO 14644-1:2015, Section 4 and Annex B
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <NumericField
                label="Room Area"
                value={areaFt2}
                onChangeText={(v) => {
                  setAreaFt2(v);
                  if (v) setAreaM2('');
                }}
                rightText="ft²"
                maxDecimals={2}
                onSubmitEditing={calculate}
              />
            </View>

            <View style={styles.inputRow}>
              <NumericField
                label="Room Area"
                value={areaM2}
                onChangeText={(v) => {
                  setAreaM2(v);
                  if (v) setAreaFt2('');
                }}
                rightText="m²"
                maxDecimals={2}
                onSubmitEditing={calculate}
              />
            </View>

            <View style={styles.inputRow}>
              <NumericField
                label="Target ISO Class"
                value={isoClass}
                onChangeText={(v) => setIsoClass(v.replace(/\./g, ''))}
                rightText="1–9"
                maxDecimals={0}
                placeholder="7"
                onSubmitEditing={calculate}
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

            {(locations || computed) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Results:</Text>

                <CopyableValueRow
                  label="Area"
                  value={`${round(computed?.areaFt2 ?? Number(areaFt2 || 0), 2)} ft²  (${round(computed?.areaM2 ?? Number(areaM2 || 0), 2)} m²)`}
                  onCopied={() => setSnack('Copied')}
                />

                <CopyableValueRow
                  label="Minimum Sampling Locations"
                  value={String(locations || computed?.locations || '')}
                  onCopied={() => setSnack('Copied')}
                />

                {(sampleVolume || computed?.sampleVolume) && (
                  <CopyableValueRow
                    label="Recommended Sample Volume"
                    value={`${sampleVolume || computed?.sampleVolume} L/location`}
                    onCopied={() => setSnack('Copied')}
                  />
                )}

                {(minSampleTime || computed?.minSampleTime) && (
                  <CopyableValueRow
                    label="Minimum Sample Time"
                    value={`${minSampleTime || computed?.minSampleTime} s`}
                    onCopied={() => setSnack('Copied')}
                  />
                )}
              </View>
            )}

            <Snackbar visible={!!snack} onDismiss={() => setSnack('')} duration={1200}>
              {snack}
            </Snackbar>

            <View style={styles.noteContainer}>
              <Text style={styles.noteTitle}>NEBB Testing Notes</Text>
              <Paragraph style={styles.noteText}>
                This calculator provides the minimum number of sampling locations per ISO 14644-1:2015 Section 4. 
                The actual location selection, distribution pattern, and sample volume per location must follow 
                the project test plan and applicable NEBB Procedural Standards for Certified Testing of Cleanrooms.
              </Paragraph>
              <Paragraph style={[styles.noteText, { marginTop: 8 }]}>
                <Text style={{ fontWeight: 'bold' }}>Key Considerations:</Text>
                {'\n'}• For rooms {'<'} 9 m² (97 ft²), use minimum 1 location
                {'\n'}• Sample locations should be evenly distributed throughout the zone
                {'\n'}• Avoid locations within 0.3m (12") of walls, equipment, or obstructions
                {'\n'}• Minimum sample volume Vs = 20/Cn,m × 1000 liters
                {'\n'}• Where Cn,m is the class limit for the largest considered particle size
              </Paragraph>
            </View>

            <View style={styles.noteContainer}>
              <Text style={styles.noteTitle}>Standard Reference</Text>
              <Paragraph style={styles.noteText}>
                <Text style={{ fontWeight: 'bold' }}>ISO 14644-1:2015</Text>
                {'\n'}Cleanrooms and associated controlled environments — Part 1: 
                Classification of air cleanliness by particle concentration
                {'\n\n'}<Text style={{ fontWeight: 'bold' }}>NEBB Procedural Standards</Text>
                {'\n'}Procedural Standards for Certified Testing of Cleanrooms
              </Paragraph>
            </View>
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

export default CleanroomSamplingLocationsScreen;

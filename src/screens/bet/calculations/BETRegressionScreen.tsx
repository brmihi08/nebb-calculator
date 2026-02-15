import React, { useMemo, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Title, Paragraph, TextInput, Button, Surface, Text } from 'react-native-paper';
import {
  liquidLayout,
  liquidCalcLayout,
  makeCalcAccentStyles,
} from '../../../theme/liquidLayout';
import { calcPowerLawRegression } from '../../../lib/calcs/regression';

type Point = { pressure: string; flow: string };

const ACCENT = '#0ea5e9';

const BETRegressionScreen = () => {
  const [points, setPoints] = useState<Point[]>([
    { pressure: '10', flow: '' },
    { pressure: '20', flow: '' },
    { pressure: '30', flow: '' },
    { pressure: '40', flow: '' },
    { pressure: '50', flow: '' },
  ]);

  const numericPoints = useMemo(() => {
    return points
      .map((p) => ({
        pressure: p.pressure.trim() === '' ? NaN : Number(p.pressure),
        flow: p.flow.trim() === '' ? NaN : Number(p.flow),
      }))
      .filter((p) => Number.isFinite(p.pressure) && Number.isFinite(p.flow));
  }, [points]);

  const regression = useMemo(() => {
    // ln(Q) = ln(C) + n ln(ΔP)
    const usable = numericPoints.filter((p) => p.pressure > 0 && p.flow > 0);
    return calcPowerLawRegression(usable);
  }, [numericPoints]);

  const updatePoint = (index: number, key: keyof Point, value: string) => {
    setPoints((prev) => prev.map((p, i) => (i === index ? { ...p, [key]: value } : p)));
  };

  const addPoint = () => {
    setPoints((prev) => [...prev, { pressure: '', flow: '' }]);
  };

  const removePoint = () => {
    setPoints((prev) => (prev.length > 2 ? prev.slice(0, -1) : prev));
  };

  const clearAll = () => {
    setPoints([
      { pressure: '10', flow: '' },
      { pressure: '20', flow: '' },
      { pressure: '30', flow: '' },
      { pressure: '40', flow: '' },
      { pressure: '50', flow: '' },
    ]);
  };

  const validate = () => {
    const usable = numericPoints.filter((p) => p.pressure > 0 && p.flow > 0);
    if (usable.length < 2) {
      Alert.alert('Error', 'Enter at least 2 valid (ΔP, Q) points with positive values.');
      return false;
    }
    return true;
  };

  const onCalculate = () => {
    if (!validate()) return;
    if (!regression) {
      Alert.alert('Error', 'Regression could not be calculated. Check your input points.');
    }
  };

  const accent = makeCalcAccentStyles(ACCENT);

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Multi-Point Regression</Title>
            <Paragraph style={styles.headerSubtitle}>
              Determine flow coefficient (C) and exponent (n) from multiple points using
              ln(Q) = ln(C) + n·ln(ΔP)
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={[styles.formulaContainer, accent.formulaContainer]}>
              <Title style={[styles.formulaTitle, accent.formulaTitle]}>Model</Title>
              <Text style={styles.formulaText}>Q = C × (ΔP)^n</Text>
              <Text style={styles.formulaSubText}>Regression in log space</Text>
              <Paragraph style={styles.formulaDescription}>
                Enter test points (ΔP in Pa, Q in CFM). The calculator performs a linear
                regression on ln(ΔP) vs ln(Q).
              </Paragraph>
            </View>

            <Title style={styles.pointsTitle}>Test Points</Title>
            <Paragraph style={styles.pointsSubtitle}>
              Tip: ASTM E779 commonly uses 10–60 Pa in 10 Pa increments.
            </Paragraph>

            {points.map((p, idx) => (
              <View key={idx} style={styles.pointRow}>
                <TextInput
                  label={`ΔP #${idx + 1} (Pa)`}
                  value={p.pressure}
                  onChangeText={(v) => updatePoint(idx, 'pressure', v)}
                  keyboardType="numeric"
                  style={styles.pointInput}
                  mode="outlined"
                />
                <TextInput
                  label={`Q #${idx + 1} (CFM)`}
                  value={p.flow}
                  onChangeText={(v) => updatePoint(idx, 'flow', v)}
                  keyboardType="numeric"
                  style={styles.pointInput}
                  mode="outlined"
                />
              </View>
            ))}

            <View style={styles.pointButtons}>
              <Button mode="outlined" onPress={addPoint} style={styles.pointButton}>
                Add Point
              </Button>
              <Button mode="outlined" onPress={removePoint} style={styles.pointButton}>
                Remove Point
              </Button>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={onCalculate}
                style={[styles.button, accent.button]}
                labelStyle={styles.buttonLabel}
              >
                Calculate
              </Button>
              <Button
                mode="outlined"
                onPress={clearAll}
                style={[styles.clearButton, accent.clearButton]}
                labelStyle={[styles.clearButtonLabel, accent.clearButtonLabel]}
              >
                Clear All
              </Button>
            </View>

            {regression && (
              <View style={[styles.resultContainer, accent.resultContainer]}>
                <Text style={[styles.resultLabel, accent.resultLabel]}>
                  Regression Results ({regression.count} points)
                </Text>
                <Text style={styles.resultValue}>C = {regression.C.toFixed(4)}</Text>
                <Text style={styles.resultValue}>n = {regression.n.toFixed(4)}</Text>
                <Text style={styles.resultValue}>R² = {regression.r2.toFixed(4)}</Text>
              </View>
            )}

            {!regression && (
              <View style={styles.hintContainer}>
                <Text style={styles.hintText}>
                  Enter at least 2 valid points (positive ΔP and Q) to see C and n.
                </Text>
              </View>
            )}
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <Title style={styles.notesTitle}>Notes</Title>
            <Paragraph style={styles.notesText}>
              • This regression uses natural logarithms. Results are equivalent to log10-based
              regression.
            </Paragraph>
            <Paragraph style={styles.notesText}>
              • Use consistent units across all points (Pa and CFM as shown).
            </Paragraph>
            <Paragraph style={styles.notesText}>
              • If R² is low, check for input errors, unstable pressure, wind effects, or
              insufficient range in ΔP.
            </Paragraph>
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...liquidLayout,
  ...liquidCalcLayout,

  pointsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000000',
  },
  pointsSubtitle: {
    fontSize: 13,
    color: '#000000',
    opacity: 0.7,
    marginBottom: 16,
  },
  pointRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  pointInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  pointButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  pointButton: {
    flex: 1,
    borderRadius: 12,
  },
  hintContainer: {
    marginTop: 4,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
  },
  hintText: {
    fontSize: 13,
    color: '#000000',
    opacity: 0.75,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000000',
  },
  notesText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    color: '#000000',
    opacity: 0.9,
  },
});

export default BETRegressionScreen;

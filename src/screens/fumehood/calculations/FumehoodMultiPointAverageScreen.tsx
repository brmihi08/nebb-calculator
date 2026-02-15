import React, { useMemo, useState } from 'react';
import {
  View,
  ScrollView,
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
import { calcAverage } from '../../../lib/calcs/stats';

const toNumberOrNull = (value: string): number | null => {
  const cleaned = value.replace(/,/g, '').trim();
  if (!cleaned) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
};

const FumehoodMultiPointAverageScreen = () => {
  const styles = useMemo(() => createLiquidStyles('#22c55e'), []);

  const [points, setPoints] = useState<string[]>(['', '', '', '', '', '']);

  const numericPoints = points
    .map(toNumberOrNull)
    .filter((n): n is number => n !== null);

  const average = calcAverage(numericPoints);

  const addPoint = () => setPoints((prev) => [...prev, '']);

  const removePoint = () =>
    setPoints((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));

  const clearAll = () => setPoints(['', '', '', '', '', '']);

  return (
    <ScrollView style={[styles.container, { backgroundColor: LIQUID_BACKGROUND }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Multi-Point Average</Title>
            <Paragraph style={styles.headerSubtitle}>
              Enter multiple face velocity readings to calculate an average (FPM)
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>Average = (V₁ + V₂ + … + Vₙ) / n</Text>
              <Paragraph style={styles.formulaDescription}>
                Tip: Leave unused points blank. Only numeric points are included in the average.
              </Paragraph>
            </View>

            {points.map((value, idx) => (
              <View key={idx} style={styles.inputRow}>
                <TextInput
                  label={`Point ${idx + 1} (ft/min)`}
                  value={value}
                  onChangeText={(t) =>
                    setPoints((prev) => {
                      const next = [...prev];
                      next[idx] = t;
                      return next;
                    })
                  }
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                />
              </View>
            ))}

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={addPoint}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Add Point
              </Button>
              <Button
                mode="outlined"
                onPress={removePoint}
                style={styles.clearButton}
                labelStyle={styles.clearButtonLabel}
                disabled={points.length <= 1}
              >
                Remove
              </Button>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={clearAll}
                style={[styles.clearButton, { marginLeft: 0, flex: 1 }]}
                labelStyle={styles.clearButtonLabel}
              >
                Clear All
              </Button>
              <View style={{ width: 8 }} />
              <View style={{ flex: 1 }} />
            </View>

            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>Summary</Text>
              <Text style={styles.resultValue}>Points entered: {numericPoints.length}</Text>
              <Text style={styles.resultValue}>
                Average: {average === null ? '—' : `${average.toFixed(1)} ft/min`}
              </Text>
            </View>
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

export default FumehoodMultiPointAverageScreen;

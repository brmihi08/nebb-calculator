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

const FumehoodFaceAreaScreen = () => {
  const styles = useMemo(() => createLiquidStyles('#22c55e'), []);

  const [sashHeight, setSashHeight] = useState('');
  const [sashWidth, setSashWidth] = useState('');
  const [faceArea, setFaceArea] = useState('');

  const calculateMissingValue = () => {
    const values = [sashHeight, sashWidth, faceArea];
    const filledCount = values.filter((v) => v !== '').length;

    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Face Area = Sash Height × Sash Width
    if (faceArea === '') {
      const height = parseFloat(sashHeight);
      const width = parseFloat(sashWidth);
      if (height <= 0 || width <= 0) {
        Alert.alert('Error', 'Sash height and width must be greater than zero');
        return;
      }
      setFaceArea((height * width).toFixed(2));
    } else if (sashHeight === '') {
      const area = parseFloat(faceArea);
      const width = parseFloat(sashWidth);
      if (width <= 0) {
        Alert.alert('Error', 'Sash width must be greater than zero');
        return;
      }
      setSashHeight((area / width).toFixed(2));
    } else if (sashWidth === '') {
      const area = parseFloat(faceArea);
      const height = parseFloat(sashHeight);
      if (height <= 0) {
        Alert.alert('Error', 'Sash height must be greater than zero');
        return;
      }
      setSashWidth((area / height).toFixed(2));
    }
  };

  const clearAll = () => {
    setSashHeight('');
    setSashWidth('');
    setFaceArea('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: LIQUID_BACKGROUND }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Face Area</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate face opening area using Face Area = Sash Height × Sash Width
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>Face Area = Sash Height × Sash Width</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: Face Area = ft², Sash Height/Width = ft
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Sash Height (ft)"
                value={sashHeight}
                onChangeText={setSashHeight}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Sash Width (ft)"
                value={sashWidth}
                onChangeText={setSashWidth}
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

            {(sashHeight || sashWidth || faceArea) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {sashHeight && <Text style={styles.resultValue}>Sash Height: {sashHeight} ft</Text>}
                {sashWidth && <Text style={styles.resultValue}>Sash Width: {sashWidth} ft</Text>}
                {faceArea && <Text style={styles.resultValue}>Face Area: {faceArea} ft²</Text>}
              </View>
            )}
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

export default FumehoodFaceAreaScreen;

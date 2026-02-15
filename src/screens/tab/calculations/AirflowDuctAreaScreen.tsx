import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Title,
  Paragraph,
  TextInput,
  Button,
  useTheme,
  Surface,
  Text,
} from 'react-native-paper';
import { screenBackground } from '../../../theme/screenStyles';

const AirflowDuctAreaScreen = () => {
  const theme = useTheme();
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [diameter, setDiameter] = useState('');
  const [area, setArea] = useState('');
  const [shape, setShape] = useState('rectangular'); // 'rectangular' or 'circular'

  const calculateMissingValue = () => {
    if (shape === 'rectangular') {
      const values = [width, height, area];
      const filledCount = values.filter(v => v !== '').length;
      
      if (filledCount < 2) {
        Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
        return;
      }

      if (filledCount === 3) {
        Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
        return;
      }

      // Area = Width × Height
      if (area === '') {
        if (width && height) {
          const w = parseFloat(width);
          const h = parseFloat(height);
          if (w <= 0 || h <= 0) {
            Alert.alert('Error', 'Width and height must be greater than zero');
            return;
          }
          const a = w * h;
          setArea(a.toFixed(2));
        }
      } else if (width === '') {
        if (area && height) {
          const a = parseFloat(area);
          const h = parseFloat(height);
          if (h <= 0) {
            Alert.alert('Error', 'Height must be greater than zero');
            return;
          }
          const w = a / h;
          setWidth(w.toFixed(2));
        }
      } else if (height === '') {
        if (area && width) {
          const a = parseFloat(area);
          const w = parseFloat(width);
          if (w <= 0) {
            Alert.alert('Error', 'Width must be greater than zero');
            return;
          }
          const h = a / w;
          setHeight(h.toFixed(2));
        }
      }
    } else {
      // Circular duct
      const values = [diameter, area];
      const filledCount = values.filter(v => v !== '').length;
      
      if (filledCount < 1) {
        Alert.alert('Error', 'Please fill in at least 1 value to calculate the missing one');
        return;
      }

      if (filledCount === 2) {
        Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
        return;
      }

      // Area = π × (Diameter/2)²
      if (area === '') {
        if (diameter) {
          const d = parseFloat(diameter);
          if (d <= 0) {
            Alert.alert('Error', 'Diameter must be greater than zero');
            return;
          }
          const a = Math.PI * Math.pow(d / 2, 2);
          setArea(a.toFixed(2));
        }
      } else if (diameter === '') {
        if (area) {
          const a = parseFloat(area);
          if (a <= 0) {
            Alert.alert('Error', 'Area must be greater than zero');
            return;
          }
          const d = Math.sqrt((a / Math.PI)) * 2;
          setDiameter(d.toFixed(2));
        }
      }
    }
  };

  const clearAll = () => {
    setWidth('');
    setHeight('');
    setDiameter('');
    setArea('');
  };

  const switchShape = () => {
    setShape(shape === 'rectangular' ? 'circular' : 'rectangular');
    clearAll();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: screenBackground }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Duct Area</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate duct cross-sectional area for rectangular or circular ducts
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formulas</Title>
              {shape === 'rectangular' ? (
                <>
                  <Text style={styles.formulaText}>Rectangular Duct:</Text>
                  <Text style={styles.formulaSubText}>Area = Width × Height</Text>
                </>
              ) : (
                <>
                  <Text style={styles.formulaText}>Circular Duct:</Text>
                  <Text style={styles.formulaSubText}>Area = π × (Diameter/2)²</Text>
                </>
              )}
              <Paragraph style={styles.formulaDescription}>
                Where: Area = Cross-sectional area (ft²), Width/Height = Duct dimensions (ft), Diameter = Duct diameter (ft)
              </Paragraph>
            </View>

            <View style={styles.shapeSelector}>
              <Button
                mode={shape === 'rectangular' ? 'contained' : 'outlined'}
                onPress={switchShape}
                style={styles.shapeButton}
                labelStyle={styles.shapeButtonLabel}
              >
                Rectangular
              </Button>
              <Button
                mode={shape === 'circular' ? 'contained' : 'outlined'}
                onPress={switchShape}
                style={styles.shapeButton}
                labelStyle={styles.shapeButtonLabel}
              >
                Circular
              </Button>
            </View>

            {shape === 'rectangular' ? (
              <>
                <View style={styles.inputRow}>
                  <TextInput
                    label="Width (ft)"
                    value={width}
                    onChangeText={setWidth}
                    keyboardType="numeric"
                    style={styles.input}
                    mode="outlined"
                  />
                </View>

                <View style={styles.inputRow}>
                  <TextInput
                    label="Height (ft)"
                    value={height}
                    onChangeText={setHeight}
                    keyboardType="numeric"
                    style={styles.input}
                    mode="outlined"
                  />
                </View>
              </>
            ) : (
              <View style={styles.inputRow}>
                <TextInput
                  label="Diameter (ft)"
                  value={diameter}
                  onChangeText={setDiameter}
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                />
              </View>
            )}

            <View style={styles.inputRow}>
              <TextInput
                label="Area (ft²)"
                value={area}
                onChangeText={setArea}
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

            {((shape === 'rectangular' && (width || height || area)) || (shape === 'circular' && (diameter || area))) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {shape === 'rectangular' && width && <Text style={styles.resultValue}>Width: {width} ft</Text>}
                {shape === 'rectangular' && height && <Text style={styles.resultValue}>Height: {height} ft</Text>}
                {shape === 'circular' && diameter && <Text style={styles.resultValue}>Diameter: {diameter} ft</Text>}
                {area && <Text style={styles.resultValue}>Area: {area} ft²</Text>}
              </View>
            )}
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 24,
  },
  header: {
    borderRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  headerGradient: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 24,
    borderRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#000000',
    opacity: 0.8,
  },
  section: {
    marginBottom: 20,
  },
  liquidCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardContent: {
    padding: 20,
  },
  formulaContainer: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  formulaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 8,
  },
  formulaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 4,
  },
  formulaSubText: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  formulaDescription: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.8,
    textAlign: 'center',
  },
  shapeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  shapeButton: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#22c55e',
  },
  shapeButtonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
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
    backgroundColor: '#22c55e',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    flex: 1,
    marginLeft: 8,
    borderColor: '#22c55e',
  },
  clearButtonLabel: {
    fontSize: 16,
    color: '#22c55e',
  },
  resultContainer: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
});

export default AirflowDuctAreaScreen;

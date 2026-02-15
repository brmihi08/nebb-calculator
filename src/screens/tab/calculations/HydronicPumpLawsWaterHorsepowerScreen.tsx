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

const HydronicPumpLawsWaterHorsepowerScreen = () => {
  const theme = useTheme();
  const [flowRate, setFlowRate] = useState('');
  const [head, setHead] = useState('');
  const [specificGravity, setSpecificGravity] = useState('');
  const [waterHorsepower, setWaterHorsepower] = useState('');

  const calculateMissingValue = () => {
    const values = [flowRate, head, specificGravity, waterHorsepower];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 3) {
      Alert.alert('Error', 'Please fill in at least 3 values to calculate the missing one');
      return;
    }

    if (filledCount === 4) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // WHP = (GPM × Head × SG) / 3960
    if (waterHorsepower === '') {
      if (flowRate && head && specificGravity) {
        const gpm = parseFloat(flowRate);
        const h = parseFloat(head);
        const sg = parseFloat(specificGravity);
        const whp = (gpm * h * sg) / 3960;
        setWaterHorsepower(whp.toFixed(3));
      }
    } else if (flowRate === '') {
      if (waterHorsepower && head && specificGravity) {
        const whp = parseFloat(waterHorsepower);
        const h = parseFloat(head);
        const sg = parseFloat(specificGravity);
        if (h === 0 || sg === 0) {
          Alert.alert('Error', 'Head and Specific Gravity cannot be zero');
          return;
        }
        const gpm = (whp * 3960) / (h * sg);
        setFlowRate(gpm.toFixed(2));
      }
    } else if (head === '') {
      if (waterHorsepower && flowRate && specificGravity) {
        const whp = parseFloat(waterHorsepower);
        const gpm = parseFloat(flowRate);
        const sg = parseFloat(specificGravity);
        if (gpm === 0 || sg === 0) {
          Alert.alert('Error', 'Flow Rate and Specific Gravity cannot be zero');
          return;
        }
        const h = (whp * 3960) / (gpm * sg);
        setHead(h.toFixed(2));
      }
    } else if (specificGravity === '') {
      if (waterHorsepower && flowRate && head) {
        const whp = parseFloat(waterHorsepower);
        const gpm = parseFloat(flowRate);
        const h = parseFloat(head);
        if (gpm === 0 || h === 0) {
          Alert.alert('Error', 'Flow Rate and Head cannot be zero');
          return;
        }
        const sg = (whp * 3960) / (gpm * h);
        setSpecificGravity(sg.toFixed(3));
      }
    }
  };

  const clearAll = () => {
    setFlowRate('');
    setHead('');
    setSpecificGravity('');
    setWaterHorsepower('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Water Horsepower</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate water horsepower for pump performance
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>WHP = (GPM × Head × SG) / 3960</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: WHP = Water Horsepower, GPM = Flow Rate, Head = Total Head (ft), SG = Specific Gravity
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Flow Rate (GPM)"
                value={flowRate}
                onChangeText={setFlowRate}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Total Head (ft)"
                value={head}
                onChangeText={setHead}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Specific Gravity"
                value={specificGravity}
                onChangeText={setSpecificGravity}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="1.0 for water"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Water Horsepower (HP)"
                value={waterHorsepower}
                onChangeText={setWaterHorsepower}
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

            {(flowRate || head || specificGravity || waterHorsepower) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {flowRate && <Text style={styles.resultValue}>Flow Rate: {flowRate} GPM</Text>}
                {head && <Text style={styles.resultValue}>Total Head: {head} ft</Text>}
                {specificGravity && <Text style={styles.resultValue}>Specific Gravity: {specificGravity}</Text>}
                {waterHorsepower && <Text style={styles.resultValue}>Water Horsepower: {waterHorsepower} HP</Text>}
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
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  formulaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 8,
  },
  formulaText: {
    fontSize: 24,
    fontWeight: 'bold',
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
    backgroundColor: '#3b82f6',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    flex: 1,
    marginLeft: 8,
    borderColor: '#3b82f6',
  },
  clearButtonLabel: {
    fontSize: 16,
    color: '#3b82f6',
  },
  resultContainer: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
});

export default HydronicPumpLawsWaterHorsepowerScreen;

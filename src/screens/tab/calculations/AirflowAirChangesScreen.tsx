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
import { triggerSuccessFeedback, triggerErrorFeedback } from '../../../utils/haptics';

const AirflowAirChangesScreen = () => {
  const theme = useTheme();
  const [flowRate, setFlowRate] = useState('');
  const [roomVolume, setRoomVolume] = useState('');
  const [airChanges, setAirChanges] = useState('');

  const calculateMissingValue = () => {
    const values = [flowRate, roomVolume, airChanges];
    const filledCount = values.filter(v => v !== '').length;
    
    if (filledCount < 2) {
      Alert.alert('Error', 'Please fill in at least 2 values to calculate the missing one');
      triggerErrorFeedback();
      return;
    }

    if (filledCount === 3) {
      Alert.alert('Info', 'All values are filled. Clear one value to calculate it.');
      return;
    }

    // Air Changes = (CFM × 60) / Room Volume
    if (airChanges === '') {
      if (flowRate && roomVolume) {
        const cfm = parseFloat(flowRate);
        const volume = parseFloat(roomVolume);
        if (volume <= 0) {
          Alert.alert('Error', 'Room volume must be greater than zero');
          return;
        }
        const ac = (cfm * 60) / volume;
        setAirChanges(ac.toFixed(2));
        triggerSuccessFeedback();
      }
    } else if (flowRate === '') {
      if (airChanges && roomVolume) {
        const ac = parseFloat(airChanges);
        const volume = parseFloat(roomVolume);
        const cfm = (ac * volume) / 60;
        setFlowRate(cfm.toFixed(1));
        triggerSuccessFeedback();
      }
    } else if (roomVolume === '') {
      if (flowRate && airChanges) {
        const cfm = parseFloat(flowRate);
        const ac = parseFloat(airChanges);
        if (ac <= 0) {
          Alert.alert('Error', 'Air changes must be greater than zero');
          triggerErrorFeedback();
          return;
        }
        const volume = (cfm * 60) / ac;
        setRoomVolume(volume.toFixed(1));
        triggerSuccessFeedback();
      }
    }
  };

  const clearAll = () => {
    setFlowRate('');
    setRoomVolume('');
    setAirChanges('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: screenBackground }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Air Changes</Title>
            <Paragraph style={styles.headerSubtitle}>
              Calculate air changes per hour for room ventilation
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <View style={styles.formulaContainer}>
              <Title style={styles.formulaTitle}>Formula</Title>
              <Text style={styles.formulaText}>ACH = (CFM × 60) / Volume</Text>
              <Paragraph style={styles.formulaDescription}>
                Where: ACH = Air Changes per Hour, CFM = Flow Rate, Volume = Room Volume (ft³)
              </Paragraph>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Flow Rate (CFM)"
                value={flowRate}
                onChangeText={setFlowRate}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </View>

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
                label="Air Changes per Hour"
                value={airChanges}
                onChangeText={setAirChanges}
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

            {(flowRate || roomVolume || airChanges) && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Current Values:</Text>
                {flowRate && <Text style={styles.resultValue}>Flow Rate: {flowRate} CFM</Text>}
                {roomVolume && <Text style={styles.resultValue}>Room Volume: {roomVolume} ft³</Text>}
                {airChanges && <Text style={styles.resultValue}>Air Changes: {airChanges} per hour</Text>}
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

export default AirflowAirChangesScreen;

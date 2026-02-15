import React, { useState, createContext, useContext, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  useTheme,
  Surface,
  Text,
  Switch,
  List,
  Divider,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DARK_MODE_KEY = 'nebb_calc_dark_mode';

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load saved preference
    AsyncStorage.getItem(DARK_MODE_KEY).then((value) => {
      if (value !== null) {
        setIsDarkMode(value === 'true');
      }
    });
  }, []);

  const toggleDarkMode = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    await AsyncStorage.setItem(DARK_MODE_KEY, String(newValue));
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const SettingsScreen = () => {
  const theme = useTheme();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [unitsImperial, setUnitsImperial] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [showFormulas, setShowFormulas] = useState(true);

  const handleUnitsChange = () => {
    setUnitsImperial(!unitsImperial);
    Alert.alert(
      'Units Changed',
      `Switched to ${unitsImperial ? 'Metric' : 'Imperial'} units`,
      [{ text: 'OK' }]
    );
  };

  const handleAutoSaveChange = () => {
    setAutoSave(!autoSave);
  };

  const handleShowFormulasChange = () => {
    setShowFormulas(!showFormulas);
  };

  const appInfo = {
    version: '1.0.0',
    build: '2024.01',
    developer: 'NEBB Calculator Team',
  };

  const nebbInfo = {
    organization: 'National Environmental Balancing Bureau',
    website: 'www.nebb.org',
    phone: '(301) 977-3698',
    email: 'info@nebb.org',
  };

  const features = [
    {
      title: 'Airflow Calculations',
      description: 'CFM, velocity, duct sizing',
      icon: 'airplane',
      status: 'Available',
    },
    {
      title: 'Pressure Calculations',
      description: 'Static, total, velocity pressure',
      icon: 'speedometer',
      status: 'Available',
    },
    {
      title: 'Temperature & Humidity',
      description: 'Psychrometric calculations',
      icon: 'thermometer',
      status: 'Available',
    },
    {
      title: 'Unit Conversions',
      description: 'Imperial to metric conversions',
      icon: 'swap-horizontal',
      status: 'Available',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={styles.header}>
        <Title style={styles.headerTitle}>Settings</Title>
        <Paragraph style={styles.headerSubtitle}>
          Configure your NEBB Calculator preferences
        </Paragraph>
      </Surface>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Preferences</Title>
        <Card style={styles.card}>
          <Card.Content>
            <List.Item
              title="Dark Mode"
              description={isDarkMode ? 'On' : 'Off'}
              left={(props) => <List.Icon {...props} icon="brightness-6" />}
              right={() => (
                <Switch
                  value={isDarkMode}
                  onValueChange={toggleDarkMode}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Units"
              description={unitsImperial ? 'Imperial (ft, in, °F)' : 'Metric (m, mm, °C)'}
              left={(props) => <List.Icon {...props} icon="ruler" />}
              right={() => (
                <Switch
                  value={unitsImperial}
                  onValueChange={handleUnitsChange}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Auto-save Calculations"
              description="Automatically save calculation history"
              left={(props) => <List.Icon {...props} icon="content-save" />}
              right={() => (
                <Switch
                  value={autoSave}
                  onValueChange={handleAutoSaveChange}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Show Formulas"
              description="Display formulas on calculation screens"
              left={(props) => <List.Icon {...props} icon="function-variant" />}
              right={() => (
                <Switch
                  value={showFormulas}
                  onValueChange={handleShowFormulasChange}
                />
              )}
            />
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Available Features</Title>
        {features.map((feature, index) => (
          <Card key={index} style={[styles.card, { marginBottom: 12 }]}>
            <Card.Content>
              <View style={styles.featureRow}>
                <View style={styles.featureIcon}>
                  <Ionicons name={feature.icon as any} size={24} color={theme.colors.primary} />
                </View>
                <View style={styles.featureContent}>
                  <Title style={styles.featureTitle}>{feature.title}</Title>
                  <Paragraph style={styles.featureDescription}>
                    {feature.description}
                  </Paragraph>
                </View>
                <View style={styles.featureStatus}>
                  <Text style={styles.statusText}>{feature.status}</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>NEBB Information</Title>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.nebbTitle}>{nebbInfo.organization}</Title>
            <View style={styles.contactRow}>
              <Ionicons name="globe" size={16} color={theme.colors.primary} />
              <Text style={styles.contactText}>{nebbInfo.website}</Text>
            </View>
            <View style={styles.contactRow}>
              <Ionicons name="call" size={16} color={theme.colors.primary} />
              <Text style={styles.contactText}>{nebbInfo.phone}</Text>
            </View>
            <View style={styles.contactRow}>
              <Ionicons name="mail" size={16} color={theme.colors.primary} />
              <Text style={styles.contactText}>{nebbInfo.email}</Text>
            </View>
            <Paragraph style={styles.nebbDescription}>
              NEBB is a non-profit organization that certifies firms and qualifies 
              technicians in the areas of testing, adjusting, and balancing (TAB) 
              of environmental systems.
            </Paragraph>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>App Information</Title>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Version:</Text>
              <Text style={styles.infoValue}>{appInfo.version}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Build:</Text>
              <Text style={styles.infoValue}>{appInfo.build}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Developer:</Text>
              <Text style={styles.infoValue}>{appInfo.developer}</Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Button
          mode="outlined"
          onPress={() => Alert.alert('About', 'NEBB Calculator v1.0.0\nProfessional tools for NEBB certified technicians')}
          style={styles.button}
          icon="information"
        >
          About
        </Button>
        <Button
          mode="outlined"
          onPress={() => Alert.alert('Help', 'For technical support, please contact your NEBB representative or visit www.nebb.org')}
          style={styles.button}
          icon="help-circle"
        >
          Help & Support
        </Button>
        <Button
          mode="outlined"
          onPress={() => Alert.alert('Privacy', 'This app does not collect or store personal data. All calculations are performed locally on your device.')}
          style={styles.button}
          icon="shield-check"
        >
          Privacy Policy
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    elevation: 2,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  featureStatus: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  nebbTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    marginLeft: 8,
  },
  nebbDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
    opacity: 0.8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  button: {
    marginBottom: 12,
  },
});

export default SettingsScreen;






















import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getActiveRoutePath } from './src/utils/navigation';
import { addRecentRoute } from './src/utils/recent';
import { Provider as PaperProvider, DefaultTheme, MD2DarkTheme as PaperDarkTheme } from 'react-native-paper';
import { DarkModeProvider, useDarkMode } from './src/screens/SettingsScreen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Import main screens
import HomeScreen from './src/screens/HomeScreen';
import RecentCalculationsScreen from './src/screens/RecentCalculationsScreen';

// Import TAB screens
import TABOverviewScreen from './src/screens/tab/TABOverviewScreen';
import TABAirScreen from './src/screens/tab/TABAirScreen';
import TABHydronicScreen from './src/screens/tab/TABHydronicScreen';
import TABElectricalScreen from './src/screens/tab/TABElectricalScreen';
import TABAirflowScreen from './src/screens/tab/TABAirflowScreen';
import TABPressureScreen from './src/screens/tab/TABPressureScreen';
import TABTemperatureScreen from './src/screens/tab/TABTemperatureScreen';
import TABFanAffinityScreen from './src/screens/tab/TABFanAffinityScreen';

// Import TAB calculation screens
import AirflowVolumetricFlowRateScreen from './src/screens/tab/calculations/AirflowVolumetricFlowRateScreen';
import AirflowTotalPressureScreen from './src/screens/tab/calculations/AirflowTotalPressureScreen';
import AirflowVelocityOfAirScreen from './src/screens/tab/calculations/AirflowVelocityOfAirScreen';
import AirflowAirChangesScreen from './src/screens/tab/calculations/AirflowAirChangesScreen';
import AirflowDuctAreaScreen from './src/screens/tab/calculations/AirflowDuctAreaScreen';
import AirflowHoodFaceVelocityScreen from './src/screens/tab/calculations/AirflowHoodFaceVelocityScreen';
import AirflowMixedAirTemperatureScreen from './src/screens/tab/calculations/AirflowMixedAirTemperatureScreen';
import AirflowPitotTraverseAveragingScreen from './src/screens/tab/calculations/AirflowPitotTraverseAveragingScreen';
import AirflowFlowHoodKFactorScreen from './src/screens/tab/calculations/AirflowFlowHoodKFactorScreen';
import AirflowDuctLeakageClassScreen from './src/screens/tab/calculations/AirflowDuctLeakageClassScreen';
import FanEquationsFanAffinityLawsScreen from './src/screens/tab/calculations/FanEquationsFanAffinityLawsScreen';
import FanEquationsTipSpeedScreen from './src/screens/tab/calculations/FanEquationsTipSpeedScreen';
import HydronicPumpLawsWaterHorsepowerScreen from './src/screens/tab/calculations/HydronicPumpLawsWaterHorsepowerScreen';
import HydronicPumpLawsBrakeHorsepowerScreen from './src/screens/tab/calculations/HydronicPumpLawsBrakeHorsepowerScreen';
import HydronicPumpEfficiencyScreen from './src/screens/tab/calculations/HydronicPumpEfficiencyScreen';
import ElectricalVoltsAmpsOhmsScreen from './src/screens/tab/calculations/ElectricalVoltsAmpsOhmsScreen';
import ElectricalPowerCalculationsScreen from './src/screens/tab/calculations/ElectricalPowerCalculationsScreen';
import ElectricalMotorFLAScreen from './src/screens/tab/calculations/ElectricalMotorFLAScreen';
import AirTemperatureOutsideAirPercentageScreen from './src/screens/tab/calculations/AirTemperatureOutsideAirPercentageScreen';
import AirTemperatureMixedAirEnthalpyScreen from './src/screens/tab/calculations/AirTemperatureMixedAirEnthalpyScreen';
// (removed broken Psychrometrics screen; use PsychrometricsDewPointEnthalpy instead)
import HeatTransferTotalHeatTransferScreen from './src/screens/tab/calculations/HeatTransferTotalHeatTransferScreen';
import HeatTransferSensibleHeatTransferScreen from './src/screens/tab/calculations/HeatTransferSensibleHeatTransferScreen';
import HeatTransferLatentHeatTransferScreen from './src/screens/tab/calculations/HeatTransferLatentHeatTransferScreen';
import HeatTransferSensibleHeatRatioScreen from './src/screens/tab/calculations/HeatTransferSensibleHeatRatioScreen';
import HydronicDeltaPCoilDeltaPScreen from './src/screens/tab/calculations/HydronicDeltaPCoilDeltaPScreen';
import HydronicDeltaPCvandGPMScreen from './src/screens/tab/calculations/HydronicDeltaPCvandGPMScreen';
import ElectricalMotorCalculationsFanHorsepowerScreen from './src/screens/tab/calculations/ElectricalMotorCalculationsFanHorsepowerScreen';
// (removed) import ToolsUnitConverterScreen from './src/screens/tab/calculations/ToolsUnitConverterScreen';
import DuctFrictionLossScreen from './src/screens/tab/calculations/DuctFrictionLossScreen';
import DuctFittingLossEquivalentLengthScreen from './src/screens/tab/calculations/AirflowFittingLossEquivalentLengthScreen';
import PsychrometricsDewPointEnthalpyScreen from './src/screens/tab/calculations/PsychrometricsDewPointEnthalpyScreen';
import PsychrometricsMixedAirScreen from './src/screens/tab/calculations/PsychrometricsMixedAirScreen';
import UnitConversionsScreen from './src/screens/tab/calculations/UnitConversionsScreen';
import FilterPressureDropScreen from './src/screens/tab/calculations/FilterPressureDropScreen';

// Import Cleanroom screens
import CleanroomOverviewScreen from './src/screens/CleanroomOverviewScreen';
import CleanroomAirChangesScreen from './src/screens/cleanroom/CleanroomAirChangesScreen';
import CleanroomParticleCountingScreen from './src/screens/cleanroom/CleanroomParticleCountingScreen';
import CleanroomEnvironmentalMonitoringScreen from './src/screens/cleanroom/CleanroomEnvironmentalMonitoringScreen';
import CleanroomClassificationsScreen from './src/screens/cleanroom/CleanroomClassificationsScreen';
import CleanroomFormulasScreen from './src/screens/cleanroom/CleanroomFormulasScreen';

// Import Fumehood screens
import FumehoodOverviewScreen from './src/screens/fumehood/FumehoodOverviewScreen';
import FumehoodTypesScreen from './src/screens/fumehood/FumehoodTypesScreen';
import FumehoodCalculationsScreen from './src/screens/fumehood/FumehoodCalculationsScreen';
import FumehoodFaceVelocityScreen from './src/screens/fumehood/calculations/FumehoodFaceVelocityScreen';
import FumehoodMultiPointAverageScreen from './src/screens/fumehood/calculations/FumehoodMultiPointAverageScreen';
import FumehoodFaceAreaScreen from './src/screens/fumehood/calculations/FumehoodFaceAreaScreen';
import FumehoodPressureDifferentialScreen from './src/screens/fumehood/calculations/FumehoodPressureDifferentialScreen';

// Import BET screens
import BETOverviewScreen from './src/screens/bet/BETOverviewScreen';
import BETProceduresScreen from './src/screens/bet/BETProceduresScreen';
import BETCalculationsScreen from './src/screens/bet/BETCalculationsScreen';
import BETPressurizationScreen from './src/screens/bet/calculations/BETPressurizationScreen';
import BETDepressurizationScreen from './src/screens/bet/calculations/BETDepressurizationScreen';
import BETAirLeakageRateScreen from './src/screens/bet/calculations/BETAirLeakageRateScreen';
import BETEffectiveLeakageAreaScreen from './src/screens/bet/calculations/BETEffectiveLeakageAreaScreen';
import BETAirChangesPerHourScreen from './src/screens/bet/calculations/BETAirChangesPerHourScreen';
import BETRegressionScreen from './src/screens/bet/calculations/BETRegressionScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom theme for NEBB branding
const nebbTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1976D2',
    accent: '#FF6B35',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#212121',
    error: '#D32F2F',
  },
};

// Dark theme
const nebbDarkTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: '#4FC3F7',
    accent: '#FF6B35',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    error: '#CF6679',
  },
};

// Theme wrapper component
function ThemedApp() {
  const { isDarkMode } = useDarkMode();
  const theme = isDarkMode ? nebbDarkTheme : nebbTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer
        onStateChange={(state) => {
          const path = getActiveRoutePath(state);
          const last = path[path.length - 1];
          if (!last || last === 'HomeMain' || last === 'RecentCalculations') return;
          void addRecentRoute({ path, title: last });
        }}
      >
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'TAB') {
                iconName = focused ? 'clipboard' : 'clipboard-outline';
              } else if (route.name === 'Cleanroom') {
                iconName = focused ? 'shield-checkmark' : 'shield-checkmark-outline';
              } else if (route.name === 'Fumehood') {
                iconName = focused ? 'flask' : 'flask-outline';
              } else if (route.name === 'BET') {
                iconName = 'business-outline';
              } else {
                iconName = 'help-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: theme.colors.surface,
              borderTopColor: isDarkMode ? '#333' : '#e0e0e0',
            },
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#fff',
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="TAB" component={TABStack} />
          <Tab.Screen name="Cleanroom" component={CleanroomStack} />
          <Tab.Screen name="Fumehood" component={FumehoodStack} />
          <Tab.Screen name="BET" component={BETStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

// Home Stack Navigator (lets Home push auxiliary screens like Recent)
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: nebbTheme.colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="RecentCalculations" component={RecentCalculationsScreen} options={{ title: 'Recent' }} />
    </Stack.Navigator>
  );
}

// TAB Stack Navigator
function TABStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: nebbTheme.colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="TABOverview" component={TABOverviewScreen} options={{ title: 'TAB Overview' }} />
      <Stack.Screen name="TABAir" component={TABAirScreen} options={{ title: 'Air Calculations' }} />
      <Stack.Screen name="TABHydronic" component={TABHydronicScreen} options={{ title: 'Hydronic Calculations' }} />
      <Stack.Screen name="TABElectrical" component={TABElectricalScreen} options={{ title: 'Electrical Calculations' }} />
      <Stack.Screen name="TABAirflow" component={TABAirflowScreen} options={{ title: 'Airflow Calculations' }} />
      <Stack.Screen name="TABPressure" component={TABPressureScreen} options={{ title: 'Pressure Calculations' }} />
      <Stack.Screen name="TABTemperature" component={TABTemperatureScreen} options={{ title: 'Temperature & Humidity' }} />
      <Stack.Screen name="TABFanAffinity" component={TABFanAffinityScreen} options={{ title: 'Fan Affinity Laws' }} />
      
      {/* Individual calculation screens */}
      <Stack.Screen name="AirflowVolumetricFlowRate" component={AirflowVolumetricFlowRateScreen} options={{ title: 'Volumetric Flow Rate' }} />
      <Stack.Screen name="AirflowTotalPressure" component={AirflowTotalPressureScreen} options={{ title: 'Total Pressure' }} />
      <Stack.Screen name="AirflowVelocityOfAir" component={AirflowVelocityOfAirScreen} options={{ title: 'Velocity of Air' }} />
      <Stack.Screen name="AirflowAirChanges" component={AirflowAirChangesScreen} options={{ title: 'Air Changes' }} />
      <Stack.Screen name="AirflowDuctArea" component={AirflowDuctAreaScreen} options={{ title: 'Duct Area' }} />
      <Stack.Screen name="AirflowHoodFaceVelocity" component={AirflowHoodFaceVelocityScreen} options={{ title: 'Hood Face Velocity' }} />
      <Stack.Screen name="AirflowMixedAirTemperature" component={AirflowMixedAirTemperatureScreen} options={{ title: 'Mixed Air Temperature' }} />
      <Stack.Screen name="AirflowPitotTraverseAveraging" component={AirflowPitotTraverseAveragingScreen} options={{ title: 'Pitot Traverse Averaging' }} />
      <Stack.Screen name="AirflowFlowHoodKFactor" component={AirflowFlowHoodKFactorScreen} options={{ title: 'Flow Hood K-Factor' }} />
      <Stack.Screen name="AirflowDuctLeakageClass" component={AirflowDuctLeakageClassScreen} options={{ title: 'Duct Leakage' }} />
      <Stack.Screen name="FanEquationsFanAffinityLaws" component={FanEquationsFanAffinityLawsScreen} options={{ title: 'Fan Affinity Laws' }} />
      <Stack.Screen name="FanEquationsTipSpeed" component={FanEquationsTipSpeedScreen} options={{ title: 'Tip Speed' }} />
      <Stack.Screen name="HydronicPumpLawsWaterHorsepower" component={HydronicPumpLawsWaterHorsepowerScreen} options={{ title: 'Water Horsepower' }} />
      <Stack.Screen name="HydronicPumpLawsBrakeHorsepower" component={HydronicPumpLawsBrakeHorsepowerScreen} options={{ title: 'Brake Horsepower' }} />
      <Stack.Screen name="HydronicPumpEfficiency" component={HydronicPumpEfficiencyScreen} options={{ title: 'Pump Efficiency' }} />
      <Stack.Screen name="ElectricalVoltsAmpsOhms" component={ElectricalVoltsAmpsOhmsScreen} options={{ title: 'Volts/Amps/Ohms' }} />
      <Stack.Screen name="ElectricalPowerPowerCalculations" component={ElectricalPowerCalculationsScreen} options={{ title: 'Power Calculations' }} />
      <Stack.Screen name="ElectricalMotorFLA" component={ElectricalMotorFLAScreen} options={{ title: 'Motor FLA' }} />
      <Stack.Screen name="AirTemperatureOutsideAirPercentage" component={AirTemperatureOutsideAirPercentageScreen} options={{ title: 'Outside Air Percentage' }} />
      <Stack.Screen name="AirTemperatureMixedAirEnthalpy" component={AirTemperatureMixedAirEnthalpyScreen} options={{ title: 'Mixed Air Enthalpy' }} />
      <Stack.Screen name="HeatTransferHeatTransferTotal" component={HeatTransferTotalHeatTransferScreen} options={{ title: 'Total Heat Transfer' }} />
      <Stack.Screen name="HeatTransferSensibleHeatTransfer" component={HeatTransferSensibleHeatTransferScreen} options={{ title: 'Sensible Heat Transfer' }} />
      <Stack.Screen name="HeatTransferLatentHeatTransfer" component={HeatTransferLatentHeatTransferScreen} options={{ title: 'Latent Heat Transfer' }} />
      <Stack.Screen name="HeatTransferSensibleHeatRatio" component={HeatTransferSensibleHeatRatioScreen} options={{ title: 'Sensible Heat Ratio' }} />
      <Stack.Screen name="HydronicDeltaPCoilDeltaP" component={HydronicDeltaPCoilDeltaPScreen} options={{ title: 'Coil Delta P' }} />
      <Stack.Screen name="HydronicDeltaPCvandGPM" component={HydronicDeltaPCvandGPMScreen} options={{ title: 'Cv and GPM' }} />
      <Stack.Screen name="ElectricalMotorCalculationsFanHorsepower" component={ElectricalMotorCalculationsFanHorsepowerScreen} options={{ title: 'Fan Horsepower' }} />

      {/* Ductwork */}
      <Stack.Screen name="DuctFrictionLoss" component={DuctFrictionLossScreen} options={{ title: 'Duct Friction Loss' }} />
      <Stack.Screen name="DuctFittingLossEquivalentLength" component={DuctFittingLossEquivalentLengthScreen} options={{ title: 'Fitting Loss & Equivalent Length' }} />

      {/* Psychrometrics */}
      <Stack.Screen name="PsychrometricsDewPointEnthalpy" component={PsychrometricsDewPointEnthalpyScreen} options={{ title: 'Psychrometrics (ASHRAE)' }} />
      <Stack.Screen name="PsychrometricsMixedAir" component={PsychrometricsMixedAirScreen} options={{ title: 'Mixed Air (Psychrometrics)' }} />

      {/* Tools */}
      <Stack.Screen name="UnitConversions" component={UnitConversionsScreen} options={{ title: 'Unit Conversions' }} />
      <Stack.Screen name="FilterPressureDrop" component={FilterPressureDropScreen} options={{ title: 'Filter Pressure Drop' }} />
    </Stack.Navigator>
  );
}

// Cleanroom Stack Navigator
function CleanroomStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: nebbTheme.colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="CleanroomOverview" component={CleanroomOverviewScreen} options={{ title: 'Cleanroom Testing' }} />
      <Stack.Screen name="CleanroomAirChanges" component={CleanroomAirChangesScreen} options={{ title: 'Air Changes' }} />
      <Stack.Screen name="CleanroomParticleCounting" component={CleanroomParticleCountingScreen} options={{ title: 'Particle Counting' }} />
      <Stack.Screen name="CleanroomClassifications" component={CleanroomClassificationsScreen} options={{ title: 'Classifications' }} />
      <Stack.Screen name="CleanroomEnvironmentalMonitoring" component={CleanroomEnvironmentalMonitoringScreen} options={{ title: 'Environmental Monitoring' }} />
      <Stack.Screen name="CleanroomFormulas" component={CleanroomFormulasScreen} options={{ title: 'Cleanroom Formulas' }} />
    </Stack.Navigator>
  );
}

// Fumehood Stack Navigator
function FumehoodStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: nebbTheme.colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="FumehoodOverview" component={FumehoodOverviewScreen} options={{ title: 'Fumehood Overview' }} />
      <Stack.Screen name="FumehoodTypes" component={FumehoodTypesScreen} options={{ title: 'Fumehood Types' }} />
      <Stack.Screen name="FumehoodCalculations" component={FumehoodCalculationsScreen} options={{ title: 'Calculations' }} />
      <Stack.Screen name="FumehoodFaceVelocity" component={FumehoodFaceVelocityScreen} options={{ title: 'Face Velocity & CFM' }} />
      <Stack.Screen name="FumehoodMultiPointAverage" component={FumehoodMultiPointAverageScreen} options={{ title: 'Multi-Point Average' }} />
      <Stack.Screen name="FumehoodFaceArea" component={FumehoodFaceAreaScreen} options={{ title: 'Face Area' }} />
      <Stack.Screen name="FumehoodPressureDifferential" component={FumehoodPressureDifferentialScreen} options={{ title: 'Pressure Differential' }} />
    </Stack.Navigator>
  );
}

// BET Stack Navigator
function BETStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: nebbTheme.colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="BETOverview" component={BETOverviewScreen} options={{ title: 'BET Overview' }} />
      <Stack.Screen name="BETProcedures" component={BETProceduresScreen} options={{ title: 'Procedures' }} />
      <Stack.Screen name="BETCalculations" component={BETCalculationsScreen} options={{ title: 'Calculations' }} />
      <Stack.Screen name="BETPressurization" component={BETPressurizationScreen} options={{ title: 'ASTM E779 Pressurization' }} />
      <Stack.Screen name="BETDepressurization" component={BETDepressurizationScreen} options={{ title: 'ASTM E1827 Depressurization' }} />
      <Stack.Screen name="BETRegression" component={BETRegressionScreen} options={{ title: 'Multi-Point Regression' }} />
      <Stack.Screen name="BETAirLeakageRate" component={BETAirLeakageRateScreen} options={{ title: 'Air Leakage Rate' }} />
      <Stack.Screen name="BETEffectiveLeakageArea" component={BETEffectiveLeakageAreaScreen} options={{ title: 'Effective Leakage Area' }} />
      <Stack.Screen name="BETAirChangesPerHour" component={BETAirChangesPerHourScreen} options={{ title: 'Air Changes Per Hour' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  console.log("App function entered");
  return (
    <SafeAreaProvider>
      <DarkModeProvider>
        <ThemedApp />
      </DarkModeProvider>
    </SafeAreaProvider>
  );
}

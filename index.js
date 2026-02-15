import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import App from './App';

// Import glass styles for web
if (typeof window !== 'undefined') {
  require('./src/theme/glass.css');
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);


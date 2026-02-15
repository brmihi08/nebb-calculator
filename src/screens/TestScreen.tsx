import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TestScreen = () => {
  // Log to console
  console.log('TestScreen is rendering!');

  // Alert on mount
  React.useEffect(() => {
    console.log('TestScreen mounted!');
    if (typeof window !== 'undefined') {
      alert('TEST SCREEN MOUNTED - React IS working!');
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>TEST SCREEN - If you see this, React is working!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF0000', // Bright red so we can see it
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: '100vh',
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFF00', // Yellow text
    textAlign: 'center',
    backgroundColor: '#0000FF', // Blue background on text
    padding: 20,
  },
});

export default TestScreen;

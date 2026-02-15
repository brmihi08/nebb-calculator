import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { rgbaFromHex } from './colors';

type ResultBlockProps = {
  accentColor: string;
  label?: string;
  children: React.ReactNode;
};

export function ResultBlock({ accentColor, label = 'Current Values:', children }: ResultBlockProps) {
  const bg = rgbaFromHex(accentColor, 0.1);
  const border = rgbaFromHex(accentColor, 0.2);

  return (
    <View style={[styles.container, { backgroundColor: bg, borderColor: border }]}>
      <Text style={[styles.label, { color: accentColor }]}>{label}</Text>
      {children}
    </View>
  );
}

export const resultTextStyles = StyleSheet.create({
  value: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

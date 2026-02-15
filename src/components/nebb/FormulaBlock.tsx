import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';
import { rgbaFromHex } from './colors';

type FormulaBlockProps = {
  accentColor: string;
  title?: string;
  children: React.ReactNode;
  description?: string;
};

export function FormulaBlock({ accentColor, title = 'Formula', children, description }: FormulaBlockProps) {
  const bg = rgbaFromHex(accentColor, 0.1);
  const border = rgbaFromHex(accentColor, 0.2);

  return (
    <View style={[styles.container, { backgroundColor: bg, borderColor: border }]}>
      <Title style={[styles.title, { color: accentColor }]}>{title}</Title>
      {children}
      {!!description && <Paragraph style={styles.description}>{description}</Paragraph>}
    </View>
  );
}

export const formulaTextStyles = StyleSheet.create({
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
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 8,
  },
});

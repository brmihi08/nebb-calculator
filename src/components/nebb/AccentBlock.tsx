import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';
import { rgbaFromHex } from './colors';

type AccentBlockProps = {
  title: string;
  accentColor: string;
  children: React.ReactNode;
  description?: string;
};

export function AccentBlock({ title, accentColor, children, description }: AccentBlockProps) {
  const bg = rgbaFromHex(accentColor, 0.1);
  const border = rgbaFromHex(accentColor, 0.2);

  return (
    <View style={[styles.container, { backgroundColor: bg, borderColor: border }]}>
      <Title style={[styles.title, { color: accentColor }]}>{title}</Title>
      <View style={styles.content}>{children}</View>
      {!!description && <Paragraph style={styles.description}>{description}</Paragraph>}
    </View>
  );
}

// Convenience text styles used across TAB calc blocks.
export const accentTextStyles = StyleSheet.create({
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
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
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
  content: {
    marginBottom: 0,
  },
  description: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 8,
  },
});

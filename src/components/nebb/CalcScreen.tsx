import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { Paragraph, Surface, Title } from 'react-native-paper';

type CalcScreenProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  backgroundColor?: string;
  contentContainerStyle?: ViewStyle;
};

export function CalcScreen({
  title,
  subtitle,
  children,
  backgroundColor = '#f0f8f0',
  contentContainerStyle,
}: CalcScreenProps) {
  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
    >
      <View style={styles.inner}>
        <CalcHeader title={title} subtitle={subtitle} />
        {children}
      </View>
    </ScrollView>
  );
}

type CalcHeaderProps = {
  title: string;
  subtitle?: string;
};

export function CalcHeader({ title, subtitle }: CalcHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <Surface style={styles.header}>
        <View style={styles.headerGradient}>
          <Title style={styles.headerTitle}>{title}</Title>
          {!!subtitle && <Paragraph style={styles.headerSubtitle}>{subtitle}</Paragraph>}
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  inner: {
    width: '100%',
    maxWidth: 980,
    alignSelf: 'center',
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
});

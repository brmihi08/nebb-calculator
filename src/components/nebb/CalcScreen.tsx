import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { Paragraph, Surface, Title, useTheme } from 'react-native-paper';

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
  backgroundColor,
  contentContainerStyle,
}: CalcScreenProps) {
  const theme = useTheme();
  const bg = backgroundColor ?? theme.colors.background;
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: bg }]}
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
  const theme = useTheme();
  return (
    <View style={styles.headerContainer}>
      <Surface style={[styles.header, { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.outline }]}>
        <View style={[styles.headerGradient, { backgroundColor: theme.colors.surface }]}>
          <Title style={[styles.headerTitle, { color: theme.colors.onSurface }]}>{title}</Title>
          {!!subtitle && <Paragraph style={[styles.headerSubtitle, { color: theme.colors.onSurfaceVariant }]}>{subtitle}</Paragraph>}
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
    padding: 24,
    borderRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
});

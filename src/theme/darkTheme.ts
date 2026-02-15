import { StyleSheet } from 'react-native';

/**
 * Unified Dark Theme for all Calculator Screens
 * Consistent colors, typography, and layout
 */

export const darkColors = {
  // Backgrounds
  background: '#0a0a0a',
  surface: '#1a1a1a',
  surfaceVariant: '#252525',

  // Text
  text: '#FFFFFF',
  textSecondary: '#999999',
  textTertiary: '#666666',

  // Borders
  border: '#333333',
  borderLight: '#222222',

  // Primary colors
  primary: '#007AFF',
  primaryLight: '#64B5F6',
  primaryDark: '#0051D5',

  // Status colors
  success: '#4CAF50',
  error: '#FF453A',
  warning: '#FF9F0A',
  info: '#2196F3',

  // Input
  inputBackground: '#252525',
  inputBorder: '#333333',
  inputText: '#FFFFFF',
  inputPlaceholder: '#666666',

  // Result highlight
  resultBackground: '#1a2634',
  resultBorder: '#007AFF40',
  resultText: '#64B5F6',
};

export const darkStyles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    backgroundColor: darkColors.background,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },

  // Cards
  card: {
    backgroundColor: darkColors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: darkColors.border,
  },

  cardHeader: {
    marginBottom: 16,
  },

  // Typography
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: darkColors.text,
    marginBottom: 8,
  },

  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: darkColors.text,
    marginBottom: 12,
  },

  subheading: {
    fontSize: 17,
    fontWeight: '600',
    color: darkColors.text,
    marginBottom: 8,
  },

  body: {
    fontSize: 16,
    color: darkColors.text,
    lineHeight: 24,
  },

  bodySecondary: {
    fontSize: 16,
    color: darkColors.textSecondary,
    lineHeight: 24,
  },

  caption: {
    fontSize: 13,
    color: darkColors.textTertiary,
    lineHeight: 18,
  },

  label: {
    fontSize: 15,
    fontWeight: '500',
    color: darkColors.textSecondary,
    marginBottom: 8,
  },

  // Input fields
  input: {
    backgroundColor: darkColors.inputBackground,
    borderWidth: 1,
    borderColor: darkColors.inputBorder,
    borderRadius: 12,
    padding: 14,
    fontSize: 17,
    color: darkColors.inputText,
    marginBottom: 16,
  },

  inputFocused: {
    borderColor: darkColors.primary,
    borderWidth: 2,
  },

  // Result display
  resultCard: {
    backgroundColor: darkColors.resultBackground,
    borderWidth: 1,
    borderColor: darkColors.resultBorder,
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    alignItems: 'center',
  },

  resultLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: darkColors.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },

  resultValue: {
    fontSize: 42,
    fontWeight: '700',
    color: darkColors.resultText,
    textAlign: 'center',
  },

  resultUnit: {
    fontSize: 20,
    fontWeight: '500',
    color: darkColors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },

  // Formula display
  formulaCard: {
    backgroundColor: '#1a1a2e',
    borderWidth: 1,
    borderColor: '#2a2a4e',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
  },

  formulaTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: darkColors.textSecondary,
    marginBottom: 8,
  },

  formulaText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#B794F6',
    fontFamily: 'monospace',
    lineHeight: 24,
  },

  // Buttons
  primaryButton: {
    backgroundColor: darkColors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginVertical: 8,
  },

  primaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: darkColors.border,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginVertical: 8,
  },

  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: darkColors.primary,
  },

  // Section divider
  divider: {
    height: 1,
    backgroundColor: darkColors.borderLight,
    marginVertical: 16,
  },

  // Info/warning boxes
  infoBox: {
    backgroundColor: '#1a2634',
    borderLeftWidth: 4,
    borderLeftColor: darkColors.info,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },

  warningBox: {
    backgroundColor: '#2e2416',
    borderLeftWidth: 4,
    borderLeftColor: darkColors.warning,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },

  errorBox: {
    backgroundColor: '#2e1616',
    borderLeftWidth: 4,
    borderLeftColor: darkColors.error,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },

  successBox: {
    backgroundColor: '#162e16',
    borderLeftWidth: 4,
    borderLeftColor: darkColors.success,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },

  // Row layout
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Flex helpers
  flex1: {
    flex: 1,
  },

  // Spacing helpers
  mt8: { marginTop: 8 },
  mt16: { marginTop: 16 },
  mt24: { marginTop: 24 },
  mb8: { marginBottom: 8 },
  mb16: { marginBottom: 16 },
  mb24: { marginBottom: 24 },

  // Center content
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Helper function to create custom result card with specific color
export const createResultStyle = (color: string) => ({
  ...darkStyles.resultCard,
  backgroundColor: `${color}15`,
  borderColor: `${color}40`,
});

// Helper function for colored text
export const createColoredText = (color: string) => ({
  color: color,
  fontSize: 16,
  fontWeight: '500' as const,
});

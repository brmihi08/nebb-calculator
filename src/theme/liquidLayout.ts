import { StyleSheet } from 'react-native';

/**
 * Shared "liquid" layout styles used across modules (TAB, BET, etc).
 *
 * Goal: keep visual layout consistent across screens.
 */
export const liquidLayout = {
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
    overflow: 'hidden' as const,
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
    fontWeight: 'bold' as const,
    color: '#000000',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#000000',
    opacity: 0.8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#000000',
    marginBottom: 16,
  },
  liquidCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardContent: {
    padding: 20,
  },
  cardHeaderRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  cardHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  categoryIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.7,
  },
} as const;

export const liquidCalcLayout = {
  inputRow: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  buttonContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginRight: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold' as const,
  },
  clearButton: {
    flex: 1,
    marginLeft: 8,
  },
  clearButtonLabel: {
    fontSize: 16,
  },
  resultContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  formulaContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
  },
  formulaTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    marginBottom: 8,
  },
  formulaText: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#000000',
    textAlign: 'center' as const,
    marginBottom: 4,
  },
  formulaSubText: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center' as const,
    marginBottom: 8,
  },
  formulaDescription: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.8,
    textAlign: 'center' as const,
  },
} as const;

/**
 * Helper to create an accent style set for calc screens.
 */
export const makeCalcAccentStyles = (accentColor: string) => ({
  formulaContainer: {
    backgroundColor: `${accentColor}1A`, // ~10% alpha
    borderColor: `${accentColor}33`,
  },
  formulaTitle: {
    color: accentColor,
  },
  button: {
    backgroundColor: accentColor,
  },
  clearButton: {
    borderColor: accentColor,
  },
  clearButtonLabel: {
    color: accentColor,
  },
  resultContainer: {
    backgroundColor: `${accentColor}1A`,
    borderColor: `${accentColor}33`,
  },
  resultLabel: {
    color: accentColor,
  },
});

export const createLiquidStyles = (extra: Record<string, any> = {}) => {
  return StyleSheet.create({
    ...liquidLayout,
    ...extra,
  });
};

import { StyleSheet } from 'react-native';

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace('#', '').trim();
  const full = normalized.length === 3
    ? normalized.split('').map((c) => c + c).join('')
    : normalized;
  const value = parseInt(full, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgba(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Baseline visual language used across TAB & Cleanroom screens.
 * Intentionally mirrors the existing TAB layout/typography.
 */
export const baseScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  liquidCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
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
});

export function makeCalculatorStyles(accentHex: string) {
  return StyleSheet.create({
    ...baseScreenStyles,

    formulaContainer: {
      backgroundColor: rgba(accentHex, 0.1),
      padding: 16,
      borderRadius: 12,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: rgba(accentHex, 0.2),
    },
    formulaTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: accentHex,
      marginBottom: 8,
    },
    formulaText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: 6,
    },
    formulaDescription: {
      fontSize: 14,
      color: '#000000',
      opacity: 0.8,
    },

    inputRow: {
      marginBottom: 16,
    },
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },

    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    button: {
      flex: 1,
      marginRight: 8,
      backgroundColor: accentHex,
    },
    buttonLabel: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    clearButton: {
      flex: 1,
      marginLeft: 8,
      borderColor: accentHex,
    },
    clearButtonLabel: {
      fontSize: 16,
      color: accentHex,
    },

    resultContainer: {
      backgroundColor: rgba(accentHex, 0.1),
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: rgba(accentHex, 0.2),
    },
    resultLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: accentHex,
      marginBottom: 8,
    },
    resultValue: {
      fontSize: 16,
      color: '#000000',
      marginBottom: 4,
    },

    noteContainer: {
      backgroundColor: 'rgba(0,0,0,0.04)',
      padding: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.06)',
    },
    noteTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 6,
      color: '#000000',
    },
    noteText: {
      fontSize: 13,
      color: '#000000',
      opacity: 0.75,
    },
  });
}

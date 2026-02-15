import { StyleSheet } from 'react-native';

export const LIQUID_BACKGROUND = '#f0f8f0';

/**
 * TAB-like "liquid" layout styles used across modules.
 * Kept intentionally aligned with existing TAB screens.
 */
export const createLiquidStyles = (accentColor: string = '#22c55e') =>
  StyleSheet.create({
    // Screen
    container: {
      flex: 1,
      padding: 16,
    },

    // Header
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

    // Sections + cards
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
    cardPressed: {
      opacity: 0.8,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
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
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    cardDescription: {
      fontSize: 14,
      color: '#000000',
      opacity: 0.7,
    },
    featuresContainer: {
      marginBottom: 16,
      marginLeft: 48,
    },
    featureText: {
      fontSize: 14,
      color: '#000000',
      opacity: 0.8,
      marginBottom: 4,
    },
    navigationButton: {
      alignItems: 'center',
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: 'rgba(0, 0, 0, 0.1)',
    },
    navigationText: {
      fontSize: 16,
      fontWeight: '600',
    },

    // List-style navigation items (TABAirScreen pattern)
    calculationsContainer: {
      gap: 8,
    },
    calculationItem: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.05)',
    },
    calculationContent: {
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    calculationText: {
      fontSize: 16,
      color: '#000000',
      fontWeight: '500',
    },
    calculationArrow: {
      fontSize: 18,
      fontWeight: 'bold',
    },

    // Calculator layout (TAB calculation screens pattern)
    formulaContainer: {
      backgroundColor: `rgba(34, 197, 94, 0.1)`,
      padding: 16,
      borderRadius: 12,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: `rgba(34, 197, 94, 0.2)`,
    },
    formulaTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: accentColor,
      marginBottom: 8,
    },
    formulaText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: 8,
    },
    formulaSubText: {
      fontSize: 14,
      color: '#000000',
      textAlign: 'center',
      marginBottom: 8,
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
      backgroundColor: accentColor,
    },
    buttonLabel: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    clearButton: {
      flex: 1,
      marginLeft: 8,
      borderColor: accentColor,
    },
    clearButtonLabel: {
      fontSize: 16,
      color: accentColor,
    },
    resultContainer: {
      backgroundColor: `rgba(34, 197, 94, 0.1)`,
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: `rgba(34, 197, 94, 0.2)`,
    },
    resultLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: accentColor,
      marginBottom: 8,
    },
    resultValue: {
      fontSize: 16,
      color: '#000000',
      marginBottom: 4,
    },
  });

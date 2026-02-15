// This file contains the theme application logic for all screens
// The theme includes green and white color scheme with black text

export const applyNEBBTheme = {
  // Background color for all screens
  backgroundColor: '#f0f8f0',
  
  // Header styles
  header: {
    marginBottom: 20,
    borderRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    overflow: 'hidden',
  },
  
  headerGradient: {
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(20px)',
  },
  
  // Typography styles
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    color: '#000000',
    letterSpacing: -0.5,
  },
  
  headerSubtitle: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.8,
    color: '#000000',
    lineHeight: 22,
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
    letterSpacing: -0.3,
  },
  
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000000',
  },
  
  cardDescription: {
    fontSize: 14,
    opacity: 0.8,
    color: '#000000',
  },
  
  // Card styles
  liquidCard: {
    borderRadius: 20,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  cardContent: {
    padding: 20,
  },
  
  // Formula container styles
  formulaContainer: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.15)',
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
  },
  
  formulaTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000000',
  },
  
  formulaText: {
    fontSize: 16,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    color: '#22c55e',
    fontWeight: '500',
  },
  
  formulaDescription: {
    fontSize: 14,
    opacity: 0.8,
    color: '#000000',
    lineHeight: 20,
  },
  
  // Input styles
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  
  input: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
  },
  
  // Button styles
  button: {
    marginBottom: 20,
    borderRadius: 16,
    paddingVertical: 8,
    backgroundColor: '#22c55e',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  clearButton: {
    marginTop: 24,
    marginBottom: 40,
    borderRadius: 16,
    borderColor: '#22c55e',
    borderWidth: 2,
  },
  
  // Result container styles
  resultContainer: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  resultLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  
  resultValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#22c55e',
  },
  
  // Text styles
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    color: '#000000',
  },
};

export default applyNEBBTheme;






















import { StyleSheet, Platform } from 'react-native';

/**
 * Apple Glass Design System - Glassmorphism Styles
 * Inspired by iOS design language with frosted glass effects
 */

export const glassColors = {
  // Backgrounds
  background: '#000000',
  backgroundSecondary: '#0A0A0A',

  // Glass surfaces
  glassSurface: 'rgba(28, 28, 30, 0.72)',
  glassCard: 'rgba(44, 44, 46, 0.85)',
  glassCardHover: 'rgba(58, 58, 60, 0.9)',

  // Apple system colors
  appleBlue: '#007AFF',
  applePurple: '#5E5CE6',
  appleGreen: '#30D158',
  appleRed: '#FF453A',
  appleOrange: '#FF9F0A',
  appleYellow: '#FFD60A',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.6)',
  textTertiary: 'rgba(255, 255, 255, 0.4)',

  // Borders
  border: 'rgba(255, 255, 255, 0.15)',
  borderLight: 'rgba(255, 255, 255, 0.08)',
};

export const glassStyles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: glassColors.background,
  },

  // Glass card with blur effect
  glassCard: {
    backgroundColor: glassColors.glassCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: glassColors.border,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  // Glass surface (lighter, for backgrounds)
  glassSurface: {
    backgroundColor: glassColors.glassSurface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: glassColors.borderLight,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(30px) saturate(150%)',
        WebkitBackdropFilter: 'blur(30px) saturate(150%)',
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  // Input field with glass effect
  glassInput: {
    backgroundColor: 'rgba(58, 58, 60, 0.6)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: glassColors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: glassColors.textPrimary,
    fontSize: 17,
    fontWeight: '400',
  },

  // Button styles
  glassPrimaryButton: {
    backgroundColor: glassColors.appleBlue,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: glassColors.appleBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  glassSecondaryButton: {
    backgroundColor: 'rgba(0, 122, 255, 0.15)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Text styles
  glassTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: glassColors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 8,
  },

  glassHeading: {
    fontSize: 28,
    fontWeight: '600',
    color: glassColors.textPrimary,
    letterSpacing: -0.3,
    marginBottom: 8,
  },

  glassSubheading: {
    fontSize: 20,
    fontWeight: '600',
    color: glassColors.textPrimary,
    letterSpacing: -0.2,
    marginBottom: 4,
  },

  glassBody: {
    fontSize: 17,
    fontWeight: '400',
    color: glassColors.textPrimary,
    lineHeight: 24,
  },

  glassBodySecondary: {
    fontSize: 17,
    fontWeight: '400',
    color: glassColors.textSecondary,
    lineHeight: 24,
  },

  glassCaption: {
    fontSize: 13,
    fontWeight: '400',
    color: glassColors.textTertiary,
    lineHeight: 18,
  },

  // Result display
  glassResult: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
    padding: 16,
    marginTop: 16,
  },

  glassResultValue: {
    fontSize: 48,
    fontWeight: '700',
    color: glassColors.appleBlue,
    textAlign: 'center',
    letterSpacing: -1,
  },

  glassResultLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: glassColors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },

  // Divider
  glassDivider: {
    height: 1,
    backgroundColor: glassColors.borderLight,
    marginVertical: 16,
  },

  // Formula display
  glassFormula: {
    backgroundColor: 'rgba(94, 92, 230, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(94, 92, 230, 0.3)',
    padding: 16,
    marginVertical: 12,
  },

  glassFormulaText: {
    fontSize: 16,
    fontWeight: '500',
    color: glassColors.applePurple,
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      web: 'Monaco, Consolas, monospace',
    }),
  },

  // Navigation card
  glassNavCard: {
    backgroundColor: glassColors.glassSurface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: glassColors.border,
    padding: 20,
    marginBottom: 12,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  // Badge/Chip
  glassBadge: {
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.4)',
  },

  glassBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: glassColors.appleBlue,
  },

  // Status indicators
  glassSuccess: {
    color: glassColors.appleGreen,
  },

  glassError: {
    color: glassColors.appleRed,
  },

  glassWarning: {
    color: glassColors.appleOrange,
  },
});

// Spacing system
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

// Typography scale
export const typography = {
  largeTitle: { fontSize: 34, fontWeight: '700', letterSpacing: -0.5 },
  title1: { fontSize: 28, fontWeight: '600', letterSpacing: -0.3 },
  title2: { fontSize: 22, fontWeight: '600', letterSpacing: -0.2 },
  title3: { fontSize: 20, fontWeight: '600', letterSpacing: -0.2 },
  headline: { fontSize: 17, fontWeight: '600' },
  body: { fontSize: 17, fontWeight: '400' },
  callout: { fontSize: 16, fontWeight: '400' },
  subheadline: { fontSize: 15, fontWeight: '400' },
  footnote: { fontSize: 13, fontWeight: '400' },
  caption1: { fontSize: 12, fontWeight: '400' },
  caption2: { fontSize: 11, fontWeight: '400' },
};

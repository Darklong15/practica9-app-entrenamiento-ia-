export const colors = {
  background: '#0A0A0B',
  surface: '#141416',
  surfaceElevated: '#1C1C1F',
  primary: '#C3FF36', // Verde Lima Volt
  primaryMuted: '#2B3B15',
  textPrimary: '#F0F0F2',
  textSecondary: '#A0A0A5',
  textMuted: '#66666A',
  border: '#262629',
  success: '#34C759',
  error: '#FF453A',
  warning: '#FF9F0A',
};

export const typography = {
  fonts: {
    inter: {
      regular: 'Inter_400Regular',
      medium: 'Inter_500Medium',
      semiBold: 'Inter_600SemiBold',
      bold: 'Inter_700Bold',
    },
    bebas: {
      regular: 'BebasNeue_400Regular',
    },
  },
  styles: {
    displayLg: {
      fontFamily: 'BebasNeue_400Regular',
      fontSize: 48,
      lineHeight: 56,
      letterSpacing: 1,
    },
    displayMd: {
      fontFamily: 'BebasNeue_400Regular',
      fontSize: 36,
      lineHeight: 44,
      letterSpacing: 1,
    },
    h1: {
      fontFamily: 'Inter_700Bold',
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: -0.5,
    },
    h2: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 20,
      lineHeight: 28,
      letterSpacing: -0.3,
    },
    h3: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 18,
      lineHeight: 24,
      letterSpacing: -0.2,
    },
    bodyLg: {
      fontFamily: 'Inter_400Regular',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
    },
    body: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },
    caption: {
      fontFamily: 'Inter_500Medium',
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.2,
    },
    label: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 10,
      lineHeight: 12,
      letterSpacing: 0.5,
      textTransform: 'uppercase' as const,
    },
    stat: {
      fontFamily: 'BebasNeue_400Regular',
      fontSize: 28,
      lineHeight: 32,
      letterSpacing: 1,
    },
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 20,
  full: 999,
};

export const elevation = {
  level0: {
    backgroundColor: colors.background,
  },
  level1: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
  },
  level2: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderWidth: 1,
  },
};

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  elevation,
};

export type Theme = typeof theme;

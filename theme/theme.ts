export const colors = {
  primary: '#7C3AED', // Vibrant purple
  secondary: '#EC4899', // Pink
  background: '#F8FAFC', // Light gray background
  surface: '#FFFFFF',
  surfaceVariant: '#F1F5F9', // Subtle gray for cards
  text: {
    primary: '#1E293B', // Slate 800
    secondary: '#64748B', // Slate 500
    inverse: '#FFFFFF',
    accent: '#7C3AED', // Same as primary
  },
  border: '#E2E8F0',
  success: '#10B981', // Emerald
  error: '#EF4444', // Red
  warning: '#F59E0B', // Amber
  info: '#3B82F6', // Blue
  gradient: {
    primary: ['#7C3AED', '#9333EA'], // Purple gradient
    secondary: ['#EC4899', '#DB2777'], // Pink gradient
  },
  states: {
    pressed: 'rgba(0, 0, 0, 0.05)',
    hovered: 'rgba(0, 0, 0, 0.02)',
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
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  families: {
    base: undefined, // System default
    heading: undefined, // System default
  }
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const layout = {
  containerPadding: spacing.md,
  maxContentWidth: 1200,
};

export const iconSizes = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
}; 
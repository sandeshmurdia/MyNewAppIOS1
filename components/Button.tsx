import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, spacing } from '../theme/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const getContainerStyle = () => {
    const baseStyle: ViewStyle = {
      opacity: disabled ? 0.6 : 1,
      width: fullWidth ? '100%' : 'auto',
    };

    return [
      baseStyle,
      styles.container,
      styles[`container${size}`],
      styles[`container${variant}`],
      style,
    ];
  };

  const content = (
    <>
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? colors.text.inverse : colors.primary} 
          size={size === 'small' ? 'small' : 'small'}
        />
      ) : (
        <Text style={[
          styles.text,
          styles[`text${size}`],
          styles[`text${variant}`],
          textStyle,
        ]}>
          {title}
        </Text>
      )}
    </>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={getContainerStyle()}
      activeOpacity={0.8}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  containersmall: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    minWidth: 80,
  },
  containermedium: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minWidth: 120,
  },
  containerlarge: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    minWidth: 160,
  },
  containerprimary: {
    backgroundColor: colors.primary,
  },
  containersecondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  containeroutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  containerghost: {
    backgroundColor: 'transparent',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  textsmall: {
    fontSize: typography.sizes.sm,
  },
  textmedium: {
    fontSize: typography.sizes.md,
  },
  textlarge: {
    fontSize: typography.sizes.lg,
  },
  textprimary: {
    color: colors.text.inverse,
  },
  textsecondary: {
    color: colors.primary,
  },
  textoutline: {
    color: colors.text.primary,
  },
  textghost: {
    color: colors.primary,
  },
});

export default Button; 
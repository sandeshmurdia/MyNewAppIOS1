import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { colors, typography, spacing, iconSizes } from '../theme/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  icon?: string;
  iconPosition?: 'left' | 'right';
  iconColor?: string;
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
  icon,
  iconPosition = 'left',
  iconColor,
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

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return iconSizes.sm;
      case 'large':
        return iconSizes.md;
      default:
        return iconSizes.sm;
    }
  };

  const getIconColor = () => {
    if (iconColor) return iconColor;
    return variant === 'primary' ? colors.text.inverse : colors.primary;
  };

  const renderIcon = () => {
    if (!icon) return null;
    return (
      <Icon
        name={icon}
        size={getIconSize()}
        color={getIconColor()}
        style={[
          iconPosition === 'left' ? styles.iconLeft : styles.iconRight,
          styles.icon
        ]}
      />
    );
  };

  const content = (
    <>
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.text.inverse : colors.primary}
          size={size === 'small' ? 'small' : 'small'}
        />
      ) : (
        <View style={styles.contentContainer}>
          {iconPosition === 'left' && renderIcon()}
          <Text
            style={[
              styles.text,
              styles[`text${size}`],
              styles[`text${variant}`],
              icon ? styles.textWithIcon : null,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {iconPosition === 'right' && renderIcon()}
        </View>
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
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  textWithIcon: {
    marginHorizontal: spacing.xs,
  },
  icon: {
    opacity: 0.9,
  },
  iconLeft: {
    marginRight: spacing.xs,
  },
  iconRight: {
    marginLeft: spacing.xs,
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
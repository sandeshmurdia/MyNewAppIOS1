import React, { useRef, useEffect, useContext } from 'react';
import { View, Text, Switch, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, typography, spacing, shadows } from '../theme/theme';

interface SettingOption {
  title: string;
  icon: string;
  iconColor: string;
  type: 'switch' | 'button';
  action?: () => void;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
}

const SettingsScreen: React.FC<{ handleLogout: () => void }> = ({ handleLogout }) => {
  const { toggleTheme, isDarkTheme } = useContext(ThemeContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isEnabled, setIsEnabled] = React.useState(isDarkTheme);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const toggleSwitch = () => {
    toggleTheme();
    setIsEnabled(!isEnabled);
  };

  const settingOptions: SettingOption[] = [
    {
      title: 'Dark Mode',
      icon: 'theme-light-dark',
      iconColor: '#6366F1',
      type: 'switch',
      value: isEnabled,
      onValueChange: toggleSwitch,
    },
    {
      title: 'Notifications',
      icon: 'bell-outline',
      iconColor: '#F59E0B',
      type: 'switch',
      value: true,
      onValueChange: () => {},
    },
    {
      title: 'Privacy',
      icon: 'shield-check-outline',
      iconColor: '#10B981',
      type: 'button',
      action: () => navigation.navigate('Privacy' as never),
    },
    {
      title: 'Help & Support',
      icon: 'help-circle-outline',
      iconColor: '#3B82F6',
      type: 'button',
      action: () => navigation.navigate('Support' as never),
    },
  ];

  const renderSettingOption = (option: SettingOption) => (
    <TouchableOpacity
      key={option.title}
      style={styles.settingOption}
      onPress={option.type === 'button' ? option.action : undefined}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: `${option.iconColor}15` }]}>
          <Icon name={option.icon} size={24} color={option.iconColor} />
        </View>
        <Text style={styles.optionText}>{option.title}</Text>
      </View>
      {option.type === 'switch' ? (
        <Switch
          trackColor={{ false: colors.border, true: `${option.iconColor}50` }}
          thumbColor={option.value ? option.iconColor : '#f4f3f4'}
          onValueChange={option.onValueChange}
          value={option.value}
        />
      ) : (
        <Icon name="chevron-right" size={24} color={colors.text.secondary} style={styles.chevron} />
      )}
    </TouchableOpacity>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your app preferences</Text>
      </View>

      <View style={styles.settingsContainer}>
        {settingOptions.map(renderSettingOption)}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={24} color={colors.error} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
  },
  settingsContainer: {
    padding: spacing.lg,
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  optionText: {
    fontSize: typography.sizes.md,
    color: colors.text.primary,
    fontWeight: typography.weights.medium,
  },
  chevron: {
    opacity: 0.5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    marginTop: 'auto',
    marginBottom: spacing.lg,
    marginHorizontal: spacing.lg,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  logoutText: {
    marginLeft: spacing.md,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.error,
  },
});

export default SettingsScreen;

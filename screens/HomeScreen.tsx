import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, shadows, iconSizes } from '../theme/theme';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface MenuItem {
  title: string;
  screen: string;
  description: string;
  icon: string;
  iconColor?: string;
  bgColor?: string;
}

const menuItems: MenuItem[] = [
  {
    title: 'Profile',
    screen: 'Profile',
    description: 'View and edit your profile information',
    icon: 'account-circle-outline',
    iconColor: '#7C3AED', // Purple
    bgColor: '#F3E8FF',
  },
  {
    title: 'API Testing',
    screen: 'Api',
    description: 'Test and monitor API endpoints',
    icon: 'api',
    iconColor: '#2563EB', // Blue
    bgColor: '#EFF6FF',
  },
  {
    title: 'Logs',
    screen: 'Logs',
    description: 'View system logs and debugging information',
    icon: 'text-box-search-outline',
    iconColor: '#059669', // Green
    bgColor: '#ECFDF5',
  },
  {
    title: 'Error Handling',
    screen: 'Errors',
    description: 'Test error handling and crash reporting',
    icon: 'shield-alert-outline',
    iconColor: '#DC2626', // Red
    bgColor: '#FEF2F2',
  },
  {
    title: 'Settings',
    screen: 'Settings',
    description: 'Configure app settings and preferences',
    icon: 'cog-outline',
    iconColor: '#6B7280', // Gray
    bgColor: '#F3F4F6',
  },
  {
    title: 'About',
    screen: 'About',
    description: 'Learn more about the app',
    icon: 'information-outline',
    iconColor: '#0891B2', // Cyan
    bgColor: '#ECFEFF',
  },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.screen}
      style={styles.menuItem}
      onPress={() => navigation.navigate(item.screen as never)}
      activeOpacity={0.7}
    >
      <View style={[styles.menuIconContainer, { backgroundColor: item.bgColor }]}>
        <Icon name={item.icon} size={iconSizes.lg} color={item.iconColor} />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuDescription}>{item.description}</Text>
      </View>
      <View style={styles.chevronContainer}>
        <Icon 
          name="chevron-right" 
          size={iconSizes.md} 
          color={colors.text.secondary}
          style={styles.chevronIcon}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Welcome to your testing dashboard</Text>
        </View>

        <View style={styles.menuGrid}>
          {menuItems.map(renderMenuItem)}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl + 60,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
  },
  menuGrid: {
    gap: spacing.md,
  },
  menuItem: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  menuTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  menuDescription: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  chevronContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronIcon: {
    opacity: 0.5,
  },
});

export default HomeScreen;

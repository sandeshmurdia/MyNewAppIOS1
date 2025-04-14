import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, shadows } from '../theme/theme';
import Button from '../components/Button';

interface MenuItem {
  title: string;
  screen: string;
  description: string;
}

const menuItems: MenuItem[] = [
  {
    title: 'Profile',
    screen: 'Profile',
    description: 'View and edit your profile information',
  },
  {
    title: 'API Testing',
    screen: 'Api',
    description: 'Test and monitor API endpoints',
  },
  {
    title: 'Logs',
    screen: 'Logs',
    description: 'View system logs and debugging information',
  },
  {
    title: 'Error Handling',
    screen: 'Errors',
    description: 'Test error handling and crash reporting',
  },
  {
    title: 'Settings',
    screen: 'Settings',
    description: 'Configure app settings and preferences',
  },
  {
    title: 'About',
    screen: 'About',
    description: 'Learn more about the app',
  },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.screen}
      style={styles.menuItem}
      onPress={() => navigation.navigate(item.screen as never)}
    >
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuDescription}>{item.description}</Text>
      </View>
      <Button
        title="Open"
        variant="ghost"
        size="small"
        onPress={() => navigation.navigate(item.screen as never)}
      />
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
    fontWeight: '700',
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
    borderRadius: 12,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.sm,
  },
  menuContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  menuTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  menuDescription: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
  },
});

export default HomeScreen;

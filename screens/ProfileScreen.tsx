import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { colors, typography, spacing, shadows, borderRadius } from '../theme/theme';
import Button from '../components/Button';
import Input from '../components/Input';

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [bio, setBio] = useState('Software Developer & Testing Enthusiast');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the changes to a backend
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://ui-avatars.com/api/?name=' + name.replace(' ', '+') }}
            style={styles.avatar}
          />
          <View style={styles.avatarOverlay}>
            <Button
              title="Change"
              variant="ghost"
              size="small"
              onPress={() => {}}
            />
          </View>
        </View>
      </View>

      <View style={styles.card}>
        {isEditing ? (
          <>
            <Input
              label="Name"
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
            <Input
              label="Bio"
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about yourself"
              multiline
              numberOfLines={3}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => setIsEditing(false)}
                style={styles.button}
              />
              <Button
                title="Save"
                variant="primary"
                onPress={handleSave}
                style={styles.button}
                gradient
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.infoSection}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{name}</Text>
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{email}</Text>
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.label}>Bio</Text>
              <Text style={styles.value}>{bio}</Text>
            </View>
            <Button
              title="Edit Profile"
              variant="primary"
              onPress={() => setIsEditing(true)}
              gradient
              fullWidth
            />
          </>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <Button
          title="Change Password"
          variant="outline"
          onPress={() => {}}
          fullWidth
          style={styles.settingButton}
        />
        <Button
          title="Privacy Settings"
          variant="outline"
          onPress={() => {}}
          fullWidth
          style={styles.settingButton}
        />
        <Button
          title="Notification Preferences"
          variant="outline"
          onPress={() => {}}
          fullWidth
          style={styles.settingButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl + 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
  },
  avatarOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    ...shadows.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  infoSection: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: typography.sizes.md,
    color: colors.text.primary,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  button: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  settingButton: {
    marginBottom: spacing.md,
  },
});

export default ProfileScreen;

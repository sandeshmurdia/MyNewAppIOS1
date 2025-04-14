import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, Animated, StyleSheet, ScrollView } from 'react-native';
import { ApiKeyContext } from '../App';
import Input from '../components/Input';
import Button from '../components/Button';
import { colors, typography, spacing, shadows } from '../theme/theme';

const LoginScreen: React.FC<{ 
  handleLogin: (email: string, password: string, lastname: string, username: string, customerName: string) => void 
}> = ({ handleLogin }) => {
  const { apiKey, setApiKey } = useContext(ApiKeyContext);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [customername, setCustomername] = useState('');

  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.spring(translateAnim, {
      toValue: 0,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, translateAnim]);

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setShowLoginForm(true);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.gradientOverlay,
          { opacity: fadeAnim }
        ]} 
      />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.formContainer,
            {
              transform: [{ translateY: translateAnim }],
              opacity: fadeAnim,
            },
          ]}
        >
          {!showLoginForm ? (
            <>
              <Text style={styles.title}>Welcome</Text>
              <Text style={styles.subtitle}>Enter your API key to get started</Text>
              <Input
                label="API Key"
                value={apiKey}
                onChangeText={setApiKey}
                placeholder="Enter your API key"
                secureTextEntry
              />
              <Button
                title="Continue"
                onPress={handleApiKeySubmit}
                variant="primary"
                gradient
                fullWidth
              />
            </>
          ) : (
            <>
              <Text style={styles.title}>Sign In</Text>
              <Text style={styles.subtitle}>Fill in your details to continue</Text>
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
              <Input
                label="First Name"
                value={firstname}
                onChangeText={setFirstname}
                placeholder="Enter your first name"
              />
              <Input
                label="Last Name"
                value={lastname}
                onChangeText={setLastname}
                placeholder="Enter your last name"
              />
              <Input
                label="Username"
                value={username}
                onChangeText={setUsername}
                placeholder="Choose a username"
              />
              <Input
                label="Customer Name"
                value={customername}
                onChangeText={setCustomername}
                placeholder="Enter customer name"
              />
              <Button
                title="Sign In"
                onPress={() => handleLogin(email, firstname, lastname, username, customername)}
                variant="primary"
                gradient
                fullWidth
              />
            </>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.xl,
    paddingBottom: spacing.xxl + 60, // Extra padding for session controls
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primary,
    opacity: 0.05,
  },
  formContainer: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.xl,
    width: '100%',
    ...shadows.lg,
  },
  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
});

export default LoginScreen;

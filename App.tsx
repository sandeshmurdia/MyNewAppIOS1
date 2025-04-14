import React, { useEffect, useState, createContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import AboutScreen from './screens/AboutScreen';
import ApiScreen from './screens/ApiScreen';
import LogScreen from './screens/LogScreen';
import ErrorHandlingScreen from './screens/ErrorHandlingScreen';
import LoginScreen from './screens/LoginScreen';
import zipy, { ScreenNavigation } from 'zipy-react-native';
import withSessionControls from './components/withSessionControls';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Profile: { name: string };
  Settings: undefined;
  About: undefined;
  Api: undefined;
  Logs: undefined;
  Errors: undefined;
  CrashANR: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const ThemeContext = createContext({
  toggleTheme: () => {},
  isDarkTheme: false,
});

export const ApiKeyContext = createContext({
  apiKey: '',
  setApiKey: (key: string) => {},
});

export const SessionContext = createContext({
  isSessionInitialized: true,
  initSession: () => {},
  startSession: () => {},
  stopSession: () => {},
  resumeSession: () => {},
});

// Wrap all screens with session controls
const WrappedHomeScreen = withSessionControls(HomeScreen);
const WrappedProfileScreen = withSessionControls(ProfileScreen);
const WrappedSettingsScreen = withSessionControls(SettingsScreen);
const WrappedAboutScreen = withSessionControls(AboutScreen);
const WrappedApiScreen = withSessionControls(ApiScreen);
const WrappedLogScreen = withSessionControls(LogScreen);
const WrappedErrorHandlingScreen = withSessionControls(ErrorHandlingScreen);
const WrappedLoginScreen = withSessionControls(LoginScreen);

const App: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isSessionInitialized, setIsSessionInitialized] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const initSession = () => {
    zipy.init(apiKey);
  };

  const startSession = () => {
    zipy.pause();
  };

  const stopSession = () => {
    zipy.stop();
  };

  const resumeSession = () => {
    zipy.resume();
  };

  const handleLogin = async (email: string, password: string, lastname: string, username: string, customerName: string) => {
    if (true) {
      setIsLoggedIn(true);
      setTimeout(() => {
        zipy.identify(username, {
          email: email,
          firstName: password,
          lastName: lastname,
          customerName: customerName
        });
      }, 5000);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    zipy.anonymize();
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      <SessionContext.Provider value={{
        isSessionInitialized,
        initSession,
        startSession,
        stopSession,
        resumeSession
      }}>
        <ThemeContext.Provider value={{ toggleTheme, isDarkTheme }}>
          <View style={styles.container}>
            <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme} onStateChange={ScreenNavigation}>
              <Stack.Navigator screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: isDarkTheme ? '#1a1a2e' : '#f8f9fa' },
                headerTintColor: isDarkTheme ? '#fff' : '#000'
              }}>
                {isLoggedIn ? (
                  <>
                    <Stack.Screen name="Home" component={WrappedHomeScreen} />
                    <Stack.Screen name="Profile" component={WrappedProfileScreen} />
                    <Stack.Screen name="Settings">
                      {(props) => <WrappedSettingsScreen {...props} handleLogout={handleLogout} />}
                    </Stack.Screen>
                    <Stack.Screen name="About" component={WrappedAboutScreen} />
                    <Stack.Screen name="Api" component={WrappedApiScreen} />
                    <Stack.Screen name="Logs" component={WrappedLogScreen} />
                    <Stack.Screen name="Errors" component={WrappedErrorHandlingScreen} />
                  </>
                ) : (
                  <Stack.Screen name="Login" options={{ headerShown: false }}>
                    {(props) => <WrappedLoginScreen {...props} handleLogin={handleLogin} />}
                  </Stack.Screen>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </ThemeContext.Provider>
      </SessionContext.Provider>
    </ApiKeyContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

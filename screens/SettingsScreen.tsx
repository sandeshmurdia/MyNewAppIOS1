import React, { useRef, useEffect, useContext } from 'react';
import { View, Text, Switch, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../App';

const SettingsScreen: React.FC<{ handleLogout: () => void }> = ({ handleLogout }) => {
  const { toggleTheme, isDarkTheme } = useContext(ThemeContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isEnabled, setIsEnabled] = React.useState(isDarkTheme);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const toggleSwitch = () => {
    toggleTheme();
    setIsEnabled(!isEnabled);
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor: isDarkTheme ? '#121212' : '#ffffff' }]}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={[styles.header, { color: isDarkTheme ? '#ffffff' : '#121212' }]}>Settings</Text>
        
        <View style={[styles.settingOption, { backgroundColor: isDarkTheme ? '#1f1f1f' : '#f5f5f5' }]}>
          <Text style={[styles.optionText, { color: isDarkTheme ? '#ffffff' : '#121212' }]}>Change Theme</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#FF6F61' }]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.goBackButton]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  settingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  optionText: {
    fontSize: 18,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  goBackButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;

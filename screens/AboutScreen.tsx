import React, { useRef, useEffect, useContext } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../App';

const AboutScreen: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { isDarkTheme } = useContext(ThemeContext);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#fff', opacity: fadeAnim }]}>
      <Text style={[styles.header, { color: isDarkTheme ? '#FF4081' : '#3F51B5' }]}>About This App</Text>
      <Text style={[styles.text, { color: isDarkTheme ? '#FFC107' : '#FF4081' }]}>
        This is a demo app to showcase enhanced UI and functionality using
        React Native.
      </Text>
      <Text style={[styles.text, { color: isDarkTheme ? '#FFEB3B' : '#3F51B5' }]}>Version: 1.0.0</Text>
      <Text style={[styles.text, { color: isDarkTheme ? '#4CAF50' : '#009688' }]}>Developer: Your Name</Text>
      <Text style={[styles.text, { color: isDarkTheme ? '#FF5722' : '#E91E63' }]}>Contact: your.email@example.com</Text>
      <Text style={[styles.text, { color: isDarkTheme ? '#8BC34A' : '#00BCD4' }]}>
        This app includes various screens and functionalities like profile
        management, settings, and more.
      </Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: isDarkTheme ? '#FF4081' : '#3F51B5' }]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
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
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
  button: {
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AboutScreen;

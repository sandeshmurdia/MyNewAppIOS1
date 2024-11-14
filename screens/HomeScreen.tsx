import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../App';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { isDarkTheme } = useContext(ThemeContext);
  const backgroundColor = useRef(new Animated.Value(0)).current;

  // Animate the background color
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundColor, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(backgroundColor, {
          toValue: 0,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [backgroundColor]);

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fcfcfc', '#fad0c4'], // Gradient colors
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: interpolatedBackgroundColor }]}>
      <Text style={styles.header}>Welcome to the Test App</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.row}>
          <View style={[styles.box, { backgroundColor: '#B39DDB' }]}>
            <Text style={styles.boxHeading}>Profile</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
            >
              <Text style={styles.buttonText}>Press Me</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.box, { backgroundColor: '#9575CD' }]}>
            <Text style={styles.boxHeading}>Settings</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Settings')}
            >
              <Text style={styles.buttonText}>Press Me</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.box, { backgroundColor: '#7E57C2' }]}>
            <Text style={styles.boxHeading}>About</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('About')}
            >
              <Text style={styles.buttonText}>Press Me</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.box, { backgroundColor: '#673AB7' }]}>
            <Text style={styles.boxHeading}>API Calls</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Api')}
            >
              <Text style={styles.buttonText}>Press Me</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.box, { backgroundColor: '#5E35B1' }]}>
            <Text style={styles.boxHeading}>Logs</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Logs')}
            >
              <Text style={styles.buttonText}>Press Me</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.box, { backgroundColor: '#512DA8' }]}>
            <Text style={styles.boxHeading}>Errors</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Errors')}
            >
              <Text style={styles.buttonText}>Press Me</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  box: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    padding: 30, // Increased padding for larger containers
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  boxHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#fff',
  },
  button: {
    backgroundColor: '#FF4081', // Use a different color for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default HomeScreen;

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import zipy from 'zipy-react-native';
// import zipy from 'zipyai-react-native';

const LoginScreen: React.FC<{ handleLogin: (email: string, password: string, lastname: string, username: string ,customerName : string) => void }> = ({ handleLogin }) => {
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
      duration: 1500,
      useNativeDriver: true,
    }).start();

    Animated.spring(translateAnim, {
      toValue: 0,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, translateAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.gradientBackground, { opacity: fadeAnim }]} />
      <Animated.View
        style={[
          styles.loginContainer,
          {
            transform: [{ translateY: translateAnim }],
          },
        ]}
      >
        <Text style={styles.header}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          placeholderTextColor="#95a5a6"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="first name"
          placeholderTextColor="#95a5a6"
          value={firstname}
          onChangeText={setFirstname}
        />
          <TextInput
          style={styles.input}
          placeholder="last name"
          placeholderTextColor="#95a5a6"
          value={lastname}
          onChangeText={setLastname}
        />
          <TextInput
          style={styles.input}
          placeholder="username"
          placeholderTextColor="#95a5a6"
          value={username}
          onChangeText={setUsername}
        />
                  <TextInput
          style={styles.input}
          placeholder="customername"
          placeholderTextColor="#95a5a6"
          value={customername}
          onChangeText={setCustomername}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLogin(email, firstname, lastname, username, customername)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'linear-gradient(45deg, #3498db, #9b59b6)', // Gradient from blue to purple
  },
  loginContainer: {
    width: '85%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#fff', // White background for the login container
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#34495e', // Dark blue-gray color for the header
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 15,
    fontSize: 16,
    borderColor: '#bdc3c7', // Light gray border for inputs
    backgroundColor: '#ecf0f1', // Light gray background for inputs
    color: '#34495e', // Dark blue-gray text color
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#e74c3c', // Red color for the button
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;

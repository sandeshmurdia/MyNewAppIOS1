import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import zipy from 'zipy-react-native';
// import zipy from 'zipyai-react-native';

import { ThemeContext } from '../App';

const LogScreen: React.FC = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#fff' }]}>
      <Text style={[styles.header, { color: isDarkTheme ? '#FF4081' : '#3F51B5' }]}>Log Actions</Text>
      
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#4CAF50' }]} 
        onPress={() => zipy.logMessage({ message: 'This is a Zipy log message', exceptionObj: { key: 'value' } })}>
        <Text style={styles.buttonText}>Trigger Zipy Log</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#FF5722' }]} 
        onPress={() => zipy.logError({ message: 'This is a Zipy error message', exceptionObj: { key: 'errorValue' } })}>
        <Text style={styles.buttonText}>Trigger Zipy Error</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#2196F3' }]} 
        onPress={() => zipy.logException({ message: 'This is a Zipy exception message', exceptionObj: { key: 'exceptionValue' } })}>
        <Text style={styles.buttonText}>Trigger Zipy Exception</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.goBackButton]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  goBackButton: {
    backgroundColor: '#9C27B0',
    marginTop: 20,
  },
});

export default LogScreen;

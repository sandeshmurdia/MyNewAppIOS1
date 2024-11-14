import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../App';

const ErrorHandlingScreen: React.FC = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const navigation = useNavigation();

  // TypeError
  const triggerTypeError = () => {
    try {
      const num = 42;
      num(); // Trying to invoke a number like a function
    } catch (error) {
      console.error('I am here',error);
    }

  };

  // Unhandled Exception
  const triggerUnhandledError = () => {
    const obj = undefined;
    console.log(obj.name); // Accessing a property of undefined
  };

  // Syntax Error
  const triggerSyntaxError = () => {
    try {
    throw new SyntaxError("This is a manually triggered syntax error");
      
    } catch (error) {
      console.error(error);
    }
  };

  // Range Error
  const triggerRangeError = () => {
    const arr = new Array(-1); // Invalid array size
  };

  // Reference Error
  const triggerReferenceError = () => {
    let x = undefinedVar; // Accessing undefined variable
  };

  // URI Error
  const triggerURIError = () => {
    decodeURI('%'); // Invalid URI format
  };

  // Eval Error
  const triggerEvalError = () => {
    // eval('invalid code'); // Invalid code in eval
    throw new EvalError('Eval error');

  };

  // Unhandled Rejection
  const triggerUnhandledPromiseRejection = () => {
    fetch('https://nonexistenturl.com/api')
      .then((response) => response.json()); // Unhandled promise rejection
  };

  const triggerError = () => {
    // eval('invalid code'); // Invalid code in eval
    throw new Error('Eval error');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, { backgroundColor: isDarkTheme ? '#121212' : '#ffffff' }]}>
        <Text style={[styles.header, { color: isDarkTheme ? '#FF4081' : '#3F51B5' }]}>Error Handling</Text>
        
        <TouchableOpacity style={[styles.button, { backgroundColor: '#9C27B0' }]} onPress={triggerTypeError}>
          <Text style={styles.buttonText}>Type Error</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, { backgroundColor: '#FF5722' }]} onPress={triggerUnhandledError}>
          <Text style={styles.buttonText}>Unhandled Exception</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, { backgroundColor: '#2196F3' }]} onPress={triggerSyntaxError}>
          <Text style={styles.buttonText}>Syntax Error</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, { backgroundColor: '#FFC107' }]} onPress={triggerRangeError}>
          <Text style={styles.buttonText}>Range Error</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, { backgroundColor: '#FF4081' }]} onPress={triggerReferenceError}>
          <Text style={styles.buttonText}>Reference Error</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50' }]} onPress={triggerURIError}>
          <Text style={styles.buttonText}>URI Error</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#3F51B5' }]} onPress={triggerEvalError}>
          <Text style={styles.buttonText}>Eval Error</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#FF9800' }]} onPress={triggerUnhandledPromiseRejection}>
          <Text style={styles.buttonText}>Unhandled Promise Rejection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#5f5038' }]} onPress={triggerError}>
          <Text style={styles.buttonText}>Error</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.goBackButton]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: 'center'
  },
  container: {
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
    backgroundColor: '#607D8B',
    marginTop: 20,
  },
});

export default ErrorHandlingScreen;

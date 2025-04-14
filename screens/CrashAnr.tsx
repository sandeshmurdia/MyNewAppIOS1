import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, NativeModules } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../App';

const CrashANR: React.FC = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const handleButton1 = async () => {
    await NativeModules.ZipyaiReactNative.testCrash();
  };

  const handleButton2 = async () => {
    console.log("Button 2 pressed");
    await NativeModules.ZipyaiReactNative.testANR(10);
  };



  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, { backgroundColor: isDarkTheme ? '#121212' : '#ffffff' }]}>
        <Text style={[styles.header, { color: isDarkTheme ? '#FF4081' : '#3F51B5' }]}>Error Handling</Text>
        
        <TouchableOpacity style={[styles.button, { backgroundColor: '#9C27B0' }]} onPress={handleButton1}>
          <Text style={styles.buttonText}>ANR</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, { backgroundColor: '#FF5722' }]} onPress={handleButton2}>
          <Text style={styles.buttonText}>Crash</Text>
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

export default CrashANR;

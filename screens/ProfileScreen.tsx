import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../App';

const ProfileScreen: React.FC<{ route: any }> = ({ route }) => {
  const [text, setText] = useState('');
  const { isDarkTheme } = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#1c1c1c' : '#f7f7f7' }]}>
      <Text style={styles.header}>Profile Screen</Text>
      <Text style={styles.subHeader}>This is {route.params.name}'s profile</Text>
      
      <TextInput
        style={[
          styles.input, 
          { 
            backgroundColor: isDarkTheme ? '#333' : '#fff', 
            color: isDarkTheme ? '#fff' : '#000',
            borderColor: isDarkTheme ? '#555' : '#ccc'
          }
        ]}
        placeholder="Type here"
        placeholderTextColor={isDarkTheme ? '#aaa' : '#888'}
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity style={styles.button} onPress={() => alert('Profile Saved!')}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.goBackButton]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>

      <View style={styles.profileDetails}>
        <Text style={styles.detailText}>Email: jane.doe@example.com</Text>
        <Text style={styles.detailText}>Phone: +1 234 567 890</Text>
        <Text style={styles.detailText}>Address: 123 Main St, City, Country</Text>
      </View>
    </View>
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
    marginBottom: 10,
    textAlign: 'center',
    color: '#4A4A4A',
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#888',
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBackButton: {
    backgroundColor: '#FF5722',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  profileDetails: {
    marginTop: 30,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
});

export default ProfileScreen;

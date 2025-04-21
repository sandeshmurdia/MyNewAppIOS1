import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../App';
import axios from 'axios';
import zipy from 'zipy-react-native';
import RNFS from 'react-native-fs';

interface ApiResponse {
  success: boolean;
  data: any;
  headers?: any;
  requestHeaders?: any;
  error?: string;
}

const ApiScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { isDarkTheme } = useContext(ThemeContext);
  const navigation = useNavigation();

  // Custom auth and request headers
  const customHeaders = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    'X-API-Key': 'test_api_key_12345',
    'X-Custom-Header': 'custom_value',
    'X-Device-Id': 'test_device_123',
    'X-Session-Id': 'test_session_456',
    'X-Correlation-Id': 'test_correlation_789',
  };

  const sensitivePayload = {
    user: {
      name: 'John Doe',
      cardnumber: '4111-1111-1111-1111',
      billing: {
        address: '123 Street',
        payment: {
          cardnumber: '5555-5555-5555-5555',
          details: {
            cardnumber: '3333-3333-3333-3333',
            deepNested: {
              cardnumber: '2222-2222-2222-2222',
              furtherNested: { cardnumber: '1111-1111-1111-1111' }
            }
          }
        }
      }
    },
    metadata: {
      api_key: 'secret_key_123',
      credentials: {
        password: 'test123',
        cardnumber: '6666-6666-6666-6666'
      }
    }
  };

  // Function to create a temporary test file
  const createDemoFile = async (isCSV: boolean) => {
    try {
      const fileName = isCSV ? 'test.csv' : 'testfile.txt';
      const content = isCSV 
        ? 'id,name,cardnumber\n1,John,4111-1111-1111-1111\n2,Jane,5555-5555-5555-5555'
        : 'This is a test file content for multipart upload demo';
      
      const path = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
      await RNFS.writeFile(path, content, 'utf8');
      return path;
    } catch (error) {
      console.error('Error creating demo file:', error);
      throw error;
    }
  };

  const handleApiCall = async (
    method: string,
    endpoint: string,
    data?: any,
    isMultipart: boolean = false
  ) => {
    setLoading(true);
    setResponse(null);
    
    try {
      let response;
      const headers = {
        ...(isMultipart 
          ? { 'Content-Type': 'multipart/form-data' }
          : { 'Content-Type': 'application/json' }
        ),
        ...customHeaders
      };

      const axiosConfig = {
        headers,
        validateStatus: (status: number) => true, // Allow all status codes for testing
      };

      if (method === 'GET') {
        response = await axios.get(endpoint, axiosConfig);
      } else if (method === 'POST') {
        let formData;
        if (isMultipart) {
          const isFailCase = endpoint.includes('invalid');
          const filePath = await createDemoFile(isFailCase);
          const fileContent = await RNFS.readFile(filePath, 'base64');

          formData = new FormData();
          formData.append('cardnumber', '4111-1111-1111-1111');
          formData.append('user_details', JSON.stringify({
            name: 'John',
            payment: {
              cardnumber: '5555-5555-5555-5555',
              billing: { cardnumber: '3333-3333-3333-3333' }
            }
          }));

          // Add the file to form data
          formData.append('document', {
            uri: Platform.OS === 'ios' ? `file://${filePath}` : filePath,
            type: isFailCase ? 'text/csv' : 'text/plain',
            name: isFailCase ? 'test.csv' : 'testfile.txt',
            data: fileContent,
          });

          // Add sensitive data as a separate file
          formData.append('sensitive_data', {
            string: JSON.stringify({
              cardnumber: '2222-2222-2222-2222',
              details: { cardnumber: '1111-1111-1111-1111' }
            }),
            type: 'application/json',
            name: 'sensitive_data.json'
          });
        }

        response = await axios.post(
          endpoint,
          isMultipart ? formData : data || sensitivePayload,
          axiosConfig
        );
      }

      if (response) {
        setResponse({
          success: response.status >= 200 && response.status < 300,
          data: response.data,
          headers: response.headers,
          requestHeaders: response.config?.headers
        });
      }
    } catch (error: any) {
      setResponse({
        success: false,
        data: null,
        error: error.message,
        headers: error.response?.headers,
        requestHeaders: error.config?.headers
      });
    } finally {
      setLoading(false);
      setModalVisible(true);
    }
  };

  const renderApiSection = (title: string, buttons: Array<{ label: string; onPress: () => void; color: string }>) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#FFF' : '#000' }]}>{title}</Text>
      <View style={styles.buttonGrid}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, { backgroundColor: button.color }]}
            onPress={button.onPress}
          >
            <Text style={styles.buttonText}>{button.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderResponseData = () => {
    if (!response) return null;

    return (
      <>
        <Text style={[styles.responseTitle, { color: isDarkTheme ? '#fff' : '#000' }]}>
          Request Headers:
        </Text>
        <Text style={[styles.responseText, { color: isDarkTheme ? '#fff' : '#000' }]}>
          {JSON.stringify(response.requestHeaders, null, 2)}
        </Text>
        
        <Text style={[styles.responseTitle, { color: isDarkTheme ? '#fff' : '#000' }]}>
          Response Headers:
        </Text>
        <Text style={[styles.responseText, { color: isDarkTheme ? '#fff' : '#000' }]}>
          {JSON.stringify(response.headers, null, 2)}
        </Text>
        
        <Text style={[styles.responseTitle, { color: isDarkTheme ? '#fff' : '#000' }]}>
          Response Data:
        </Text>
        <Text style={[styles.responseText, { color: isDarkTheme ? '#fff' : '#000' }]}>
          {response.success
            ? JSON.stringify(response.data, null, 2)
            : `Error: ${response.error}`}
        </Text>
      </>
    );
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#fff' }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.header, { color: isDarkTheme ? '#FF4081' : '#3F51B5' }]}>API Testing</Text>

      {renderApiSection('Regular API Calls', [
        {
          label: 'GET Success',
          onPress: () => handleApiCall('GET', 'https://jsonplaceholder.typicode.com/posts/1'),
          color: '#4CAF50'
        },
        {
          label: 'GET Fail',
          onPress: () => handleApiCall('GET', 'https://jsonplaceholder.typicode.com/invalid'),
          color: '#FF5722'
        },
        {
          label: 'POST Success',
          onPress: () => handleApiCall('POST', 'https://jsonplaceholder.typicode.com/posts'),
          color: '#2196F3'
        },
        {
          label: 'POST Fail',
          onPress: () => handleApiCall('POST', 'https://jsonplaceholder.typicode.com/invalid'),
          color: '#9C27B0'
        }
      ])}

      {renderApiSection('Multipart Form Data', [
        {
          label: 'Multipart Success',
          onPress: () => handleApiCall('POST', 'https://jsonplaceholder.typicode.com/posts', null, true),
          color: '#009688'
        },
        {
          label: 'Multipart Fail',
          onPress: () => handleApiCall('POST', 'https://jsonplaceholder.typicode.com/invalid', null, true),
          color: '#FF5252'
        }
      ])}

      <TouchableOpacity 
        style={[styles.button, styles.goBackButton]} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: isDarkTheme ? '#333' : '#fff' }]}>
            <Text style={[styles.modalTitle, { color: isDarkTheme ? '#fff' : '#000' }]}>
              API Response
            </Text>
            <ScrollView style={styles.responseScroll}>
              {loading ? (
                <ActivityIndicator size="large" color="#007AFF" />
              ) : (
                renderResponseData()
              )}
            </ScrollView>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#007AFF' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  goBackButton: {
    backgroundColor: '#FF4081',
    width: '100%',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  responseScroll: {
    maxHeight: 400,
    marginBottom: 20,
  },
  responseText: {
    fontSize: 14,
    fontFamily: 'monospace',
    marginBottom: 15,
  },
});

export default ApiScreen;

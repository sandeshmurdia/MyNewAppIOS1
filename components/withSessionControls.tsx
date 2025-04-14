import React from 'react';
import { View, StyleSheet } from 'react-native';
import SessionControls from './SessionControls';

const withSessionControls = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => (
    <View style={styles.container}>
      <View style={styles.content}>
        <WrappedComponent {...props} />
      </View>
      <SessionControls />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginBottom: 60, // Space for the session controls
  },
});

export default withSessionControls; 
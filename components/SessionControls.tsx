import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { SessionContext } from '../App';
import Button from './Button';
import { colors, spacing, shadows } from '../theme/theme';

const SessionControls: React.FC = () => {
  const { initSession, startSession, stopSession, resumeSession } = useContext(SessionContext);

  return (
    <View style={styles.container}>
      <Button
        title="Init"
        onPress={initSession}
        variant="primary"
        size="small"
      />
      <Button
        title="Pause"
        onPress={startSession}
        variant="primary"
        size="small"
      />
      <Button
        title="Stop"
        onPress={stopSession}
        variant="primary"
        size="small"
      />
      <Button
        title="Resume"
        onPress={resumeSession}
        variant="primary"
        size="small"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.lg,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default SessionControls; 
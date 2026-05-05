import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Text } from '../ui';
import { useTheme } from '../../theme';
import { WorkoutSet } from '../../types/workout';

interface WorkoutSetRowProps {
  set: WorkoutSet;
  index: number;
  onUpdate: (setId: string, field: keyof WorkoutSet, value: any) => void;
}

export default function WorkoutSetRow({ set, index, onUpdate }: WorkoutSetRowProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text variant="body" style={styles.indexText} color={theme.colors.textSecondary}>
        {index + 1}
      </Text>
      
      <Input
        value={set.weight ? set.weight.toString() : ''}
        onChangeText={(text) => onUpdate(set.id, 'weight', parseFloat(text) || 0)}
        placeholder="kg"
        keyboardType="numeric"
        containerStyle={styles.inputContainer}
      />
      
      <Input
        value={set.reps ? set.reps.toString() : ''}
        onChangeText={(text) => onUpdate(set.id, 'reps', parseInt(text, 10) || 0)}
        placeholder="reps"
        keyboardType="numeric"
        containerStyle={styles.inputContainer}
      />

      <TouchableOpacity
        style={[
          styles.checkButton,
          { backgroundColor: set.completed ? theme.colors.primary : theme.colors.surface }
        ]}
        onPress={() => onUpdate(set.id, 'completed', !set.completed)}
      >
        <Text color={set.completed ? theme.colors.background : theme.colors.textMuted}>✓</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  indexText: {
    width: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
  },
  checkButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333', // fallback border
  }
});

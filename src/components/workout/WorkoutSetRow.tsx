import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Text, Button } from '../ui';
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
        inputStyle={styles.compactInput}
      />
      
      <Input
        value={set.reps ? set.reps.toString() : ''}
        onChangeText={(text) => onUpdate(set.id, 'reps', parseInt(text, 10) || 0)}
        placeholder="reps"
        keyboardType="numeric"
        containerStyle={styles.inputContainer}
        inputStyle={styles.compactInput}
      />

      <Button
        variant={set.completed ? "success" : "secondary"}
        onPress={() => onUpdate(set.id, 'completed', !set.completed)}
        style={styles.checkButton}
      >
        {set.completed ? "✓" : " "}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  indexText: {
    width: 32,
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  compactInput: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 14,
  },
  checkButton: {
    width: 40,
    height: 40,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginLeft: 4,
  }
});

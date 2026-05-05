import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from '../ui';
import { useTheme } from '../../theme';
import { WorkoutExercise, WorkoutSet } from '../../types/workout';
import WorkoutSetRow from './WorkoutSetRow';

interface WorkoutExerciseCardProps {
  exercise: WorkoutExercise;
  onAddSet: (exerciseId: string) => void;
  onUpdateSet: (exerciseId: string, setId: string, field: keyof WorkoutSet, value: any) => void;
  onRemoveExercise: (exerciseId: string) => void;
}

export default function WorkoutExerciseCard({
  exercise,
  onAddSet,
  onUpdateSet,
  onRemoveExercise
}: WorkoutExerciseCardProps) {
  const theme = useTheme();

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text variant="h3">{exercise.name}</Text>
        <Button variant="ghost" size="sm" onPress={() => onRemoveExercise(exercise.id)}>
          X
        </Button>
      </View>

      <View style={styles.labelsRow}>
        <Text variant="label" color={theme.colors.textSecondary} style={styles.labelIndex}>Set</Text>
        <Text variant="label" color={theme.colors.textSecondary} style={styles.labelInput}>kg</Text>
        <Text variant="label" color={theme.colors.textSecondary} style={styles.labelInput}>Reps</Text>
        <Text variant="label" color={theme.colors.textSecondary} style={styles.labelCheck}>✓</Text>
      </View>

      {exercise.sets.map((set, index) => (
        <WorkoutSetRow
          key={set.id}
          index={index}
          set={set}
          onUpdate={(setId, field, value) => onUpdateSet(exercise.id, setId, field, value)}
        />
      ))}

      <Button
        variant="secondary"
        style={styles.addButton}
        onPress={() => onAddSet(exercise.id)}
      >
        + Agregar serie
      </Button>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  labelsRow: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 8,
    gap: 8,
  },
  labelIndex: {
    width: 24,
    textAlign: 'center',
  },
  labelInput: {
    flex: 1,
    textAlign: 'center',
  },
  labelCheck: {
    width: 40,
    textAlign: 'center',
  },
  addButton: {
    marginTop: 8,
  }
});

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
        <Button variant="ghost" size="sm" onPress={() => onRemoveExercise(exercise.id)} style={styles.removeBtn}>
          X
        </Button>
      </View>

      <View style={styles.labelsRow}>
        <Text variant="caption" color={theme.colors.textSecondary} style={styles.labelIndex}>SET</Text>
        <Text variant="caption" color={theme.colors.textSecondary} style={styles.labelInput}>KG</Text>
        <Text variant="caption" color={theme.colors.textSecondary} style={styles.labelInput}>REPS</Text>
        <Text variant="caption" color={theme.colors.textSecondary} style={styles.labelCheck}>✓</Text>
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
        variant="ghost"
        size="sm"
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
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  removeBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  labelsRow: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  labelIndex: {
    width: 32,
    textAlign: 'center',
  },
  labelInput: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 4,
  },
  labelCheck: {
    width: 40,
    textAlign: 'center',
    marginLeft: 4,
  },
  addButton: {
    marginTop: 8,
    alignSelf: 'center',
  }
});

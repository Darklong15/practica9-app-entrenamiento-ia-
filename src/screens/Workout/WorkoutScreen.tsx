import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ScreenContainer, Text, Button, Input } from '../../components/ui';
import { useTheme } from '../../theme';
import { ActiveWorkout, WorkoutExercise, WorkoutSet } from '../../types/workout';
import { WorkoutService } from '../../services/WorkoutService';
import { WorkoutExerciseCard, RestTimer } from '../../components/workout';

export default function WorkoutScreen() {
  const theme = useTheme();
  const [activeWorkout, setActiveWorkout] = useState<ActiveWorkout | null>(null);
  const [newExerciseName, setNewExerciseName] = useState('');

  useEffect(() => {
    loadActiveWorkout();
  }, []);

  const loadActiveWorkout = async () => {
    const workout = await WorkoutService.getActiveWorkout();
    if (workout) {
      setActiveWorkout(workout);
    }
  };

  const saveWorkoutState = async (workout: ActiveWorkout) => {
    setActiveWorkout(workout);
    await WorkoutService.saveActiveWorkout(workout);
  };

  const startWorkout = async () => {
    const newWorkout: ActiveWorkout = {
      id: Date.now().toString(),
      startTime: new Date().toISOString(),
      exercises: [],
    };
    await saveWorkoutState(newWorkout);
  };

  const finishWorkout = async () => {
    Alert.alert(
      "Finalizar Entrenamiento",
      "¿Estás seguro que deseas finalizar este entrenamiento?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Finalizar", 
          style: "destructive",
          onPress: async () => {
            await WorkoutService.clearActiveWorkout();
            setActiveWorkout(null);
          } 
        }
      ]
    );
  };

  const addExercise = async () => {
    if (!activeWorkout || !newExerciseName.trim()) return;

    const newExercise: WorkoutExercise = {
      id: Date.now().toString(),
      name: newExerciseName.trim(),
      sets: [
        { id: Date.now().toString(), reps: 0, weight: 0, completed: false }
      ]
    };

    const updatedWorkout = {
      ...activeWorkout,
      exercises: [...activeWorkout.exercises, newExercise]
    };

    await saveWorkoutState(updatedWorkout);
    setNewExerciseName('');
  };

  const removeExercise = async (exerciseId: string) => {
    if (!activeWorkout) return;
    const updatedWorkout = {
      ...activeWorkout,
      exercises: activeWorkout.exercises.filter(e => e.id !== exerciseId)
    };
    await saveWorkoutState(updatedWorkout);
  };

  const addSetToExercise = async (exerciseId: string) => {
    if (!activeWorkout) return;
    const updatedWorkout = {
      ...activeWorkout,
      exercises: activeWorkout.exercises.map(exercise => {
        if (exercise.id === exerciseId) {
          // Obtener los valores de la última serie para autocompletar si existen
          const lastSet = exercise.sets[exercise.sets.length - 1];
          const newSet: WorkoutSet = {
            id: Date.now().toString(),
            reps: lastSet ? lastSet.reps : 0,
            weight: lastSet ? lastSet.weight : 0,
            completed: false
          };
          return { ...exercise, sets: [...exercise.sets, newSet] };
        }
        return exercise;
      })
    };
    await saveWorkoutState(updatedWorkout);
  };

  const updateSet = async (exerciseId: string, setId: string, field: keyof WorkoutSet, value: any) => {
    if (!activeWorkout) return;
    const updatedWorkout = {
      ...activeWorkout,
      exercises: activeWorkout.exercises.map(exercise => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.map(set => {
              if (set.id === setId) {
                return { ...set, [field]: value };
              }
              return set;
            })
          };
        }
        return exercise;
      })
    };
    await saveWorkoutState(updatedWorkout);
  };

  if (!activeWorkout) {
    return (
      <ScreenContainer>
        <View style={styles.centerContainer}>
          <Text variant="h1" style={styles.title}>Entrenar</Text>
          <Text variant="body" color={theme.colors.textSecondary} style={styles.subtitle}>
            ¿Listo para tu sesión de hoy?
          </Text>
          <Button onPress={startWorkout}>
            Iniciar Entrenamiento
          </Button>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      <View style={styles.header}>
        <Text variant="h1">Entrenamiento Activo</Text>
        <Button variant="danger" size="sm" onPress={finishWorkout}>
          Finalizar
        </Button>
      </View>

      <RestTimer />

        {activeWorkout.exercises.map(exercise => (
          <WorkoutExerciseCard
            key={exercise.id}
            exercise={exercise}
            onAddSet={addSetToExercise}
            onUpdateSet={updateSet}
            onRemoveExercise={removeExercise}
          />
        ))}

        <View style={styles.addExerciseContainer}>
          <Input
            placeholder="Nombre del ejercicio (ej. Press de Banca)"
            value={newExerciseName}
            onChangeText={setNewExerciseName}
            containerStyle={styles.exerciseInput}
          />
          <Button
            variant="secondary"
            onPress={addExercise}
            disabled={!newExerciseName.trim()}
            style={styles.exerciseAddButton}
          >
            + Agregar Nuevo Ejercicio
          </Button>
        </View>
        <View style={styles.spacer} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  addExerciseContainer: {
    flexDirection: 'column',
    marginTop: 8,
    marginBottom: 24,
    width: '100%',
  },
  exerciseInput: {
    width: '100%',
    marginBottom: 12,
  },
  exerciseAddButton: {
    width: '100%',
  },
  spacer: {
    height: 40,
  }
});

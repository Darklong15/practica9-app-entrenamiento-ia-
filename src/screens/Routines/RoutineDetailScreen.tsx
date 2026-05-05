import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Card, Button } from '../../components/ui';
import { useTheme } from '../../theme';

interface Routine {
  name: string;
  exercises: string[];
}

const routinesData: Routine[] = [
  {
    name: 'Fuerza',
    exercises: ['Squats', 'Deadlift', 'Bench Press', 'Pull-ups'],
  },
  {
    name: 'Cardio',
    exercises: ['Running', 'Jumping Jacks', 'Burpees', 'Mountain Climbers'],
  },
  {
    name: 'Hipertrofia',
    exercises: ['Bicep Curls', 'Chest Fly', 'Lateral Raises', 'Tricep Dips'],
  },
];

export default function RoutineDetailScreen() {
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const theme = useTheme();

  const selectRoutine = (routine: Routine) => {
    setSelectedRoutine(routine);
  };

  const goBack = () => {
    setSelectedRoutine(null);
  };

  return (
    <ScreenContainer scrollable={true}>
      <View style={styles.header}>
        <Text variant="h1">Rutinas de Entrenamiento</Text>
      </View>
      
      {!selectedRoutine ? (
        <View>
          <Text variant="h3" style={styles.subtitle}>Selecciona una rutina:</Text>
          {routinesData.map((routine, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => selectRoutine(routine)}
            >
              <Card style={styles.routineCard}>
                <Text variant="h2" style={styles.routineName}>{routine.name}</Text>
                <Text variant="body" color={theme.colors.textSecondary}>
                  {routine.exercises.length} ejercicios
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View>
          <Button 
            onPress={goBack}
            variant="secondary"
            style={styles.backButton}
          >
            ← Volver
          </Button>
          <Text variant="h2" style={styles.selectedTitle}>Rutina: {selectedRoutine.name}</Text>
          <Text variant="h3" style={styles.exercisesTitle}>Ejercicios:</Text>
          {selectedRoutine.exercises.map((exercise, index) => (
            <Card key={index} style={styles.exerciseCard}>
              <Text variant="body" style={styles.exerciseName}>{exercise}</Text>
            </Card>
          ))}
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  subtitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  routineCard: {
    marginBottom: 12,
    alignItems: 'center',
    paddingVertical: 24,
  },
  routineName: {
    marginBottom: 8,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  selectedTitle: {
    marginBottom: 16,
  },
  exercisesTitle: {
    marginBottom: 16,
  },
  exerciseCard: {
    marginBottom: 8,
  },
  exerciseName: {
    fontWeight: 'bold',
  },
});

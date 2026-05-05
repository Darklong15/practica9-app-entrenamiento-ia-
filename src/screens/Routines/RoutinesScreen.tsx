import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

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

const RoutinesScreen: React.FC = () => {
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);

  const selectRoutine = (routine: Routine) => {
    setSelectedRoutine(routine);
  };

  const goBack = () => {
    setSelectedRoutine(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rutinas de Entrenamiento</Text>
      {!selectedRoutine ? (
        <View>
          <Text style={styles.subtitle}>Selecciona una rutina:</Text>
          {routinesData.map((routine, index) => (
            <TouchableOpacity
              key={index}
              style={styles.routineCard}
              onPress={() => selectRoutine(routine)}
            >
              <Text style={styles.routineName}>{routine.name}</Text>
              <Text style={styles.routineCount}>{routine.exercises.length} ejercicios</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Text style={styles.backButtonText}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.selectedTitle}>Rutina: {selectedRoutine.name}</Text>
          <Text style={styles.exercisesTitle}>Ejercicios:</Text>
          {selectedRoutine.exercises.map((exercise, index) => (
            <View key={index} style={styles.exerciseCard}>
              <Text style={styles.exerciseName}>{exercise}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'BebasNeue_400Regular',
  },
  subtitle: {
    fontSize: 20,
    color: '#495057',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold',
  },
  routineCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  routineName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212529',
    fontFamily: 'BebasNeue_400Regular',
  },
  routineCount: {
    fontSize: 16,
    color: '#6c757d',
    fontFamily: 'Inter_400Regular',
  },
  backButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  selectedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
    fontFamily: 'BebasNeue_400Regular',
  },
  exercisesTitle: {
    fontSize: 18,
    color: '#495057',
    marginBottom: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  exerciseCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseName: {
    fontSize: 18,
    color: '#212529',
    fontFamily: 'Inter_600SemiBold',
  },
});

export default RoutinesScreen;
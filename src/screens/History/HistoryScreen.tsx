import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WorkoutHistory {
  date: string;
  duration: number; // en minutos
  exercises: string[];
}

const HistoryScreen: React.FC = () => {
  const [history, setHistory] = useState<WorkoutHistory[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('workoutHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const saveHistory = async (newHistory: WorkoutHistory[]) => {
    try {
      await AsyncStorage.setItem('workoutHistory', JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  const addSampleWorkout = () => {
    const sampleWorkout: WorkoutHistory = {
      date: new Date().toLocaleDateString(),
      duration: 45,
      exercises: ['Push-ups', 'Squats', 'Plank'],
    };
    const newHistory = [sampleWorkout, ...history];
    saveHistory(newHistory);
    Alert.alert('Entrenamiento agregado', 'Se ha agregado un entrenamiento de ejemplo.');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Historial de Entrenamientos</Text>
      <TouchableOpacity style={styles.addButton} onPress={addSampleWorkout}>
        <Text style={styles.addButtonText}>Agregar Entrenamiento de Ejemplo</Text>
      </TouchableOpacity>
      {history.length === 0 ? (
        <Text style={styles.noHistory}>No hay entrenamientos registrados aún.</Text>
      ) : (
        history.map((workout, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.date}>Fecha: {workout.date}</Text>
            <Text style={styles.duration}>Duración: {workout.duration} minutos</Text>
            <Text style={styles.exercisesTitle}>Ejercicios realizados:</Text>
            {workout.exercises.map((exercise, idx) => (
              <Text key={idx} style={styles.exercise}>• {exercise}</Text>
            ))}
          </View>
        ))
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
  addButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Inter_600SemiBold',
  },
  noHistory: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 50,
    fontFamily: 'Inter_400Regular',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
    fontFamily: 'Inter_600SemiBold',
  },
  duration: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 8,
    fontFamily: 'Inter_400Regular',
  },
  exercisesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
    fontFamily: 'Inter_600SemiBold',
  },
  exercise: {
    fontSize: 14,
    color: '#6c757d',
    marginLeft: 10,
    fontFamily: 'Inter_400Regular',
  },
});

export default HistoryScreen;
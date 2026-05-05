import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenContainer, Text, Card, Button } from '../../components/ui';
import { useTheme } from '../../theme';

interface WorkoutHistory {
  date: string;
  duration: number; // en minutos
  exercises: string[];
}

export default function HistoryScreen() {
  const [history, setHistory] = useState<WorkoutHistory[]>([]);
  const theme = useTheme();

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
    <ScreenContainer scrollable={true}>
      <View style={styles.header}>
        <Text variant="h1">Historial</Text>
      </View>
      
      <Button 
        onPress={addSampleWorkout}
        variant="primary"
        style={{ marginBottom: 24 }}
      >
        Agregar Entrenamiento de Ejemplo
      </Button>
      
      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="body" color={theme.colors.textSecondary} style={{ textAlign: 'center' }}>
            No hay entrenamientos registrados aún.
          </Text>
        </View>
      ) : (
        history.map((workout, index) => (
          <Card key={index} style={styles.card}>
            <Text variant="h3" style={{ marginBottom: 8 }}>Fecha: {workout.date}</Text>
            <Text variant="body" color={theme.colors.textSecondary} style={{ marginBottom: 12 }}>
              Duración: {workout.duration} minutos
            </Text>
            <Text variant="h4" style={{ marginBottom: 8 }}>Ejercicios realizados:</Text>
            {workout.exercises.map((exercise, idx) => (
              <Text key={idx} variant="body" color={theme.colors.textSecondary} style={{ marginLeft: 8, marginBottom: 4 }}>
                • {exercise}
              </Text>
            ))}
          </Card>
        ))
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  card: {
    marginBottom: 16,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  }
});

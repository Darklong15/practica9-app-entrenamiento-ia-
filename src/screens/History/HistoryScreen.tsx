import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ScreenContainer, Text, Card, Button } from '../../components/ui';
import { useTheme } from '../../theme';
import { ActiveWorkout } from '../../types/workout';

export default function HistoryScreen() {
  const [history, setHistory] = useState<ActiveWorkout[]>([]);
  const theme = useTheme();

  const loadHistory = async () => {
    try {
      const historyJson = await AsyncStorage.getItem('@workout_history');
      if (historyJson) {
        setHistory(JSON.parse(historyJson));
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const loadSampleData = async () => {
    const SAMPLE_DATA: ActiveWorkout[] = [
      {
        id: 'sample-1',
        startTime: new Date(Date.now() - 86400000).toISOString(),
        endTime: new Date(Date.now() - 86400000 + 3600000).toISOString(),
        exercises: [
          {
            id: 'ex-1', name: 'Press de Banca',
            sets: [{ id: 'set-1', reps: 10, weight: 60, completed: true }, { id: 'set-2', reps: 8, weight: 65, completed: true }]
          }
        ]
      },
      {
        id: 'sample-2',
        startTime: new Date(Date.now() - 172800000).toISOString(),
        endTime: new Date(Date.now() - 172800000 + 3600000).toISOString(),
        exercises: [
          {
            id: 'ex-2', name: 'Sentadilla Libre',
            sets: [{ id: 'set-3', reps: 12, weight: 80, completed: true }, { id: 'set-4', reps: 10, weight: 85, completed: true }]
          }
        ]
      }
    ];

    try {
      await AsyncStorage.setItem('@workout_history', JSON.stringify(SAMPLE_DATA));
      setHistory(SAMPLE_DATA);
    } catch (error) {
      console.error('Error saving sample data:', error);
    }
  };

  return (
    <ScreenContainer scrollable={true}>
      <View style={styles.header}>
        <Text variant="h1">Historial</Text>
      </View>
      
      <Button 
        variant="secondary" 
        onPress={loadSampleData}
        style={{ marginBottom: 24 }}
      >
        Cargar Datos de Prueba
      </Button>

      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="body" color={theme.colors.textSecondary} style={{ textAlign: 'center' }}>
            Aún no tienes entrenamientos registrados. Ve a la pestaña Entrenar para comenzar
          </Text>
        </View>
      ) : (
        history.map((workout) => {
          const date = new Date(workout.startTime).toLocaleDateString();
          return (
            <Card key={workout.id} style={styles.card}>
              <Text variant="h3" style={{ marginBottom: 8 }}>Fecha: {date}</Text>
              {workout.endTime && (
                <Text variant="body" color={theme.colors.textSecondary} style={{ marginBottom: 12 }}>
                  Finalizado: {new Date(workout.endTime).toLocaleTimeString()}
                </Text>
              )}
              <Text variant="h3" style={{ marginBottom: 8 }}>Ejercicios realizados:</Text>
              {workout.exercises.length === 0 ? (
                <Text variant="body" color={theme.colors.textSecondary} style={{ marginLeft: 8 }}>
                  Ninguno
                </Text>
              ) : (
                workout.exercises.map((exercise) => (
                  <Text key={exercise.id} variant="body" color={theme.colors.textSecondary} style={{ marginLeft: 8, marginBottom: 4 }}>
                    • {exercise.name} ({exercise.sets.length} series)
                  </Text>
                ))
              )}
            </Card>
          );
        })
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

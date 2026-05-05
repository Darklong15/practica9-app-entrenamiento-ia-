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
=======
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, RefreshControl, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenContainer, Text, Card } from '../../components/ui';
import { useTheme } from '../../theme';
import { WorkoutHistory } from '../../types/workout';

const HistoryCard = ({ workout, index, theme }: { workout: any; index: number; theme: any }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(20)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 8,
        delay: index * 100,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY }] }}>
      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <Text variant="h3">{workout.date}</Text>
          <Text variant="stat" color={theme.colors.primary}>{workout.duration} min</Text>
        </View>
        
        <View style={styles.statsRow}>
          <Text variant="caption" color={theme.colors.textSecondary}>
            Ejercicios: {workout.exercises?.length || 0}
          </Text>
          <Text variant="caption" color={theme.colors.textSecondary}>
            Volumen Total: {workout.totalKg || 0} kg
          </Text>
        </View>

        <View style={styles.exercisesContainer}>
          {workout.exercises?.map((exercise: any, idx: number) => {
            if (typeof exercise === 'string') {
              return (
                <View key={idx} style={styles.exerciseRow}>
                  <Text variant="body" style={{ flex: 1 }}>• {exercise}</Text>
                  <Text variant="caption" color={theme.colors.textMuted} style={{ flex: 1, textAlign: 'right' }}>
                    Antiguo formato
                  </Text>
                </View>
              );
            }

            const setsDesc = exercise.sets && Array.isArray(exercise.sets)
              ? exercise.sets.filter((s: any) => s.reps > 0).map((s: any) => `${s.reps}x${s.weight}kg`).join(', ')
              : '';
              
            return (
              <View key={idx} style={styles.exerciseRow}>
                <Text variant="body" style={{ flex: 1 }}>• {exercise.name}</Text>
                <Text variant="caption" color={theme.colors.textMuted} style={{ flex: 1, textAlign: 'right' }}>
                  {setsDesc || 'Sin series registradas'}
                </Text>
              </View>
            );
          })}
        </View>
      </Card>
    </Animated.View>
  );
};

export default function HistoryScreen() {
  const [history, setHistory] = useState<WorkoutHistory[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme();

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('workoutHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  }, []);

  return (
    <ScreenContainer 
      scrollable={true} 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.primary} />
      }
    >
      <View style={styles.header}>
        <Text variant="h1">Historial</Text>
      </View>
      
      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="clipboard-text-off-outline" size={64} color={theme.colors.textMuted} />
          <Text variant="h3" style={{ marginTop: 16, marginBottom: 8, textAlign: 'center' }}>
            Aún no hay entrenamientos
          </Text>
          <Text variant="body" color={theme.colors.textSecondary} style={{ textAlign: 'center' }}>
            Tu historial está vacío. ¡Ve a la pestaña de entrenar y registra tu primera sesión!
          </Text>
        </View>
      ) : (
        history.map((workout, index) => (
          <HistoryCard key={workout.id || index} workout={workout} index={index} theme={theme} />
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
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  exercisesContainer: {
    gap: 8,
  },
  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 64,
  }
});
>>>>>>> main

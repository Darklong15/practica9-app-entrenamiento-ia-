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

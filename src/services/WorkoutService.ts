import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActiveWorkout } from '../types/workout';

const ACTIVE_WORKOUT_KEY = '@active_workout';
const WORKOUT_HISTORY_KEY = '@workout_history';

export const WorkoutService = {
  async getActiveWorkout(): Promise<ActiveWorkout | null> {
    try {
      const workoutJson = await AsyncStorage.getItem(ACTIVE_WORKOUT_KEY);
      if (workoutJson) {
        return JSON.parse(workoutJson);
      }
      return null;
    } catch (error) {
      console.error('Error getting active workout:', error);
      return null;
    }
  },

  async saveActiveWorkout(workout: ActiveWorkout): Promise<void> {
    try {
      await AsyncStorage.setItem(ACTIVE_WORKOUT_KEY, JSON.stringify(workout));
    } catch (error) {
      console.error('Error saving active workout:', error);
    }
  },

  async clearActiveWorkout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(ACTIVE_WORKOUT_KEY);
    } catch (error) {
      console.error('Error clearing active workout:', error);
    }
  },

  async getWorkoutHistory(): Promise<ActiveWorkout[]> {
    try {
      const historyJson = await AsyncStorage.getItem(WORKOUT_HISTORY_KEY);
      let history = historyJson ? JSON.parse(historyJson) : [];

      if (history.length === 0) {
        const SAMPLE_HISTORY: ActiveWorkout[] = [
          {
            id: 'sample-1',
            startTime: new Date(Date.now() - 86400000).toISOString(), // Hace 1 día
            exercises: [
              {
                id: 'ex-1', name: 'Press de Banca',
                sets: [{ id: 'set-1', reps: 10, weight: 60, completed: true }, { id: 'set-2', reps: 8, weight: 65, completed: true }]
              }
            ]
          },
          {
            id: 'sample-2',
            startTime: new Date(Date.now() - 172800000).toISOString(), // Hace 2 días
            exercises: [
              {
                id: 'ex-2', name: 'Sentadilla Libre',
                sets: [{ id: 'set-3', reps: 12, weight: 80, completed: true }]
              }
            ]
          }
        ];
        
        await AsyncStorage.setItem(WORKOUT_HISTORY_KEY, JSON.stringify(SAMPLE_HISTORY));
        return SAMPLE_HISTORY;
      }

      return history;
    } catch (error) {
      console.error('Error getting workout history:', error);
      return [];
    }
  },

  async saveWorkoutToHistory(workout: ActiveWorkout): Promise<void> {
    try {
      const history = await this.getWorkoutHistory();
      const finishedWorkout = { ...workout, endTime: new Date().toISOString() };
      const updatedHistory = [finishedWorkout, ...history];
      await AsyncStorage.setItem(WORKOUT_HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error saving workout to history:', error);
    }
  }
};

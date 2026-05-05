import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActiveWorkout } from '../types/workout';

const ACTIVE_WORKOUT_KEY = '@active_workout';

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
  }
};

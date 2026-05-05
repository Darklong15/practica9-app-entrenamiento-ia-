import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Card, Button } from '../../components/ui';
import { useTheme } from '../../theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';

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
  {
    name: 'Push Day',
    exercises: ['Bench Press', 'Shoulder Press', 'Chest Fly', 'Tricep Dips', 'Push-ups'],
  },
  {
    name: 'Pull Day',
    exercises: ['Pull-ups', 'Deadlift', 'Bent-over Rows', 'Bicep Curls'],
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'RoutineDetailScreen'>;

export default function RoutineDetailScreen({ route }: Props) {
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const theme = useTheme();
  const navigation = useNavigation<any>();

  React.useEffect(() => {
    if (route.params?.routineName) {
      const routine = routinesData.find(r => r.name === route.params?.routineName);
      if (routine) {
        setSelectedRoutine(routine);
      }
    }
  }, [route.params?.routineName]);

  const selectRoutine = (routine: Routine) => {
    setSelectedRoutine(routine);
  };

  const goBack = () => {
    if (route.params?.routineName) {
      navigation.goBack();
    } else {
      setSelectedRoutine(null);
    }
  };

  const startRoutine = () => {
    if (selectedRoutine) {
      navigation.navigate('MainTabs', {
        screen: 'WorkoutScreen',
        params: { routineExercises: selectedRoutine.exercises }
      });
    }
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text variant="h2" style={styles.selectedTitle}>Rutina: {selectedRoutine.name}</Text>
            <Button size="sm" onPress={startRoutine}>Empezar Rutina</Button>
          </View>
          <Text variant="h3" style={styles.exercisesTitle}>Ejercicios:</Text>
          {selectedRoutine.exercises.map((exercise, index) => (
            <Card key={index} style={styles.exerciseCard} variant="elevated">
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
    marginBottom: 0,
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

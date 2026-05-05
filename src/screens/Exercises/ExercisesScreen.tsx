import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, Text, Card } from '../../components/ui';
import { useTheme } from '../../theme';

interface Exercise {
  name: string;
  description: string;
  benefits: string;
}

interface Category {
  name: string;
  exercises: Exercise[];
}

const exercisesData: Category[] = [
  {
    name: 'Pecho',
    exercises: [
      {
        name: 'Push-ups',
        description: 'Ejercicio básico de fuerza que trabaja el pecho, hombros y tríceps.',
        benefits: 'Mejora la fuerza del torso superior y no requiere equipo.',
      },
      {
        name: 'Bench Press',
        description: 'Levantamiento con barra o mancuernas en banco plano.',
        benefits: 'Desarrolla masa muscular en el pecho y aumenta la fuerza general.',
      },
      {
        name: 'Chest Fly',
        description: 'Apertura de brazos con mancuernas o máquinas para aislar el pecho.',
        benefits: 'Enfocado en el estiramiento y contracción del pectoral.',
      },
    ],
  },
  {
    name: 'Espalda',
    exercises: [
      {
        name: 'Pull-ups',
        description: 'Tirón hacia arriba en barra fija.',
        benefits: 'Fortalece la espalda y mejora la fuerza de agarre.',
      },
      {
        name: 'Deadlift',
        description: 'Levantamiento de peso muerto desde el suelo.',
        benefits: 'Trabaja toda la cadena posterior y mejora la postura.',
      },
      {
        name: 'Bent-over Rows',
        description: 'Remo inclinado con barra o mancuernas.',
        benefits: 'Desarrolla los músculos de la espalda media y superior.',
      },
    ],
  },
  {
    name: 'Piernas',
    exercises: [
      {
        name: 'Squats',
        description: 'Sentadilla profunda con o sin peso.',
        benefits: 'Fortalece cuádriceps, glúteos y mejora la movilidad.',
      },
      {
        name: 'Lunges',
        description: 'Zancadas alternas hacia adelante o lateral.',
        benefits: 'Trabaja equilibrio y fuerza unilateral en piernas.',
      },
      {
        name: 'Leg Press',
        description: 'Presión de piernas en máquina.',
        benefits: 'Aísla los cuádriceps y glúteos con controlado movimiento.',
      },
    ],
  },
  {
    name: 'Hombros',
    exercises: [
      {
        name: 'Shoulder Press',
        description: 'Presión de hombros con mancuernas o barra.',
        benefits: 'Desarrolla deltoides y mejora la estabilidad del hombro.',
      },
      {
        name: 'Lateral Raises',
        description: 'Elevación lateral de brazos con mancuernas.',
        benefits: 'Aísla los deltoides laterales para hombros más anchos.',
      },
    ],
  },
  {
    name: 'Brazos',
    exercises: [
      {
        name: 'Bicep Curls',
        description: 'Curl de bíceps con mancuernas o barra.',
        benefits: 'Fortalece los bíceps y mejora la apariencia de los brazos.',
      },
      {
        name: 'Tricep Dips',
        description: 'Fondos en paralelas o banco.',
        benefits: 'Trabaja los tríceps y mejora la extensión del brazo.',
      },
    ],
  },
  {
    name: 'Core',
    exercises: [
      {
        name: 'Plank',
        description: 'Mantener posición de plancha isométrica.',
        benefits: 'Fortalece el core y mejora la estabilidad central.',
      },
    ],
  },
];

export default function ExercisesScreen() {
  const theme = useTheme();

  return (
    <ScreenContainer scrollable={true}>
      <View style={styles.header}>
        <Text variant="h1">Biblioteca de Ejercicios</Text>
      </View>
      
      {exercisesData.map((category, index) => (
        <View key={index} style={styles.categoryContainer}>
          <Text variant="h2" style={styles.categoryTitle}>{category.name}</Text>
          {category.exercises.map((exercise, idx) => (
            <Card key={idx} style={styles.card}>
              <Text variant="h3" style={{ marginBottom: 8 }}>{exercise.name}</Text>
              <Text variant="body" color={theme.colors.textSecondary} style={{ marginBottom: 8 }}>
                {exercise.description}
              </Text>
              <Text variant="body" color={theme.colors.primary} style={{ fontStyle: 'italic' }}>
                Beneficios: {exercise.benefits}
              </Text>
            </Card>
          ))}
        </View>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    marginBottom: 16,
    marginLeft: 4,
  },
  card: {
    marginBottom: 12,
  },
});

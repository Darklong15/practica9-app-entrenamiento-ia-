<<<<<<< HEAD
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
=======
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, Text, Card, Input } from '../../components/ui';
import { useTheme } from '../../theme';
>>>>>>> main

interface Exercise {
  name: string;
  description: string;
  benefits: string;
<<<<<<< HEAD
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

const ExercisesScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Biblioteca de Ejercicios</Text>
      {exercisesData.map((category, index) => (
        <View key={index} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category.name}</Text>
          {category.exercises.map((exercise, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.description}>{exercise.description}</Text>
              <Text style={styles.benefits}>Beneficios: {exercise.benefits}</Text>
            </View>
          ))}
        </View>
      ))}
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
    fontFamily: 'BebasNeue_400Regular', // Asumiendo que se carga globalmente
=======
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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = exercisesData.map(category => {
    // Si la categoría coincide con la búsqueda, devolvemos todos los ejercicios
    if (category.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return category;
    }
    // Si no, filtramos los ejercicios de esta categoría
    const filteredExercises = category.exercises.filter(ex => 
      ex.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...category, exercises: filteredExercises };
  }).filter(category => category.exercises.length > 0);

  return (
    <ScreenContainer scrollable={true} padding="md">
      <View style={styles.header}>
        <Text variant="h1" style={{ marginBottom: 16 }}>Biblioteca</Text>
        <Input 
          placeholder="Buscar ejercicio o músculo..." 
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={{ width: '100%' }}
        />
      </View>
      
      {filteredData.length === 0 ? (
        <View style={{ alignItems: 'center', padding: 32 }}>
          <Text variant="body" color={theme.colors.textSecondary}>No se encontraron resultados.</Text>
        </View>
      ) : (
        filteredData.map((category, index) => (
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
        ))
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
    alignItems: 'center',
>>>>>>> main
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
<<<<<<< HEAD
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 12,
    fontFamily: 'BebasNeue_400Regular',
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
    elevation: 3, // Para Android
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
    fontFamily: 'Inter_600SemiBold',
  },
  description: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 8,
    fontFamily: 'Inter_400Regular',
  },
  benefits: {
    fontSize: 14,
    color: '#495057',
    fontStyle: 'italic',
    fontFamily: 'Inter_400Regular',
  },
});

export default ExercisesScreen;
=======
    marginBottom: 16,
    marginLeft: 4,
  },
  card: {
    marginBottom: 12,
  },
});
>>>>>>> main

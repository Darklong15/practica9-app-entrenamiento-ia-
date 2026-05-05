import React from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenContainer, Text, Card, Badge } from '../../components/ui';
import { useTheme } from '../../theme';

export default function DashboardScreen() {
  const theme = useTheme();
  const navigation = useNavigation<any>();

  const today = new Date();
  const formattedDate = today.toLocaleDateString('es-ES', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <ScreenContainer scrollable={true} padding="md">
      <View style={{ gap: theme.spacing.xl, paddingVertical: theme.spacing.md, paddingBottom: theme.spacing.xxl }}>
        
        {/* 1. HEADER */}
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
            <Text variant="h1">Hola, Atleta</Text>
            <MaterialCommunityIcons name="arm-flex" size={28} color={theme.colors.primary} />
          </View>
          <Text variant="caption" color={theme.colors.textSecondary} style={{ marginTop: theme.spacing.xs }}>
            {capitalizedDate}
          </Text>
        </View>

        {/* 2. CARD "Último Entrenamiento" */}
        <View style={{ gap: theme.spacing.md }}>
          <Card padding="lg">
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.spacing.sm }}>
              <Badge variant="primary" label="PUSH DAY" />
              <Text variant="caption" color={theme.colors.textMuted}>Hace 2 días</Text>
            </View>
            <Text variant="h2" style={{ marginBottom: theme.spacing.md }}>Pecho, Hombros y Tríceps</Text>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text variant="stat">45</Text>
                <Text variant="label" color={theme.colors.textMuted}>MIN</Text>
              </View>
              <View>
                <Text variant="stat">6</Text>
                <Text variant="label" color={theme.colors.textMuted}>EJERCICIOS</Text>
              </View>
              <View>
                <Text variant="stat">12.5K</Text>
                <Text variant="label" color={theme.colors.textMuted}>KG TOTAL</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* 3. SECCIÓN "Accesos Rápidos" */}
        <View style={{ gap: theme.spacing.sm }}>
          <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
            <Pressable 
              style={[styles.quickAccessCard, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: theme.spacing.md }]}
              onPress={() => navigation.navigate('WorkoutScreen')}
            >
              <MaterialCommunityIcons name="dumbbell" size={32} color={theme.colors.primary} style={{ marginBottom: theme.spacing.sm }} />
              <Text variant="body">Entrenar</Text>
            </Pressable>
            <Pressable 
              style={[styles.quickAccessCard, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: theme.spacing.md }]}
              onPress={() => navigation.navigate('HistoryScreen')}
            >
              <MaterialCommunityIcons name="clipboard-text-clock" size={32} color={theme.colors.primary} style={{ marginBottom: theme.spacing.sm }} />
              <Text variant="body">Historial</Text>
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
            <Pressable 
              style={[styles.quickAccessCard, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: theme.spacing.md }]}
              onPress={() => navigation.navigate('ExercisesScreen')}
            >
              <MaterialCommunityIcons name="book-open-variant" size={32} color={theme.colors.primary} style={{ marginBottom: theme.spacing.sm }} />
              <Text variant="body">Ejercicios</Text>
            </Pressable>
            <Pressable 
              style={[styles.quickAccessCard, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: theme.spacing.md }]}
              onPress={() => navigation.navigate('TimerScreen')}
            >
              <MaterialCommunityIcons name="timer-outline" size={32} color={theme.colors.primary} style={{ marginBottom: theme.spacing.sm }} />
              <Text variant="body">Temporizador</Text>
            </Pressable>
          </View>
        </View>

        {/* 4. SECCIÓN "Resumen Semanal" */}
        <View style={{ gap: theme.spacing.md }}>
          <Card padding="md">
            <Text variant="h3" style={{ marginBottom: theme.spacing.md }}>Esta Semana</Text>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.lg }}>
              <View>
                <Text variant="stat">3</Text>
                <Text variant="label" color={theme.colors.textMuted}>ENTRENOS</Text>
              </View>
              <View>
                <Text variant="stat">2:15</Text>
                <Text variant="label" color={theme.colors.textMuted}>HORAS</Text>
              </View>
              <View>
                <Text variant="stat">18.2K</Text>
                <Text variant="label" color={theme.colors.textMuted}>KG TOTAL</Text>
              </View>
            </View>

            <View style={{ width: '100%', height: 6, backgroundColor: theme.colors.primaryMuted, borderRadius: theme.borderRadius.full, overflow: 'hidden' }}>
              <View style={{ width: '60%', height: '100%', backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.full }} />
            </View>
          </Card>
        </View>

        {/* 5. SECCIÓN "Rutinas Sugeridas" */}
        <View style={{ gap: theme.spacing.md }}>
          <Text variant="h3">Rutinas</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} nestedScrollEnabled={true} contentContainerStyle={{ gap: theme.spacing.md }}>
            <Pressable onPress={() => navigation.navigate('RoutineDetailScreen', { routineName: 'Push Day' })}>
              <Card style={{ width: 260 }}>
                <Badge variant="primary" label="PUSH" style={{ marginBottom: theme.spacing.sm }} />
                <Text variant="h3" style={{ marginBottom: theme.spacing.xs }}>Push Day</Text>
                <Text variant="body" color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.sm }}>Pecho, Hombros, Tríceps</Text>
                <Text variant="caption" color={theme.colors.textMuted}>5 ejercicios • ~45 min</Text>
              </Card>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('RoutineDetailScreen', { routineName: 'Pull Day' })}>
              <Card style={{ width: 260 }}>
                <Badge variant="default" label="PULL" style={{ marginBottom: theme.spacing.sm }} />
                <Text variant="h3" style={{ marginBottom: theme.spacing.xs }}>Pull Day</Text>
                <Text variant="body" color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.sm }}>Espalda, Bíceps</Text>
                <Text variant="caption" color={theme.colors.textMuted}>6 ejercicios • ~50 min</Text>
              </Card>
            </Pressable>
          </ScrollView>
        </View>

      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  quickAccessCard: {
    flex: 1,
  }
});

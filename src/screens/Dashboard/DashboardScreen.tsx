import React, { useState, useCallback, useRef } from 'react';
import { View, ScrollView, Pressable, StyleSheet, Modal, Animated } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenContainer, Text, Card, Badge, Button, Input } from '../../components/ui';
import { useTheme } from '../../theme';
import { WorkoutHistory } from '../../types/workout';

export default function DashboardScreen() {
  const theme = useTheme();
  const navigation = useNavigation<any>();

  const [userName, setUserName] = useState('Atleta');
  const [history, setHistory] = useState<WorkoutHistory[]>([]);
  const [isNameModalVisible, setNameModalVisible] = useState(false);
  const [tempName, setTempName] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const loadData = async () => {
    try {
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) setUserName(storedName);

      const storedHistory = await AsyncStorage.getItem('workoutHistory');
      if (storedHistory) setHistory(JSON.parse(storedHistory));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, [])
  );

  const saveName = async () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
      await AsyncStorage.setItem('userName', tempName.trim());
    }
    setNameModalVisible(false);
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString('es-ES', { 
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
  });
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  // --- STATS ÚLTIMO ENTRENAMIENTO ---
  const lastWorkout = history.length > 0 ? history[0] : null;

  // --- STATS ESTA SEMANA ---
  const currentWeekWorkouts = history.filter(w => {
    const wDate = new Date(w.date.split('/').reverse().join('-')); // Asume formato DD/MM/YYYY local
    const diffTime = Math.abs(today.getTime() - wDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= 7;
  });

  const weekCount = currentWeekWorkouts.length;
  const weekMinutes = currentWeekWorkouts.reduce((acc, curr) => acc + curr.duration, 0);
  const weekHours = Math.floor(weekMinutes / 60);
  const weekMinsRem = weekMinutes % 60;
  const weekKg = currentWeekWorkouts.reduce((acc, curr) => acc + (curr.totalKg || 0), 0);
  const goalWorkouts = 5;
  const progressPercent = Math.min((weekCount / goalWorkouts) * 100, 100);

  return (
    <ScreenContainer scrollable={true} padding="md">
      <Animated.View style={{ opacity: fadeAnim, gap: theme.spacing.xl, paddingVertical: theme.spacing.md, paddingBottom: theme.spacing.xxl }}>
        
        {/* 1. HEADER */}
        <View>
          <Pressable 
            style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}
            onPress={() => {
              setTempName(userName !== 'Atleta' ? userName : '');
              setNameModalVisible(true);
            }}
          >
            <Text variant="h1">Hola, {userName}</Text>
            <MaterialCommunityIcons name="pencil-outline" size={20} color={theme.colors.textMuted} />
          </Pressable>
          <Text variant="caption" color={theme.colors.textSecondary} style={{ marginTop: theme.spacing.xs }}>
            {capitalizedDate}
          </Text>
        </View>

        {/* 2. CARD "Último Entrenamiento" */}
        <View style={{ gap: theme.spacing.md }}>
          {lastWorkout ? (
            <Card padding="lg">
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.spacing.sm }}>
                <Badge variant="primary" label="COMPLETADO" />
                <Text variant="caption" color={theme.colors.textMuted}>{lastWorkout.date}</Text>
              </View>
              <Text variant="h2" style={{ marginBottom: theme.spacing.md }}>Sesión de {lastWorkout.duration} min</Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text variant="stat">{lastWorkout.duration}</Text>
                  <Text variant="label" color={theme.colors.textMuted}>MIN</Text>
                </View>
                <View>
                  <Text variant="stat">{lastWorkout.exercises.length}</Text>
                  <Text variant="label" color={theme.colors.textMuted}>EJERCICIOS</Text>
                </View>
                <View>
                  <Text variant="stat">{(lastWorkout.totalKg / 1000).toFixed(1)}K</Text>
                  <Text variant="label" color={theme.colors.textMuted}>KG TOTAL</Text>
                </View>
              </View>
            </Card>
          ) : (
            <Card padding="lg" style={{ alignItems: 'center', paddingVertical: 32 }}>
              <MaterialCommunityIcons name="arm-flex" size={48} color={theme.colors.primary} style={{ marginBottom: 16 }} />
              <Text variant="h2" style={{ marginBottom: 8 }}>¿Listo para empezar?</Text>
              <Text variant="body" color={theme.colors.textSecondary} style={{ textAlign: 'center', marginBottom: 24 }}>
                Aún no tienes entrenamientos registrados. Ve a la pestaña Entrenar y registra tu primera sesión.
              </Text>
              <Button onPress={() => navigation.navigate('WorkoutScreen')}>Iniciar Entrenamiento</Button>
            </Card>
          )}
        </View>

        {/* 3. SECCIÓN "Accesos Rápidos" */}
        <View style={{ gap: theme.spacing.sm }}>
          <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
            <Pressable 
              style={({pressed}) => [styles.quickAccessCard, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: theme.spacing.md, opacity: pressed ? 0.8 : 1 }]}
              onPress={() => navigation.navigate('WorkoutScreen')}
            >
              <MaterialCommunityIcons name="dumbbell" size={32} color={theme.colors.primary} style={{ marginBottom: theme.spacing.sm }} />
              <Text variant="body">Entrenar</Text>
            </Pressable>
            <Pressable 
              style={({pressed}) => [styles.quickAccessCard, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: theme.spacing.md, opacity: pressed ? 0.8 : 1 }]}
              onPress={() => navigation.navigate('HistoryScreen')}
            >
              <MaterialCommunityIcons name="clipboard-text-clock" size={32} color={theme.colors.primary} style={{ marginBottom: theme.spacing.sm }} />
              <Text variant="body">Historial</Text>
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
            <Pressable 
              style={({pressed}) => [styles.quickAccessCard, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: theme.spacing.md, opacity: pressed ? 0.8 : 1 }]}
              onPress={() => navigation.navigate('ExercisesScreen')}
            >
              <MaterialCommunityIcons name="book-open-variant" size={32} color={theme.colors.primary} style={{ marginBottom: theme.spacing.sm }} />
              <Text variant="body">Ejercicios</Text>
            </Pressable>
            <Pressable 
              style={({pressed}) => [styles.quickAccessCard, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: theme.spacing.md, opacity: pressed ? 0.8 : 1 }]}
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
                <Text variant="stat">{weekCount}</Text>
                <Text variant="label" color={theme.colors.textMuted}>ENTRENOS</Text>
              </View>
              <View>
                <Text variant="stat">{weekHours}:{weekMinsRem.toString().padStart(2, '0')}</Text>
                <Text variant="label" color={theme.colors.textMuted}>HORAS</Text>
              </View>
              <View>
                <Text variant="stat">{(weekKg / 1000).toFixed(1)}K</Text>
                <Text variant="label" color={theme.colors.textMuted}>KG TOTAL</Text>
              </View>
            </View>

            <View style={{ width: '100%', height: 6, backgroundColor: theme.colors.primaryMuted, borderRadius: theme.borderRadius.full, overflow: 'hidden' }}>
              <View style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.full }} />
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

      </Animated.View>

      {/* MODAL EDITAR NOMBRE */}
      <Modal visible={isNameModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
            <Text variant="h2" style={{ marginBottom: 16 }}>¿Cómo te llamas?</Text>
            <Input
              placeholder="Tu nombre"
              value={tempName}
              onChangeText={setTempName}
              containerStyle={{ marginBottom: 24 }}
            />
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Button variant="secondary" onPress={() => setNameModalVisible(false)} style={{ flex: 1 }}>Cancelar</Button>
              <Button variant="primary" onPress={saveName} style={{ flex: 1 }}>Guardar</Button>
            </View>
          </View>
        </View>
      </Modal>

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  quickAccessCard: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  }
});

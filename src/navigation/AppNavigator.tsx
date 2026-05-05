import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { RootStackParamList, MainTabParamList } from './types';

// Screens
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import WorkoutScreen from '../screens/Workout/WorkoutScreen';
import HistoryScreen from '../screens/History/HistoryScreen';
import ExercisesScreen from '../screens/Exercises/ExercisesScreen';
import ProgressScreen from '../screens/Progress/ProgressScreen';
import TimerScreen from '../screens/Timer/TimerScreen';
import RoutineDetailScreen from '../screens/Routines/RoutineDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: theme.typography.fonts.inter.semiBold,
        },
      }}
    >
      <Tab.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="WorkoutScreen"
        component={WorkoutScreen}
        options={{
          tabBarLabel: 'Entrenar',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="dumbbell" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'Historial',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="clipboard-text-clock" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="ExercisesScreen"
        component={ExercisesScreen}
        options={{
          tabBarLabel: 'Ejercicios',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book-open-variant" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="ProgressScreen"
        component={ProgressScreen}
        options={{
          tabBarLabel: 'Progreso',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chart-line" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default function AppNavigator() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.textPrimary,
        headerTitleStyle: {
          fontFamily: theme.typography.fonts.inter.semiBold,
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TimerScreen"
        component={TimerScreen}
        options={{ title: 'Temporizador' }}
      />
      <Stack.Screen
        name="RoutineDetailScreen"
        component={RoutineDetailScreen}
        options={{ title: 'Detalle de Rutina' }}
      />
    </Stack.Navigator>
  );
}

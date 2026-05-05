export type RootStackParamList = {
  MainTabs: { screen?: string; params?: any };
  TimerScreen: { duration?: number };
  RoutineDetailScreen: { routineName?: string };
};

export type MainTabParamList = {
  DashboardScreen: undefined;
  WorkoutScreen: { routineExercises?: string[] };
  HistoryScreen: undefined;
  ExercisesScreen: undefined;
  ProgressScreen: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  TimerScreen: { duration?: number };
  RoutineDetailScreen: { routineId: string };
};

export type MainTabParamList = {
  DashboardScreen: undefined;
  WorkoutScreen: undefined;
  HistoryScreen: undefined;
  ExercisesScreen: undefined;
  ProgressScreen: undefined;
};

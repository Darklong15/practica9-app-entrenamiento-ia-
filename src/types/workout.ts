export interface WorkoutSet {
  id: string;
  reps: number;
  weight: number;
  completed: boolean;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  sets: WorkoutSet[];
}

export interface ActiveWorkout {
  id: string;
  startTime: string; // ISO string
  endTime?: string; // ISO string
  exercises: WorkoutExercise[];
}

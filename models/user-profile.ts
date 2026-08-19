export type FitnessLevel =
  | 'beginner'
  | 'intermediate'
  | 'advanced';

export type FitnessGoal =
  | 'muscle_gain'
  | 'weight_loss'
  | 'strength'
  | 'general_fitness';

export type TrainingDays = 2 | 3 | 4 | 5 | 6;

export type WorkoutDuration = 20 | 30 | 45 | 60 | 90;

export type Equipment =
  | 'none'
  | 'home'
  | 'basic_gym'
  | 'full_gym';

export type UserProfile = {
  uid: string;

  fitnessLevel: FitnessLevel;

  mainGoal: FitnessGoal;

  trainingDays: TrainingDays;

  workoutDuration: WorkoutDuration;

  equipment: Equipment;

  createdAt?: unknown;

  updatedAt?: unknown;
};
export type Exercise = {
  id: string;
  name: string;
  muscleGroup: string;

  sets: number;
  reps: number;
  restSeconds: number;

  instructions: string;

  beginnerInstructions: string[];
  commonMistakes: string[];
  tips: string[];
  equipment: string;
};

export type Workout = {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;

  difficulty:
    | 'beginner'
    | 'intermediate'
    | 'advanced';

  goal:
    | 'muscle_gain'
    | 'weight_loss'
    | 'strength'
    | 'fitness'
    | 'all';

  exercises: Exercise[];
};
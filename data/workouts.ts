export type Exercise = {
  id: string;
  name: string;
  muscleGroup: string;
  instructions: string;
  sets: number;
  reps: number;
  restSeconds: number;
  videoUrl?: string;
};

export type Workout = {
  id: string;
  title: string;
  description: string;
  difficulty:
    | 'beginner'
    | 'intermediate'
    | 'advanced';
  goal:
    | 'muscle_gain'
    | 'weight_loss'
    | 'strength'
    | 'fitness';
  durationMinutes: number;
  exercises: Exercise[];
};

export const workouts: Workout[] = [
  {
    id: 'beginner-muscle_gain-1',
    title: 'Beginner Muscle Gain A',
    description:
      'A beginner-friendly full-body workout focused on building strength and muscle.',
    difficulty: 'beginner',
    goal: 'muscle_gain',
    durationMinutes: 30,

    exercises: [
      {
        id: 'bodyweight-squat',
        name: 'Bodyweight Squat',
        muscleGroup: 'Legs',
        instructions:
          'Stand with your feet shoulder-width apart. Lower your hips while keeping your chest up, then push through your feet to stand.',
        sets: 3,
        reps: 10,
        restSeconds: 60,
      },

      {
        id: 'wall-push-up',
        name: 'Wall Push-Up',
        muscleGroup: 'Chest',
        instructions:
          'Place your hands on a wall at chest height. Bend your elbows to bring your chest toward the wall, then push back.',
        sets: 3,
        reps: 10,
        restSeconds: 60,
      },

      {
        id: 'glute-bridge',
        name: 'Glute Bridge',
        muscleGroup: 'Glutes',
        instructions:
          'Lie on your back with your knees bent. Push through your feet and raise your hips, then slowly lower them.',
        sets: 3,
        reps: 12,
        restSeconds: 60,
      },

      {
        id: 'bird-dog',
        name: 'Bird Dog',
        muscleGroup: 'Core',
        instructions:
          'Start on your hands and knees. Extend the opposite arm and leg while keeping your core stable.',
        sets: 2,
        reps: 8,
        restSeconds: 45,
      },

      {
        id: 'knee-plank',
        name: 'Knee Plank',
        muscleGroup: 'Core',
        instructions:
          'Support your body using your forearms and knees. Keep your body straight and brace your core.',
        sets: 2,
        reps: 20,
        restSeconds: 45,
      },
    ],
  },

  {
    id: 'beginner-muscle_gain-2',
    title: 'Beginner Muscle Gain B',
    description:
      'A second beginner full-body session with different movement patterns.',
    difficulty: 'beginner',
    goal: 'muscle_gain',
    durationMinutes: 30,

    exercises: [
      {
        id: 'reverse-lunge',
        name: 'Reverse Lunge',
        muscleGroup: 'Legs',
        instructions:
          'Step one foot backward and lower your body under control. Push through your front foot to return.',
        sets: 2,
        reps: 8,
        restSeconds: 60,
      },

      {
        id: 'wall-push-up',
        name: 'Wall Push-Up',
        muscleGroup: 'Chest',
        instructions:
          'Keep your body straight as you lower your chest toward the wall and push back.',
        sets: 3,
        reps: 10,
        restSeconds: 60,
      },

      {
        id: 'glute-bridge',
        name: 'Glute Bridge',
        muscleGroup: 'Glutes',
        instructions:
          'Drive your hips upward while squeezing your glutes, then lower slowly.',
        sets: 3,
        reps: 12,
        restSeconds: 60,
      },

      {
        id: 'bird-dog',
        name: 'Bird Dog',
        muscleGroup: 'Core',
        instructions:
          'Extend the opposite arm and leg while keeping your hips stable.',
        sets: 2,
        reps: 8,
        restSeconds: 45,
      },

      {
        id: 'knee-plank',
        name: 'Knee Plank',
        muscleGroup: 'Core',
        instructions:
          'Keep your core tight and maintain a straight line from your shoulders to your knees.',
        sets: 2,
        reps: 20,
        restSeconds: 45,
      },
    ],
  },
];
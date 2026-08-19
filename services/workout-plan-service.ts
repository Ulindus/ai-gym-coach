import type {
  Equipment,
  FitnessLevel,
  Goal,
  TrainingDays,
  WorkoutDuration,
} from '@/services/firestore';

export type WorkoutDay = {
  day: string;
  type: 'workout' | 'rest' | 'recovery';
  workoutId?: string;
  title: string;
};

export type WeeklyPlan = {
  goal: Goal;
  fitnessLevel: FitnessLevel;
  trainingDays: TrainingDays;
  workoutDuration: WorkoutDuration;
  equipment: Equipment;
  days: WorkoutDay[];
};

type GeneratePlanParams = {
  fitnessLevel: FitnessLevel;
  mainGoal: Goal;
  trainingDays: TrainingDays;
  workoutDuration: WorkoutDuration;
  equipment: Equipment;
};

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export function generateWorkoutPlan({
  fitnessLevel,
  mainGoal,
  trainingDays,
  workoutDuration,
  equipment,
}: GeneratePlanParams): WeeklyPlan {
  const schedule = createSchedule(
    fitnessLevel,
    mainGoal,
    trainingDays,
  );

  const workoutDays = schedule.filter(
    (day) => day.type === 'workout',
  );

  const days = schedule.map((day, index) => {
    if (day.type !== 'workout') {
      return {
        ...day,
        day: DAYS[index],
      };
    }

    const workoutIndex =
      workoutDays.indexOf(day);

    return {
      ...day,
      day: DAYS[index],
      workoutId: createWorkoutId(
        fitnessLevel,
        mainGoal,
        workoutIndex,
      ),
      title: getWorkoutTitle(
        fitnessLevel,
        mainGoal,
        workoutIndex,
      ),
    };
  });

  return {
    goal: mainGoal,
    fitnessLevel,
    trainingDays,
    workoutDuration,
    equipment,
    days,
  };
}

function createSchedule(
  level: FitnessLevel,
  goal: Goal,
  trainingDays: TrainingDays,
): WorkoutDay[] {
  if (trainingDays === 2) {
    return [
      workout('Full Body A'),
      rest(),
      rest(),
      workout('Full Body B'),
      rest(),
      rest(),
      rest(),
    ];
  }

  if (trainingDays === 3) {
    return [
      workout(
        getThreeDayWorkout(
          level,
          goal,
          0,
        ),
      ),
      rest(),
      workout(
        getThreeDayWorkout(
          level,
          goal,
          1,
        ),
      ),
      rest(),
      workout(
        getThreeDayWorkout(
          level,
          goal,
          2,
        ),
      ),
      rest(),
      rest(),
    ];
  }

  if (trainingDays === 4) {
    return [
      workout(
        getFourDayWorkout(
          level,
          goal,
          0,
        ),
      ),
      workout(
        getFourDayWorkout(
          level,
          goal,
          1,
        ),
      ),
      rest(),
      workout(
        getFourDayWorkout(
          level,
          goal,
          2,
        ),
      ),
      workout(
        getFourDayWorkout(
          level,
          goal,
          3,
        ),
      ),
      rest(),
      rest(),
    ];
  }

  if (trainingDays === 5) {
    return [
      workout(
        getFiveDayWorkout(
          level,
          goal,
          0,
        ),
      ),
      workout(
        getFiveDayWorkout(
          level,
          goal,
          1,
        ),
      ),
      workout(
        getFiveDayWorkout(
          level,
          goal,
          2,
        ),
      ),
      rest(),
      workout(
        getFiveDayWorkout(
          level,
          goal,
          3,
        ),
      ),
      workout(
        getFiveDayWorkout(
          level,
          goal,
          4,
        ),
      ),
      rest(),
    ];
  }

  return [
    workout(
      getSixDayWorkout(
        level,
        goal,
        0,
      ),
    ),
    workout(
      getSixDayWorkout(
        level,
        goal,
        1,
      ),
    ),
    workout(
      getSixDayWorkout(
        level,
        goal,
        2,
      ),
    ),
    workout(
      getSixDayWorkout(
        level,
        goal,
        3,
      ),
    ),
    workout(
      getSixDayWorkout(
        level,
        goal,
        4,
      ),
    ),
    workout(
      getSixDayWorkout(
        level,
        goal,
        5,
      ),
    ),
    rest(),
  ];
}

function workout(title: string): WorkoutDay {
  return {
    day: '',
    type: 'workout',
    title,
  };
}

function rest(): WorkoutDay {
  return {
    day: '',
    type: 'rest',
    title: 'Rest Day',
  };
}

function getThreeDayWorkout(
  level: FitnessLevel,
  goal: Goal,
  index: number,
) {
  if (goal === 'muscle_gain') {
    return index === 0
      ? 'Full Body A'
      : index === 1
        ? 'Full Body B'
        : 'Full Body C';
  }

  if (goal === 'weight_loss') {
    return index === 0
      ? 'Full Body + Cardio A'
      : index === 1
        ? 'Full Body + Cardio B'
        : 'Full Body + Cardio C';
  }

  if (goal === 'strength') {
    return index === 0
      ? 'Strength A'
      : index === 1
        ? 'Strength B'
        : 'Strength C';
  }

  return index === 0
    ? 'Full Body Fitness A'
    : index === 1
      ? 'Full Body Fitness B'
      : 'Full Body Fitness C';
}

function getFourDayWorkout(
  level: FitnessLevel,
  goal: Goal,
  index: number,
) {
  if (goal === 'muscle_gain') {
    return index % 2 === 0
      ? 'Upper Body'
      : 'Lower Body';
  }

  if (goal === 'weight_loss') {
    return index % 2 === 0
      ? 'Strength + Cardio'
      : 'Full Body Fat Burn';
  }

  if (goal === 'strength') {
    return index % 2 === 0
      ? 'Upper Strength'
      : 'Lower Strength';
  }

  return index % 2 === 0
    ? 'Full Body Fitness'
    : 'Conditioning';
}

function getFiveDayWorkout(
  level: FitnessLevel,
  goal: Goal,
  index: number,
) {
  if (goal === 'muscle_gain') {
    return [
      'Chest + Triceps',
      'Back + Biceps',
      'Legs',
      'Shoulders + Arms',
      'Full Body',
    ][index];
  }

  if (goal === 'weight_loss') {
    return [
      'Full Body Burn',
      'Lower Body + Cardio',
      'Upper Body + Cardio',
      'Full Body Burn',
      'Conditioning',
    ][index];
  }

  if (goal === 'strength') {
    return [
      'Upper Strength',
      'Lower Strength',
      'Push Strength',
      'Pull Strength',
      'Leg Strength',
    ][index];
  }

  return [
    'Full Body',
    'Cardio + Core',
    'Upper Body',
    'Lower Body',
    'Conditioning',
  ][index];
}

function getSixDayWorkout(
  level: FitnessLevel,
  goal: Goal,
  index: number,
) {
  if (goal === 'muscle_gain') {
    return [
      'Push',
      'Pull',
      'Legs',
      'Push',
      'Pull',
      'Legs',
    ][index];
  }

  if (goal === 'weight_loss') {
    return [
      'Full Body Burn',
      'Cardio',
      'Lower Body',
      'Upper Body',
      'Full Body Burn',
      'Conditioning',
    ][index];
  }

  if (goal === 'strength') {
    return [
      'Push Strength',
      'Pull Strength',
      'Leg Strength',
      'Upper Strength',
      'Lower Strength',
      'Full Body Strength',
    ][index];
  }

  return [
    'Full Body',
    'Cardio + Core',
    'Upper Body',
    'Lower Body',
    'Full Body',
    'Conditioning',
  ][index];
}

function createWorkoutId(
  level: FitnessLevel,
  goal: Goal,
  index: number,
) {
  return `${level}-${goal}-${index + 1}`;
}

function getWorkoutTitle(
  level: FitnessLevel,
  goal: Goal,
  index: number,
) {
  const type =
    index % 2 === 0
      ? 'Workout A'
      : 'Workout B';

  return `${formatLevel(level)} ${formatGoal(
    goal,
  )} ${type}`;
}

function formatLevel(
  level: FitnessLevel,
) {
  return (
    level.charAt(0).toUpperCase() +
    level.slice(1)
  );
}

function formatGoal(goal: Goal) {
  switch (goal) {
    case 'muscle_gain':
      return 'Muscle Gain';

    case 'weight_loss':
      return 'Weight Loss';

    case 'strength':
      return 'Strength';

    case 'fitness':
      return 'General Fitness';

    default:
      return 'Fitness';
  }
}
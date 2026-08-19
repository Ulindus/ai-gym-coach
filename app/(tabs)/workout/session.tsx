import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    Colors,
    FontSize,
    Radius,
    Spacing,
} from '@/constants/theme';
import { workouts } from '@/data/workouts';
import { saveWorkoutSession } from '@/services/workout-service';

export default function WorkoutSessionScreen() {
  const { workoutId } =
    useLocalSearchParams<{ workoutId: string }>();

  const workout = useMemo(
    () => workouts.find((item) => item.id === workoutId),
    [workoutId],
  );

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [completedSets, setCompletedSets] = useState(0);
  const [resting, setResting] = useState(false);
  const [restSeconds, setRestSeconds] = useState(0);
  const [saving, setSaving] = useState(false);
  const exercise = workout?.exercises[exerciseIndex];

  useEffect(() => {
    if (!resting || restSeconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setRestSeconds((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          setResting(false);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resting, restSeconds]);

  if (!workout || !exercise) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Workout not found.
        </Text>

        <Pressable
          onPress={() => router.back()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Go Back
          </Text>
        </Pressable>
      </View>
    );
  }

  const isLastExercise =
    exerciseIndex === workout.exercises.length - 1;

  const isLastSet =
    completedSets >= exercise.sets;

  const progress =
    ((exerciseIndex + completedSets / exercise.sets) /
      workout.exercises.length) *
    100;

  const handleCompleteSet = () => {
    if (completedSets >= exercise.sets) {
      return;
    }

    const nextSet = completedSets + 1;

    setCompletedSets(nextSet);

    if (nextSet < exercise.sets) {
      setRestSeconds(exercise.restSeconds);
      setResting(true);
    }
  };

  const handleNextExercise = async () => {
  if (!isLastExercise) {
    setExerciseIndex((previous) => previous + 1);
    setCompletedSets(0);
    setResting(false);
    setRestSeconds(0);

    return;
  }

  if (saving) {
    return;
  }

  try {
    setSaving(true);

    const calories = Math.round(
      workout.durationMinutes * 7,
    );

    await saveWorkoutSession({
      workoutId: workout.id,
      workoutName: workout.title,
      durationMinutes: workout.durationMinutes,
      completedExercises: workout.exercises.length,
      totalExercises: workout.exercises.length,
      calories,
    });

    router.replace('/(tabs)/progress');
  } catch (error) {
    console.error(
      'Failed to save workout:',
      error,
    );

    Alert.alert(
      'Workout not saved',
      'We could not save your workout. Please try again.',
    );
  } finally {
    setSaving(false);
  }
};

  const handleSkipRest = () => {
    setResting(false);
    setRestSeconds(0);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>×</Text>
          </Pressable>

          <View style={styles.headerCenter}>
            <Text style={styles.sessionLabel}>
              WORKOUT
            </Text>

            <Text
              style={styles.workoutName}
              numberOfLines={1}
            >
              {workout.title}
            </Text>
          </View>

          <Text style={styles.exerciseCounter}>
            {exerciseIndex + 1}/
            {workout.exercises.length}
          </Text>
        </View>

        {/* Progress */}
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(
                  progress,
                  100,
                )}%`,
              },
            ]}
          />
        </View>

        {/* Exercise */}
        <View style={styles.exerciseHeader}>
          <Text style={styles.exerciseNumber}>
            EXERCISE {exerciseIndex + 1}
          </Text>

          <Text style={styles.exerciseName}>
            {exercise.name}
          </Text>

          <Text style={styles.muscleGroup}>
            {exercise.muscleGroup}
          </Text>
        </View>

        {/* Exercise visual */}
        <View style={styles.visual}>
          <Text style={styles.visualEmoji}>
            💪
          </Text>

          <Text style={styles.visualText}>
            Focus on controlled movement
          </Text>
        </View>

        {/* Set information */}
        <View style={styles.setCard}>
          <View style={styles.setMain}>
            <Text style={styles.setLabel}>
              TARGET
            </Text>

            <Text style={styles.setValue}>
              {exercise.sets} × {exercise.reps}
            </Text>

            <Text style={styles.setDescription}>
              {exercise.reps === 30
                ? 'seconds'
                : 'repetitions per set'}
            </Text>
          </View>

          <View style={styles.setDivider} />

          <View style={styles.setMain}>
            <Text style={styles.setLabel}>
              COMPLETED
            </Text>

            <Text style={styles.completedValue}>
              {completedSets}/{exercise.sets}
            </Text>

            <Text style={styles.setDescription}>
              sets
            </Text>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsCard}>
          <Text style={styles.sectionTitle}>
            How to perform
          </Text>

          <Text style={styles.instructions}>
            {exercise.instructions}
          </Text>
        </View>

        {/* Rest timer */}
        {resting && (
          <View style={styles.restCard}>
            <Text style={styles.restTitle}>
              REST
            </Text>

            <Text style={styles.timer}>
              {formatTime(restSeconds)}
            </Text>

            <Text style={styles.restDescription}>
              Recover before your next set
            </Text>

            <Pressable
              onPress={handleSkipRest}
              style={styles.skipRestButton}
            >
              <Text style={styles.skipRestText}>
                Skip Rest
              </Text>
            </Pressable>
          </View>
        )}

        {/* Main action */}
        {!resting && !isLastSet && (
          <Pressable
            onPress={handleCompleteSet}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>
              Complete Set
            </Text>

            <Text style={styles.primaryArrow}>
              →
            </Text>
          </Pressable>
        )}

        {!resting && isLastSet && (
          <Pressable
  onPress={handleNextExercise}
  disabled={saving}
  style={[
    styles.primaryButton,
    saving && styles.disabledButton,
  ]}
>
           <Text style={styles.primaryButtonText}>
  {isLastExercise
    ? saving
      ? 'Saving...'
      : 'Complete Workout'
    : 'Next Exercise'}
</Text>

            <Text style={styles.primaryArrow}>
              →
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },

  center: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },

  errorText: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '800',
    marginBottom: Spacing.lg,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },

  closeButton: {
    width: 42,
    height: 42,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeText: {
    color: Colors.text,
    fontSize: 28,
    lineHeight: 30,
    fontWeight: '300',
  },

  headerCenter: {
    flex: 1,
    marginHorizontal: Spacing.md,
  },

  sessionLabel: {
    color: Colors.primary,
    fontSize: FontSize.xs,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  workoutName: {
    color: Colors.text,
    fontSize: FontSize.sm,
    fontWeight: '800',
    marginTop: 2,
  },

  exerciseCounter: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '800',
  },

  progressBackground: {
    height: 6,
    backgroundColor: Colors.surfaceLight,
    borderRadius: Radius.full,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
  },

  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
  },

  exerciseHeader: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },

  exerciseNumber: {
    color: Colors.primary,
    fontSize: FontSize.xs,
    fontWeight: '900',
    letterSpacing: 2,
  },

  exerciseName: {
    color: Colors.text,
    fontSize: FontSize.xxxl,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: Spacing.sm,
  },

  muscleGroup: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    marginTop: Spacing.xs,
  },

  visual: {
    height: 180,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },

  visualEmoji: {
    fontSize: 70,
  },

  visualText: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    marginTop: Spacing.sm,
  },

  setCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },

  setMain: {
    flex: 1,
    alignItems: 'center',
  },

  setDivider: {
    width: 1,
    backgroundColor: Colors.border,
  },

  setLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    fontWeight: '900',
    letterSpacing: 1,
  },

  setValue: {
    color: Colors.text,
    fontSize: FontSize.xxl,
    fontWeight: '900',
    marginTop: Spacing.xs,
  },

  completedValue: {
    color: Colors.primary,
    fontSize: FontSize.xxl,
    fontWeight: '900',
    marginTop: Spacing.xs,
  },

  setDescription: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    marginTop: 2,
  },

  instructionsCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },

  sectionTitle: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: '900',
    marginBottom: Spacing.sm,
  },

  instructions: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    lineHeight: 22,
  },

  restCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },

  restTitle: {
    color: Colors.primary,
    fontSize: FontSize.sm,
    fontWeight: '900',
    letterSpacing: 2,
  },

  timer: {
    color: Colors.text,
    fontSize: 56,
    fontWeight: '900',
    marginVertical: Spacing.sm,
  },

  restDescription: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },

  skipRestButton: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceLight,
  },

  skipRestText: {
    color: Colors.text,
    fontSize: FontSize.sm,
    fontWeight: '800',
  },

  primaryButton: {
    height: 58,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },

  primaryButtonText: {
    color: Colors.background,
    fontSize: FontSize.md,
    fontWeight: '900',
  },

  primaryArrow: {
    color: Colors.background,
    fontSize: FontSize.xl,
    fontWeight: '900',
  },

  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
  },

  buttonText: {
    color: Colors.background,
    fontWeight: '900',
  },
  disabledButton: {
  opacity: 0.6,
},
});
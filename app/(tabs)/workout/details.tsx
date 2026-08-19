import { router, useLocalSearchParams } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { workouts } from '@/data/workouts';

import {
  Colors,
  FontSize,
  Radius,
  Spacing,
} from '@/constants/theme';

export default function WorkoutDetailsScreen() {
  const { workoutId } =
    useLocalSearchParams<{
      workoutId: string;
    }>();

  const workout = workouts.find(
    (item) => item.id === workoutId,
  );

  if (!workout) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>
          Workout not found
        </Text>

        <Text style={styles.errorText}>
          This workout is not available yet.
        </Text>

        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>
            Go Back
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* BACK */}

        <Pressable
          onPress={() => router.back()}
          style={styles.back}
        >
          <Text style={styles.backArrow}>
            ←
          </Text>

          <Text style={styles.backText}>
            Back
          </Text>
        </Pressable>

        {/* HEADER */}

        <Text style={styles.eyebrow}>
          {workout.difficulty.toUpperCase()}
        </Text>

        <Text style={styles.title}>
          {workout.title}
        </Text>

        <Text style={styles.description}>
          {workout.description}
        </Text>

        {/* SUMMARY */}

        <View style={styles.summary}>
          <SummaryItem
            value={`${workout.durationMinutes}`}
            label="Minutes"
          />

          <SummaryItem
            value={`${workout.exercises.length}`}
            label="Exercises"
          />

          <SummaryItem
            value={formatGoal(workout.goal)}
            label="Goal"
          />
        </View>

        {/* EXERCISES */}

        <Text style={styles.sectionTitle}>
          Exercises
        </Text>

        {workout.exercises.map(
          (exercise, index) => (
            <View
              key={exercise.id}
              style={styles.exerciseCard}
            >
              <View style={styles.number}>
                <Text style={styles.numberText}>
                  {index + 1}
                </Text>
              </View>

              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>
                  {exercise.name}
                </Text>

                <Text style={styles.muscle}>
                  {exercise.muscleGroup}
                </Text>

                <Text style={styles.instructions}>
                  {exercise.instructions}
                </Text>

                <View
                  style={styles.exerciseMeta}
                >
                  <Text style={styles.meta}>
                    {exercise.sets} sets
                  </Text>

                  <Text style={styles.meta}>
                    {exercise.reps} reps
                  </Text>

                  <Text style={styles.meta}>
                    {exercise.restSeconds}s rest
                  </Text>
                </View>
              </View>
            </View>
          ),
        )}

        {/* START */}

        <Pressable
          onPress={() =>
            router.push({
              pathname:
                '/(tabs)/workout/session',
              params: {
                workoutId:
                  workout.id,
              },
            })
          }
          style={styles.startButton}
        >
          <Text style={styles.startText}>
            Start Workout
          </Text>

          <Text style={styles.startArrow}>
            →
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function SummaryItem({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <View style={styles.summaryItem}>
      <Text style={styles.summaryValue}>
        {value}
      </Text>

      <Text style={styles.summaryLabel}>
        {label}
      </Text>
    </View>
  );
}

function formatGoal(
  goal:
    | 'muscle_gain'
    | 'weight_loss'
    | 'strength'
    | 'fitness',
) {
  switch (goal) {
    case 'muscle_gain':
      return 'Muscle';

    case 'weight_loss':
      return 'Weight Loss';

    case 'strength':
      return 'Strength';

    case 'fitness':
      return 'Fitness';

    default:
      return 'Fitness';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Colors.background,
  },

  content: {
    padding:
      Spacing.lg,
    paddingBottom:
      Spacing.xxl,
  },

  center: {
    flex: 1,
    backgroundColor:
      Colors.background,
    alignItems: 'center',
    justifyContent:
      'center',
    padding:
      Spacing.lg,
  },

  errorTitle: {
    color: Colors.text,
    fontSize:
      FontSize.xl,
    fontWeight: '900',
  },

  errorText: {
    color:
      Colors.textSecondary,
    fontSize:
      FontSize.sm,
    marginTop:
      Spacing.sm,
  },

  backButton: {
    marginTop:
      Spacing.lg,
    backgroundColor:
      Colors.primary,
    paddingHorizontal:
      Spacing.lg,
    paddingVertical:
      Spacing.sm,
    borderRadius:
      Radius.md,
  },

  backButtonText: {
    color:
      Colors.background,
    fontWeight: '900',
  },

  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom:
      Spacing.xl,
  },

  backArrow: {
    color:
      Colors.primary,
    fontSize:
      FontSize.xl,
  },

  backText: {
    color:
      Colors.textSecondary,
    fontSize:
      FontSize.sm,
    fontWeight: '700',
  },

  eyebrow: {
    color:
      Colors.primary,
    fontSize:
      FontSize.xs,
    fontWeight: '900',
    letterSpacing: 2,
  },

  title: {
    color: Colors.text,
    fontSize:
      FontSize.xxxl,
    fontWeight: '900',
    marginTop:
      Spacing.sm,
  },

  description: {
    color:
      Colors.textSecondary,
    fontSize:
      FontSize.md,
    lineHeight: 24,
    marginTop:
      Spacing.md,
  },

  summary: {
    flexDirection: 'row',
    backgroundColor:
      Colors.surface,
    borderWidth: 1,
    borderColor:
      Colors.border,
    borderRadius:
      Radius.lg,
    padding:
      Spacing.md,
    marginTop:
      Spacing.xl,
    marginBottom:
      Spacing.xl,
  },

  summaryItem: {
    flex: 1,
    alignItems:
      'center',
  },

  summaryValue: {
    color:
      Colors.primary,
    fontSize:
      FontSize.lg,
    fontWeight: '900',
  },

  summaryLabel: {
    color:
      Colors.textMuted,
    fontSize:
      FontSize.xs,
    marginTop: 4,
  },

  sectionTitle: {
    color: Colors.text,
    fontSize:
      FontSize.lg,
    fontWeight: '900',
    marginBottom:
      Spacing.md,
  },

  exerciseCard: {
    flexDirection: 'row',
    backgroundColor:
      Colors.surface,
    borderWidth: 1,
    borderColor:
      Colors.border,
    borderRadius:
      Radius.lg,
    padding:
      Spacing.md,
    marginBottom:
      Spacing.sm,
  },

  number: {
    width: 36,
    height: 36,
    borderRadius:
      Radius.full,
    backgroundColor:
      Colors.primary,
    alignItems:
      'center',
    justifyContent:
      'center',
  },

  numberText: {
    color:
      Colors.background,
    fontWeight: '900',
  },

  exerciseInfo: {
    flex: 1,
    marginLeft:
      Spacing.md,
  },

  exerciseName: {
    color: Colors.text,
    fontSize:
      FontSize.md,
    fontWeight: '900',
  },

  muscle: {
    color:
      Colors.primary,
    fontSize:
      FontSize.xs,
    fontWeight: '700',
    marginTop: 3,
  },

  instructions: {
    color:
      Colors.textSecondary,
    fontSize:
      FontSize.sm,
    lineHeight: 20,
    marginTop:
      Spacing.sm,
  },

  exerciseMeta: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop:
      Spacing.md,
  },

  meta: {
    color:
      Colors.text,
    fontSize:
      FontSize.xs,
    fontWeight: '800',
  },

  startButton: {
    height: 58,
    backgroundColor:
      Colors.primary,
    borderRadius:
      Radius.md,
    flexDirection: 'row',
    alignItems:
      'center',
    justifyContent:
      'center',
    gap: Spacing.sm,
    marginTop:
      Spacing.lg,
  },

  startText: {
    color:
      Colors.background,
    fontSize:
      FontSize.md,
    fontWeight: '900',
  },

  startArrow: {
    color:
      Colors.background,
    fontSize:
      FontSize.xl,
    fontWeight: '900',
  },
});
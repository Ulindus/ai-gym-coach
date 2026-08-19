import { router } from 'expo-router';
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

export default function WorkoutScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>
            TRAINING
          </Text>

          <Text style={styles.title}>
            Choose your workout
          </Text>

          <Text style={styles.subtitle}>
            Pick a workout that matches your current
            fitness goal.
          </Text>
        </View>

        {workouts.map((workout) => (
          <View
            key={workout.id}
            style={styles.card}
          >
            <View style={styles.cardTop}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {workout.difficulty.toUpperCase()}
                </Text>
              </View>

              <Text style={styles.duration}>
                {workout.durationMinutes} min
              </Text>
            </View>

            <Text style={styles.workoutTitle}>
              {workout.title}
            </Text>

            <Text style={styles.description}>
              {workout.description}
            </Text>

            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseCount}>
                {workout.exercises.length} exercises
              </Text>

              <Text style={styles.goal}>
                {formatGoal(workout.goal)}
              </Text>
            </View>

            <Pressable
              onPress={() =>
                router.push({
                  pathname:
                    '/(tabs)/workout/details',
                  params: {
                    workoutId: workout.id,
                  },
                })
              }
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.buttonText}>
                View Workout
              </Text>

              <Text style={styles.arrow}>
                →
              </Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function formatGoal(goal: string) {
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
      return 'All Goals';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },

  header: {
    marginBottom: Spacing.xl,
  },

  eyebrow: {
    color: Colors.primary,
    fontSize: FontSize.xs,
    fontWeight: '900',
    letterSpacing: 2,
  },

  title: {
    color: Colors.text,
    fontSize: FontSize.xxxl,
    fontWeight: '900',
    marginTop: Spacing.sm,
  },

  subtitle: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    lineHeight: 24,
    marginTop: Spacing.sm,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },

  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceLight,
  },

  badgeText: {
    color: Colors.primary,
    fontSize: FontSize.xs,
    fontWeight: '900',
  },

  duration: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },

  workoutTitle: {
    color: Colors.text,
    fontSize: FontSize.xl,
    fontWeight: '900',
    marginTop: Spacing.lg,
  },

  description: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    lineHeight: 22,
    marginTop: Spacing.sm,
  },

  exerciseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  exerciseCount: {
    color: Colors.text,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },

  goal: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },

  button: {
    height: 52,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  buttonText: {
    color: Colors.background,
    fontSize: FontSize.md,
    fontWeight: '900',
  },

  arrow: {
    color: Colors.background,
    fontSize: FontSize.xl,
    fontWeight: '900',
  },
});
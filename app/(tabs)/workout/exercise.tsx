import { router, useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
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

export default function ExerciseGuideScreen() {
  const { workoutId, exerciseId } =
    useLocalSearchParams<{
      workoutId: string;
      exerciseId: string;
    }>();

  const workout = workouts.find(
    (item) => item.id === workoutId,
  );

  const exercise = workout?.exercises.find(
    (item) => item.id === exerciseId,
  );

  const videoSource =
    exercise?.id === 'bodyweight-squat'
      ? require('@/assets/videos/bodyweight-squat.mp4')
      : null;

  const player = useVideoPlayer(
    videoSource,
    (player) => {
      player.loop = true;
    },
  );

  if (!workout || !exercise) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Exercise not found.
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

  const handleStartExercise = () => {
    router.push({
      pathname:
        '/(tabs)/workout/session',
      params: {
        workoutId: workout.id,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Back */}
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

        {/* Header */}
        <Text style={styles.eyebrow}>
          EXERCISE GUIDE
        </Text>

        <Text style={styles.title}>
          {exercise.name}
        </Text>

        <Text style={styles.muscle}>
          {exercise.muscleGroup}
        </Text>

        {/* Video */}
        <View style={styles.videoContainer}>
          {videoSource ? (
            <VideoView
              player={player}
              style={styles.video}
              nativeControls
              contentFit="contain"
            />
          ) : (
            <View style={styles.videoPlaceholder}>
              <Text style={styles.videoIcon}>
                ▶
              </Text>

              <Text style={styles.placeholderTitle}>
                Demo video coming soon
              </Text>

              <Text style={styles.placeholderText}>
                Follow the instructions below
                to perform this exercise safely.
              </Text>
            </View>
          )}
        </View>

        {/* Workout info */}
        <View style={styles.infoRow}>
          <InfoCard
            value={`${exercise.sets}`}
            label="Sets"
          />

          <InfoCard
            value={`${exercise.reps}`}
            label={
              exercise.reps >= 20
                ? 'Seconds'
                : 'Reps'
            }
          />

          <InfoCard
            value={`${exercise.restSeconds}s`}
            label="Rest"
          />
        </View>

        {/* Equipment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Equipment
          </Text>

          <View style={styles.equipmentCard}>
            <Text style={styles.equipmentIcon}>
              🏋️
            </Text>

            <Text style={styles.equipmentText}>
              {exercise.equipment}
            </Text>
          </View>
        </View>

        {/* How to perform */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            How to do it
          </Text>

          {exercise.beginnerInstructions.map(
            (instruction, index) => (
              <View
                key={index}
                style={styles.step}
              >
                <View style={styles.stepNumber}>
                  <Text
                    style={styles.stepNumberText}
                  >
                    {index + 1}
                  </Text>
                </View>

                <Text style={styles.stepText}>
                  {instruction}
                </Text>
              </View>
            ),
          )}
        </View>

        {/* Common mistakes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            ⚠️ Common mistakes
          </Text>

          <View style={styles.warningCard}>
            {exercise.commonMistakes.map(
              (mistake, index) => (
                <View
                  key={index}
                  style={styles.bulletRow}
                >
                  <Text style={styles.bullet}>
                    •
                  </Text>

                  <Text style={styles.bulletText}>
                    {mistake}
                  </Text>
                </View>
              ),
            )}
          </View>
        </View>

        {/* Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            💡 Beginner tips
          </Text>

          <View style={styles.tipsCard}>
            {exercise.tips.map(
              (tip, index) => (
                <View
                  key={index}
                  style={styles.bulletRow}
                >
                  <Text style={styles.tipBullet}>
                    ✓
                  </Text>

                  <Text style={styles.bulletText}>
                    {tip}
                  </Text>
                </View>
              ),
            )}
          </View>
        </View>

        {/* Start */}
        <Pressable
          onPress={handleStartExercise}
          style={({ pressed }) => [
            styles.startButton,
            pressed &&
              styles.buttonPressed,
          ]}
        >
          <Text style={styles.startButtonText}>
            Start Exercise
          </Text>

          <Text style={styles.startArrow}>
            →
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function InfoCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoValue}>
        {value}
      </Text>

      <Text style={styles.infoLabel}>
        {label}
      </Text>
    </View>
  );
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
  },

  backButton: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
  },

  backButtonText: {
    color: Colors.background,
    fontWeight: '800',
  },

  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },

  backArrow: {
    color: Colors.primary,
    fontSize: FontSize.xl,
  },

  backText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '700',
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

  muscle: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    marginTop: Spacing.xs,
  },

  videoContainer: {
    width: '100%',
    height: 220,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: Spacing.xl,
  },

  video: {
    width: '100%',
    height: '100%',
  },

  videoPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },

  videoIcon: {
    width: 60,
    height: 60,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    color: Colors.background,
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 60,
    overflow: 'hidden',
  },

  placeholderTitle: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: '800',
    marginTop: Spacing.md,
  },

  placeholderText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: Spacing.xs,
  },

  infoRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },

  infoCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 85,
  },

  infoValue: {
    color: Colors.primary,
    fontSize: FontSize.xl,
    fontWeight: '900',
  },

  infoLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    marginTop: 3,
  },

  section: {
    marginTop: Spacing.xl,
  },

  sectionTitle: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '900',
    marginBottom: Spacing.md,
  },

  equipmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },

  equipmentIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
  },

  equipmentText: {
    color: Colors.text,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },

  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },

  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },

  stepNumberText: {
    color: Colors.background,
    fontSize: FontSize.sm,
    fontWeight: '900',
  },

  stepText: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    lineHeight: 23,
    paddingTop: 4,
  },

  warningCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.warning,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },

  tipsCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },

  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },

  bullet: {
    color: Colors.warning,
    fontSize: FontSize.lg,
    marginRight: Spacing.sm,
  },

  tipBullet: {
    color: Colors.success,
    fontSize: FontSize.md,
    fontWeight: '900',
    marginRight: Spacing.sm,
  },

  bulletText: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    lineHeight: 21,
  },

  startButton: {
    height: 58,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xl,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  startButtonText: {
    color: Colors.background,
    fontSize: FontSize.md,
    fontWeight: '900',
  },

  startArrow: {
    color: Colors.background,
    fontSize: FontSize.xl,
    fontWeight: '900',
  },
});
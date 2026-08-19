import { router } from 'expo-router';
import { useState } from 'react';
import {
    Pressable,
    SafeAreaView,
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

type FitnessLevel =
  | 'beginner'
  | 'intermediate'
  | 'advanced';

type FitnessGoal =
  | 'muscle_gain'
  | 'weight_loss'
  | 'strength'
  | 'general_fitness';

type TrainingDays = 2 | 3 | 4 | 5 | 6;

type WorkoutDuration = 20 | 30 | 45 | 60 | 90;

type Equipment =
  | 'none'
  | 'home'
  | 'basic_gym'
  | 'full_gym';

export default function ProfileSetupScreen() {
  const [fitnessLevel, setFitnessLevel] =
    useState<FitnessLevel>('beginner');

  const [mainGoal, setMainGoal] =
    useState<FitnessGoal>('general_fitness');

  const [trainingDays, setTrainingDays] =
    useState<TrainingDays>(3);

  const [workoutDuration, setWorkoutDuration] =
    useState<WorkoutDuration>(30);

  const [equipment, setEquipment] =
    useState<Equipment>('none');

  const handleContinue = () => {
    console.log({
      fitnessLevel,
      mainGoal,
      trainingDays,
      workoutDuration,
      equipment,
    });

    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.step}>
            STEP 1 OF 1
          </Text>

          <Text style={styles.title}>
            Build Your Plan
          </Text>

          <Text style={styles.subtitle}>
            Tell us about your training so we can
            create workouts that fit you.
          </Text>
        </View>

        {/* Fitness Level */}
        <Section
          title="What's your experience?"
          subtitle="Choose your current fitness level."
        >
          <Option
            title="Beginner"
            description="New to structured workouts"
            selected={
              fitnessLevel === 'beginner'
            }
            onPress={() =>
              setFitnessLevel('beginner')
            }
          />

          <Option
            title="Intermediate"
            description="I train regularly"
            selected={
              fitnessLevel === 'intermediate'
            }
            onPress={() =>
              setFitnessLevel('intermediate')
            }
          />

          <Option
            title="Advanced"
            description="Experienced with structured training"
            selected={
              fitnessLevel === 'advanced'
            }
            onPress={() =>
              setFitnessLevel('advanced')
            }
          />
        </Section>

        {/* Goal */}
        <Section
          title="What's your main goal?"
          subtitle="We'll customize your workouts around this."
        >
          <GoalOption
            emoji="💪"
            title="Muscle Gain"
            description="Build muscle and size"
            selected={
              mainGoal === 'muscle_gain'
            }
            onPress={() =>
              setMainGoal('muscle_gain')
            }
          />

          <GoalOption
            emoji="🔥"
            title="Weight Loss"
            description="Burn calories and improve fitness"
            selected={
              mainGoal === 'weight_loss'
            }
            onPress={() =>
              setMainGoal('weight_loss')
            }
          />

          <GoalOption
            emoji="🏋️"
            title="Strength"
            description="Get stronger and lift better"
            selected={
              mainGoal === 'strength'
            }
            onPress={() =>
              setMainGoal('strength')
            }
          />

          <GoalOption
            emoji="❤️"
            title="General Fitness"
            description="Improve overall health and fitness"
            selected={
              mainGoal === 'general_fitness'
            }
            onPress={() =>
              setMainGoal('general_fitness')
            }
          />
        </Section>

        {/* Training Days */}
        <Section
          title="Training days"
          subtitle="How many days can you train each week?"
        >
          <View style={styles.choiceRow}>
            {[2, 3, 4, 5, 6].map((days) => (
              <Choice
                key={days}
                label={`${days}`}
                selected={
                  trainingDays === days
                }
                onPress={() =>
                  setTrainingDays(
                    days as TrainingDays,
                  )
                }
              />
            ))}
          </View>
        </Section>

        {/* Duration */}
        <Section
          title="Workout duration"
          subtitle="How much time do you usually have?"
        >
          <View style={styles.choiceGrid}>
            {[20, 30, 45, 60, 90].map(
              (duration) => (
                <Choice
                  key={duration}
                  label={`${duration} min`}
                  selected={
                    workoutDuration ===
                    duration
                  }
                  onPress={() =>
                    setWorkoutDuration(
                      duration as WorkoutDuration,
                    )
                  }
                  wide
                />
              ),
            )}
          </View>
        </Section>

        {/* Equipment */}
        <Section
          title="Where do you train?"
          subtitle="We'll only recommend exercises you can do."
        >
          <GoalOption
            emoji="🏃"
            title="No Equipment"
            description="Bodyweight exercises only"
            selected={equipment === 'none'}
            onPress={() =>
              setEquipment('none')
            }
          />

          <GoalOption
            emoji="🏠"
            title="Home"
            description="Basic equipment at home"
            selected={equipment === 'home'}
            onPress={() =>
              setEquipment('home')
            }
          />

          <GoalOption
            emoji="🏋️"
            title="Basic Gym"
            description="Dumbbells and basic machines"
            selected={
              equipment === 'basic_gym'
            }
            onPress={() =>
              setEquipment('basic_gym')
            }
          />

          <GoalOption
            emoji="🏢"
            title="Full Gym"
            description="Full range of gym equipment"
            selected={
              equipment === 'full_gym'
            }
            onPress={() =>
              setEquipment('full_gym')
            }
          />
        </Section>

        {/* Continue */}
        <Pressable
          onPress={handleContinue}
          style={({ pressed }) => [
            styles.continueButton,
            pressed &&
              styles.buttonPressed,
          ]}
        >
          <Text style={styles.continueText}>
            Create My Plan
          </Text>

          <Text style={styles.arrow}>
            →
          </Text>
        </Pressable>

        <Text style={styles.footerText}>
          You can change these preferences later.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      <Text style={styles.sectionSubtitle}>
        {subtitle}
      </Text>

      <View style={styles.options}>
        {children}
      </View>
    </View>
  );
}

function Option({
  title,
  description,
  selected,
  onPress,
}: {
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.option,
        selected && styles.selectedOption,
      ]}
    >
      <View style={styles.optionText}>
        <Text style={styles.optionTitle}>
          {title}
        </Text>

        <Text style={styles.optionDescription}>
          {description}
        </Text>
      </View>

      <View
        style={[
          styles.radio,
          selected && styles.radioSelected,
        ]}
      >
        {selected && (
          <View style={styles.radioInner} />
        )}
      </View>
    </Pressable>
  );
}

function GoalOption({
  emoji,
  title,
  description,
  selected,
  onPress,
}: {
  emoji: string;
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.option,
        selected && styles.selectedOption,
      ]}
    >
      <Text style={styles.emoji}>
        {emoji}
      </Text>

      <View style={styles.optionText}>
        <Text style={styles.optionTitle}>
          {title}
        </Text>

        <Text style={styles.optionDescription}>
          {description}
        </Text>
      </View>

      <View
        style={[
          styles.radio,
          selected && styles.radioSelected,
        ]}
      >
        {selected && (
          <View style={styles.radioInner} />
        )}
      </View>
    </Pressable>
  );
}

function Choice({
  label,
  selected,
  onPress,
  wide = false,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  wide?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.choice,
        wide && styles.wideChoice,
        selected && styles.selectedChoice,
      ]}
    >
      <Text
        style={[
          styles.choiceText,
          selected &&
            styles.selectedChoiceText,
        ]}
      >
        {label}
      </Text>
    </Pressable>
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

  header: {
    marginBottom: Spacing.xl,
  },

  step: {
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
    lineHeight: 23,
    marginTop: Spacing.sm,
  },

  section: {
    marginBottom: Spacing.xl,
  },

  sectionTitle: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '900',
  },

  sectionSubtitle: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    marginTop: 4,
    marginBottom: Spacing.md,
  },

  options: {
    gap: Spacing.sm,
  },

  option: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },

  selectedOption: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surfaceLight,
  },

  emoji: {
    fontSize: 27,
    marginRight: Spacing.md,
  },

  optionText: {
    flex: 1,
  },

  optionTitle: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: '800',
  },

  optionDescription: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    marginTop: 4,
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: Radius.full,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioSelected: {
    borderColor: Colors.primary,
  },

  radioInner: {
    width: 11,
    height: 11,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
  },

  choiceRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },

  choiceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },

  choice: {
    flex: 1,
    minWidth: 48,
    height: 50,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  wideChoice: {
    minWidth: '30%',
    flexGrow: 1,
  },

  selectedChoice: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  choiceText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '800',
  },

  selectedChoiceText: {
    color: Colors.background,
  },

  continueButton: {
    height: 58,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  continueText: {
    color: Colors.background,
    fontSize: FontSize.md,
    fontWeight: '900',
  },

  arrow: {
    color: Colors.background,
    fontSize: FontSize.xl,
    fontWeight: '900',
  },

  footerText: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
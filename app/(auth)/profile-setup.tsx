
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { auth } from '@/services/firebase';
import { createUserProfile } from '@/services/firestore';

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

type Goal =
  | 'muscle_gain'
  | 'weight_loss'
  | 'strength'
  | 'fitness';

export default function ProfileSetupScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const [fitnessLevel, setFitnessLevel] =
    useState<FitnessLevel>('beginner');

  const [goal, setGoal] =
    useState<Goal>('fitness');

  const [loading, setLoading] = useState(false);
const [trainingDays, setTrainingDays] =
  useState<2 | 3 | 4 | 5 | 6>(3);

const [workoutDuration, setWorkoutDuration] =
  useState<20 | 30 | 45 | 60 | 90>(30);

const [equipment, setEquipment] =
  useState<
    'none' | 'home' | 'basic_gym' | 'full_gym'
  >('none');
  const handleSaveProfile = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      Alert.alert(
        'Session expired',
        'Please login again.',
      );

      router.replace('/(auth)/login');
      return;
    }

    const trimmedName = name.trim();
    const parsedAge = Number(age);
    const parsedHeight = Number(height);
    const parsedWeight = Number(weight);

    if (!trimmedName) {
      Alert.alert(
        'Missing name',
        'Please enter your name.',
      );
      return;
    }

    if (
      !Number.isFinite(parsedAge) ||
      parsedAge < 13 ||
      parsedAge > 100
    ) {
      Alert.alert(
        'Invalid age',
        'Please enter a valid age between 13 and 100.',
      );
      return;
    }

    if (
      !Number.isFinite(parsedHeight) ||
      parsedHeight < 100 ||
      parsedHeight > 250
    ) {
      Alert.alert(
        'Invalid height',
        'Please enter your height in centimeters.',
      );
      return;
    }

    if (
      !Number.isFinite(parsedWeight) ||
      parsedWeight < 25 ||
      parsedWeight > 300
    ) {
      Alert.alert(
        'Invalid weight',
        'Please enter your weight in kilograms.',
      );
      return;
    }

    try {
      setLoading(true);

      await createUserProfile({
        uid: currentUser.uid,
        email: currentUser.email ?? '',
        name: trimmedName,
        age: parsedAge,
        height: parsedHeight,
        weight: parsedWeight,
        fitnessLevel,
        goal,
        trainingDays,
        workoutDuration,
        equipment,
      });

      router.replace('/(tabs)');
    } catch (error: any) {
      console.error(
        'Profile setup error:',
        error,
      );

      Alert.alert(
        'Unable to save profile',
        error?.message ??
          'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>
            AI GYM
          </Text>

          <Text style={styles.title}>
            Tell us about you
          </Text>

          <Text style={styles.subtitle}>
            This helps us create workouts that match
            your body and goals.
          </Text>
        </View>

        {/* Name */}
        <View style={styles.field}>
          <Text style={styles.label}>
            Name
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor={Colors.textMuted}
            value={name}
            onChangeText={setName}
            editable={!loading}
          />
        </View>

        {/* Age */}
        <View style={styles.field}>
          <Text style={styles.label}>
            Age
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Your age"
            placeholderTextColor={Colors.textMuted}
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
            editable={!loading}
          />
        </View>

        {/* Height */}
        <View style={styles.field}>
          <Text style={styles.label}>
            Height
          </Text>

          <View style={styles.inputWithUnit}>
            <TextInput
              style={styles.unitInput}
              placeholder="e.g. 175"
              placeholderTextColor={
                Colors.textMuted
              }
              value={height}
              onChangeText={setHeight}
              keyboardType="decimal-pad"
              editable={!loading}
            />

            <Text style={styles.unit}>
              cm
            </Text>
          </View>
        </View>

        {/* Weight */}
        <View style={styles.field}>
          <Text style={styles.label}>
            Weight
          </Text>

          <View style={styles.inputWithUnit}>
            <TextInput
              style={styles.unitInput}
              placeholder="e.g. 70"
              placeholderTextColor={
                Colors.textMuted
              }
              value={weight}
              onChangeText={setWeight}
              keyboardType="decimal-pad"
              editable={!loading}
            />

            <Text style={styles.unit}>
              kg
            </Text>
          </View>
        </View>

        {/* Fitness Level */}
        <View style={styles.field}>
          <Text style={styles.label}>
            Fitness Level
          </Text>

          <View style={styles.options}>
            {[
              {
                value: 'beginner' as FitnessLevel,
                label: 'Beginner',
              },
              {
                value: 'intermediate' as FitnessLevel,
                label: 'Intermediate',
              },
              {
                value: 'advanced' as FitnessLevel,
                label: 'Advanced',
              },
            ].map((item) => {
              const selected =
                fitnessLevel === item.value;

              return (
                <Pressable
                  key={item.value}
                  onPress={() =>
                    setFitnessLevel(
                      item.value,
                    )
                  }
                  style={[
                    styles.option,
                    selected &&
                      styles.selectedOption,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selected &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Goal */}
        <View style={styles.field}>
          <Text style={styles.label}>
            Main Goal
          </Text>

          <View style={styles.options}>
            {[
              {
                value: 'muscle_gain' as Goal,
                label: 'Muscle Gain',
              },
              {
                value: 'weight_loss' as Goal,
                label: 'Weight Loss',
              },
              {
                value: 'strength' as Goal,
                label: 'Strength',
              },
              {
                value: 'fitness' as Goal,
                label: 'General Fitness',
              },
            ].map((item) => {
              const selected =
                goal === item.value;

              return (
                <Pressable
                  key={item.value}
                  onPress={() =>
                    setGoal(item.value)
                  }
                  style={[
                    styles.option,
                    selected &&
                      styles.selectedOption,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selected &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
                                                       {/* Training Days */}

<View style={styles.field}>
  <Text style={styles.label}>
    How many days can you train?
  </Text>

  <View style={styles.options}>
    {[2, 3, 4, 5, 6].map((days) => {
      const selected =
        trainingDays === days;

      return (
        <Pressable
          key={days}
          onPress={() =>
            setTrainingDays(
              days as 2 | 3 | 4 | 5 | 6,
            )
          }
          style={[
            styles.option,
            selected &&
              styles.selectedOption,
          ]}
        >
          <Text
            style={[
              styles.optionText,
              selected &&
                styles.selectedOptionText,
            ]}
          >
            {days} days
          </Text>
        </Pressable>
      );
    })}
  </View>
</View>

{/* Workout Duration */}

<View style={styles.field}>
  <Text style={styles.label}>
    How long can you train?
  </Text>

  <View style={styles.options}>
    {[20, 30, 45, 60, 90].map(
      (duration) => {
        const selected =
          workoutDuration === duration;

        return (
          <Pressable
            key={duration}
            onPress={() =>
              setWorkoutDuration(
                duration as
                  | 20
                  | 30
                  | 45
                  | 60
                  | 90,
              )
            }
            style={[
              styles.option,
              selected &&
                styles.selectedOption,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                selected &&
                  styles.selectedOptionText,
              ]}
            >
              {duration} min
            </Text>
          </Pressable>
        );
      },
    )}
  </View>
</View>

{/* Equipment */}

<View style={styles.field}>
  <Text style={styles.label}>
    Where do you train?
  </Text>

  <View style={styles.options}>
    {[
      {
        value: 'none' as const,
        label: 'No Equipment',
      },
      {
        value: 'home' as const,
        label: 'Home',
      },
      {
        value: 'basic_gym' as const,
        label: 'Basic Gym',
      },
      {
        value: 'full_gym' as const,
        label: 'Full Gym',
      },
    ].map((item) => {
      const selected =
        equipment === item.value;

      return (
        <Pressable
          key={item.value}
          onPress={() =>
            setEquipment(item.value)
          }
          style={[
            styles.option,
            selected &&
              styles.selectedOption,
          ]}
        >
          <Text
            style={[
              styles.optionText,
              selected &&
                styles.selectedOptionText,
            ]}
          >
            {item.label}
          </Text>
        </Pressable>
      );
    })}
  </View>
</View>
        {/* Save */}
        <Pressable
          onPress={handleSaveProfile}
          disabled={loading}
          style={({ pressed }) => [
            styles.button,
            pressed &&
              styles.buttonPressed,
            loading &&
              styles.buttonDisabled,
          ]}
        >
          <Text style={styles.buttonText}>
            {loading
              ? 'Saving...'
              : 'Continue'}
          </Text>

          {!loading && (
            <Text style={styles.arrow}>
              →
            </Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Colors.background,
  },

  scrollContent: {
    paddingHorizontal:
      Spacing.lg,
    paddingTop:
      Spacing.xl,
    paddingBottom:
      Spacing.xxl,
  },

  header: {
    marginBottom:
      Spacing.xl,
  },

  logo: {
    color: Colors.primary,
    fontSize: FontSize.md,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom:
      Spacing.xl,
  },

  title: {
    color: Colors.text,
    fontSize: FontSize.xxxl,
    fontWeight: '900',
  },

  subtitle: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    lineHeight: 24,
    marginTop:
      Spacing.sm,
  },

  field: {
    marginBottom:
      Spacing.lg,
  },

  label: {
    color: Colors.text,
    fontSize: FontSize.sm,
    fontWeight: '700',
    marginBottom:
      Spacing.sm,
  },

  input: {
    height: 56,
    backgroundColor:
      Colors.surface,
    borderRadius:
      Radius.md,
    borderWidth: 1,
    borderColor:
      Colors.border,
    paddingHorizontal:
      Spacing.md,
    color: Colors.text,
    fontSize: FontSize.md,
  },

  inputWithUnit: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:
      Colors.surface,
    borderRadius:
      Radius.md,
    borderWidth: 1,
    borderColor:
      Colors.border,
  },

  unitInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal:
      Spacing.md,
    color: Colors.text,
    fontSize: FontSize.md,
  },

  unit: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '700',
    paddingRight:
      Spacing.md,
  },

  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },

  option: {
    minHeight: 46,
    paddingHorizontal:
      Spacing.md,
    borderRadius:
      Radius.md,
    backgroundColor:
      Colors.surface,
    borderWidth: 1,
    borderColor:
      Colors.border,
    justifyContent:
      'center',
  },

  selectedOption: {
    backgroundColor:
      Colors.primary,
    borderColor:
      Colors.primary,
  },

  optionText: {
    color:
      Colors.textSecondary,
    fontSize:
      FontSize.sm,
    fontWeight:
      '700',
  },

  selectedOptionText: {
    color:
      Colors.background,
  },

  button: {
    height: 56,
    borderRadius:
      Radius.md,
    backgroundColor:
      Colors.primary,
    flexDirection:
      'row',
    alignItems:
      'center',
    justifyContent:
      'center',
    gap: Spacing.sm,
    marginTop:
      Spacing.sm,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color:
      Colors.background,
    fontSize:
      FontSize.md,
    fontWeight:
      '800',
  },

  arrow: {
    color:
      Colors.background,
    fontSize:
      FontSize.xl,
    fontWeight:
      '800',
  },
});
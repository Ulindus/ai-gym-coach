import { router } from 'expo-router';
import { useState } from 'react';
import {
    Dimensions,
    Pressable,
    SafeAreaView,
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

const { width } = Dimensions.get('window');

const slides = [
  {
    step: '01',
    title: 'Train Smarter',
    description:
      'Get personalized workouts designed around your fitness goals and experience level.',
    icon: '💪',
  },
  {
    step: '02',
    title: 'Your AI Coach',
    description:
      'Get guidance, workout recommendations and motivation from your personal AI fitness coach.',
    icon: '🤖',
  },
  {
    step: '03',
    title: 'Perfect Your Form',
    description:
      'Use your phone camera to analyze exercises, count reps and improve your workout form.',
    icon: '📸',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSlide = slides[currentIndex];
  const isLastSlide = currentIndex === slides.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      router.replace('/(tabs)');
      return;
    }

    setCurrentIndex((previous) => previous + 1);
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topBar}>
          <Text style={styles.logo}>
            AI GYM
          </Text>

          {!isLastSlide && (
            <Pressable onPress={handleSkip}>
              <Text style={styles.skip}>Skip</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.main}>
          <View style={styles.visual}>
            <View style={styles.glow}>
              <Text style={styles.icon}>
                {currentSlide.icon}
              </Text>
            </View>

            <Text style={styles.step}>
              {currentSlide.step}
            </Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {currentSlide.title}
            </Text>

            <Text style={styles.description}>
              {currentSlide.description}
            </Text>
          </View>
        </View>

        <View style={styles.bottom}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex && styles.activeDot,
                ]}
              />
            ))}
          </View>

          <Pressable
            onPress={handleNext}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>
              {isLastSlide ? 'Get Started' : 'Continue'}
            </Text>

            <Text style={styles.arrow}>→</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },

  topBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    color: Colors.primary,
    fontSize: FontSize.md,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  skip: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  visual: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxl,
  },

  glow: {
    width: Math.min(width * 0.58, 250),
    height: Math.min(width * 0.58, 250),
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 80,
  },

  step: {
    color: Colors.primary,
    fontSize: FontSize.xs,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: Spacing.lg,
  },

  textContainer: {
    alignItems: 'center',
  },

  title: {
    color: Colors.text,
    fontSize: FontSize.xxxl,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },

  description: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    lineHeight: 25,
    textAlign: 'center',
    maxWidth: 500,
  },

  bottom: {
    paddingBottom: Spacing.lg,
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.border,
  },

  activeDot: {
    width: 28,
    backgroundColor: Colors.primary,
  },

  button: {
    height: 56,
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

  buttonText: {
    color: Colors.background,
    fontSize: FontSize.md,
    fontWeight: '800',
  },

  arrow: {
    color: Colors.background,
    fontSize: FontSize.xl,
    fontWeight: '800',
  },
});
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppButton from '../../components/AppButton';
import AppCard from '../../components/AppCard';
import { Colors, FontSize, Spacing } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';

export default function HomeScreen() {
  const { horizontalPadding, isTablet } = useResponsive();

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: horizontalPadding,
        },
      ]}
    >
      <Text style={styles.greeting}>Good evening 👋</Text>

      <Text style={styles.title}>Ready to train?</Text>

      <AppCard style={styles.heroCard}>
        <Text style={styles.cardLabel}>TODAY'S WORKOUT</Text>

        <Text style={styles.workoutTitle}>
          Chest & Triceps
        </Text>

        <Text style={styles.description}>
          Build strength and improve your upper body.
        </Text>

        <AppButton
          title="Start Workout"
          onPress={() => {}}
        />
      </AppCard>

      <View style={[styles.statsRow, isTablet && styles.statsTablet]}>
        <AppCard style={styles.statCard}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Workouts</Text>
        </AppCard>

        <AppCard style={styles.statCard}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </AppCard>

        <AppCard style={styles.statCard}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </AppCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Spacing.xl,
  },

  greeting: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    marginBottom: Spacing.xs,
  },

  title: {
    color: Colors.text,
    fontSize: FontSize.xxxl,
    fontWeight: '800',
    marginBottom: Spacing.xl,
  },

  heroCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },

  cardLabel: {
    color: Colors.primary,
    fontSize: FontSize.xs,
    fontWeight: '800',
    letterSpacing: 1,
  },

  workoutTitle: {
    color: Colors.text,
    fontSize: FontSize.xl,
    fontWeight: '800',
    marginTop: Spacing.sm,
  },

  description: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    lineHeight: 21,
    marginVertical: Spacing.md,
  },

  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },

  statsTablet: {
    maxWidth: 900,
  },

  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },

  statValue: {
    color: Colors.primary,
    fontSize: FontSize.xl,
    fontWeight: '800',
  },

  statLabel: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    marginTop: Spacing.xs,
  },
});
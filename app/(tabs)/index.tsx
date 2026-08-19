import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import { useAuth } from '@/hooks/use-auth';

import {
  getUserProfile,
  type UserProfile,
} from '@/services/firestore';

import {
  generateWorkoutPlan,
  type WeeklyPlan,
} from '@/services/workout-plan-service';

import {
  Colors,
  FontSize,
  Radius,
  Spacing,
} from '@/constants/theme';

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return 'Good morning';
  }

  if (hour < 18) {
    return 'Good afternoon';
  }

  return 'Good evening';
}

function getGoalLabel(goal?: UserProfile['goal']) {
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
      return 'General Fitness';
  }
}

function getFitnessLabel(
  level?: UserProfile['fitnessLevel'],
) {
  switch (level) {
    case 'beginner':
      return 'Beginner';

    case 'intermediate':
      return 'Intermediate';

    case 'advanced':
      return 'Advanced';

    default:
      return 'Beginner';
  }
}

export default function HomeScreen() {
  const { user } = useAuth();

  const { width } =
    useWindowDimensions();

  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [weeklyPlan, setWeeklyPlan] =
    useState<WeeklyPlan | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const isTablet = width >= 768;

  const loadProfile = useCallback(
    async () => {
      if (!user) {
        setProfile(null);
        setWeeklyPlan(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const data =
          await getUserProfile(user.uid);

        setProfile(data);

        if (data) {
          const plan =
            generateWorkoutPlan({
              fitnessLevel:
                data.fitnessLevel,

              mainGoal:
                data.goal,

              trainingDays:
                data.trainingDays,

              workoutDuration:
                data.workoutDuration,

              equipment:
                data.equipment,
            });

          setWeeklyPlan(plan);
        } else {
          setWeeklyPlan(null);
        }
      } catch (error) {
        console.error(
          'Failed to load profile:',
          error,
        );
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleRefresh =
    async () => {
      setRefreshing(true);

      await loadProfile();

      setRefreshing(false);
    };

  if (loading) {
    return (
      <View
        style={styles.loadingContainer}
      >
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        />

        <Text
          style={styles.loadingText}
        >
          Loading your gym dashboard...
        </Text>
      </View>
    );
  }

  const displayName =
    profile?.name ||
    user?.displayName ||
    'Athlete';

  /*
   * JavaScript getDay():
   *
   * Sunday    = 0
   * Monday    = 1
   * Tuesday   = 2
   * ...
   * Saturday  = 6
   *
   * Our workout plan:
   *
   * Monday    = 0
   * Tuesday   = 1
   * ...
   * Sunday    = 6
   */

  const javascriptDay =
    new Date().getDay();

  const todayIndex =
    javascriptDay === 0
      ? 6
      : javascriptDay - 1;

  const todayPlan =
    weeklyPlan?.days[todayIndex];

  const isRestDay =
    todayPlan?.type === 'rest';

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={[
          styles.scrollContent,
          isTablet &&
            styles.tabletContent,
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={
              Colors.primary
            }
          />
        }
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View
            style={styles.headerText}
          >
            <Text
              style={styles.greeting}
            >
              {getGreeting()} 👋
            </Text>

            <Text
              style={styles.title}
              numberOfLines={1}
            >
              {displayName}
            </Text>
          </View>

          <View style={styles.avatar}>
            <Text
              style={styles.avatarText}
            >
              {displayName
                .charAt(0)
                .toUpperCase()}
            </Text>
          </View>
        </View>

        {/* TODAY'S WORKOUT */}

        <View
          style={styles.workoutCard}
        >
          <Text
            style={styles.eyebrow}
          >
            TODAY'S WORKOUT
          </Text>

          <Text
            style={styles.workoutTitle}
          >
            {isRestDay
              ? 'Rest Day'
              : todayPlan?.title ||
                'Your Workout'}
          </Text>

          <Text
            style={
              styles.workoutDescription
            }
          >
            {isRestDay
              ? 'Take time to recover. Rest is an important part of your progress.'
              : `A personalized ${getGoalLabel(
                  profile?.goal,
                ).toLowerCase()} workout designed for your ${getFitnessLabel(
                  profile?.fitnessLevel,
                ).toLowerCase()} level.`}
          </Text>

          <View
            style={styles.workoutMeta}
          >
            <View>
              <Text
                style={styles.metaLabel}
              >
                LEVEL
              </Text>

              <Text
                style={styles.metaValue}
              >
                {getFitnessLabel(
                  profile?.fitnessLevel,
                )}
              </Text>
            </View>

            <View>
              <Text
                style={styles.metaLabel}
              >
                GOAL
              </Text>

              <Text
                style={styles.metaValue}
              >
                {getGoalLabel(
                  profile?.goal,
                )}
              </Text>
            </View>

            <View>
              <Text
                style={styles.metaLabel}
              >
                TIME
              </Text>

              <Text
                style={styles.metaValue}
              >
                {profile?.workoutDuration
                  ? `${profile.workoutDuration} min`
                  : '--'}
              </Text>
            </View>
          </View>

          {!isRestDay && (
            <Pressable
              onPress={() => {
  if (!todayPlan?.workoutId) {
    return;
  }

  router.push({
    pathname:
      '/(tabs)/workout/details',
    params: {
      workoutId:
        todayPlan.workoutId,
    },
  });
}}
              style={({ pressed }) => [
                styles.startButton,
                pressed &&
                  styles.buttonPressed,
              ]}
            >
              <Text
                style={
                  styles.startButtonText
                }
              >
                Start Workout
              </Text>

              <Text
                style={styles.startArrow}
              >
                →
              </Text>
            </Pressable>
          )}
        </View>

        {/* THIS WEEK */}

        <View
          style={styles.sectionHeader}
        >
          <Text
            style={styles.sectionTitle}
          >
            This Week
          </Text>
        </View>

        <View
          style={[
            styles.weekCard,
            isTablet &&
              styles.weekCardTablet,
          ]}
        >
          {weeklyPlan?.days.map(
            (day, index) => {
              const isToday =
                index === todayIndex;

              const isWorkout =
                day.type ===
                'workout';

              return (
                <View
                  key={`${day.day}-${index}`}
                  style={[
                    styles.dayRow,
                    isToday &&
                      styles.todayRow,
                  ]}
                >
                  <View
                    style={
                      styles.dayNameContainer
                    }
                  >
                    <Text
                      style={[
                        styles.dayName,
                        isToday &&
                          styles.todayText,
                      ]}
                    >
                      {day.day.slice(
                        0,
                        3,
                      )}
                    </Text>
                  </View>

                  <View
                    style={
                      styles.dayWorkoutContainer
                    }
                  >
                    <Text
                      style={[
                        styles.dayWorkout,
                        !isWorkout &&
                          styles.restText,
                      ]}
                    >
                      {day.title}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.dayStatus,
                      isWorkout
                        ? styles.workoutStatus
                        : styles.restStatus,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayStatusText,
                        isWorkout
                          ? styles.workoutStatusText
                          : styles.restStatusText,
                      ]}
                    >
                      {isWorkout
                        ? 'TRAIN'
                        : 'REST'}
                    </Text>
                  </View>
                </View>
              );
            },
          )}
        </View>

        {/* PROFILE SUMMARY */}

        <View
          style={styles.sectionHeader}
        >
          <Text
            style={styles.sectionTitle}
          >
            Your Profile
          </Text>
        </View>

        <View
          style={[
            styles.profileGrid,
            isTablet &&
              styles.profileGridTablet,
          ]}
        >
          <StatCard
            value={
              profile?.weight
                ? `${profile.weight}`
                : '--'
            }
            label="Weight"
            unit="kg"
          />

          <StatCard
            value={
              profile?.height
                ? `${profile.height}`
                : '--'
            }
            label="Height"
            unit="cm"
          />

          <StatCard
            value={
              profile?.age
                ? `${profile.age}`
                : '--'
            }
            label="Age"
            unit="years"
          />
        </View>

        {/* WEEKLY STATS */}

        <View
          style={styles.sectionHeader}
        >
          <Text
            style={styles.sectionTitle}
          >
            This Week
          </Text>
        </View>

        <View
          style={[
            styles.statsGrid,
            isTablet &&
              styles.statsGridTablet,
          ]}
        >
          <StatCard
            value="0"
            label="Workouts"
          />

          <StatCard
            value="0"
            label="Calories"
          />

          <StatCard
            value="0"
            label="Minutes"
          />
        </View>

        {/* AI COACH */}

        <Pressable
          style={styles.aiCard}
          onPress={() => {
            console.log(
              'Open AI Coach',
            );
          }}
        >
          <View
            style={styles.aiIcon}
          >
            <Text
              style={styles.aiEmoji}
            >
              🤖
            </Text>
          </View>

          <View
            style={styles.aiContent}
          >
            <Text
              style={styles.aiTitle}
            >
              Your AI Coach
            </Text>

            <Text
              style={
                styles.aiDescription
              }
            >
              Need help with your
              workout? Your AI Coach
              is ready.
            </Text>
          </View>

          <Text
            style={styles.aiArrow}
          >
            →
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function StatCard({
  value,
  label,
  unit,
}: {
  value: string;
  label: string;
  unit?: string;
}) {
  return (
    <View style={styles.statCard}>
      <Text
        style={styles.statValue}
      >
        {value}

        {unit && (
          <Text
            style={styles.statUnit}
          >
            {' '}
            {unit}
          </Text>
        )}
      </Text>

      <Text
        style={styles.statLabel}
      >
        {label}
      </Text>
    </View>
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
      Spacing.lg,
    paddingBottom:
      Spacing.xxl,
  },

  tabletContent: {
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
  },

  loadingContainer: {
    flex: 1,
    backgroundColor:
      Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    color:
      Colors.textSecondary,
    marginTop:
      Spacing.md,
    fontSize:
      FontSize.sm,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
    marginBottom:
      Spacing.xl,
  },

  headerText: {
    flex: 1,
    paddingRight:
      Spacing.md,
  },

  greeting: {
    color:
      Colors.textSecondary,
    fontSize:
      FontSize.md,
    marginBottom:
      Spacing.xs,
  },

  title: {
    color: Colors.text,
    fontSize:
      FontSize.xxxl,
    fontWeight: '900',
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius:
      Radius.full,
    backgroundColor:
      Colors.primary,
    alignItems: 'center',
    justifyContent:
      'center',
  },

  avatarText: {
    color:
      Colors.background,
    fontSize:
      FontSize.lg,
    fontWeight: '900',
  },

  workoutCard: {
    backgroundColor:
      Colors.surface,
    borderWidth: 1,
    borderColor:
      Colors.border,
    borderRadius:
      Radius.xl,
    padding:
      Spacing.lg,
    marginBottom:
      Spacing.xl,
  },

  eyebrow: {
    color:
      Colors.primary,
    fontSize:
      FontSize.sm,
    fontWeight: '900',
    letterSpacing: 2,
  },

  workoutTitle: {
    color: Colors.text,
    fontSize:
      FontSize.xxl,
    fontWeight: '900',
    marginTop:
      Spacing.sm,
  },

  workoutDescription: {
    color:
      Colors.textSecondary,
    fontSize:
      FontSize.md,
    lineHeight: 24,
    marginTop:
      Spacing.md,
  },

  workoutMeta: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    marginTop:
      Spacing.xl,
    paddingTop:
      Spacing.md,
    borderTopWidth: 1,
    borderTopColor:
      Colors.border,
  },

  metaLabel: {
    color:
      Colors.textMuted,
    fontSize:
      FontSize.xs,
    fontWeight: '800',
    marginBottom:
      Spacing.xs,
  },

  metaValue: {
    color: Colors.text,
    fontSize:
      FontSize.sm,
    fontWeight: '800',
  },

  startButton: {
    height: 56,
    marginTop:
      Spacing.xl,
    borderRadius:
      Radius.md,
    backgroundColor:
      Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'center',
    gap: Spacing.sm,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  startButtonText: {
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

  sectionHeader: {
    marginBottom:
      Spacing.md,
  },

  sectionTitle: {
    color: Colors.text,
    fontSize:
      FontSize.lg,
    fontWeight: '900',
  },

  weekCard: {
    backgroundColor:
      Colors.surface,
    borderWidth: 1,
    borderColor:
      Colors.border,
    borderRadius:
      Radius.lg,
    padding:
      Spacing.sm,
    marginBottom:
      Spacing.xl,
  },

  weekCardTablet: {
    padding:
      Spacing.md,
  },

  dayRow: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius:
      Radius.md,
    paddingHorizontal:
      Spacing.sm,
    marginBottom: 4,
  },

  todayRow: {
    backgroundColor:
      Colors.surfaceLight,
    borderWidth: 1,
    borderColor:
      Colors.primary,
  },

  dayNameContainer: {
    width: 48,
  },

  dayName: {
    color:
      Colors.textSecondary,
    fontSize:
      FontSize.sm,
    fontWeight: '900',
  },

  todayText: {
    color:
      Colors.primary,
  },

  dayWorkoutContainer: {
    flex: 1,
    paddingHorizontal:
      Spacing.sm,
  },

  dayWorkout: {
    color: Colors.text,
    fontSize:
      FontSize.sm,
    fontWeight: '700',
  },

  restText: {
    color:
      Colors.textMuted,
  },

  dayStatus: {
    paddingHorizontal:
      Spacing.sm,
    paddingVertical: 5,
    borderRadius:
      Radius.full,
  },

  workoutStatus: {
    backgroundColor:
      Colors.primary,
  },

  restStatus: {
    backgroundColor:
      Colors.surfaceLight,
  },

  dayStatusText: {
    fontSize:
      9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  workoutStatusText: {
    color:
      Colors.background,
  },

  restStatusText: {
    color:
      Colors.textMuted,
  },

  profileGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom:
      Spacing.xl,
  },

  profileGridTablet: {
    gap: Spacing.md,
  },

  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom:
      Spacing.xl,
  },

  statsGridTablet: {
    gap: Spacing.md,
  },

  statCard: {
    flex: 1,
    minHeight: 105,
    backgroundColor:
      Colors.surface,
    borderWidth: 1,
    borderColor:
      Colors.border,
    borderRadius:
      Radius.lg,
    alignItems: 'center',
    justifyContent:
      'center',
    padding:
      Spacing.sm,
  },

  statValue: {
    color:
      Colors.primary,
    fontSize:
      FontSize.xxl,
    fontWeight: '900',
  },

  statUnit: {
    fontSize:
      FontSize.xs,
    fontWeight: '700',
  },

  statLabel: {
    color:
      Colors.textSecondary,
    fontSize:
      FontSize.sm,
    marginTop:
      Spacing.xs,
  },

  aiCard: {
    backgroundColor:
      Colors.surface,
    borderWidth: 1,
    borderColor:
      Colors.border,
    borderRadius:
      Radius.lg,
    padding:
      Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },

  aiIcon: {
    width: 48,
    height: 48,
    borderRadius:
      Radius.md,
    backgroundColor:
      Colors.surfaceLight,
    alignItems: 'center',
    justifyContent:
      'center',
  },

  aiEmoji: {
    fontSize: 25,
  },

  aiContent: {
    flex: 1,
    marginLeft:
      Spacing.md,
  },

  aiTitle: {
    color: Colors.text,
    fontSize:
      FontSize.md,
    fontWeight: '900',
  },

  aiDescription: {
    color:
      Colors.textSecondary,
    fontSize:
      FontSize.sm,
    marginTop:
      Spacing.xs,
  },

  aiArrow: {
    color:
      Colors.primary,
    fontSize:
      FontSize.xl,
    fontWeight: '900',
    marginLeft:
      Spacing.sm,
  },
});
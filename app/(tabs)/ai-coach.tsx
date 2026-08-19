import { Colors, FontSize, Spacing } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';

export default function AICoachScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>AI POWERED</Text>

      <Text style={styles.title}>AI Coach</Text>

      <Text style={styles.subtitle}>
        Your personal AI fitness coach.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  badge: {
    color: Colors.primary,
    fontSize: FontSize.xs,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: Spacing.xl,
  },
  title: {
    color: Colors.text,
    fontSize: FontSize.xxxl,
    fontWeight: '800',
    marginTop: Spacing.sm,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    marginTop: Spacing.sm,
  },
});
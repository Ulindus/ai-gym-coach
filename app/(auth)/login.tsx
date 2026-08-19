
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import {
    Colors,
    FontSize,
    Radius,
    Spacing,
} from '@/constants/theme';
import { loginUser } from '@/services/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      Alert.alert(
        'Missing information',
        'Please enter your email and password.',
      );
      return;
    }

    if (!normalizedEmail.includes('@')) {
      Alert.alert(
        'Invalid email',
        'Please enter a valid email address.',
      );
      return;
    }

    try {
      setLoading(true);

      await loginUser(
        normalizedEmail,
        password,
      );

      router.replace('/(tabs)');
    } catch (error: any) {
      let message = 'Unable to sign in.';

      switch (error?.code) {
        case 'auth/invalid-credential':
          message = 'Email or password is incorrect.';
          break;

        case 'auth/user-not-found':
          message = 'No account was found with this email.';
          break;

        case 'auth/wrong-password':
          message = 'The password is incorrect.';
          break;

        case 'auth/invalid-email':
          message = 'Please enter a valid email address.';
          break;

        case 'auth/user-disabled':
          message = 'This account has been disabled.';
          break;

        case 'auth/network-request-failed':
          message =
            'Network error. Please check your internet connection.';
          break;

        default:
          message =
            error?.message ??
            'Something went wrong. Please try again.';
      }

      Alert.alert('Login failed', message);
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
      <View style={styles.content}>
        <Text style={styles.logo}>
          AI GYM
        </Text>

        <Text style={styles.title}>
          Welcome back
        </Text>

        <Text style={styles.subtitle}>
          Sign in and continue your fitness journey.
        </Text>

        <View style={styles.form}>
          <View>
            <Text style={styles.label}>
              Email
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={Colors.textMuted}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              editable={!loading}
            />
          </View>

          <View>
            <Text style={styles.label}>
              Password
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={Colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          <Pressable
            style={styles.forgotButton}
            onPress={() => {
              Alert.alert(
                'Coming soon',
                'Password reset will be available soon.',
              );
            }}
          >
            <Text style={styles.forgotText}>
              Forgot password?
            </Text>
          </Pressable>

          <Pressable
            onPress={handleLogin}
            disabled={loading}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              loading && styles.buttonDisabled,
            ]}
          >
            <Text style={styles.buttonText}>
              {loading
                ? 'Signing in...'
                : 'Sign In'}
            </Text>
          </Pressable>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?
            </Text>

            <Pressable
              onPress={() =>
                router.push('/(auth)/register')
              }
              disabled={loading}
            >
              <Text style={styles.link}>
                {' '}
                Create account
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },

  logo: {
    color: Colors.primary,
    fontSize: FontSize.md,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: Spacing.xl,
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
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
  },

  form: {
    gap: Spacing.md,
  },

  label: {
    color: Colors.text,
    fontSize: FontSize.sm,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },

  input: {
    height: 56,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    color: Colors.text,
    fontSize: FontSize.md,
  },

  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -Spacing.xs,
  },

  forgotText: {
    color: Colors.primary,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },

  button: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: Colors.background,
    fontSize: FontSize.md,
    fontWeight: '800',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.lg,
  },

  footerText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },

  link: {
    color: Colors.primary,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
});

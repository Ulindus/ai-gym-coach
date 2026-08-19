import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  initialRouteName: '(onboarding)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack
        initialRouteName="(onboarding)"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(onboarding)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar
        style={colorScheme === 'dark' ? 'light' : 'dark'}
      />
    </ThemeProvider>
  );
}
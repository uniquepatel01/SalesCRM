// app/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack initialRouteName="splash/app" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash/app" />
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="dashboard/index" />
    </Stack>
  );
}

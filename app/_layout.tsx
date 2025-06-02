// app/_layout.tsx
import { Stack } from "expo-router";
import { ThemeProvider } from "../ThemeContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack
        initialRouteName="splash/app"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="splash/app" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="dashboard/index" />
      </Stack>
    </ThemeProvider>
  );
}

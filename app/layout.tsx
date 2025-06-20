// app/_layout.tsx
import { Stack } from "expo-router";
import { ThemeProvider } from "../ThemeContext";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <ThemeProvider>
      <Stack
     
        screenOptions={{ headerShown: false }}
      >
        {children}
      </Stack>
    </ThemeProvider>
  );
}

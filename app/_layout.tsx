// app/_layout.tsx
import { store } from "@/store";
import { ThemeProvider, useTheme } from "@/ThemeContext";
import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";



// 👇 Put StatusBar inside a small wrapper that uses your ThemeContext
function ThemedStatusBar() {
  const { darkMode } = useTheme();

  return (
    <StatusBar
      barStyle={darkMode ? "light-content" : "dark-content"}
      backgroundColor={darkMode ? "#222" : "#ffffff"}
    />
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <ThemedStatusBar />
        {/* Slot will render whichever screen matches the route */}
        <Slot />
      </Provider>
    </ThemeProvider>
  );
}

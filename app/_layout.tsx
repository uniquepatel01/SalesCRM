// app/_layout.tsx
import { store } from "@/store";
import { ThemeProvider } from "@/ThemeContext";
import { Slot } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        {/* Slot will render whichever screen matches the route */}
        <Slot />
      </Provider>
    </ThemeProvider>
  );
}

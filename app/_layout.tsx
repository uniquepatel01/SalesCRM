<<<<<<< HEAD
// app/_layout.tsx
import { store } from "@/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { ThemeProvider } from "../ThemeContext";
export default function Layout({children}: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
     <Provider store={store}>
      <Stack screenOptions={{headerShown:false}}>
       
         {children}

       </Stack>
</Provider>

    </ThemeProvider>
  );
}
=======
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
>>>>>>> 80530c0e1ce2f0de6e9f15ab7869442ae1267f66

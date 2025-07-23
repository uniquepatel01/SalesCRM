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
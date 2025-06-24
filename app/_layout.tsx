// app/_layout.tsx
import { Stack } from "expo-router";
import { ThemeProvider } from "../ThemeContext"
import { store } from "@/store";
import { Provider } from "react-redux";
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

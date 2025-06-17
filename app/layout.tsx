// app/_layout.tsx
import { ThemeProvider } from "../ThemeContext";

export default function Layout({children}: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      
        {children}
   
    </ThemeProvider>
  );
}

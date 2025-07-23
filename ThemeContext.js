import { createContext, useContext, useState } from "react";

const lightTheme = {
  background: "#fff",
  text: "#222",
  inputBackground: "#f7f7f7",
  border: "#eee",
  primary: "#1da1f2",
  secondary: "#19c37d",
  placeholder: "#888",
  modalBackground: "#fff",
  overlay: "rgba(0,0,0,0.2)",
};

const darkTheme = {
  background: "#181818",
  text: "#fff",
  inputBackground: "#23272f",
  border: "#333",
  primary: "#1da1f2",
  secondary: "#19c37d",
  placeholder: "#aaa",
  modalBackground: "#23272f",
  overlay: "rgba(0,0,0,0.7)",
};

const ThemeContext = createContext({
  darkMode: false,
  toggleTheme: () => {},
  theme: lightTheme,
});

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode((prev) => !prev);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  // Initialize theme color from localStorage if it exists
  useEffect(() => {
    const storedThemeColor = localStorage.getItem('theme-color');
    if (storedThemeColor) {
      const root = document.documentElement;
      const themeColors = {
        blue: {
          primary: '221.2 83.2% 53.3%',
          'primary-rgb': '59, 130, 246',
          ring: '221.2 83.2% 53.3%',
        },
        green: {
          primary: '142.1 76.2% 36.3%',
          'primary-rgb': '22, 163, 74',
          ring: '142.1 76.2% 36.3%',
        },
        orange: {
          primary: '24.6 95% 53.1%',
          'primary-rgb': '249, 115, 22',
          ring: '24.6 95% 53.1%',
        },
        red: {
          primary: '0 84.2% 60.2%',
          'primary-rgb': '239, 68, 68',
          ring: '0 84.2% 60.2%',
        },
        purple: {
          primary: '262.1 83.3% 57.8%',
          'primary-rgb': '147, 51, 234',
          ring: '262.1 83.3% 57.8%',
        },
      };

      const colors = themeColors[storedThemeColor as keyof typeof themeColors];
      if (colors) {
        Object.entries(colors).forEach(([key, value]) => {
          root.style.setProperty(`--${key}`, value);
        });
      }
    }
  }, []);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

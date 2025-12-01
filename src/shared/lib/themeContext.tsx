import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'theme';

// Function to determine default theme based on system settings
const getDefaultTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  // Check if there's a saved theme
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme as Theme;
  }

  // If no theme in localStorage, determine from system settings
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getDefaultTheme);
  const [isUserChoice, setIsUserChoice] = useState<boolean>(() => {
    // Check if theme was explicitly chosen by user
    return localStorage.getItem(THEME_STORAGE_KEY) !== null;
  });

  useEffect(() => {
    // Set theme only if it differs from current
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme !== theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
    // Save to localStorage only if user explicitly chose theme
    if (isUserChoice) {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme, isUserChoice]);

  // Listen to system theme changes if user hasn't explicitly chosen theme
  useEffect(() => {
    if (!isUserChoice && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setTheme(e.matches ? 'dark' : 'light');
      };

      // Modern approach
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
      // Legacy approach for compatibility
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [isUserChoice]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      // Mark as user choice when explicitly toggling
      setIsUserChoice(true);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      return newTheme;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

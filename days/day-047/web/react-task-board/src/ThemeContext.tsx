import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
type Theme = 'light' | 'dark';
type ThemeValue = { theme: Theme; toggleTheme: () => void };
const ThemeContext = createContext<ThemeValue | null>(null);
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return localStorage.getItem('day47-theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('day47-theme', theme);
    } catch {
      /* private mode */
    }
  }, [theme]);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be inside ThemeProvider');
  return context;
}

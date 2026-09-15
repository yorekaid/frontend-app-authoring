import React, { createContext, useContext, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({ isDarkMode: true });

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  useEffect(() => {
    // Always force dark mode to true for CLIP authoring
    localStorage.setItem('clip-theme-dark', 'true');
    document.body.classList.add('authoring-dark-mode');

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'clip-theme-dark') {
        // Enforce true
        localStorage.setItem('clip-theme-dark', 'true');
        document.body.classList.add('authoring-dark-mode');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode: true }}>
      {children}
    </ThemeContext.Provider>
  );
};

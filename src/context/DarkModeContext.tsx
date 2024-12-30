import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

interface DarkModeProps {
  children: ReactNode;
}

export const DarkModeContextProvider = ({ children }: DarkModeProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    updateDarkMode(!darkMode);
  };

  useEffect(() => {
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    setDarkMode(isDark);
    updateDarkMode(isDark);
  }, []);

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

function updateDarkMode(darkMode: boolean) {
  if (darkMode) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
}

export const useDarkModeContext = () => useContext(DarkModeContext);

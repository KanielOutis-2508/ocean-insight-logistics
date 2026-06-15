import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      bg: isDark ? '#060d1f' : '#ffffff',
      navBg: isDark ? '#0a0f1e' : '#ffffff',
      cardBg: isDark ? '#0f172a' : '#ffffff',
      cardBg2: isDark ? '#1e293b' : '#f1f5f9',
      border: isDark ? '#1e293b' : '#e2e8f0',
      text: isDark ? '#ffffff' : '#0f172a',
      textLight: isDark ? '#94a3b8' : '#334155',
      textMuted: isDark ? '#475569' : '#64748b',
      tableHeader: isDark ? '#94a3b8' : '#334155',
      tableHeaderBg: isDark ? '#0f172a' : '#f8fafc',
      rowHover: isDark ? '#0f172a' : '#f8fafc',
      input: isDark ? '#1e293b' : '#f8fafc',
      inputBorder: isDark ? '#334155' : '#e2e8f0',
      modalBg: isDark ? '#0f172a' : '#ffffff',
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div style={{
        backgroundColor: theme.colors.bg,
        minHeight: '100vh',
        transition: 'background-color 0.3s, color 0.3s',
        color: theme.colors.text,
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      bg: isDark ? '#060d1f' : '#f1f5f9',
      navBg: isDark ? '#0a0f1e' : '#ffffff',
      cardBg: isDark ? '#0f172a' : '#ffffff',
      cardBg2: isDark ? '#1e293b' : '#f8fafc',
      border: isDark ? '#1e293b' : '#e2e8f0',
      text: isDark ? '#ffffff' : '#0f172a',
      textLight: isDark ? '#94a3b8' : '#64748b',
      textMuted: isDark ? '#475569' : '#94a3b8',
      tableHeader: isDark ? '#475569' : '#64748b',
      tableHeaderBg: isDark ? '#0f172a' : '#f8fafc',
      rowHover: isDark ? '#0f172a' : '#f1f5f9',
      input: isDark ? '#1e293b' : '#ffffff',
      inputBorder: isDark ? '#334155' : '#e2e8f0',
      modalBg: isDark ? '#0f172a' : '#ffffff',
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ backgroundColor: theme.colors.bg, minHeight: '100vh', transition: 'all 0.3s' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Manager account
    if (username === 'manager' && password === 'oilnl2024') {
      const userData = { name: 'Manager', role: 'manager', username: 'manager' };
      setUser(userData);
      localStorage.setItem('oilnl_user', JSON.stringify(userData));
      return { success: true };
    }
    // Staff account
    if (username === 'staff' && password === 'staff2024') {
      const userData = { name: 'Staff', role: 'staff', username: 'staff' };
      setUser(userData);
      localStorage.setItem('oilnl_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Invalid username or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('oilnl_user');
  };

  const loadUser = () => {
    const stored = localStorage.getItem('oilnl_user');
    if (stored) setUser(JSON.parse(stored));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
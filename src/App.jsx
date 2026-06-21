import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Quote from './pages/Quote';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Trips from './pages/Trips';
import Trucks from './pages/Trucks';
import Diesel from './pages/Diesel';
import Documents from './pages/Documents';
import Loading from './pages/Loading';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Track from './pages/Track';
import { useAuth } from './context/AuthContext';
import './App.css';

const AppContent = () => {
  const { user, loadUser, logout } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadUser();
    setReady(true);
  }, []);

  if (!ready) return null;

  // Manager pages
  const managerPages = ['/', '/trips', '/trucks', '/loading', '/diesel', '/documents', '/chat'];
  // Staff pages
  const staffPages = ['/trips', '/loading', '/diesel', '/chat'];

  if (!user) {
    return (
      <Routes>
        <Route path="/track" element={<Track />} />
        <Route path="*" element={<Login onLogin={() => {}} />} />
      </Routes>
    );
  }

  return (
    <>
      <Navbar user={user} onLogout={logout} />
      <Routes>
        <Route path="/track" element={<Track />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/" element={user.role === 'manager' ? <Dashboard /> : <Navigate to="/trips" />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/trucks" element={user.role === 'manager' ? <Trucks /> : <Navigate to="/trips" />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/diesel" element={<Diesel />} />
        <Route path="/documents" element={user.role === 'manager' ? <Documents /> : <Navigate to="/trips" />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
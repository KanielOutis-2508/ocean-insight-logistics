import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Trips from './pages/Trips';
import Trucks from './pages/Trucks';
import Diesel from './pages/Diesel';
import Documents from './pages/Documents';
import Loading from './pages/Loading';
import Chat from './pages/Chat';
import './App.css';

const App = () => {
  return (
    <Router>
      <div style={{ minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trucks" element={<Trucks />} />
          <Route path="/diesel" element={<Diesel />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
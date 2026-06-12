import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Truck, Route, Fuel, FileText, Package, MessageCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { path: '/trips', label: 'Trips', icon: <Route size={16} /> },
    { path: '/trucks', label: 'Trucks', icon: <Truck size={16} /> },
    { path: '/loading', label: 'Loading', icon: <Package size={16} /> },
    { path: '/diesel', label: 'Diesel', icon: <Fuel size={16} /> },
    { path: '/documents', label: 'Documents', icon: <FileText size={16} /> },
    { path: '/chat', label: 'Chat', icon: <MessageCircle size={16} /> },
  ];

  return (
    <nav style={{
      background: '#0a0f1e',
      borderBottom: '1px solid #1e293b',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '36px', height: '36px',
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.1rem',
        }}>
          🚛
        </div>
        <div>
          <div style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.3px' }}>
            Ocean Insight Logistics
          </div>
          <div style={{ color: '#475569', fontSize: '0.7rem', letterSpacing: '0.05em' }}>
            FLEET MANAGEMENT
          </div>
        </div>
      </div>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: '0.15rem' }} className="desktop-nav">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              color: location.pathname === link.path ? 'white' : '#64748b',
              textDecoration: 'none',
              padding: '0.4rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 500,
              backgroundColor: location.pathname === link.path ? '#1e40af' : 'transparent',
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{
            width: '8px', height: '8px',
            backgroundColor: '#22c55e',
            borderRadius: '50%',
            boxShadow: '0 0 8px #22c55e',
          }} />
          <span style={{ color: '#64748b', fontSize: '0.8rem' }}>Live</span>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none', color: 'white',
            cursor: 'pointer', display: 'none',
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '64px', left: 0, right: 0,
          background: '#0a0f1e', borderBottom: '1px solid #1e293b',
          padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem',
          zIndex: 999,
        }}>
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                color: location.pathname === link.path ? 'white' : '#64748b',
                textDecoration: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: 500,
                backgroundColor: location.pathname === link.path ? '#1e40af' : 'transparent',
              }}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Truck, Route, Fuel, FileText, Package, MessageCircle, Menu, X, Sun, Moon, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme, colors } = useTheme();

  const allLinks = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={16} />, roles: ['manager'] },
    { path: '/trips', label: 'Trips', icon: <Route size={16} />, roles: ['manager', 'staff'] },
    { path: '/trucks', label: 'Trucks', icon: <Truck size={16} />, roles: ['manager'] },
    { path: '/loading', label: 'Loading', icon: <Package size={16} />, roles: ['manager', 'staff'] },
    { path: '/diesel', label: 'Diesel', icon: <Fuel size={16} />, roles: ['manager', 'staff'] },
    { path: '/documents', label: 'Documents', icon: <FileText size={16} />, roles: ['manager'] },
    { path: '/chat', label: 'Chat', icon: <MessageCircle size={16} />, roles: ['manager', 'staff'] },
  ];

  const links = allLinks.filter(link => link.roles.includes(user?.role));

  return (
    <nav style={{
      background: colors.navBg,
      borderBottom: `1px solid ${colors.border}`,
      padding: '0 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      transition: 'all 0.3s',
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
        <div style={{
          width: '36px', height: '36px',
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          borderRadius: '8px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.1rem',
        }}>
          🚛
        </div>
        <div className="navbar-brand-text">
          <div style={{ color: colors.text, fontWeight: 700, fontSize: '0.9rem', letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>
            Ocean Insight
          </div>
          <div style={{ color: colors.textMuted, fontSize: '0.65rem', letterSpacing: '0.05em' }}>
            FLEET MANAGEMENT
          </div>
        </div>
      </div>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: '0.1rem', flex: 1, justifyContent: 'center' }} className="desktop-nav">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.3rem',
              color: location.pathname === link.path ? 'white' : colors.textLight,
              textDecoration: 'none',
              padding: '0.4rem 0.65rem',
              borderRadius: '6px',
              fontSize: '0.78rem',
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        {/* Live indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }} className="desktop-nav">
          <div style={{ width: '7px', height: '7px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: '0 0 6px #22c55e' }} />
          <span style={{ color: colors.textLight, fontSize: '0.75rem' }}>Live</span>
        </div>

        {/* Role badge */}
        <span style={{
          padding: '0.2rem 0.6rem', borderRadius: '20px',
          fontSize: '0.7rem', fontWeight: 600,
          backgroundColor: user?.role === 'manager' ? 'rgba(59,130,246,0.15)' : 'rgba(34,197,94,0.15)',
          color: user?.role === 'manager' ? '#60a5fa' : '#4ade80',
          border: user?.role === 'manager' ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(34,197,94,0.3)',
          whiteSpace: 'nowrap',
        }} className="desktop-nav">
          {user?.role}
        </span>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            width: '34px', height: '34px', borderRadius: '8px',
            border: `1px solid ${colors.border}`,
            background: colors.cardBg2, color: colors.text,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {isDark ? <Sun size={15} color="#fbbf24" /> : <Moon size={15} color="#3b82f6" />}
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          style={{
            width: '34px', height: '34px', borderRadius: '8px',
            border: `1px solid ${colors.border}`,
            background: colors.cardBg2, color: '#ef4444',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <LogOut size={15} />
        </button>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none', color: colors.text,
            cursor: 'pointer', display: 'none', flexShrink: 0,
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '64px', left: 0, right: 0,
          background: colors.navBg, borderBottom: `1px solid ${colors.border}`,
          padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem',
          zIndex: 999, boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
        }}>
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                color: location.pathname === link.path ? 'white' : colors.textLight,
                textDecoration: 'none', padding: '0.75rem 1rem',
                borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500,
                backgroundColor: location.pathname === link.path ? '#1e40af' : 'transparent',
              }}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '0.75rem', marginTop: '0.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: colors.textMuted, fontSize: '0.8rem' }}>Logged in as <strong style={{ color: colors.text }}>{user?.name}</strong></span>
            <button onClick={onLogout} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
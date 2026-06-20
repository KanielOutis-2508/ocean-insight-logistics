import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Eye, EyeOff } from 'lucide-react';

const Login = ({ onLogin }) => {
  const { login } = useAuth();
  const { colors, isDark } = useTheme();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!form.username || !form.password) {
      setError('Please enter username and password');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = login(form.username, form.password);
      if (result.success) {
        onLogin();
      } else {
        setError(result.message);
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: isDark
        ? 'linear-gradient(135deg, #060d1f 0%, #0f172a 50%, #060d1f 100%)'
        : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
      padding: '1rem',
    }}>
      <div style={{
        background: colors.cardBg,
        borderRadius: '16px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '400px',
        border: `1px solid ${colors.border}`,
        boxShadow: isDark ? '0 25px 50px rgba(0,0,0,0.5)' : '0 25px 50px rgba(0,0,0,0.1)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '60px', height: '60px',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            borderRadius: '16px',
            margin: '0 auto 1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem',
            boxShadow: '0 8px 20px rgba(59,130,246,0.3)',
          }}>
            🚛
          </div>
          <h1 style={{ color: colors.text, fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Ocean Insight Logistics
          </h1>
          <p style={{ color: colors.textMuted, fontSize: '0.85rem' }}>
            Fleet Management System
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem',
            color: '#ef4444', fontSize: '0.85rem', textAlign: 'center',
          }}>
            {error}
          </div>
        )}

        {/* Username */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: colors.textLight, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
            Username
          </label>
          <input
            value={form.username}
            onChange={e => { setForm({ ...form, username: e.target.value }); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Enter your username"
            style={{
              width: '100%', padding: '0.7rem 1rem',
              background: colors.input, border: `1px solid ${colors.inputBorder}`,
              borderRadius: '8px', color: colors.text, fontSize: '0.875rem', outline: 'none',
              transition: 'border 0.2s',
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: colors.textLight, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={e => { setForm({ ...form, password: e.target.value }); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="Enter your password"
              style={{
                width: '100%', padding: '0.7rem 3rem 0.7rem 1rem',
                background: colors.input, border: `1px solid ${colors.inputBorder}`,
                borderRadius: '8px', color: colors.text, fontSize: '0.875rem', outline: 'none',
              }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute', right: '0.9rem', top: '50%',
                transform: 'translateY(-50%)', background: 'none',
                border: 'none', cursor: 'pointer', color: colors.textMuted,
                display: 'flex', alignItems: 'center',
              }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%', padding: '0.8rem',
            background: loading ? '#334155' : 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
            color: 'white', border: 'none', borderRadius: '8px',
            fontSize: '0.95rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: colors.textMuted }}>
          Contact your administrator if you need access.
        </p>
      </div>
    </div>
  );
};

export default Login;
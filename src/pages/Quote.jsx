import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
// eslint-disable-next-line no-unused-vars
import { Calculator, MapPin, Package, Truck } from 'lucide-react';

// Fixed route pricing (dummy prices - update after meeting)
const routes = [
  { from: 'Lagos', to: 'Abuja', pricePerBag: 750, distance: '756km', duration: '2 days' },
  { from: 'Lagos', to: 'Kano', pricePerBag: 950, distance: '1,122km', duration: '3 days' },
  { from: 'Lagos', to: 'Port Harcourt', pricePerBag: 600, distance: '537km', duration: '1-2 days' },
  { from: 'Lagos', to: 'Enugu', pricePerBag: 650, distance: '588km', duration: '2 days' },
  { from: 'Lagos', to: 'Ibadan', pricePerBag: 250, distance: '128km', duration: 'Same day' },
  { from: 'Lagos', to: 'Benin City', pricePerBag: 450, distance: '322km', duration: '1 day' },
  { from: 'Lagos', to: 'Kaduna', pricePerBag: 900, distance: '1,024km', duration: '2-3 days' },
  { from: 'Abuja', to: 'Kano', pricePerBag: 500, distance: '370km', duration: '1 day' },
  { from: 'Abuja', to: 'Kaduna', pricePerBag: 350, distance: '186km', duration: 'Same day' },
  { from: 'Abuja', to: 'Enugu', pricePerBag: 550, distance: '336km', duration: '1 day' },
  { from: 'Port Harcourt', to: 'Enugu', pricePerBag: 400, distance: '256km', duration: '1 day' },
  { from: 'Port Harcourt', to: 'Abuja', pricePerBag: 700, distance: '612km', duration: '2 days' },
];

const cities = [...new Set([...routes.map(r => r.from), ...routes.map(r => r.to)])].sort();

const Quote = () => {
  const { colors, isDark } = useTheme();
  const [form, setForm] = useState({ from: '', to: '', bags: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    if (!form.from || !form.to || !form.bags) {
      setError('Please fill in all fields');
      return;
    }
    if (form.from === form.to) {
      setError('Origin and destination cannot be the same');
      return;
    }
    if (parseInt(form.bags) <= 0) {
      setError('Please enter a valid number of bags');
      return;
    }

    const route = routes.find(r =>
      (r.from === form.from && r.to === form.to) ||
      (r.from === form.to && r.to === form.from)
    );

    if (!route) {
      setError('Sorry, we do not currently service this route. Please contact us directly.');
      return;
    }

    const bags = parseInt(form.bags);
    const basePrice = route.pricePerBag * bags;
    const vat = basePrice * 0.075;
    const total = basePrice + vat;

    setResult({ route, bags, basePrice, vat, total });
    setError('');
  };

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem',
    background: colors.input, border: `1px solid ${colors.inputBorder}`,
    borderRadius: '8px', color: colors.text, fontSize: '0.875rem', outline: 'none',
  };

  const labelStyle = {
    color: colors.textLight, fontSize: '0.75rem', fontWeight: 600,
    textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem',
    letterSpacing: '0.05em',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark
        ? 'linear-gradient(135deg, #060d1f 0%, #0f172a 100%)'
        : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
      padding: '2rem 1rem',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '60px', height: '60px',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            borderRadius: '16px', margin: '0 auto 1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem',
            boxShadow: '0 8px 20px rgba(59,130,246,0.3)',
          }}>
            🚛
          </div>
          <h1 style={{ color: colors.text, fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Get a Price Quote
          </h1>
          <p style={{ color: colors.textMuted, fontSize: '0.95rem' }}>
            Ocean Insight Logistics Nigeria Limited
          </p>
        </div>

        {/* Form */}
        <div style={{
          background: colors.cardBg, borderRadius: '16px', padding: '2rem',
          border: `1px solid ${colors.border}`, marginBottom: '1.5rem',
          boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.08)',
        }}>
          <h2 style={{ color: colors.text, fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calculator size={18} color="#3b82f6" /> Calculate Shipping Cost
          </h2>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem',
              color: '#ef4444', fontSize: '0.85rem',
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Origin</label>
              <select
                value={form.from}
                onChange={e => { setForm({ ...form, from: e.target.value }); setResult(null); setError(''); }}
                style={inputStyle}
              >
                <option value="">-- Select Origin --</option>
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Destination</label>
              <select
                value={form.to}
                onChange={e => { setForm({ ...form, to: e.target.value }); setResult(null); setError(''); }}
                style={inputStyle}
              >
                <option value="">-- Select Destination --</option>
                {cities.filter(c => c !== form.from).map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Number of Bags</label>
            <input
              type="number"
              min="1"
              value={form.bags}
              onChange={e => { setForm({ ...form, bags: e.target.value }); setResult(null); setError(''); }}
              placeholder="e.g. 600"
              style={inputStyle}
            />
            <p style={{ color: colors.textMuted, fontSize: '0.75rem', marginTop: '0.4rem' }}>
              Standard truck capacity: 500 - 600 bags
            </p>
          </div>

          <button
            onClick={handleCalculate}
            style={{
              width: '100%', padding: '0.85rem',
              background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
              color: 'white', border: 'none', borderRadius: '8px',
              fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            }}
          >
            <Calculator size={18} /> Calculate Price
          </button>
        </div>

        {/* Result */}
        {result && (
          <div style={{
            background: colors.cardBg, borderRadius: '16px', padding: '2rem',
            border: `1px solid ${colors.border}`,
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.08)',
          }}>
            <h2 style={{ color: colors.text, fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              📋 Price Quote
            </h2>

            {/* Route info */}
            <div style={{
              background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.5rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="#3b82f6" />
                <span style={{ color: colors.text, fontWeight: 600 }}>{result.route.from} → {result.route.to}</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <span style={{ color: colors.textMuted, fontSize: '0.8rem' }}>📍 {result.route.distance}</span>
                <span style={{ color: colors.textMuted, fontSize: '0.8rem' }}>⏱️ {result.route.duration}</span>
              </div>
            </div>

            {/* Price breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                { label: `${result.bags.toLocaleString()} bags × ₦${result.route.pricePerBag.toLocaleString()}/bag`, value: `₦${result.basePrice.toLocaleString()}`, color: colors.text },
                { label: 'VAT (7.5%)', value: `₦${Math.round(result.vat).toLocaleString()}`, color: colors.textLight },
              ].map(item => (
                <div key={item.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.75rem 1rem', borderRadius: '8px', background: colors.cardBg2,
                }}>
                  <span style={{ color: colors.textLight, fontSize: '0.875rem' }}>{item.label}</span>
                  <span style={{ color: item.color, fontWeight: 600 }}>{item.value}</span>
                </div>
              ))}

              {/* Total */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '1rem', borderRadius: '8px',
                background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(29,78,216,0.15))',
                border: '1px solid rgba(59,130,246,0.3)',
              }}>
                <span style={{ color: colors.text, fontWeight: 700, fontSize: '1rem' }}>Total Estimate</span>
                <span style={{ color: '#3b82f6', fontWeight: 800, fontSize: '1.3rem' }}>₦{Math.round(result.total).toLocaleString()}</span>
              </div>
            </div>

            <p style={{ color: colors.textMuted, fontSize: '0.78rem', textAlign: 'center', marginBottom: '1rem' }}>
              * This is an estimate. Final price may vary based on specific requirements.
            </p>

            {/* Contact CTA */}
            <div style={{
              background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: '10px', padding: '1rem 1.25rem', textAlign: 'center',
            }}>
              <p style={{ color: '#4ade80', fontWeight: 600, marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                Ready to book?
              </p>
              <p style={{ color: colors.textMuted, fontSize: '0.8rem' }}>
                Contact us at <strong style={{ color: colors.text }}>oilnl.com</strong> or call to confirm your shipment
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '2rem', color: colors.textMuted, fontSize: '0.8rem' }}>
          © 2026 Ocean Insight Logistics Nigeria Limited · oilnl.com
        </div>
      </div>
    </div>
  );
};

export default Quote;
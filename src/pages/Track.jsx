import { useState } from 'react';
import { trips } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search, Package, MapPin, Calendar } from 'lucide-react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const statusColors = {
  'in-transit': '#3b82f6',
  'delivered': '#22c55e',
  'pending': '#f59e0b',
};

const statusLabels = {
  'in-transit': '🚛 In Transit',
  'delivered': '✅ Delivered',
  'pending': '⏳ Pending',
};

const Track = () => {
  const { colors, isDark } = useTheme();
  const [form, setForm] = useState({ email: '', trackingId: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = () => {
    if (!form.email || !form.trackingId) {
      setError('Please enter your email and tracking ID');
      return;
    }
    setLoading(true);
    setError('');

    setTimeout(() => {
      const found = trips.find(t => t.id.toLowerCase() === form.trackingId.toLowerCase().trim());
      if (found) {
        setResult(found);
      } else {
        setError('No shipment found with that tracking ID. Please check and try again.');
      }
      setLoading(false);
    }, 1000);
  };

  const truckPosition = result ? (
    result.status === 'in-transit'
      ? [
          (result.originCoords[0] + result.destinationCoords[0]) / 2,
          (result.originCoords[1] + result.destinationCoords[1]) / 2,
        ]
      : result.status === 'delivered'
      ? result.destinationCoords
      : result.originCoords
  ) : null;

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark
        ? 'linear-gradient(135deg, #060d1f 0%, #0f172a 100%)'
        : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
      padding: '2rem 1rem',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

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
            Track Your Shipment
          </h1>
          <p style={{ color: colors.textMuted, fontSize: '0.95rem' }}>
            Ocean Insight Logistics Nigeria Limited
          </p>
        </div>

        {/* Search Form */}
        <div style={{
          background: colors.cardBg,
          borderRadius: '16px', padding: '2rem',
          border: `1px solid ${colors.border}`,
          marginBottom: '2rem',
          boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.08)',
        }}>
          <h2 style={{ color: colors.text, fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            Enter Tracking Details
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
              <label style={{ color: colors.textLight, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => { setForm({ ...form, email: e.target.value }); setError(''); }}
                placeholder="your@email.com"
                style={{
                  width: '100%', padding: '0.7rem 1rem',
                  background: colors.input, border: `1px solid ${colors.inputBorder}`,
                  borderRadius: '8px', color: colors.text, fontSize: '0.875rem', outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ color: colors.textLight, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                Tracking ID
              </label>
              <input
                value={form.trackingId}
                onChange={e => { setForm({ ...form, trackingId: e.target.value }); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleTrack()}
                placeholder="e.g. TRIP-001"
                style={{
                  width: '100%', padding: '0.7rem 1rem',
                  background: colors.input, border: `1px solid ${colors.inputBorder}`,
                  borderRadius: '8px', color: colors.text, fontSize: '0.875rem', outline: 'none',
                }}
              />
            </div>
          </div>

          <button
            onClick={handleTrack}
            disabled={loading}
            style={{
              width: '100%', padding: '0.8rem',
              background: loading ? '#334155' : 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
              color: 'white', border: 'none', borderRadius: '8px',
              fontSize: '0.95rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            }}
          >
            <Search size={18} />
            {loading ? 'Searching...' : 'Track Shipment'}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div>
            {/* Status Banner */}
            <div style={{
              background: `${statusColors[result.status]}20`,
              border: `1px solid ${statusColors[result.status]}40`,
              borderRadius: '12px', padding: '1.25rem 1.5rem',
              marginBottom: '1.5rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '0.5rem',
            }}>
              <div>
                <div style={{ color: colors.textMuted, fontSize: '0.75rem', marginBottom: '0.25rem' }}>Tracking ID</div>
                <div style={{ color: statusColors[result.status], fontSize: '1.2rem', fontWeight: 700 }}>{result.id}</div>
              </div>
              <span style={{
                padding: '0.5rem 1.25rem', borderRadius: '20px',
                fontSize: '0.875rem', fontWeight: 700,
                backgroundColor: `${statusColors[result.status]}20`,
                color: statusColors[result.status],
                border: `1px solid ${statusColors[result.status]}40`,
              }}>
                {statusLabels[result.status]}
              </span>
            </div>

            {/* Info Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { icon: <MapPin size={18} />, label: 'Origin', value: result.origin, color: '#3b82f6' },
                { icon: <MapPin size={18} />, label: 'Destination', value: result.destination, color: '#22c55e' },
                { icon: <Package size={18} />, label: 'Cargo', value: `${result.cargo} (${result.bags} bags)`, color: '#f59e0b' },
                { icon: <Calendar size={18} />, label: 'Expected Arrival', value: result.expectedArrival, color: '#a855f7' },
              ].map(card => (
                <div key={card.label} style={{
                  background: colors.cardBg, borderRadius: '12px',
                  padding: '1.25rem', border: `1px solid ${colors.border}`,
                }}>
                  <div style={{ color: card.color, marginBottom: '0.5rem' }}>{card.icon}</div>
                  <div style={{ color: colors.textMuted, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{card.label}</div>
                  <div style={{ color: colors.text, fontWeight: 600, fontSize: '0.9rem' }}>{card.value}</div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div style={{
              background: colors.cardBg, borderRadius: '12px',
              border: `1px solid ${colors.border}`, overflow: 'hidden',
              marginBottom: '1.5rem',
            }}>
              <div style={{ padding: '1rem 1.5rem', borderBottom: `1px solid ${colors.border}` }}>
                <h3 style={{ color: colors.text, fontSize: '0.95rem', fontWeight: 600 }}>
                  📍 Shipment Location
                </h3>
              </div>
              <div style={{ height: '350px' }}>
                <MapContainer
                  center={truckPosition}
                  zoom={6}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; CARTO'
                  />
                  <Polyline
                    positions={[result.originCoords, result.destinationCoords]}
                    color={statusColors[result.status]}
                    weight={2}
                    opacity={0.7}
                    dashArray={result.status === 'pending' ? '8,8' : null}
                  />
                  <Marker position={truckPosition}>
                    <Popup>
                      <strong>{result.id}</strong><br />
                      {result.origin} → {result.destination}<br />
                      {statusLabels[result.status]}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Track another */}
            <button
              onClick={() => { setResult(null); setForm({ email: '', trackingId: '' }); }}
              style={{
                width: '100%', padding: '0.75rem',
                background: 'transparent',
                color: '#3b82f6', border: '1px solid #3b82f6',
                borderRadius: '8px', fontSize: '0.9rem',
                fontWeight: 600, cursor: 'pointer',
              }}
            >
              Track Another Shipment
            </button>
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

export default Track;
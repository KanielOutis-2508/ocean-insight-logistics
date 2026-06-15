import { useState } from 'react';
import { loadingLogs, warehouseStock, trucks } from '../data/mockData';
import { Plus, X, Package } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Loading = () => {
  const { colors } = useTheme();
  const [logs, setLogs] = useState(loadingLogs);
  const [stock, setStock] = useState(warehouseStock);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    truckId: '', tripId: '', date: '', time: '',
    bagsLoaded: '', destination: '', depot: '',
  });

  const totalLoaded = logs.reduce((sum, l) => sum + l.bagsLoaded, 0);

  const handleAdd = () => {
    if (!form.truckId || !form.bagsLoaded || !form.date) return;
    const truck = trucks.find(t => t.id === form.truckId);
    const newLog = {
      id: `LOAD-${String(logs.length + 1).padStart(3, '0')}`,
      truckId: form.truckId,
      plateNumber: truck?.plateNumber || '',
      driver: truck?.driver || '',
      tripId: form.tripId,
      date: form.date,
      time: form.time,
      bagsLoaded: parseInt(form.bagsLoaded),
      destination: form.destination,
    };

    if (form.depot) {
      setStock(stock.map(s =>
        s.location === form.depot
          ? { ...s, loadedOut: s.loadedOut + parseInt(form.bagsLoaded) }
          : s
      ));
    }

    setLogs([newLog, ...logs]);
    setShowModal(false);
    setForm({ truckId: '', tripId: '', date: '', time: '', bagsLoaded: '', destination: '', depot: '' });
  };

  const inputStyle = {
    width: '100%', padding: '0.6rem 0.75rem',
    background: colors.input, border: `1px solid ${colors.inputBorder}`,
    borderRadius: '6px', color: colors.text, fontSize: '0.875rem', outline: 'none',
  };

  const labelStyle = {
    color: colors.textLight, fontSize: '0.75rem', fontWeight: 600,
    textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem',
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ color: colors.text, fontSize: '1.5rem', fontWeight: 700 }}>Loading Log</h1>
          <p style={{ color: colors.textMuted, fontSize: '0.875rem' }}>Track cement loading per truck and depot stock</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
            color: 'white', border: 'none', borderRadius: '8px',
            padding: '0.65rem 1.25rem', cursor: 'pointer',
            fontSize: '0.875rem', fontWeight: 600,
          }}
        >
          <Plus size={18} /> Log Loading
        </button>
      </div>

      {/* Warehouse Stock Cards */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ color: colors.text, fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
          🏭 Warehouse / Bail Stock
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {stock.map(depot => {
            const remaining = depot.totalBags - depot.loadedOut;
            const percentage = Math.round((remaining / depot.totalBags) * 100);
            const color = percentage > 50 ? '#22c55e' : percentage > 20 ? '#f59e0b' : '#ef4444';
            return (
              <div key={depot.id} style={{
                background: colors.cardBg,
                borderRadius: '12px', padding: '1.5rem',
                border: `1px solid ${colors.border}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ color: colors.text, fontWeight: 700, fontSize: '0.95rem' }}>{depot.location}</div>
                    <div style={{ color: colors.textMuted, fontSize: '0.75rem', marginTop: '0.2rem' }}>Updated {depot.date}</div>
                  </div>
                  <Package size={20} color="#3b82f6" />
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ background: colors.cardBg2, borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${percentage}%`, height: '100%', background: color, borderRadius: '4px' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                  <div>
                    <div style={{ color: colors.textMuted, fontSize: '0.7rem', textTransform: 'uppercase' }}>Total</div>
                    <div style={{ color: colors.text, fontWeight: 700, fontSize: '0.95rem' }}>{depot.totalBags.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ color: colors.textMuted, fontSize: '0.7rem', textTransform: 'uppercase' }}>Loaded Out</div>
                    <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.95rem' }}>{depot.loadedOut.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ color: colors.textMuted, fontSize: '0.7rem', textTransform: 'uppercase' }}>Remaining</div>
                    <div style={{ color, fontWeight: 700, fontSize: '0.95rem' }}>{remaining.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Loading Logs Table */}
      <div style={{ background: colors.cardBg, borderRadius: '12px', border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h2 style={{ color: colors.text, fontSize: '0.95rem', fontWeight: 600 }}>Loading Records</h2>
          <span style={{ color: '#4ade80', fontSize: '0.875rem', fontWeight: 600 }}>
            Total: {totalLoaded.toLocaleString()} bags loaded
          </span>
        </div>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', minWidth: '700px' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                {['Log ID', 'Date', 'Time', 'Truck', 'Driver', 'Bags Loaded', 'Destination', 'Trip ID'].map(h => (
                  <th key={h} style={{
                    padding: '0.75rem 1.25rem', textAlign: 'left',
                    color: colors.tableHeader, fontWeight: 600, fontSize: '0.72rem',
                    textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap',
                    background: colors.tableHeaderBg,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={log.id} style={{ borderBottom: i < logs.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
                  <td style={{ padding: '1rem 1.25rem', color: '#a78bfa', fontWeight: 600, whiteSpace: 'nowrap' }}>{log.id}</td>
                  <td style={{ padding: '1rem 1.25rem', color: colors.textLight, whiteSpace: 'nowrap' }}>{log.date}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#60a5fa', fontWeight: 600, whiteSpace: 'nowrap' }}>{log.time}</td>
                  <td style={{ padding: '1rem 1.25rem', color: colors.text, whiteSpace: 'nowrap' }}>{log.plateNumber}</td>
                  <td style={{ padding: '1rem 1.25rem', color: colors.textLight, whiteSpace: 'nowrap' }}>{log.driver}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#4ade80', fontWeight: 700, whiteSpace: 'nowrap' }}>{log.bagsLoaded.toLocaleString()} bags</td>
                  <td style={{ padding: '1rem 1.25rem', color: colors.textLight, whiteSpace: 'nowrap' }}>{log.destination}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#60a5fa', whiteSpace: 'nowrap' }}>{log.tripId || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: colors.modalBg, borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '480px', border: `1px solid ${colors.border}`, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ color: colors.text, fontSize: '1.1rem', fontWeight: 700 }}>Log Truck Loading</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: colors.textLight, cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Select Truck</label>
                <select value={form.truckId} onChange={e => setForm({ ...form, truckId: e.target.value })} style={inputStyle}>
                  <option value="">-- Select Truck --</option>
                  {trucks.map(t => <option key={t.id} value={t.id}>{t.plateNumber} — {t.driver}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Depot / Warehouse</label>
                <select value={form.depot} onChange={e => setForm({ ...form, depot: e.target.value })} style={inputStyle}>
                  <option value="">-- Select Depot --</option>
                  {stock.map(s => <option key={s.id} value={s.location}>{s.location} ({(s.totalBags - s.loadedOut).toLocaleString()} bags remaining)</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { label: 'Date', key: 'date', type: 'date' },
                  { label: 'Time', key: 'time', type: 'time' },
                  { label: 'Bags Loaded', key: 'bagsLoaded', placeholder: 'e.g. 600', type: 'number' },
                  { label: 'Destination', key: 'destination', placeholder: 'e.g. Abuja' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={labelStyle}>{field.label}</label>
                    <input type={field.type || 'text'} placeholder={field.placeholder} value={form[field.key]} onChange={e => setForm({ ...form, [field.key]: e.target.value })} style={inputStyle} />
                  </div>
                ))}
              </div>
              <div>
                <label style={labelStyle}>Trip ID (optional)</label>
                <input placeholder="e.g. TRIP-001" value={form.tripId} onChange={e => setForm({ ...form, tripId: e.target.value })} style={inputStyle} />
              </div>
            </div>
            <button onClick={handleAdd} style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem', background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}>
              Log Loading
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loading;
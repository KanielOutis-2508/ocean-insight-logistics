import { useState } from 'react';
import { loadingLogs, warehouseStock, trucks } from '../data/mockData';
import { Plus, X, Package } from 'lucide-react';

const Loading = () => {
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

    // Update warehouse stock
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

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700 }}>Loading Log</h1>
          <p style={{ color: '#475569', fontSize: '0.875rem' }}>Track cement loading per truck and depot stock</p>
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
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
          🏭 Warehouse / Bail Stock
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {stock.map(depot => {
            const remaining = depot.totalBags - depot.loadedOut;
            const percentage = Math.round((remaining / depot.totalBags) * 100);
            const color = percentage > 50 ? '#22c55e' : percentage > 20 ? '#f59e0b' : '#ef4444';
            return (
              <div key={depot.id} style={{
                background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                borderRadius: '12px', padding: '1.5rem',
                border: '1px solid #1e293b',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>{depot.location}</div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.2rem' }}>Updated {depot.date}</div>
                  </div>
                  <Package size={20} color="#3b82f6" />
                </div>

                {/* Progress bar */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ background: '#0f172a', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${percentage}%`, height: '100%', background: color, borderRadius: '4px', transition: 'width 0.5s' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.7rem', textTransform: 'uppercase' }}>Total</div>
                    <div style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>{depot.totalBags.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.7rem', textTransform: 'uppercase' }}>Loaded Out</div>
                    <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.95rem' }}>{depot.loadedOut.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.7rem', textTransform: 'uppercase' }}>Remaining</div>
                    <div style={{ color, fontWeight: 700, fontSize: '0.95rem' }}>{remaining.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Loading Logs Table */}
      <div style={{ background: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '0.95rem', fontWeight: 600 }}>Loading Records</h2>
          <span style={{ color: '#4ade80', fontSize: '0.875rem', fontWeight: 600 }}>
            Total: {totalLoaded.toLocaleString()} bags loaded
          </span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e293b' }}>
                {['Log ID', 'Date', 'Time', 'Truck', 'Driver', 'Bags Loaded', 'Destination', 'Trip ID'].map(h => (
                  <th key={h} style={{
                    padding: '0.75rem 1.25rem', textAlign: 'left',
                    color: '#475569', fontWeight: 600, fontSize: '0.72rem',
                    textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={log.id} style={{ borderBottom: i < logs.length - 1 ? '1px solid #0f172a' : 'none' }}>
                  <td style={{ padding: '1rem 1.25rem', color: '#a78bfa', fontWeight: 600 }}>{log.id}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#94a3b8' }}>{log.date}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#60a5fa', fontWeight: 600 }}>⏰ {log.time}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#e2e8f0' }}>{log.plateNumber}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#94a3b8' }}>{log.driver}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#4ade80', fontWeight: 700 }}>
                    📦 {log.bagsLoaded.toLocaleString()} bags
                  </td>
                  <td style={{ padding: '1rem 1.25rem', color: '#94a3b8' }}>{log.destination}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#60a5fa' }}>{log.tripId || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Loading Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
        }}>
          <div style={{
            background: '#0f172a', borderRadius: '16px', padding: '2rem',
            width: '100%', maxWidth: '480px', border: '1px solid #1e293b',
            maxHeight: '90vh', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700 }}>Log Truck Loading</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Select Truck</label>
                <select
                  value={form.truckId}
                  onChange={e => setForm({ ...form, truckId: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem 0.75rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: 'white', fontSize: '0.875rem', outline: 'none' }}
                >
                  <option value="">-- Select Truck --</option>
                  {trucks.map(t => (
                    <option key={t.id} value={t.id}>{t.plateNumber} — {t.driver}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Depot / Warehouse</label>
                <select
                  value={form.depot}
                  onChange={e => setForm({ ...form, depot: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem 0.75rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: 'white', fontSize: '0.875rem', outline: 'none' }}
                >
                  <option value="">-- Select Depot --</option>
                  {stock.map(s => (
                    <option key={s.id} value={s.location}>{s.location} ({(s.totalBags - s.loadedOut).toLocaleString()} bags remaining)</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { label: 'Date', key: 'date', type: 'date' },
                  { label: 'Time', key: 'time', type: 'time' },
                  { label: 'Bags Loaded', key: 'bagsLoaded', placeholder: 'e.g. 600', type: 'number' },
                  { label: 'Destination', key: 'destination', placeholder: 'e.g. Abuja' },
                  { label: 'Trip ID (optional)', key: 'tripId', placeholder: 'e.g. TRIP-001' },
                ].map(field => (
                  <div key={field.key} style={{ gridColumn: field.key === 'tripId' ? 'span 2' : 'span 1' }}>
                    <label style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>{field.label}</label>
                    <input
                      type={field.type || 'text'}
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: 'white', fontSize: '0.875rem', outline: 'none' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleAdd}
              style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem', background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Log Loading
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loading;
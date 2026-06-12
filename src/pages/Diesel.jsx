import { useState } from 'react';
import { dieselLogs, trucks } from '../data/mockData';
import { Plus, X, Fuel, TrendingUp } from 'lucide-react';

const Diesel = () => {
  const [logs, setLogs] = useState(dieselLogs);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({
    truckId: '', driver: '', plateNumber: '',
    date: '', litres: '', pricePerLitre: '700', route: '',
  });

  const filtered = filter === 'all' ? logs : logs.filter(l => l.truckId === filter);

  const totalLitres = filtered.reduce((sum, l) => sum + l.litres, 0);
  const totalCost = filtered.reduce((sum, l) => sum + (l.litres * l.pricePerLitre), 0);

  // Per truck summary
  const truckSummary = trucks.map(truck => {
    const truckLogs = logs.filter(l => l.truckId === truck.id);
    const litres = truckLogs.reduce((sum, l) => sum + l.litres, 0);
    const cost = truckLogs.reduce((sum, l) => sum + (l.litres * l.pricePerLitre), 0);
    return { ...truck, litres, cost, trips: truckLogs.length };
  });

  // Per route summary
  const routeSummary = {};
  logs.forEach(log => {
    if (!routeSummary[log.route]) {
      routeSummary[log.route] = { litres: 0, trips: 0 };
    }
    routeSummary[log.route].litres += log.litres;
    routeSummary[log.route].trips += 1;
  });

  const handleAdd = () => {
    if (!form.truckId || !form.litres || !form.date) return;
    const truck = trucks.find(t => t.id === form.truckId);
    const newLog = {
      id: `DSL-${String(logs.length + 1).padStart(3, '0')}`,
      ...form,
      driver: truck?.driver || form.driver,
      plateNumber: truck?.plateNumber || form.plateNumber,
      litres: parseInt(form.litres),
      pricePerLitre: parseInt(form.pricePerLitre),
    };
    setLogs([newLog, ...logs]);
    setShowModal(false);
    setForm({
      truckId: '', driver: '', plateNumber: '',
      date: '', litres: '', pricePerLitre: '700', route: '',
    });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700 }}>Diesel Tracker</h1>
          <p style={{ color: '#475569', fontSize: '0.875rem' }}>Monitor fuel consumption per truck and route</p>
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
          <Plus size={18} /> Log Diesel
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1e293b' }}>
          <div style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Total Litres</div>
          <div style={{ color: 'white', fontSize: '1.8rem', fontWeight: 700 }}>{totalLitres.toLocaleString()}L</div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1e293b' }}>
          <div style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Total Cost</div>
          <div style={{ color: '#4ade80', fontSize: '1.8rem', fontWeight: 700 }}>₦{totalCost.toLocaleString()}</div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1e293b' }}>
          <div style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Avg Per Trip</div>
          <div style={{ color: '#60a5fa', fontSize: '1.8rem', fontWeight: 700 }}>
            {logs.length > 0 ? Math.round(totalLitres / logs.length) : 0}L
          </div>
        </div>
      </div>

      {/* Two column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>

        {/* Per Truck Summary */}
        <div style={{ background: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1e293b' }}>
            <h2 style={{ color: 'white', fontSize: '0.95rem', fontWeight: 600 }}>🚛 Consumption Per Truck</h2>
          </div>
          <div style={{ padding: '1rem' }}>
            {truckSummary.filter(t => t.litres > 0).map(truck => (
              <div key={truck.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0.75rem', borderRadius: '8px', marginBottom: '0.5rem',
                background: '#1e293b',
              }}>
                <div>
                  <div style={{ color: 'white', fontSize: '0.875rem', fontWeight: 600 }}>{truck.plateNumber}</div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{truck.driver} · {truck.trips} logs</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#60a5fa', fontSize: '0.875rem', fontWeight: 600 }}>{truck.litres}L</div>
                  <div style={{ color: '#4ade80', fontSize: '0.75rem' }}>₦{truck.cost.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Per Route Summary */}
        <div style={{ background: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1e293b' }}>
            <h2 style={{ color: 'white', fontSize: '0.95rem', fontWeight: 600 }}>🗺️ Consumption Per Route</h2>
          </div>
          <div style={{ padding: '1rem' }}>
            {Object.entries(routeSummary).map(([route, data]) => (
              <div key={route} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0.75rem', borderRadius: '8px', marginBottom: '0.5rem',
                background: '#1e293b',
              }}>
                <div>
                  <div style={{ color: 'white', fontSize: '0.875rem', fontWeight: 600 }}>{route}</div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{data.trips} trip{data.trips > 1 ? 's' : ''}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#f59e0b', fontSize: '0.875rem', fontWeight: 600 }}>{data.litres}L</div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem' }}>~{Math.round(data.litres / data.trips)}L/trip</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter by truck */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setFilter('all')}
          style={{
            padding: '0.45rem 1rem', borderRadius: '6px', cursor: 'pointer',
            border: filter === 'all' ? '1px solid #3b82f6' : '1px solid #1e293b',
            background: filter === 'all' ? '#1e40af' : '#0f172a',
            color: filter === 'all' ? 'white' : '#64748b', fontSize: '0.8rem',
          }}
        >All Trucks</button>
        {trucks.map(truck => (
          <button
            key={truck.id}
            onClick={() => setFilter(truck.id)}
            style={{
              padding: '0.45rem 1rem', borderRadius: '6px', cursor: 'pointer',
              border: filter === truck.id ? '1px solid #3b82f6' : '1px solid #1e293b',
              background: filter === truck.id ? '#1e40af' : '#0f172a',
              color: filter === truck.id ? 'white' : '#64748b', fontSize: '0.8rem',
            }}
          >{truck.plateNumber}</button>
        ))}
      </div>

      {/* Diesel Logs Table */}
      <div style={{ background: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e293b' }}>
                {['Log ID', 'Date', 'Truck', 'Driver', 'Route', 'Litres', 'Price/L', 'Total Cost'].map(h => (
                  <th key={h} style={{
                    padding: '0.75rem 1.25rem', textAlign: 'left',
                    color: '#475569', fontWeight: 600, fontSize: '0.72rem',
                    textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, i) => (
                <tr key={log.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #0f172a' : 'none' }}>
                  <td style={{ padding: '1rem 1.25rem', color: '#f59e0b', fontWeight: 600 }}>{log.id}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#94a3b8' }}>{log.date}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#e2e8f0' }}>{log.plateNumber}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#94a3b8' }}>{log.driver}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#94a3b8' }}>{log.route}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#60a5fa', fontWeight: 600 }}>{log.litres}L</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#94a3b8' }}>₦{log.pricePerLitre}/L</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#4ade80', fontWeight: 600 }}>
                    ₦{(log.litres * log.pricePerLitre).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Diesel Modal */}
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
              <h2 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700 }}>Log Diesel Collection</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                  Select Truck
                </label>
                <select
                  value={form.truckId}
                  onChange={e => setForm({ ...form, truckId: e.target.value })}
                  style={{
                    width: '100%', padding: '0.6rem 0.75rem',
                    background: '#1e293b', border: '1px solid #334155',
                    borderRadius: '6px', color: 'white', fontSize: '0.875rem', outline: 'none',
                  }}
                >
                  <option value="">-- Select Truck --</option>
                  {trucks.map(t => (
                    <option key={t.id} value={t.id}>{t.plateNumber} — {t.driver}</option>
                  ))}
                </select>
              </div>

              {[
                { label: 'Date', key: 'date', type: 'date' },
                { label: 'Litres Collected', key: 'litres', placeholder: 'e.g. 120', type: 'number' },
                { label: 'Price Per Litre (₦)', key: 'pricePerLitre', placeholder: 'e.g. 700', type: 'number' },
                { label: 'Route', key: 'route', placeholder: 'e.g. Lagos → Abuja' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    style={{
                      width: '100%', padding: '0.6rem 0.75rem',
                      background: '#1e293b', border: '1px solid #334155',
                      borderRadius: '6px', color: 'white', fontSize: '0.875rem', outline: 'none',
                    }}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleAdd}
              style={{
                width: '100%', marginTop: '1.5rem', padding: '0.75rem',
                background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
                color: 'white', border: 'none', borderRadius: '8px',
                fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
              }}
            >
              Log Diesel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Diesel;
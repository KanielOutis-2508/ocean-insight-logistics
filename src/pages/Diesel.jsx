import { useState } from 'react';
import { dieselLogs, trucks } from '../data/mockData';
import { Plus, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Diesel = () => {
  const { colors } = useTheme();
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

  const truckSummary = trucks.map(truck => {
    const truckLogs = logs.filter(l => l.truckId === truck.id);
    const litres = truckLogs.reduce((sum, l) => sum + l.litres, 0);
    const cost = truckLogs.reduce((sum, l) => sum + (l.litres * l.pricePerLitre), 0);
    return { ...truck, litres, cost, trips: truckLogs.length };
  });

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
    setForm({ truckId: '', driver: '', plateNumber: '', date: '', litres: '', pricePerLitre: '700', route: '' });
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
          <h1 style={{ color: colors.text, fontSize: '1.5rem', fontWeight: 700 }}>Diesel Tracker</h1>
          <p style={{ color: colors.textMuted, fontSize: '0.875rem' }}>Monitor fuel consumption per truck and route</p>
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Litres', value: `${totalLitres.toLocaleString()}L`, color: 'white' },
          { label: 'Total Cost', value: `₦${totalCost.toLocaleString()}`, color: '#4ade80' },
          { label: 'Avg Per Trip', value: `${logs.length > 0 ? Math.round(totalLitres / logs.length) : 0}L`, color: '#60a5fa' },
        ].map(card => (
          <div key={card.label} style={{ background: colors.cardBg, borderRadius: '12px', padding: '1.25rem', border: `1px solid ${colors.border}` }}>
            <div style={{ color: colors.textMuted, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>{card.label}</div>
            <div style={{ color: card.color, fontSize: '1.6rem', fontWeight: 700 }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Per Truck and Per Route */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>

        {/* Per Truck */}
        <div style={{ background: colors.cardBg, borderRadius: '12px', border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: `1px solid ${colors.border}` }}>
            <h2 style={{ color: colors.text, fontSize: '0.95rem', fontWeight: 600 }}>🚛 Consumption Per Truck</h2>
          </div>
          <div style={{ padding: '1rem' }}>
            {truckSummary.filter(t => t.litres > 0).map(truck => (
              <div key={truck.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0.75rem', borderRadius: '8px', marginBottom: '0.5rem',
                background: colors.cardBg2, flexWrap: 'wrap', gap: '0.25rem',
              }}>
                <div>
                  <div style={{ color: colors.text, fontSize: '0.875rem', fontWeight: 600 }}>{truck.plateNumber}</div>
                  <div style={{ color: colors.textMuted, fontSize: '0.75rem' }}>{truck.driver} · {truck.trips} logs</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#60a5fa', fontSize: '0.875rem', fontWeight: 600 }}>{truck.litres}L</div>
                  <div style={{ color: '#4ade80', fontSize: '0.75rem' }}>₦{truck.cost.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Per Route */}
        <div style={{ background: colors.cardBg, borderRadius: '12px', border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: `1px solid ${colors.border}` }}>
            <h2 style={{ color: colors.text, fontSize: '0.95rem', fontWeight: 600 }}>🗺️ Consumption Per Route</h2>
          </div>
          <div style={{ padding: '1rem' }}>
            {Object.entries(routeSummary).map(([route, data]) => (
              <div key={route} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0.75rem', borderRadius: '8px', marginBottom: '0.5rem',
                background: colors.cardBg2, flexWrap: 'wrap', gap: '0.25rem',
              }}>
                <div>
                  <div style={{ color: colors.text, fontSize: '0.875rem', fontWeight: 600 }}>{route}</div>
                  <div style={{ color: colors.textMuted, fontSize: '0.75rem' }}>{data.trips} trip{data.trips > 1 ? 's' : ''}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#f59e0b', fontSize: '0.875rem', fontWeight: 600 }}>{data.litres}L</div>
                  <div style={{ color: colors.textMuted, fontSize: '0.75rem' }}>~{Math.round(data.litres / data.trips)}L/trip</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter by truck */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button onClick={() => setFilter('all')} style={{ padding: '0.45rem 1rem', borderRadius: '6px', cursor: 'pointer', border: filter === 'all' ? '1px solid #3b82f6' : `1px solid ${colors.border}`, background: filter === 'all' ? '#1e40af' : colors.cardBg, color: filter === 'all' ? 'white' : colors.textLight, fontSize: '0.8rem' }}>
          All Trucks
        </button>
        {trucks.map(truck => (
          <button key={truck.id} onClick={() => setFilter(truck.id)} style={{ padding: '0.45rem 1rem', borderRadius: '6px', cursor: 'pointer', border: filter === truck.id ? '1px solid #3b82f6' : `1px solid ${colors.border}`, background: filter === truck.id ? '#1e40af' : colors.cardBg, color: filter === truck.id ? 'white' : colors.textLight, fontSize: '0.8rem' }}>
            {truck.plateNumber}
          </button>
        ))}
      </div>

      {/* Logs Table */}
      <div style={{ background: colors.cardBg, borderRadius: '12px', border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', minWidth: '650px' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                {['Log ID', 'Date', 'Truck', 'Driver', 'Route', 'Litres', 'Price/L', 'Total Cost'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1.25rem', textAlign: 'left', color: colors.tableHeader, fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap', background: colors.tableHeaderBg }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, i) => (
                <tr key={log.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
                  <td style={{ padding: '1rem 1.25rem', color: '#f59e0b', fontWeight: 600, whiteSpace: 'nowrap' }}>{log.id}</td>
                  <td style={{ padding: '1rem 1.25rem', color: colors.textLight, whiteSpace: 'nowrap' }}>{log.date}</td>
                  <td style={{ padding: '1rem 1.25rem', color: colors.text, whiteSpace: 'nowrap' }}>{log.plateNumber}</td>
                  <td style={{ padding: '1rem 1.25rem', color: colors.textLight, whiteSpace: 'nowrap' }}>{log.driver}</td>
                  <td style={{ padding: '1rem 1.25rem', color: colors.textLight, whiteSpace: 'nowrap' }}>{log.route}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#60a5fa', fontWeight: 600, whiteSpace: 'nowrap' }}>{log.litres}L</td>
                  <td style={{ padding: '1rem 1.25rem', color: colors.textLight, whiteSpace: 'nowrap' }}>₦{log.pricePerLitre}/L</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#4ade80', fontWeight: 600, whiteSpace: 'nowrap' }}>₦{(log.litres * log.pricePerLitre).toLocaleString()}</td>
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
              <h2 style={{ color: colors.text, fontSize: '1.1rem', fontWeight: 700 }}>Log Diesel Collection</h2>
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
              {[
                { label: 'Date', key: 'date', type: 'date' },
                { label: 'Litres Collected', key: 'litres', placeholder: 'e.g. 120', type: 'number' },
                { label: 'Price Per Litre (₦)', key: 'pricePerLitre', placeholder: 'e.g. 700', type: 'number' },
                { label: 'Route', key: 'route', placeholder: 'e.g. Lagos → Abuja' },
              ].map(field => (
                <div key={field.key}>
                  <label style={labelStyle}>{field.label}</label>
                  <input type={field.type || 'text'} placeholder={field.placeholder} value={form[field.key]} onChange={e => setForm({ ...form, [field.key]: e.target.value })} style={inputStyle} />
                </div>
              ))}
            </div>
            <button onClick={handleAdd} style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem', background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}>
              Log Diesel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Diesel;
import { useState } from 'react';
import { trips, trucks } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import { Plus, X, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Trips = () => {
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [tripList, setTripList] = useState(trips);
  const [form, setForm] = useState({
    driver: '', plateNumber: '', origin: '', destination: '',
    cargo: 'Cement', bags: '', status: 'pending',
    departureDate: '', expectedArrival: '', revenue: '',
  });

  const filtered = tripList.filter(trip => {
    const matchSearch = trip.driver.toLowerCase().includes(search.toLowerCase()) ||
      trip.origin.toLowerCase().includes(search.toLowerCase()) ||
      trip.destination.toLowerCase().includes(search.toLowerCase()) ||
      trip.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || trip.status === filter;
    return matchSearch && matchFilter;
  });

  const handleAdd = () => {
    if (!form.driver || !form.origin || !form.destination) return;
    const newTrip = {
      id: `TRIP-${String(tripList.length + 1).padStart(3, '0')}`,
      truckId: 'TRK-001',
      ...form,
      bags: parseInt(form.bags) || 0,
      revenue: parseInt(form.revenue) || 0,
      originCoords: [9.0820, 8.6753],
      destinationCoords: [9.0820, 8.6753],
    };
    setTripList([newTrip, ...tripList]);
    setShowModal(false);
    setForm({
      driver: '', plateNumber: '', origin: '', destination: '',
      cargo: 'Cement', bags: '', status: 'pending',
      departureDate: '', expectedArrival: '', revenue: '',
    });
  };

  const filters = ['all', 'in-transit', 'delivered', 'pending'];

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
          <h1 style={{ color: colors.text, fontSize: '1.5rem', fontWeight: 700 }}>Trip Management</h1>
          <p style={{ color: colors.textMuted, fontSize: '0.875rem' }}>{filtered.length} trips found</p>
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
          <Plus size={18} /> Add Trip
        </button>
      </div>

      {/* Search and Filter */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: colors.textMuted }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search trips..."
            style={{
              width: '100%', padding: '0.6rem 0.75rem 0.6rem 2.25rem',
              background: colors.input, border: `1px solid ${colors.inputBorder}`,
              borderRadius: '8px', color: colors.text, fontSize: '0.875rem', outline: 'none',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer',
                border: filter === f ? '1px solid #3b82f6' : `1px solid ${colors.border}`,
                background: filter === f ? '#1e40af' : colors.cardBg,
                color: filter === f ? 'white' : colors.textLight,
                fontSize: '0.8rem', fontWeight: 500, textTransform: 'capitalize',
              }}
            >
              {f === 'all' ? 'All' : f.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: colors.cardBg, borderRadius: '12px', border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', minWidth: '750px' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                {['Trip ID', 'Driver', 'Plate', 'Route', 'Cargo', 'Departure', 'ETA', 'Revenue', 'Status'].map(h => (
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
              {filtered.map((trip, i) => (
                <tr key={trip.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
                  <td style={{ padding: '1rem 1.25rem', color: '#60a5fa', fontWeight: 600, whiteSpace: 'nowrap' }}>{trip.id}</td>
                  <td style={{ padding: '1rem 1.25rem', color: colors.text, whiteSpace: 'nowrap' }}>{trip.driver}</td>
                  <td style={{ padding: '1rem 1.25rem', color: colors.textLight, whiteSpace: 'nowrap' }}>{trip.plateNumber}</td>
                  <td style={{ padding: '1rem 1.25rem', color: colors.textLight, whiteSpace: 'nowrap' }}>{trip.origin} → {trip.destination}</td>
                  <td style={{ padding: '1rem 1.25rem', color: colors.textLight, whiteSpace: 'nowrap' }}>{trip.cargo} ({trip.bags} bags)</td>
                  <td style={{ padding: '1rem 1.25rem', color: colors.textLight, whiteSpace: 'nowrap' }}>{trip.departureDate}</td>
                  <td style={{ padding: '1rem 1.25rem', color: colors.textLight, whiteSpace: 'nowrap' }}>{trip.expectedArrival}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#4ade80', fontWeight: 600, whiteSpace: 'nowrap' }}>₦{trip.revenue.toLocaleString()}</td>
                  <td style={{ padding: '1rem 1.25rem' }}><StatusBadge status={trip.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: colors.modalBg, borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '560px', border: `1px solid ${colors.border}`, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ color: colors.text, fontSize: '1.1rem', fontWeight: 700 }}>Add New Trip</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: colors.textLight, cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { label: 'Driver Name', key: 'driver', placeholder: 'e.g. Emeka Okafor' },
                { label: 'Plate Number', key: 'plateNumber', placeholder: 'e.g. LND-421-AA' },
                { label: 'Origin', key: 'origin', placeholder: 'e.g. Lagos' },
                { label: 'Destination', key: 'destination', placeholder: 'e.g. Abuja' },
                { label: 'Bags', key: 'bags', placeholder: 'e.g. 600', type: 'number' },
                { label: 'Revenue (₦)', key: 'revenue', placeholder: 'e.g. 450000', type: 'number' },
                { label: 'Departure Date', key: 'departureDate', type: 'date' },
                { label: 'Expected Arrival', key: 'expectedArrival', type: 'date' },
              ].map(field => (
                <div key={field.key}>
                  <label style={labelStyle}>{field.label}</label>
                  <input type={field.type || 'text'} placeholder={field.placeholder} value={form[field.key]} onChange={e => setForm({ ...form, [field.key]: e.target.value })} style={inputStyle} />
                </div>
              ))}
              <div>
                <label style={labelStyle}>Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={inputStyle}>
                  <option value="pending">Pending</option>
                  <option value="in-transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
            <button onClick={handleAdd} style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem', background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}>
              Add Trip
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trips;
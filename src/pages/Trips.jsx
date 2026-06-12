import { useState } from 'react';
import { trips, trucks } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import { Plus, X, Search } from 'lucide-react';

const Trips = () => {
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

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700 }}>Trip Management</h1>
          <p style={{ color: '#475569', fontSize: '0.875rem' }}>{filtered.length} trips found</p>
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
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search trips..."
            style={{
              width: '100%', padding: '0.6rem 0.75rem 0.6rem 2.25rem',
              background: '#0f172a', border: '1px solid #1e293b',
              borderRadius: '8px', color: 'white', fontSize: '0.875rem', outline: 'none',
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
                border: filter === f ? '1px solid #3b82f6' : '1px solid #1e293b',
                background: filter === f ? '#1e40af' : '#0f172a',
                color: filter === f ? 'white' : '#64748b',
                fontSize: '0.8rem', fontWeight: 500, textTransform: 'capitalize',
              }}
            >
              {f === 'all' ? 'All' : f.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{
        background: '#0f172a', borderRadius: '12px',
        border: '1px solid #1e293b', overflow: 'hidden',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e293b' }}>
                {['Trip ID', 'Driver', 'Plate', 'Route', 'Cargo', 'Departure', 'ETA', 'Revenue', 'Status'].map(h => (
                  <th key={h} style={{
                    padding: '0.75rem 1.25rem', textAlign: 'left',
                    color: '#475569', fontWeight: 600, fontSize: '0.72rem',
                    textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((trip, i) => (
                <tr key={trip.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #0f172a' : 'none' }}>
                  <td style={{ padding: '1rem 1.25rem', color: '#60a5fa', fontWeight: 600 }}>{trip.id}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#e2e8f0' }}>{trip.driver}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#94a3b8' }}>{trip.plateNumber}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>{trip.origin} → {trip.destination}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#94a3b8' }}>{trip.cargo} ({trip.bags} bags)</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>{trip.departureDate}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>{trip.expectedArrival}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#4ade80', fontWeight: 600 }}>₦{trip.revenue.toLocaleString()}</td>
                  <td style={{ padding: '1rem 1.25rem' }}><StatusBadge status={trip.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Trip Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
        }}>
          <div style={{
            background: '#0f172a', borderRadius: '16px', padding: '2rem',
            width: '100%', maxWidth: '560px', border: '1px solid #1e293b',
            maxHeight: '90vh', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700 }}>Add New Trip</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={20} />
              </button>
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

              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                  style={{
                    width: '100%', padding: '0.6rem 0.75rem',
                    background: '#1e293b', border: '1px solid #334155',
                    borderRadius: '6px', color: 'white', fontSize: '0.875rem', outline: 'none',
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="in-transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
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
              Add Trip
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trips;
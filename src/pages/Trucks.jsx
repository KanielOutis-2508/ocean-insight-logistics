import { useState } from 'react';
import { trucks } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import { Plus, X, Truck, Phone } from 'lucide-react';

const Trucks = () => {
  const [truckList, setTruckList] = useState(trucks);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    plateNumber: '', driver: '', phone: '', status: 'active',
  });

  const handleAdd = () => {
    if (!form.plateNumber || !form.driver) return;
    const newTruck = {
      id: `TRK-00${truckList.length + 1}`,
      ...form,
    };
    setTruckList([...truckList, newTruck]);
    setShowModal(false);
    setForm({ plateNumber: '', driver: '', phone: '', status: 'active' });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700 }}>Fleet Management</h1>
          <p style={{ color: '#475569', fontSize: '0.875rem' }}>{truckList.length} trucks registered</p>
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
          <Plus size={18} /> Add Truck
        </button>
      </div>

      {/* Truck Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
      }}>
        {truckList.map(truck => (
          <div key={truck.id} style={{
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            borderRadius: '12px', padding: '1.5rem',
            border: '1px solid #1e293b',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Glow */}
            <div style={{
              position: 'absolute', top: '-30px', right: '-30px',
              width: '100px', height: '100px', borderRadius: '50%',
              backgroundColor: truck.status === 'active' ? '#22c55e' :
                truck.status === 'maintenance' ? '#f59e0b' : '#ef4444',
              opacity: 0.06, filter: 'blur(30px)',
            }} />

            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '10px',
                background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem',
              }}>
                🚛
              </div>
              <StatusBadge status={truck.status} />
            </div>

            {/* Truck info */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#60a5fa', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                {truck.id}
              </div>
              <div style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                {truck.plateNumber}
              </div>
            </div>

            {/* Driver info */}
            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={14} color="#475569" />
                <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{truck.driver}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={14} color="#475569" />
                <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{truck.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Truck Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
        }}>
          <div style={{
            background: '#0f172a', borderRadius: '16px', padding: '2rem',
            width: '100%', maxWidth: '420px', border: '1px solid #1e293b',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700 }}>Add New Truck</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Plate Number', key: 'plateNumber', placeholder: 'e.g. LND-421-AA' },
                { label: 'Driver Name', key: 'driver', placeholder: 'e.g. Emeka Okafor' },
                { label: 'Phone Number', key: 'phone', placeholder: 'e.g. 08012345678' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                    {field.label}
                  </label>
                  <input
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
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inactive">Inactive</option>
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
              Add Truck
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trucks;
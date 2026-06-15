import { useState } from 'react';
import { truckDocuments } from '../data/mockData';
import { AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Documents = () => {
  const { colors } = useTheme();
  const [docs] = useState(truckDocuments);

  const getStatus = (dateStr) => {
    const today = new Date();
    const expiry = new Date(dateStr);
    const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    if (daysLeft < 0) return { label: 'Expired', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', icon: '❌', days: daysLeft };
    if (daysLeft <= 30) return { label: `${daysLeft}d left`, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: '⚠️', days: daysLeft };
    return { label: `${daysLeft}d left`, color: '#22c55e', bg: 'rgba(34,197,94,0.1)', icon: '✅', days: daysLeft };
  };

  const expiringSoon = docs.filter(doc => {
    const dates = [doc.roadWorthiness, doc.vehicleLicence, doc.insurance];
    return dates.some(d => {
      const daysLeft = Math.ceil((new Date(d) - new Date()) / (1000 * 60 * 60 * 24));
      return daysLeft <= 30;
    });
  });

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ color: colors.text, fontSize: '1.5rem', fontWeight: 700 }}>Truck Documents</h1>
        <p style={{ color: colors.textMuted, fontSize: '0.875rem' }}>Track registration and document expiry dates</p>
      </div>

      {/* Alert banner */}
      {expiringSoon.length > 0 && (
        <div style={{
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: '10px', padding: '1rem 1.5rem', marginBottom: '1.5rem',
          display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap',
        }}>
          <AlertTriangle size={20} color="#ef4444" />
          <span style={{ color: '#fca5a5', fontSize: '0.875rem', fontWeight: 600 }}>
            ⚠️ {expiringSoon.length} truck{expiringSoon.length > 1 ? 's have' : ' has'} documents expiring within 30 days!
          </span>
        </div>
      )}

      {/* Cards view - shows on all screens */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {docs.map(doc => {
          const rw = getStatus(doc.roadWorthiness);
          const vl = getStatus(doc.vehicleLicence);
          const ins = getStatus(doc.insurance);
          const hasAlert = [rw, vl, ins].some(s => s.days <= 30);

          return (
            <div key={doc.truckId} style={{
              background: colors.cardBg,
              borderRadius: '12px', padding: '1.25rem',
              border: hasAlert ? '1px solid rgba(239,68,68,0.4)' : `1px solid ${colors.border}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ color: '#60a5fa', fontWeight: 700, fontSize: '1rem' }}>{doc.plateNumber}</div>
                  <div style={{ color: colors.textMuted, fontSize: '0.75rem', marginTop: '0.2rem' }}>{doc.driver} · {doc.truckId}</div>
                </div>
                {hasAlert && <AlertTriangle size={18} color="#ef4444" />}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { label: 'Road Worthiness', status: rw, date: doc.roadWorthiness },
                  { label: 'Vehicle Licence', status: vl, date: doc.vehicleLicence },
                  { label: 'Insurance', status: ins, date: doc.insurance },
                ].map(item => (
                  <div key={item.label} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '0.5rem 0.75rem', borderRadius: '6px', background: colors.cardBg2,
                    flexWrap: 'wrap', gap: '0.25rem',
                  }}>
                    <span style={{ color: colors.textLight, fontSize: '0.75rem' }}>{item.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ color: colors.textMuted, fontSize: '0.72rem' }}>{item.date}</span>
                      <span style={{
                        padding: '0.15rem 0.5rem', borderRadius: '20px',
                        fontSize: '0.7rem', fontWeight: 600,
                        backgroundColor: item.status.bg, color: item.status.color,
                        border: `1px solid ${item.status.color}40`,
                        whiteSpace: 'nowrap',
                      }}>
                        {item.status.icon} {item.status.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Table view - scrollable */}
      <div style={{ background: colors.cardBg, borderRadius: '12px', border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: `1px solid ${colors.border}` }}>
          <h2 style={{ color: colors.text, fontSize: '0.95rem', fontWeight: 600 }}>Full Document Table</h2>
        </div>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', minWidth: '650px' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                {['Truck', 'Driver', 'Road Worthiness', 'Vehicle Licence', 'Insurance'].map(h => (
                  <th key={h} style={{
                    padding: '0.75rem 1.5rem', textAlign: 'left',
                    color: colors.tableHeader, fontWeight: 600, fontSize: '0.72rem',
                    textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap',
                    background: colors.tableHeaderBg,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {docs.map((doc, i) => {
                const rw = getStatus(doc.roadWorthiness);
                const vl = getStatus(doc.vehicleLicence);
                const ins = getStatus(doc.insurance);
                return (
                  <tr key={doc.truckId} style={{ borderBottom: i < docs.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ color: '#60a5fa', fontWeight: 700, whiteSpace: 'nowrap' }}>{doc.plateNumber}</div>
                      <div style={{ color: colors.textMuted, fontSize: '0.75rem' }}>{doc.truckId}</div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: colors.text, whiteSpace: 'nowrap' }}>{doc.driver}</td>
                    {[
                      { date: doc.roadWorthiness, status: rw },
                      { date: doc.vehicleLicence, status: vl },
                      { date: doc.insurance, status: ins },
                    ].map((item, idx) => (
                      <td key={idx} style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                        <div style={{ color: colors.textLight, fontSize: '0.8rem', marginBottom: '0.3rem' }}>{item.date}</div>
                        <span style={{
                          padding: '0.2rem 0.6rem', borderRadius: '20px',
                          fontSize: '0.72rem', fontWeight: 600,
                          backgroundColor: item.status.bg, color: item.status.color,
                          border: `1px solid ${item.status.color}40`,
                        }}>
                          {item.status.icon} {item.status.label}
                        </span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Documents;
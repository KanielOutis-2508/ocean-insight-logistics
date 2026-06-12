import { trips, getStats } from '../data/mockData';
import StatCard from '../components/StatCard';
import TruckMap from '../components/TruckMap';
import StatusBadge from '../components/StatusBadge';
import { Truck, Route, Package, TrendingUp, Fuel, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const stats = getStats();

  const recentTrips = trips.slice(0, 5);

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>

      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          Fleet Overview
        </h1>
        <p style={{ color: '#475569', fontSize: '0.875rem' }}>
          Real-time tracking — Ocean Insight Logistics Nigeria Limited
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        <StatCard label="Total Trucks" value={stats.totalTrucks} icon={<Truck size={20} />} color="#3b82f6" />
        <StatCard label="Active Trucks" value={stats.activeTrucks} icon={<Truck size={20} />} color="#22c55e" />
        <StatCard label="In Transit" value={stats.inTransit} icon={<Route size={20} />} color="#f59e0b" />
        <StatCard label="Delivered" value={stats.delivered} icon={<Package size={20} />} color="#22c55e" />
        <StatCard label="Pending Trips" value={stats.pending} icon={<AlertTriangle size={20} />} color="#ef4444" />
        <StatCard label="Total Revenue" value={stats.totalRevenue} icon={<TrendingUp size={20} />} color="#a855f7" prefix="₦" />
        <StatCard label="Total Bags" value={stats.totalBags} icon={<Package size={20} />} color="#06b6d4" suffix=" bags" />
      </div>

      {/* Map */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600 }}>Live Fleet Map</h2>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#64748b' }}>
            <span>🔵 In Transit</span>
            <span>🟢 Delivered</span>
            <span>🟡 Pending</span>
          </div>
        </div>
        <TruckMap trips={trips} />
      </div>

      {/* Recent Trips */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderRadius: '12px',
        border: '1px solid #1e293b',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1e293b' }}>
          <h2 style={{ color: 'white', fontSize: '1rem', fontWeight: 600 }}>Recent Trips</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e293b' }}>
                {['Trip ID', 'Driver', 'Route', 'Cargo', 'Revenue', 'Status'].map(h => (
                  <th key={h} style={{
                    padding: '0.75rem 1.5rem', textAlign: 'left',
                    color: '#475569', fontWeight: 600, fontSize: '0.75rem',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentTrips.map((trip, i) => (
                <tr key={trip.id} style={{
                  borderBottom: i < recentTrips.length - 1 ? '1px solid #0f172a' : 'none',
                  transition: 'background 0.15s',
                }}>
                  <td style={{ padding: '1rem 1.5rem', color: '#60a5fa', fontWeight: 600 }}>{trip.id}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#e2e8f0' }}>{trip.driver}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#94a3b8' }}>
                    {trip.origin} → {trip.destination}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: '#94a3b8' }}>
                    {trip.cargo} ({trip.bags} bags)
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: '#4ade80', fontWeight: 600 }}>
                    ₦{trip.revenue.toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <StatusBadge status={trip.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
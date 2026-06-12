import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const createTruckIcon = (status) => {
  const color = status === 'in-transit' ? '#3b82f6' :
    status === 'delivered' ? '#22c55e' : '#fbbf24';

  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 36px;
        height: 36px;
        background: ${color};
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
      ">🚛</div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};

const TruckMap = ({ trips }) => {
  const nigeriaCenter = [9.0820, 8.6753];

  const routeColors = {
    'in-transit': '#3b82f6',
    'delivered': '#22c55e',
    'pending': '#fbbf24',
  };

  return (
    <div style={{
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #1e293b',
      height: '450px',
    }}>
      <MapContainer
        center={nigeriaCenter}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {trips.map(trip => (
          <div key={trip.id}>
            {/* Route line */}
            <Polyline
              positions={[trip.originCoords, trip.destinationCoords]}
              color={routeColors[trip.status]}
              weight={2}
              opacity={0.7}
              dashArray={trip.status === 'pending' ? '8, 8' : null}
            />

            {/* Origin marker */}
            <Marker position={trip.originCoords}>
              <Popup>
                <div style={{ minWidth: '160px' }}>
                  <strong>{trip.origin}</strong>
                  <p style={{ margin: '4px 0', fontSize: '12px' }}>📦 {trip.cargo} — {trip.bags} bags</p>
                  <p style={{ margin: '4px 0', fontSize: '12px' }}>🚛 {trip.driver}</p>
                </div>
              </Popup>
            </Marker>

            {/* Truck marker (destination) */}
            <Marker
              position={trip.status === 'in-transit'
                ? [
                    (trip.originCoords[0] + trip.destinationCoords[0]) / 2,
                    (trip.originCoords[1] + trip.destinationCoords[1]) / 2,
                  ]
                : trip.destinationCoords
              }
              icon={createTruckIcon(trip.status)}
            >
              <Popup>
                <div style={{ minWidth: '180px' }}>
                  <strong>{trip.id}</strong><br />
                  <span style={{ fontSize: '12px' }}>🚛 {trip.driver}</span><br />
                  <span style={{ fontSize: '12px' }}>📍 {trip.origin} → {trip.destination}</span><br />
                  <span style={{ fontSize: '12px' }}>📦 {trip.bags} bags</span><br />
                  <span style={{ fontSize: '12px' }}>💰 ₦{trip.revenue.toLocaleString()}</span>
                </div>
              </Popup>
            </Marker>
          </div>
        ))}
      </MapContainer>
    </div>
  );
};

export default TruckMap;
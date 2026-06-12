export const trucks = [
  { id: 'TRK-001', plateNumber: 'LND-421-AA', driver: 'Emeka Okafor', phone: '08012345678', status: 'active' },
  { id: 'TRK-002', plateNumber: 'ABJ-332-BC', driver: 'Musa Ibrahim', phone: '08023456789', status: 'active' },
  { id: 'TRK-003', plateNumber: 'KNO-119-CD', driver: 'Tunde Adeyemi', phone: '08034567890', status: 'maintenance' },
  { id: 'TRK-004', plateNumber: 'PH-554-EF', driver: 'Chidi Nwosu', phone: '08045678901', status: 'active' },
  { id: 'TRK-005', plateNumber: 'IBA-221-GH', driver: 'Segun Falola', phone: '08056789012', status: 'active' },
  { id: 'TRK-006', plateNumber: 'ENU-778-IJ', driver: 'Biodun Adeleke', phone: '08067890123', status: 'inactive' },
];

export const trips = [
  {
    id: 'TRIP-001',
    truckId: 'TRK-001',
    driver: 'Emeka Okafor',
    plateNumber: 'LND-421-AA',
    origin: 'Lagos',
    destination: 'Abuja',
    originCoords: [6.5244, 3.3792],
    destinationCoords: [9.0579, 7.4951],
    cargo: 'Cement',
    bags: 600,
    status: 'in-transit',
    departureDate: '2026-06-07',
    expectedArrival: '2026-06-09',
    revenue: 450000,
  },
  {
    id: 'TRIP-002',
    truckId: 'TRK-002',
    driver: 'Musa Ibrahim',
    plateNumber: 'ABJ-332-BC',
    origin: 'Abuja',
    destination: 'Kano',
    originCoords: [9.0579, 7.4951],
    destinationCoords: [12.0022, 8.5920],
    cargo: 'Cement',
    bags: 500,
    status: 'in-transit',
    departureDate: '2026-06-07',
    expectedArrival: '2026-06-08',
    revenue: 380000,
  },
  {
    id: 'TRIP-003',
    truckId: 'TRK-004',
    driver: 'Chidi Nwosu',
    plateNumber: 'PH-554-EF',
    origin: 'Port Harcourt',
    destination: 'Enugu',
    originCoords: [4.8156, 7.0498],
    destinationCoords: [6.4584, 7.5464],
    cargo: 'Cement',
    bags: 450,
    status: 'delivered',
    departureDate: '2026-06-05',
    expectedArrival: '2026-06-06',
    revenue: 320000,
  },
  {
    id: 'TRIP-004',
    truckId: 'TRK-005',
    driver: 'Segun Falola',
    plateNumber: 'IBA-221-GH',
    origin: 'Ibadan',
    destination: 'Lagos',
    originCoords: [7.3775, 3.9470],
    destinationCoords: [6.5244, 3.3792],
    cargo: 'Cement',
    bags: 550,
    status: 'delivered',
    departureDate: '2026-06-06',
    expectedArrival: '2026-06-06',
    revenue: 280000,
  },
  {
    id: 'TRIP-005',
    truckId: 'TRK-001',
    driver: 'Emeka Okafor',
    plateNumber: 'LND-421-AA',
    origin: 'Lagos',
    destination: 'Benin City',
    originCoords: [6.5244, 3.3792],
    destinationCoords: [6.3350, 5.6037],
    cargo: 'Cement',
    bags: 480,
    status: 'pending',
    departureDate: '2026-06-10',
    expectedArrival: '2026-06-11',
    revenue: 350000,
  },
  {
    id: 'TRIP-006',
    truckId: 'TRK-002',
    driver: 'Musa Ibrahim',
    plateNumber: 'ABJ-332-BC',
    origin: 'Kano',
    destination: 'Kaduna',
    originCoords: [12.0022, 8.5920],
    destinationCoords: [10.5264, 7.4381],
    cargo: 'Cement',
    bags: 520,
    status: 'pending',
    departureDate: '2026-06-10',
    expectedArrival: '2026-06-10',
    revenue: 290000,
  },
];

export const getStats = () => {
  const totalTrucks = trucks.length;
  const activeTrucks = trucks.filter(t => t.status === 'active').length;
  const inTransit = trips.filter(t => t.status === 'in-transit').length;
  const delivered = trips.filter(t => t.status === 'delivered').length;
  const pending = trips.filter(t => t.status === 'pending').length;
  const totalRevenue = trips.reduce((sum, t) => sum + t.revenue, 0);
  const totalBags = trips.reduce((sum, t) => sum + t.bags, 0);

  return { totalTrucks, activeTrucks, inTransit, delivered, pending, totalRevenue, totalBags };
};
export const dieselLogs = [
  { id: 'DSL-001', truckId: 'TRK-001', driver: 'Emeka Okafor', plateNumber: 'LND-421-AA', date: '2026-06-07', litres: 120, pricePerLitre: 700, route: 'Lagos → Abuja', tripId: 'TRIP-001' },
  { id: 'DSL-002', truckId: 'TRK-002', driver: 'Musa Ibrahim', plateNumber: 'ABJ-332-BC', date: '2026-06-07', litres: 80, pricePerLitre: 700, route: 'Abuja → Kano', tripId: 'TRIP-002' },
  { id: 'DSL-003', truckId: 'TRK-004', driver: 'Chidi Nwosu', plateNumber: 'PH-554-EF', date: '2026-06-05', litres: 60, pricePerLitre: 700, route: 'Port Harcourt → Enugu', tripId: 'TRIP-003' },
  { id: 'DSL-004', truckId: 'TRK-005', driver: 'Segun Falola', plateNumber: 'IBA-221-GH', date: '2026-06-06', litres: 45, pricePerLitre: 700, route: 'Ibadan → Lagos', tripId: 'TRIP-004' },
  { id: 'DSL-005', truckId: 'TRK-001', driver: 'Emeka Okafor', plateNumber: 'LND-421-AA', date: '2026-06-03', litres: 115, pricePerLitre: 700, route: 'Lagos → Abuja', tripId: 'TRIP-001' },
  { id: 'DSL-006', truckId: 'TRK-002', driver: 'Musa Ibrahim', plateNumber: 'ABJ-332-BC', date: '2026-06-04', litres: 75, pricePerLitre: 700, route: 'Kano → Kaduna', tripId: 'TRIP-006' },
  { id: 'DSL-007', truckId: 'TRK-003', driver: 'Tunde Adeyemi', plateNumber: 'KNO-119-CD', date: '2026-06-01', litres: 90, pricePerLitre: 700, route: 'Lagos → Ibadan', tripId: null },
  { id: 'DSL-008', truckId: 'TRK-004', driver: 'Chidi Nwosu', plateNumber: 'PH-554-EF', date: '2026-06-08', litres: 65, pricePerLitre: 700, route: 'Enugu → Abuja', tripId: null },
];
export const truckDocuments = [
  { truckId: 'TRK-001', plateNumber: 'LND-421-AA', driver: 'Emeka Okafor', roadWorthiness: '2026-08-15', vehicleLicence: '2026-07-01', insurance: '2026-09-30' },
  { truckId: 'TRK-002', plateNumber: 'ABJ-332-BC', driver: 'Musa Ibrahim', roadWorthiness: '2026-06-20', vehicleLicence: '2026-12-01', insurance: '2026-11-15' },
  { truckId: 'TRK-003', plateNumber: 'KNO-119-CD', driver: 'Tunde Adeyemi', roadWorthiness: '2026-06-12', vehicleLicence: '2026-06-25', insurance: '2026-07-10' },
  { truckId: 'TRK-004', plateNumber: 'PH-554-EF', driver: 'Chidi Nwosu', roadWorthiness: '2026-10-05', vehicleLicence: '2026-08-20', insurance: '2026-12-31' },
  { truckId: 'TRK-005', plateNumber: 'IBA-221-GH', driver: 'Segun Falola', roadWorthiness: '2026-07-18', vehicleLicence: '2026-09-10', insurance: '2026-08-05' },
  { truckId: 'TRK-006', plateNumber: 'ENU-778-IJ', driver: 'Biodun Adeleke', roadWorthiness: '2026-06-15', vehicleLicence: '2026-06-18', insurance: '2026-07-01' },
];

export const loadingLogs = [
  { id: 'LOAD-001', truckId: 'TRK-001', plateNumber: 'LND-421-AA', driver: 'Emeka Okafor', tripId: 'TRIP-001', date: '2026-06-07', time: '07:30', bagsLoaded: 600, destination: 'Abuja' },
  { id: 'LOAD-002', truckId: 'TRK-002', plateNumber: 'ABJ-332-BC', driver: 'Musa Ibrahim', tripId: 'TRIP-002', date: '2026-06-07', time: '08:15', bagsLoaded: 500, destination: 'Kano' },
  { id: 'LOAD-003', truckId: 'TRK-004', plateNumber: 'PH-554-EF', driver: 'Chidi Nwosu', tripId: 'TRIP-003', date: '2026-06-05', time: '06:45', bagsLoaded: 450, destination: 'Enugu' },
  { id: 'LOAD-004', truckId: 'TRK-005', plateNumber: 'IBA-221-GH', driver: 'Segun Falola', tripId: 'TRIP-004', date: '2026-06-06', time: '09:00', bagsLoaded: 550, destination: 'Lagos' },
  { id: 'LOAD-005', truckId: 'TRK-001', plateNumber: 'LND-421-AA', driver: 'Emeka Okafor', tripId: 'TRIP-005', date: '2026-06-10', time: '07:00', bagsLoaded: 480, destination: 'Benin City' },
];

export const warehouseStock = [
  { id: 1, location: 'Lagos Depot', totalBags: 5000, loadedOut: 1630, date: '2026-06-07' },
  { id: 2, location: 'Abuja Depot', totalBags: 3000, loadedOut: 500, date: '2026-06-07' },
  { id: 3, location: 'Port Harcourt Depot', totalBags: 2000, loadedOut: 450, date: '2026-06-05' },
];

export const messages = [
  { id: 1, sender: 'manager', senderName: 'Manager', text: 'TRIP-001 should arrive Abuja by tomorrow morning', time: '08:00', date: '2026-06-07' },
  { id: 2, sender: 'staff', senderName: 'Emeka Okafor', text: 'Yes sir, we just passed Lokoja', time: '10:30', date: '2026-06-07' },
  { id: 3, sender: 'manager', senderName: 'Manager', text: 'Good. Make sure the delivery note is signed', time: '10:35', date: '2026-06-07' },
  { id: 4, sender: 'staff', senderName: 'Musa Ibrahim', text: 'TRK-002 loaded and ready to move', time: '08:20', date: '2026-06-07' },
];
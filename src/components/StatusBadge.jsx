const StatusBadge = ({ status }) => {
  const styles = {
    'in-transit': {
      bg: 'rgba(59, 130, 246, 0.15)',
      color: '#60a5fa',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      label: '🚛 In Transit',
    },
    'delivered': {
      bg: 'rgba(34, 197, 94, 0.15)',
      color: '#4ade80',
      border: '1px solid rgba(34, 197, 94, 0.3)',
      label: '✅ Delivered',
    },
    'pending': {
      bg: 'rgba(251, 191, 36, 0.15)',
      color: '#fbbf24',
      border: '1px solid rgba(251, 191, 36, 0.3)',
      label: '⏳ Pending',
    },
    'active': {
      bg: 'rgba(34, 197, 94, 0.15)',
      color: '#4ade80',
      border: '1px solid rgba(34, 197, 94, 0.3)',
      label: '● Active',
    },
    'maintenance': {
      bg: 'rgba(251, 191, 36, 0.15)',
      color: '#fbbf24',
      border: '1px solid rgba(251, 191, 36, 0.3)',
      label: '🔧 Maintenance',
    },
    'inactive': {
      bg: 'rgba(239, 68, 68, 0.15)',
      color: '#f87171',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      label: '● Inactive',
    },
  };

  const style = styles[status] || styles['pending'];

  return (
    <span style={{
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: 600,
      backgroundColor: style.bg,
      color: style.color,
      border: style.border,
      whiteSpace: 'nowrap',
    }}>
      {style.label}
    </span>
  );
};

export default StatusBadge;
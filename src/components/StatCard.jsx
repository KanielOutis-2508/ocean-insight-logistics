import { useEffect, useRef, useState } from 'react';

const AnimatedNumber = ({ value }) => {
  const [display, setDisplay] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    const duration = 2000;
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span>{display.toLocaleString()}</span>;
};

const StatCard = ({ label, value, icon, color, prefix, suffix }) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '1px solid #1e293b',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '-20px', right: '-20px',
        width: '80px', height: '80px', borderRadius: '50%',
        backgroundColor: color, opacity: 0.08, filter: 'blur(20px)',
      }} />

      <div style={{
        width: '40px', height: '40px', borderRadius: '10px',
        backgroundColor: `${color}20`, border: `1px solid ${color}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: color,
      }}>
        {icon}
      </div>

      <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white', letterSpacing: '-0.5px' }}>
        {prefix && <span style={{ fontSize: '1rem', color: '#94a3b8' }}>{prefix}</span>}
        <AnimatedNumber value={value} />
        {suffix && <span style={{ fontSize: '1rem', color: '#94a3b8' }}>{suffix}</span>}
      </div>

      <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </div>
    </div>
  );
};

export default StatCard;
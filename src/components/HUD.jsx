import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Leaf, Coins } from 'lucide-react';

export function HUD({ ecocoins, progress, level, maxLevel }) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      pointerEvents: 'none',
      zIndex: 50
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '10px 20px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        color: '#1a1a1a'
      }}>
        <Coins color="#eab308" />
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{ecocoins}</span>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '15px',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        width: '300px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        color: '#1a1a1a'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
          <span>Level {level} / {maxLevel}</span>
          <Leaf size={16} color="#22c55e" />
        </div>
        <div style={{
          width: '100%',
          height: '10px',
          background: '#e5e7eb',
          borderRadius: '5px',
          overflow: 'hidden'
        }}>
          <motion.div 
            key={level}
            style={{
              height: '100%',
              background: '#22c55e',
              borderRadius: '5px'
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
      </div>
    </div>
  );
}

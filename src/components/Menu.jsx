import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

export function Menu({ onStart }) {
  return (
    <motion.div 
      className="menu-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        zIndex: 100
      }}
    >
      <h1 style={{ fontSize: '4rem', marginBottom: '2rem', color: '#4ade80' }}>EcoClicker</h1>
      <p style={{ marginBottom: '3rem', fontSize: '1.2rem', maxWidth: '600px' }}>
        The world is barren and polluted. Your clicks bring life. <br/>
        Restore the vegetation and clear the skies.
      </p>
      <button 
        onClick={onStart}
        style={{
          fontSize: '1.5rem',
          padding: '1rem 3rem',
          background: '#22c55e',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)'
        }}
      >
        Start Healing
      </button>
    </motion.div>
  );
}

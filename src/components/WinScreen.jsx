import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

export function WinScreen({ onReset }) {
  return (
    <motion.div 
      className="win-screen"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.8)',
        zIndex: 100,
        color: '#15803d'
      }}
    >
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Planet Saved!</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>You have restored the ecosystem.</p>
      <button 
        onClick={onReset}
        style={{
          fontSize: '1.2rem',
          padding: '1rem 2rem',
          background: '#15803d',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(21, 128, 61, 0.4)'
        }}
      >
        Play Again
      </button>
    </motion.div>
  );
}

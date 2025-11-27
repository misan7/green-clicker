import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import './WinScreen.css';

export function WinScreen({ onReset }) {
  return (
    <motion.div 
      className="win-screen"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h1 className="win-title">Planet Saved!</h1>
      <p className="win-description">You have restored the ecosystem.</p>
      <button 
        onClick={onReset}
        className="win-button"
      >
        Play Again
      </button>
    </motion.div>
  );
}

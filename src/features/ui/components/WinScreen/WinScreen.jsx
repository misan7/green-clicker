import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import './WinScreen.css';

export function WinScreen({ onReset, t, credits }) {
  return (
    <motion.div 
      className="win-screen"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h1 className="win-title">{t.title}</h1>
      <p className="win-description">{t.description}</p>
      <button 
        onClick={onReset}
        className="win-button"
      >
        {t.playAgain}
      </button>
      <p className="win-credits">{credits}</p>
    </motion.div>
  );
}

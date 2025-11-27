import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import './Menu.css';

export function Menu({ onStart }) {
  return (
    <motion.div 
      className="menu-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="menu-title">EcoClicker</h1>
      <p className="menu-description">
        The world is barren and polluted. Your clicks bring life. <br/>
        Restore the vegetation and clear the skies.
      </p>
      <button 
        onClick={onStart}
        className="menu-button"
      >
        Start Healing
      </button>
    </motion.div>
  );
}

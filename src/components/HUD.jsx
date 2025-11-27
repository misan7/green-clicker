import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Leaf, Coins } from 'lucide-react';
import './HUD.css';

export function HUD({ ecocoins, progress, level, maxLevel }) {
  return (
    <div className="hud-container">
      <div className="hud-coins">
        <Coins color="#eab308" />
        <span className="hud-coins-value">{ecocoins}</span>
      </div>

      <div className="hud-level">
        <div className="hud-level-header">
          <span>Level {level} / {maxLevel}</span>
          <Leaf size={16} color="#22c55e" />
        </div>
        <div className="hud-progress-bar">
          <motion.div 
            key={level}
            className="hud-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
      </div>
    </div>
  );
}

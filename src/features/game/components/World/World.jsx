/**
 * World Component
 * Main game world that displays trees, background, and pollution effects
 * Color transitions based on level progression
 */
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { LEVEL_COLORS } from '../../constants';
import tree01 from '@/shared/assets/images/sprites/tree01.png';
import tree02 from '@/shared/assets/images/sprites/tree02.png';
import tree03 from '@/shared/assets/images/sprites/tree03.png';
import tree04 from '@/shared/assets/images/sprites/tree04.png';
import tree05 from '@/shared/assets/images/sprites/tree05.png';
import tree06 from '@/shared/assets/images/sprites/tree06.png';
import tree07 from '@/shared/assets/images/sprites/tree07.png';
import tree08 from '@/shared/assets/images/sprites/tree08.png';
import tree09 from '@/shared/assets/images/sprites/tree09.png';
import tree10 from '@/shared/assets/images/sprites/tree10.png';
import tree11 from '@/shared/assets/images/sprites/tree11.png';
import './World.css';

const TREE_SPRITES = [tree01, tree02, tree03, tree04, tree05, tree06, tree07, tree08, tree09, tree10, tree11];

export function World({ trees, level, maxLevel, onClick, plantingMode }) {
  // Interpolate color based on level
  const colorIndex = Math.min(Math.floor((level / maxLevel) * (LEVEL_COLORS.length - 1)), LEVEL_COLORS.length - 1);
  const backgroundColor = LEVEL_COLORS[colorIndex];

  // Pollution opacity
  const pollutionOpacity = Math.max(0, 1 - (level / maxLevel));

  const handleClick = (e) => {
    if (plantingMode === 'manual') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      onClick(x, y);
    } else {
      onClick();
    }
  };

  return (
    <motion.div 
      className="world"
      animate={{ backgroundColor }}
      transition={{ duration: 2 }}
      onClick={handleClick}
    >
      {/* Pollution Overlay */}
      <motion.div 
        className="pollution"
        animate={{ opacity: pollutionOpacity }}
        transition={{ duration: 2 }}
      />

      {/* Trees */}
      <AnimatePresence>
        {trees.map((tree) => {
          const treeSprite = TREE_SPRITES[tree.type % TREE_SPRITES.length];
          const size = 32 + (tree.type * 4);
          return (
            <motion.div
              key={tree.id}
              className="tree-container"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              style={{
                left: `${tree.x}%`,
                top: `${tree.y}%`
              }}
            >
              <img 
                src={treeSprite} 
                alt="tree" 
                className="tree-sprite"
                style={{ height: size }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}

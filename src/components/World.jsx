import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { TreePine, TreeDeciduous, Flower2 } from 'lucide-react';

const TREE_ICONS = [TreePine, TreeDeciduous, Flower2];
const COLORS = [
  '#e6ccb2', // Desert
  '#ddb892',
  '#d4a373',
  '#ccd5ae',
  '#e9edc9',
  '#fefae0',
  '#faedcd',
  '#d4e09b',
  '#b7b7a4',
  '#a3b18a',
  '#344e41'  // Lush Green
];

export function World({ trees, level, maxLevel, onClick }) {
  // Interpolate color based on level
  // Simple mapping for now, can be smoother with a library but array index is fine
  const colorIndex = Math.min(Math.floor((level / maxLevel) * (COLORS.length - 1)), COLORS.length - 1);
  const backgroundColor = COLORS[colorIndex];

  // Pollution opacity
  const pollutionOpacity = Math.max(0, 1 - (level / maxLevel));

  return (
    <motion.div 
      className="world"
      animate={{ backgroundColor }}
      transition={{ duration: 2 }}
      onClick={onClick}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      {/* Pollution Overlay */}
      <motion.div 
        className="pollution"
        animate={{ opacity: pollutionOpacity }}
        transition={{ duration: 2 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, transparent 30%, rgba(50, 40, 30, 0.8) 100%)',
          pointerEvents: 'none',
          zIndex: 10
        }}
      />

      {/* Trees */}
      <AnimatePresence>
        {trees.map((tree) => {
          const Icon = TREE_ICONS[tree.type % TREE_ICONS.length];
          return (
            <motion.div
              key={tree.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              style={{
                position: 'absolute',
                left: `${tree.x}%`,
                top: `${tree.y}%`,
                color: '#15803d',
                zIndex: 5
              }}
            >
              <Icon size={32 + (tree.type * 4)} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}

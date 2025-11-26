import { useState, useCallback } from 'react';

const MAX_LEVEL = 10;
const BASE_CLICKS_FOR_LEVEL = [0, 3, 8, 15, 25, 40, 60, 85, 115, 150, 200]; // Cumulative clicks needed for each level
const MAX_TREES = 100;

export function useGameLogic() {
  const [gameState, setGameState] = useState('MENU'); // MENU, PLAYING, WON
  const [ecocoins, setEcocoins] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [level, setLevel] = useState(1);
  const [trees, setTrees] = useState([]);

  // Calculate progress to next level (0 to 1)
  const getProgress = useCallback(() => {
    if (level >= MAX_LEVEL) return 1;
    const currentLevelStart = BASE_CLICKS_FOR_LEVEL[level - 1] || 0;
    const nextLevelStart = BASE_CLICKS_FOR_LEVEL[level];
    const clicksInLevel = clickCount - currentLevelStart;
    const totalClicksNeeded = nextLevelStart - currentLevelStart;
    return Math.min(clicksInLevel / totalClicksNeeded, 1);
  }, [clickCount, level]);

  const spawnTree = useCallback(() => {
    const id = crypto.randomUUID ? crypto.randomUUID() : Date.now() + Math.random();
    // Random position within 10% to 90% of screen to avoid edges
    const x = 10 + Math.random() * 80;
    const y = 10 + Math.random() * 80;
    // Random tree type (1-3)
    const type = Math.floor(Math.random() * 3) + 1;
    
    setTrees(prev => {
      const newTrees = [...prev, { id, x, y, type }];
      if (newTrees.length > MAX_TREES) {
        return newTrees.slice(newTrees.length - MAX_TREES);
      }
      return newTrees;
    });
  }, []);

  const handleClick = useCallback(() => {
    if (gameState !== 'PLAYING') return;

    setEcocoins(prev => prev + 1);
    setClickCount(prev => {
      const newCount = prev + 1;
      
      // Check for level up
      if (level < MAX_LEVEL && newCount >= BASE_CLICKS_FOR_LEVEL[level]) {
        setLevel(l => l + 1);
      }
      
      // Check for win condition
      if (level === MAX_LEVEL && newCount >= BASE_CLICKS_FOR_LEVEL[MAX_LEVEL]) {
        setGameState('WON');
      }

      return newCount;
    });

    spawnTree();
  }, [gameState, level, spawnTree]);

  const startGame = () => {
    setGameState('PLAYING');
    setEcocoins(0);
    setClickCount(0);
    setLevel(1);
    setTrees([]);
  };

  const resetGame = () => {
    setGameState('MENU');
  };

  return {
    gameState,
    ecocoins,
    clickCount,
    level,
    maxLevel: MAX_LEVEL,
    trees,
    progress: getProgress(),
    handleClick,
    startGame,
    resetGame
  };
}

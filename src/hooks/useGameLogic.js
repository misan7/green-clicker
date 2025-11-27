import { useState, useCallback, useEffect } from 'react';

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
    if (gameState === 'WON') return 1;
    const currentLevelStart = BASE_CLICKS_FOR_LEVEL[level - 1] || 0;
    const nextLevelStart = BASE_CLICKS_FOR_LEVEL[level];
    const clicksInLevel = clickCount - currentLevelStart;
    const totalClicksNeeded = nextLevelStart - currentLevelStart;
    return Math.min(clicksInLevel / totalClicksNeeded, 1);
  }, [clickCount, level, gameState]);

  const spawnTree = useCallback(() => {
    const id = crypto.randomUUID ? crypto.randomUUID() : Date.now() + Math.random();
    // Random position within 10% to 90% of screen to avoid edges
    const x = 10 + Math.random() * 80;
    const y = 10 + Math.random() * 80;
    // Random tree type (0-10 for 11 different tree sprites)
    const type = Math.floor(Math.random() * 11);
    
    setTrees(prev => {
      const newTrees = [...prev, { id, x, y, type }];
      if (newTrees.length > MAX_TREES) {
        return newTrees.slice(newTrees.length - MAX_TREES);
      }
      return newTrees;
    });
  }, []);

  // Calculate level based on click count to avoid race conditions
  const calculateLevel = useCallback((clicks) => {
    if (clicks >= BASE_CLICKS_FOR_LEVEL[MAX_LEVEL]) return MAX_LEVEL;
    for (let i = MAX_LEVEL - 1; i >= 0; i--) {
      if (clicks >= BASE_CLICKS_FOR_LEVEL[i]) {
        return i + 1;
      }
    }
    return 1;
  }, []);

  // Update level when click count changes
  useEffect(() => {
    const newLevel = calculateLevel(clickCount);
    if (newLevel !== level) {
      setLevel(newLevel);
    }
    
    // Check for win condition
    if (newLevel === MAX_LEVEL && clickCount >= BASE_CLICKS_FOR_LEVEL[MAX_LEVEL]) {
      setGameState('WON');
    }
  }, [clickCount, level, calculateLevel]);

  const handleClick = useCallback(() => {
    if (gameState !== 'PLAYING') return;

    setEcocoins(prev => prev + 1);
    setClickCount(prev => prev + 1);
    spawnTree();
  }, [gameState, spawnTree]);

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

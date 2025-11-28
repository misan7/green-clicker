import { useState, useCallback, useEffect, useRef } from 'react';
import popSound from '../assets/sound/pop.wav';

const popAudio = new Audio(popSound);

const MAX_LEVEL = 10;
const BASE_CLICKS_FOR_LEVEL = [0, 3, 8, 15, 25, 40, 60, 85, 115, 150, 200]; // Cumulative clicks needed for each level
const MAX_TREES = 240;

export function useGameLogic() {
  const [gameState, setGameState] = useState('MENU'); // MENU, PLAYING, WON
  const [ecocoins, setEcocoins] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [level, setLevel] = useState(1);
  const [trees, setTrees] = useState([]);
  const [plantingMode, setPlantingMode] = useState('auto'); // 'auto' or 'manual'

  // Calculate progress to next level (0 to 1)
  const getProgress = useCallback(() => {
    if (gameState === 'WON') return 1;
    const currentLevelStart = BASE_CLICKS_FOR_LEVEL[level - 1] || 0;
    const nextLevelStart = BASE_CLICKS_FOR_LEVEL[level];
    const clicksInLevel = clickCount - currentLevelStart;
    const totalClicksNeeded = nextLevelStart - currentLevelStart;
    return Math.min(clicksInLevel / totalClicksNeeded, 1);
  }, [clickCount, level, gameState]);

  const spawnTree = useCallback((customX, customY) => {
    const id = crypto.randomUUID ? crypto.randomUUID() : Date.now() + Math.random();
    // Use custom position if provided (manual mode), otherwise random
    const x = customX !== undefined ? customX : 10 + Math.random() * 80;
    const y = customY !== undefined ? customY : 10 + Math.random() * 80;
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

  const timerRef = useRef(null);
  const targetLevelRef = useRef(1);

  // Update level when click count changes
  useEffect(() => {
    const newLevel = calculateLevel(clickCount);
    
    if (newLevel > level) {
      // Level up - delay to allow animation
      if (timerRef.current && targetLevelRef.current === newLevel) {
        return; // Already scheduled
      }
      
      if (timerRef.current) clearTimeout(timerRef.current);
      
      targetLevelRef.current = newLevel;
      timerRef.current = setTimeout(() => {
        setLevel(newLevel);
        timerRef.current = null;
      }, 500); // 500ms delay for progress bar animation
      
    } else if (newLevel !== level) {
      // Level down or reset - immediate
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      targetLevelRef.current = newLevel;
      setLevel(newLevel);
    }
    
    // Check for win condition
    if (newLevel === MAX_LEVEL && clickCount >= BASE_CLICKS_FOR_LEVEL[MAX_LEVEL]) {
      setGameState('WON');
    }
  }, [clickCount, level, calculateLevel]);

  const handleClick = useCallback((x, y) => {
    if (gameState !== 'PLAYING') return;

    popAudio.currentTime = 0;
    popAudio.volume = 0.5;
    popAudio.play().catch(e => console.error("Error playing sound:", e));

    setEcocoins(prev => prev + 1);
    setClickCount(prev => prev + 1);
    spawnTree(x, y);
  }, [gameState, spawnTree]);

  const startGame = () => {
    setGameState('PLAYING');
    setEcocoins(0);
    setClickCount(0);
    setLevel(1);
    setTrees([]);
    setPlantingMode('auto');
  };

  const togglePlantingMode = () => {
    setPlantingMode(prev => prev === 'auto' ? 'manual' : 'auto');
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
    resetGame,
    plantingMode,
    togglePlantingMode
  };
}

import { useState } from 'react';
import { useGameLogic } from '@/features/game';
import { Menu, WinScreen } from '@/features/ui';
import { World, HUD } from '@/features/game';
import { AnimatePresence } from 'framer-motion';
import { translations } from '@/shared/locales';
import './App.css';

function App() {
  const [language, setLanguage] = useState('en');
  const t = translations[language];

  const { 
    gameState, 
    ecocoins, 
    level, 
    maxLevel, 
    trees, 
    progress, 
    handleClick, 
    startGame, 
    resetGame,
    plantingMode,
    togglePlantingMode
  } = useGameLogic();

  const toggleLanguage = () => {
    setLanguage(prev => {
      if (prev === 'en') return 'es';
      if (prev === 'es') return 'fr';
      return 'en';
    });
  };

  return (
    <div className="app-container">
      <World 
        trees={trees} 
        level={level} 
        maxLevel={maxLevel} 
        onClick={handleClick}
        plantingMode={plantingMode}
      />

      <AnimatePresence>
        {gameState === 'MENU' && (
          <Menu 
            onStart={startGame} 
            t={t.menu} 
            language={language} 
            onToggleLanguage={toggleLanguage} 
          />
        )}
        
        {gameState === 'PLAYING' && (
          <HUD 
            ecocoins={ecocoins} 
            progress={progress} 
            level={level} 
            maxLevel={maxLevel}
            t={t.hud}
            plantingMode={plantingMode}
            onTogglePlantingMode={togglePlantingMode}
          />
        )}

        {gameState === 'WON' && (
          <WinScreen 
            onReset={resetGame} 
            t={t.win}
            credits={t.menu.credits}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

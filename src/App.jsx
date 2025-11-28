import { useState } from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import { Menu } from './components/Menu';
import { World } from './components/World';
import { HUD } from './components/HUD';
import { WinScreen } from './components/WinScreen';
import { AnimatePresence } from 'framer-motion';
import { translations } from './i18n/translations';
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

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
    resetGame 
  } = useGameLogic();

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  return (
    <div className="app-container">
      <World 
        trees={trees} 
        level={level} 
        maxLevel={maxLevel} 
        onClick={handleClick} 
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
          />
        )}

        {gameState === 'WON' && (
          <WinScreen 
            onReset={resetGame} 
            t={t.win}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

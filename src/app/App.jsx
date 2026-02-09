import { useState, lazy, Suspense, useMemo } from 'react';
import { useGameLogic } from '@/features/game/hooks/useGameLogic.js';
import { World } from '@/features/game/components/World/World.jsx';
import { AnimatePresence } from 'framer-motion';
import { translations } from '@/shared/locales/translations.js';
import './App.css';

const Menu = lazy(() => import('@/features/ui/components/Menu/Menu.jsx').then(m => ({ default: m.Menu })));
const WinScreen = lazy(() => import('@/features/ui/components/WinScreen/WinScreen.jsx').then(m => ({ default: m.WinScreen })));
const HUD = lazy(() => import('@/features/game/components/HUD/HUD.jsx').then(m => ({ default: m.HUD })));

function App() {
  const [language, setLanguage] = useState('en');
  const t = useMemo(() => translations[language], [language]);

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
          <Suspense fallback={<div />}>
            <Menu 
              onStart={startGame} 
              t={t.menu} 
              language={language} 
              onToggleLanguage={toggleLanguage} 
            />
          </Suspense>
        )}
        
        {gameState === 'PLAYING' && (
          <Suspense fallback={<div />}>
            <HUD 
              ecocoins={ecocoins} 
              progress={progress} 
              level={level} 
              maxLevel={maxLevel}
              t={t.hud}
              plantingMode={plantingMode}
              onTogglePlantingMode={togglePlantingMode}
            />
          </Suspense>
        )}

        {gameState === 'WON' && (
          <Suspense fallback={<div />}>
            <WinScreen 
              onReset={resetGame} 
              t={t.win}
              credits={t.menu.credits}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

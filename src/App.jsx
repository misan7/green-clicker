import { useGameLogic } from './hooks/useGameLogic';
import { Menu } from './components/Menu';
import { World } from './components/World';
import { HUD } from './components/HUD';
import { WinScreen } from './components/WinScreen';
import { AnimatePresence } from 'framer-motion';

function App() {
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

  return (
    <div className="app-container">
      <World 
        trees={trees} 
        level={level} 
        maxLevel={maxLevel} 
        onClick={handleClick} 
      />

      <AnimatePresence>
        {gameState === 'MENU' && <Menu onStart={startGame} />}
        
        {gameState === 'PLAYING' && (
          <HUD 
            ecocoins={ecocoins} 
            progress={progress} 
            level={level} 
            maxLevel={maxLevel} 
          />
        )}

        {gameState === 'WON' && <WinScreen onReset={resetGame} />}
      </AnimatePresence>
    </div>
  );
}

export default App;

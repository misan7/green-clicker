import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import englishFlag from '@/shared/assets/images/language/english.png';
import spanishFlag from '@/shared/assets/images/language/spanish.png';
import frenchFlag from '@/shared/assets/images/language/french.png';
import './Menu.css';

export function Menu({ onStart, t, language, onToggleLanguage }) {
  const [showTutorial, setShowTutorial] = useState(false);
  const [isFullscreen, setFullscreen] = useState(false)

  if (showTutorial) {
    return (
      <motion.div 
        className="menu-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h2 className="menu-title">{t.tutorial.title}</h2>
        <div className="tutorial-steps">
          <p className="tutorial-step">{t.tutorial.step1}</p>
          <p className="tutorial-step">{t.tutorial.step2}</p>
          <p className="tutorial-step">{t.tutorial.step3}</p>
        </div>
        <button 
          onClick={() => setShowTutorial(false)}
          className="menu-button"
        >
          {t.tutorial.back}
        </button>
      </motion.div>
    );
  }
  
useEffect(() => {
  console.log(isFullscreen)
  if(isFullscreen) {
    document.documentElement.requestFullscreen()
  } else if(document.fullscreenElement !== null && !isFullscreen){
    document.exitFullscreen()
  }
}, [isFullscreen])

  return (
    <motion.div 
      className="menu-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="menu-title">{t.title}</h1>
      <p className="menu-description">
        {t.description.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            <br/>
          </span>
        ))}
      </p>
      
      <div className="menu-buttons">
        <button 
          onClick={onStart}
          className="menu-button"
        >
          {t.start}
        </button>

        <button 
          onClick={()=> setFullscreen(!isFullscreen)}
          className="menu-button"
        >
          Fullscreen {isFullscreen ? 'OFF' : 'ON'}
        </button>

        <button 
          onClick={() => setShowTutorial(true)}
          className="menu-button"
        >
          {t.tutorialBtn}
        </button>

        <button 
          className="language-selector"
          onClick={onToggleLanguage}
          title={t.language}
        >
          <img 
            src={language === 'en' ? englishFlag : language === 'es' ? spanishFlag : frenchFlag} 
            alt={language === 'en' ? 'English' : language === 'es' ? 'Español' : 'Français'} 
            className="flag-icon"
          />
          <span className="language-text">{language.toUpperCase()}</span>
        </button>
      </div>

      <p className="menu-credits">{t.credits}</p>
    </motion.div>
  );
}

import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Globe } from 'lucide-react';
import './Menu.css';

export function Menu({ onStart, t, language, onToggleLanguage }) {
  return (
    <motion.div 
      className="menu-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button 
        className="language-selector"
        onClick={onToggleLanguage}
        title={t.language}
      >
        <Globe size={24} />
        <span>{language.toUpperCase()}</span>
      </button>

      <h1 className="menu-title">{t.title}</h1>
      <p className="menu-description">
        {t.description.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            <br/>
          </span>
        ))}
      </p>
      <button 
        onClick={onStart}
        className="menu-button"
      >
        {t.start}
      </button>
    </motion.div>
  );
}

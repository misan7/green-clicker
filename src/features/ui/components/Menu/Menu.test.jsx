import { render, screen, fireEvent } from '@testing-library/react';
import { Menu } from './Menu';
import { describe, it, expect, vi } from 'vitest';

describe('Menu', () => {
  const mockProps = {
    onStart: vi.fn(),
    t: {
      title: 'Green Clicker',
      description: 'Click to plant trees.\nClean the world.',
      start: 'Start Game',
      tutorial: 'How to Play',
      language: 'Language',
      fullscreen: 'Fullscreen'
    },
    language: 'en',
    onLanguageChange: vi.fn(),
    isTutorialOpen: false,
    setIsTutorialOpen: vi.fn(),
    isFullscreen: false,
    onToggleFullscreen: vi.fn(),
  };

  it('renders menu title and buttons', () => {
    render(<Menu {...mockProps} />);
    
    expect(screen.getByText('Green Clicker')).toBeInTheDocument();
    expect(screen.getByText('Start Game')).toBeInTheDocument();
  });

  it('calls onStart when start button is clicked', () => {
    render(<Menu {...mockProps} />);
    
    fireEvent.click(screen.getByText('Start Game'));
    expect(mockProps.onStart).toHaveBeenCalled();
  });

  it('toggles tutorial when button is clicked', () => {
    render(<Menu {...mockProps} />);
    
    fireEvent.click(screen.getByTitle('How to Play'));
    expect(mockProps.setIsTutorialOpen).toHaveBeenCalledWith(true);
  });
});

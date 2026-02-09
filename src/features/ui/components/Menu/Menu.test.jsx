import { render, screen, fireEvent } from '@testing-library/react';
import { Menu } from './Menu';
import { describe, it, expect, vi } from 'vitest';

describe('Menu', () => {
  beforeAll(() => {
    // Mock Fullscreen API
    document.documentElement.requestFullscreen = vi.fn();
    document.exitFullscreen = vi.fn();
  });
  const mockProps = {
    onStart: vi.fn(),
    t: {
      title: 'Green Clicker',
      description: 'Click to plant trees.\nClean the world.',
      start: 'Start Game',
      tutorialBtn: 'How to Play',
      tutorial: {
        title: 'Tutorial',
        step1: 'Step 1',
        step2: 'Step 2',
        step3: 'Step 3',
        back: 'Back'
      },
      language: 'Language',
      fullscreen: 'Fullscreen',
      credits: 'Credits'
    },
    language: 'en',
    onToggleLanguage: vi.fn(),
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

  it('opens tutorial when button is clicked', () => {
    render(<Menu {...mockProps} />);
    
    fireEvent.click(screen.getByText('How to Play'));
    expect(screen.getByText('Tutorial')).toBeInTheDocument();
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });
});

import { renderHook, act } from '@testing-library/react';
import { useGameLogic } from './useGameLogic';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MAX_LEVEL, BASE_CLICKS_FOR_LEVEL } from '../constants';

// Mock Audio
const mockPlay = vi.fn().mockResolvedValue(undefined);
const mockAudioConstructor = vi.fn();

class MockAudio {
  constructor(src) {
    mockAudioConstructor(src);
    this.src = src;
    this.volume = 1;
    this.currentTime = 0;
    this.preload = '';
  }
  play() {
    return mockPlay();
  }
}

global.Audio = MockAudio;

describe('useGameLogic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useGameLogic());

    expect(result.current.gameState).toBe('MENU');
    expect(result.current.ecocoins).toBe(0);
    expect(result.current.level).toBe(1);
    expect(result.current.trees).toEqual([]);
    expect(result.current.plantingMode).toBe('auto');
  });

  it('starts game correctly', () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.startGame();
    });

    expect(result.current.gameState).toBe('PLAYING');
    expect(result.current.ecocoins).toBe(0);
    expect(result.current.level).toBe(1);
  });

  it('spawns tree and plays sound on click when playing', () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.startGame();
    });

    act(() => {
      result.current.handleClick(50, 50);
    });

    expect(result.current.ecocoins).toBe(1);
    expect(result.current.trees).toHaveLength(1);
    expect(mockPlay).toHaveBeenCalled();
    expect(result.current.trees[0].x).toBe(50);
    expect(result.current.trees[0].y).toBe(50);
  });

  it('levels up when reaching click threshold', () => {
    const { result } = renderHook(() => useGameLogic());
    vi.useFakeTimers();

    act(() => {
      result.current.startGame();
    });

    // Simulate clicks to reach level 2 threshold
    const clicksNeeded = BASE_CLICKS_FOR_LEVEL[1]; 
    
    for (let i = 0; i < clicksNeeded; i++) {
      act(() => {
        result.current.handleClick();
      });
    }

    // Fast-forward timer for level up delay
    act(() => {
      vi.searchParams = {}; // dummy act
      vi.runAllTimers();
    });

    expect(result.current.level).toBe(2);
    vi.useRealTimers();
  });

  it('toggles planting mode', () => {
    const { result } = renderHook(() => useGameLogic());

    expect(result.current.plantingMode).toBe('auto');

    act(() => {
      result.current.togglePlantingMode();
    });

    expect(result.current.plantingMode).toBe('manual');

    act(() => {
      result.current.togglePlantingMode();
    });

    expect(result.current.plantingMode).toBe('auto');
  });

  it('preloads audio on mount', () => {
    renderHook(() => useGameLogic());
    expect(mockAudioConstructor).toHaveBeenCalled();
  });
});

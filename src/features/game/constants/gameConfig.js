/**
 * Game Configuration Constants
 * Central configuration for game mechanics and progression
 */

// Game progression constants
export const MAX_LEVEL = 10;

// Cumulative clicks needed to reach each level
export const BASE_CLICKS_FOR_LEVEL = [
  0,    // Level 1
  3,    // Level 2
  8,    // Level 3
  15,   // Level 4
  25,   // Level 5
  40,   // Level 6
  60,   // Level 7
  85,   // Level 8
  115,  // Level 9
  150,  // Level 10
  200   // Victory threshold
];

// Maximum number of trees that can be displayed simultaneously
export const MAX_TREES = 240;

// Level progression colors (desert to lush green)
export const LEVEL_COLORS = [
  '#e6ccb2', // Level 1 - Desert
  '#ddb892', // Level 2
  '#d4a373', // Level 3
  '#ccd5ae', // Level 4
  '#e9edc9', // Level 5
  '#fefae0', // Level 6
  '#faedcd', // Level 7
  '#d4e09b', // Level 8
  '#b7b7a4', // Level 9
  '#a3b18a', // Level 10
  '#344e41'  // Max level - Lush Green
];

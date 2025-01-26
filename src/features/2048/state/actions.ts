import { Action } from '@2048/types';

export function initializeGame(): Action {
  return { type: 'INIT' };
}

export function moveRight(): Action {
  return { type: 'MOVE_RIGHT' };
}

export function moveLeft(): Action {
  return { type: 'MOVE_LEFT' };
}

export function moveUp(): Action {
  return { type: 'MOVE_UP' };
}

export function moveDown(): Action {
  return { type: 'MOVE_DOWN' };
}

export function undo(): Action {
  return { type: 'UNDO' };
}

export function increaseGridWidth(): Action {
  return { type: 'INCREASE_GRID_WIDTH' };
}

export function decreaseGridWidth(): Action {
  return { type: 'DECREASE_GRID_WIDTH' };
}

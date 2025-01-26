import {
  addNewValueAfterMove,
  combineColumnsUpwards,
  combineColumnsDownwards,
  combineRows,
  initialize,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  setPreviousValues,
} from '@2048/logic/game-logic';
import { pipe } from '@2048/logic/pipe';
import { Action, State } from '@2048/types';
import { clamp, exhaustiveCheck } from '@utils/utils';

export const initialState: State = {
  grid: [],
  gridWidth: 4,
  score: 0,
  status: 'ONGOING',
  previousGrid: null,
  previousScore: 0,
};

export const MAX_GRID_WIDTH = 5;
export const MIN_GRID_WIDTH = 3;

export const reducer = (state: State, { type }: Action): State => {
  switch (type) {
    case 'INIT': {
      const { grid } = initialize(state.gridWidth);
      return { ...state, grid, score: 0, status: 'ONGOING', previousScore: 0, previousGrid: null };
    }
    case 'MOVE_RIGHT': {
      const fn = pipe(setPreviousValues).pipe(moveRight).pipe(combineRows).pipe(moveRight).pipe(addNewValueAfterMove);
      return { ...fn({ ...state }) };
    }
    case 'MOVE_LEFT': {
      const fn = pipe(setPreviousValues).pipe(moveLeft).pipe(combineRows).pipe(moveLeft).pipe(addNewValueAfterMove);
      return { ...fn({ ...state }) };
    }
    case 'MOVE_UP': {
      const fn = pipe(setPreviousValues)
        .pipe(moveUp)
        .pipe(combineColumnsUpwards)
        .pipe(moveUp)
        .pipe(addNewValueAfterMove);
      return { ...fn({ ...state }) };
    }
    case 'MOVE_DOWN': {
      const fn = pipe(setPreviousValues)
        .pipe(moveDown)
        .pipe(combineColumnsDownwards)
        .pipe(moveDown)
        .pipe(addNewValueAfterMove);
      return { ...fn({ ...state }) };
    }
    case 'UNDO': {
      const { previousGrid, previousScore } = state;
      return { ...state, grid: previousGrid!, score: previousScore, previousGrid: null, previousScore: 0 };
    }
    case 'INCREASE_GRID_WIDTH': {
      return changeGridWidth(state, 'inc');
    }
    case 'DECREASE_GRID_WIDTH': {
      return changeGridWidth(state, 'dec');
    }
    default: {
      exhaustiveCheck(type);
    }
  }
};

function changeGridWidth(state: State, dir: 'inc' | 'dec'): State {
  const changedWidth = dir === 'inc' ? state.gridWidth++ : state.gridWidth--;
  const gridWidth = clamp(changedWidth, MIN_GRID_WIDTH, MAX_GRID_WIDTH);

  return {
    ...state,
    grid: initialize(gridWidth).grid,
    score: 0,
    previousGrid: null,
    previousScore: 0,
    status: 'ONGOING',
    gridWidth,
  };
}

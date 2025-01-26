export type Grid = number[];

type ActionType =
  | 'INIT'
  | 'MOVE_RIGHT'
  | 'MOVE_LEFT'
  | 'MOVE_UP'
  | 'MOVE_DOWN'
  | 'UNDO'
  | 'INCREASE_GRID_WIDTH'
  | 'DECREASE_GRID_WIDTH';

export type Action = {
  type: ActionType;
};

export type State = {
  grid: Grid;
  previousGrid: Grid | null;
  gridWidth: number;
  score: number;
  previousScore: number;
  status: 'WIN' | 'LOSE' | 'ONGOING';
};

import { Grid, State } from '@2048/types';
import { getTwoDifferentRandomValues } from './math';

export function checkForWin({ grid, ...rest }: State): State {
  const hasWon = grid.some(value => value >= 2048);
  return { ...rest, grid, status: hasWon ? 'WIN' : 'ONGOING' };
}

export function checkForGameOver(grid: Grid) {
  const hasLost = grid.every(value => value !== 0);
  return hasLost;
}

export function getRows(grid: Grid, gridWidth: number): number[][] {
  const rows = [];
  const howLong = gridWidth * gridWidth;

  for (let i = 0; i < howLong; i++) {
    if (i % gridWidth === 0) {
      const row = createArray(gridWidth, index => grid[i + index]);
      rows.push(row);
    }
  }

  return rows;
}

export function getColumns(grid: Grid, gridWidth: number) {
  const columns = [];

  for (let i = 0; i < gridWidth; i++) {
    const column = createArray(gridWidth, index => grid[i + gridWidth * index]);
    columns.push(column);
  }

  return columns;
}

export function combineColumnsIntoGrid(columns: number[][], gridWidth: number) {
  const grid = [];

  for (let i = 0; i < gridWidth; i++) {
    const column = createArray(gridWidth, index => columns[index][i]);
    grid.push(...column);
  }

  return grid;
}

export function initializeGrid(gridWidth: number) {
  // prettier-ignore
  // return [
  //   0, 0, 0, 8,
  //   8, 16, 4, 2,
  //   16, 0, 0, 0,
  //   32, 0, 0, 1024
  // ]
  const grid = new Array(gridWidth * gridWidth).fill(0);

  const [first, second] = getTwoDifferentRandomValues(gridWidth * gridWidth);
  grid[first] = 2;
  grid[second] = 2;

  return grid;
}

export function initializePreconfiguredGrid() {
  // prettier-ignore
  return [
    1, 2, 3, 4,
    5, 6, 7, 8,
    9, 10, 11, 12,
    12, 13, 14, 15
  ]
}

function createArray(gridWidth: number, callback: (index: number) => number) {
  return Array(gridWidth)
    .fill(0)
    .map((_, index) => callback(index));
}

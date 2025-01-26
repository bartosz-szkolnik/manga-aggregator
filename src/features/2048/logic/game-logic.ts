import { State } from '@2048/types';
import { getIndexForEmptySpace } from './math';
import { checkForGameOver, checkForWin, combineColumnsIntoGrid, getColumns, getRows, initializeGrid } from './utils';

export function initialize(gridWidth = 4) {
  const grid = initializeGrid(gridWidth);
  // const grid = initializePreconfiguredGrid();
  return { grid };
}

export function moveRight({ grid, gridWidth, ...rest }: State): State {
  const rows = getRows(grid, gridWidth).map(row => {
    const filteredRow = row.filter(num => num);
    const missing = gridWidth - filteredRow.length;
    const zeros = Array<number>(missing).fill(0);

    return [...zeros, ...filteredRow];
  });

  return { ...rest, grid: rows.flat(), gridWidth };
}

export function moveLeft({ grid, gridWidth, ...rest }: State): State {
  const rows = getRows(grid, gridWidth).map(row => {
    const filteredRow = row.filter(num => num);
    const missing = gridWidth - filteredRow.length;
    const zeros = Array<number>(missing).fill(0);

    return [...filteredRow, ...zeros];
  });

  return { ...rest, grid: rows.flat(), gridWidth };
}

export function moveUp({ grid, gridWidth, ...rest }: State): State {
  const columns = getColumns(grid, gridWidth).map(column => {
    const filteredColumn = column.filter(num => num);
    const missing = gridWidth - filteredColumn.length;
    const zeros = Array<number>(missing).fill(0);

    return [...filteredColumn, ...zeros];
  });

  return { ...rest, grid: combineColumnsIntoGrid(columns, gridWidth), gridWidth };
}

export function moveDown({ grid, gridWidth, ...rest }: State): State {
  const columns = getColumns(grid, gridWidth).map(column => {
    const filteredColumn = column.filter(num => num);
    const missing = gridWidth - filteredColumn.length;
    const zeros = Array<number>(missing).fill(0);

    return [...zeros, ...filteredColumn];
  });

  return { ...rest, grid: combineColumnsIntoGrid(columns, gridWidth), gridWidth };
}

export function combineRows({ grid, gridWidth, score, ...rest }: State): State {
  const howLong = gridWidth * gridWidth - 1;
  let newScore = score;

  for (let i = 0; i < howLong; i++) {
    const [first, second] = [grid[i], grid[i + 1]];
    if (first === second) {
      const sum = first + second;
      grid[i] = sum;
      grid[i + 1] = 0;

      newScore += sum;
    }
  }

  return checkForWin({ ...rest, grid, gridWidth, score: newScore });
}

export function combineColumnsUpwards({ grid, gridWidth, score, ...rest }: State): State {
  const howLong = gridWidth * gridWidth - 4;
  let newScore = score;

  for (let i = 0; i < howLong; i++) {
    const [first, second] = [grid[i], grid[i + gridWidth]];
    if (first === second) {
      const sum = first + second;
      grid[i] = sum;
      grid[i + gridWidth] = 0;

      newScore += sum;
    }
  }

  return checkForWin({ ...rest, grid, gridWidth, score: newScore });
}

export function combineColumnsDownwards({ grid, gridWidth, score, ...rest }: State): State {
  const howLong = gridWidth * gridWidth - 4;
  let newScore = score;

  for (let i = howLong; i >= 0; i--) {
    const [first, second] = [grid[i], grid[i + gridWidth]];
    if (first === second) {
      const sum = first + second;
      grid[i] = sum;
      grid[i + gridWidth] = 0;

      newScore += sum;
    }
  }

  return checkForWin({ ...rest, grid, gridWidth, score: newScore });
}

export function addNewValueAfterMove({ grid, gridWidth, ...rest }: State): State {
  if (checkForGameOver(grid)) {
    return { ...rest, grid, gridWidth, status: 'LOSE' };
  }

  const index = getIndexForEmptySpace(grid, gridWidth * gridWidth);
  grid[index] = 2;

  return { ...rest, grid, gridWidth };
}

export function setPreviousValues({ grid, score, ...rest }: State): State {
  return { ...rest, score, grid, previousGrid: grid, previousScore: score };
}

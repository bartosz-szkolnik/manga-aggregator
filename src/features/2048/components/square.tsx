import { clamp } from '@utils/utils';

const COLORS: Record<number, string> = {
  0: '#afa192',
  2: '#eee4da',
  4: '#ece0ca',
  8: '#f4b17a',
  16: '#f59575',
  32: '#f57c5f',
  64: '#f65d3b',
  128: '#edce71',
  256: '#edcc63',
  512: '#edc651',
  1024: '#eec774',
  2048: '#ecc230',
  4096: '#fe3d3d',
  8192: '#ff2020',
};

const GRID_MARGINS = 54;
const SQUARE_MARGINS = 8;

export function Square({ value, gridWidth }: { value: number; gridWidth: number }) {
  const color = COLORS[value];

  const gridSize = window.innerWidth - GRID_MARGINS;
  const initialSquareSize = gridSize / gridWidth - SQUARE_MARGINS;
  const squareSize = clamp(initialSquareSize, 18.0625 * (8 - gridWidth), 23.75 * (8 - gridWidth));

  return (
    <div
      className="mx-[4px] my-[4px] flex select-none items-center justify-center rounded-[3px] font-bold leading-[1.6]"
      style={{
        backgroundColor: value >= 8192 ? '#ff2020' : color,
        color: value <= 4 ? '#AFA192' : '#FFFFFF',
        fontSize: getFontSize(value),
        height: `${squareSize}px`,
        width: `${squareSize}px`,
        WebkitUserSelect: 'none',
      }}
    >
      {value ? value : ''}
    </div>
  );
}

function getFontSize(value: number) {
  if (value >= 16384) {
    return '24px';
  }

  if (value >= 1024) {
    return '34px';
  }

  if (value >= 128) {
    return '44px';
  }

  return '60px';
}

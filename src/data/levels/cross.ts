import { setVoidCells } from './utils';

const initialCells: InitialCells = (() => {
  const fieldSize = 7;
  const cells = [] as CellState[][];

  for (let i = 0; i < fieldSize; i++) {
    const cellsLine = [] as CellState[];

    for (let j = 0; j < fieldSize; j++) cellsLine.push('empty');

    cells.push(cellsLine);
  }

  cells[1][3] = 'peg';
  cells[2][2] = 'peg';
  cells[2][3] = 'peg';
  cells[2][4] = 'peg';
  cells[3][3] = 'peg';
  cells[4][3] = 'peg';

  setVoidCells(cells);

  const frozenCells = cells.map((cellLine) => Object.freeze(cellLine));

  return Object.freeze(frozenCells);
})();

export default Object.freeze({
  title: 'Cross',
  initialCells,
}) as Readonly<Level>;

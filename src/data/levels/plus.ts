import { setVoidCells } from './utils';

const initialCells: InitialCells = (() => {
  const fieldSize = 7;
  const cells = [] as CellState[][];

  for (let i = 0; i < fieldSize; i++) {
    const cellsLine = [] as CellState[];

    for (let j = 0; j < fieldSize; j++) cellsLine.push('empty');

    cells.push(cellsLine);
  }

  for (let i = 1; i < 6; i++) cells[i][3] = 'peg';
  for (let j = 1; j < 6; j++) cells[3][j] = 'peg';

  setVoidCells(cells);

  const frozenCells = cells.map((cellLine) => Object.freeze(cellLine));

  return Object.freeze(frozenCells);
})();

export default Object.freeze({
  title: 'Plus',
  initialCells,
}) as Readonly<Level>;

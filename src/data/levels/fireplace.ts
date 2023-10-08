import { setVoidCells } from './utils';

const initialCells: InitialCells = (() => {
  const fieldSize = 7;
  const cells = [] as CellState[][];

  for (let i = 0; i < fieldSize; i++) {
    const cellsLine = [] as CellState[];

    for (let j = 0; j < fieldSize; j++) cellsLine.push('empty');

    cells.push(cellsLine);
  }

  for (let i = 0; i < 4; i++) for (let j = 2; j < 5; j++) cells[i][j] = 'peg';

  cells[3][3] = 'empty';

  setVoidCells(cells);

  const frozenCells = cells.map((cellLine) => Object.freeze(cellLine));

  return Object.freeze(frozenCells);
})();

export default Object.freeze({
  title: 'Fireplace',
  initialCells,
}) as Readonly<Level>;

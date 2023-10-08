import { setVoidCells } from './utils';

const initialCells: InitialCells = (() => {
  const fieldSize = 7;
  const cells = [] as CellState[][];

  for (let i = 0; i < fieldSize; i++) {
    const cellsLine = [] as CellState[];

    for (let j = 0; j < fieldSize; j++) cellsLine.push('empty');

    cells.push(cellsLine);
  }

  let offset = 0;
  for (let i = 4; i > 0; i--, offset++)
    for (let j = offset; j < fieldSize - offset; j++) cells[i][j] = 'peg';

  setVoidCells(cells);

  const frozenCells = cells.map((cellLine) => Object.freeze(cellLine));

  return Object.freeze(frozenCells);
})();

export default Object.freeze({
  title: 'Pyramid',
  initialCells,
}) as Readonly<Level>;

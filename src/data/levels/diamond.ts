import { setVoidCells } from './utils';

const initialCells: InitialCells = (() => {
  const fieldSize = 7;
  const cells = [] as CellState[][];

  for (let i = 0; i < fieldSize; i++) {
    const cellsLine = [] as CellState[];

    for (let j = 0; j < fieldSize; j++) cellsLine.push('peg');

    cells.push(cellsLine);
  }

  cells[3][3] = 'empty';
  cells[0][2] = 'empty';
  cells[0][4] = 'empty';
  cells[2][0] = 'empty';
  cells[4][0] = 'empty';
  cells[2][6] = 'empty';
  cells[4][6] = 'empty';
  cells[6][2] = 'empty';
  cells[6][4] = 'empty';

  setVoidCells(cells);

  const frozenCells = cells.map((cellLine) => Object.freeze(cellLine));

  return Object.freeze(frozenCells);
})();

export default Object.freeze({
  title: 'Diamond',
  initialCells,
}) as Level;

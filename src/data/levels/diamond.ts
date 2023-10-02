const fieldSize = 7;
const voidCells = Object.freeze([
  '00',
  '01',
  '10',
  '11',
  '06',
  '05',
  '16',
  '15',
  '60',
  '50',
  '61',
  '51',
  '55',
  '65',
  '66',
  '56',
]);
const initialCells = (() => {
  const cells = [] as boolean[][];

  for (let i = 0; i < fieldSize; i++) {
    const cellsLine = [] as boolean[];

    for (let j = 0; j < fieldSize; j++) cellsLine.push(voidCells.indexOf('' + i + j) === -1);

    cells.push(cellsLine);
  }

  cells[3][3] = false;
  cells[0][2] = false;
  cells[0][4] = false;
  cells[2][0] = false;
  cells[4][0] = false;
  cells[2][6] = false;
  cells[4][6] = false;
  cells[6][2] = false;
  cells[6][4] = false;

  const frozenCells = cells.map((cellLine) => Object.freeze(cellLine));

  return Object.freeze(frozenCells);
})();

export default Object.freeze({
  title: 'Diamond',
  initialCells,
  voidCells,
}) as Level;

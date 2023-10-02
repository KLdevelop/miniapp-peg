const fieldSize = 7;
const voidCells = [
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
] as const;
const initialCells = (() => {
  const cells = [] as boolean[][];

  for (let i = 0; i < fieldSize; i++) {
    const cellsLine = [] as boolean[];

    for (let j = 0; j < fieldSize; j++) cellsLine.push(false);

    cells.push(cellsLine);
  }

  for (let i = 1; i < 6; i++) cells[i][3] = true;
  for (let j = 1; j < 6; j++) cells[3][j] = true;

  const frozenCells = cells.map((cellLine) => Object.freeze(cellLine));

  return Object.freeze(frozenCells);
})();

export default Object.freeze({
  title: 'Plus',
  initialCells,
  voidCells,
}) as Level;

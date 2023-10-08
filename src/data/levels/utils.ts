export function setVoidCells(cells: CellState[][]) {
  const fieldSize = cells.length;

  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) cells[i][j] = 'void';
  for (let i = 0; i < 2; i++) for (let j = fieldSize - 2; j < fieldSize; j++) cells[i][j] = 'void';
  for (let i = fieldSize - 2; i < fieldSize; i++) for (let j = 0; j < 2; j++) cells[i][j] = 'void';
  for (let i = fieldSize - 2; i < fieldSize; i++)
    for (let j = fieldSize - 2; j < fieldSize; j++) cells[i][j] = 'void';
}

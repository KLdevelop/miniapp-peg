import React, { useEffect, useState } from 'react';
import styles from './PegField.module.scss';
import { copyToMutableArray } from 'src/utils';

interface Cell {
  i: number;
  j: number;
}

interface Props {
  initialCells: InitialCells;
  voidCells: VoidCells;
  restartTrigger?: boolean;
}

export const PegField = (props: Props) => {
  const [curCell, setCurCell] = useState<null | Cell>(null);
  const { initialCells, voidCells, restartTrigger } = props;
  const [cells, setCells] = useState<boolean[][]>(copyToMutableArray(initialCells));

  function checkCell(i: number, j: number) {
    if (curCell == null) return false;

    if (cells[i][j] === true) return false;

    if (i === curCell.i) {
      if (j === curCell.j + 2) return cells[i][j - 1];
      else if (j === curCell.j - 2) return cells[i][j + 1];
      return false;
    } else if (j === curCell.j) {
      if (i === curCell.i + 2) return cells[i - 1][j];
      else if (i === curCell.i - 2) return cells[i + 1][j];
      return false;
    }

    return false;
  }

  function makeTurn(i: number, j: number) {
    if (curCell == null) return;

    const newCells = [...cells];

    if (checkCell(i, j)) {
      newCells[curCell.i][curCell.j] = false;
      if (i === curCell.i) {
        if (j === curCell.j + 2) newCells[i][j - 1] = false;
        else if (j === curCell.j - 2) newCells[i][j + 1] = false;
      } else if (j === curCell.j) {
        if (i === curCell.i + 2) newCells[i - 1][j] = false;
        else if (i === curCell.i - 2) newCells[i + 1][j] = false;
      }

      newCells[i][j] = true;

      setCells(newCells);
    }
    setCurCell(null);
  }

  const onCellClick = (i: number, j: number) => {
    if (curCell === null) {
      if (cells[i][j]) setCurCell({ i, j });
    } else if (i !== curCell.i || j !== curCell.j) makeTurn(i, j);
    else setCurCell(null);
  };

  useEffect(() => {
    const pegsCount = cells.reduce((sum, cur) => sum + cur.filter((cell) => cell).length, 0);

    if (pegsCount <= 1) alert('Вы победили!');
  }, [cells]);

  useEffect(() => {
    setCells(copyToMutableArray(initialCells));
  }, [restartTrigger, initialCells]);

  return (
    <div className={styles.PegField}>
      {cells.map((cellsLine, i) => (
        <div className={styles.cellsLine} key={i}>
          {cellsLine.map((cell, j) => {
            return voidCells.includes('' + i + j) ? (
              <div className={styles.voidCell} key={'' + i + j}></div>
            ) : cell ? (
              <div
                className={
                  curCell !== null && curCell.i === i && curCell.j === j
                    ? styles.activeCell
                    : styles.cellWithPeg
                }
                key={'' + i + j}
                onClick={() => onCellClick(i, j)}
              >
                <span className={styles.peg}></span>
              </div>
            ) : (
              <div
                className={styles.emptyCell}
                key={'' + i + j}
                onClick={() => onCellClick(i, j)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

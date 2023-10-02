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

  const [initialClient, setInitialClient] = useState([0, 0]);

  function checkCell(i: number, j: number) {
    if (
      curCell === null ||
      i < 0 ||
      j < 0 ||
      i === cells.length ||
      j === cells.length ||
      cells[i][j] === true ||
      voidCells.indexOf('' + i + j) !== -1
    )
      return false;

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
    } else setCurCell(null);
  }

  function onCellClick(i: number, j: number) {
    if (curCell === null) {
      if (cells[i][j]) setCurCell({ i, j });
    } else if (i !== curCell.i || j !== curCell.j) makeTurn(i, j);
    else setCurCell(null);
  }

  useEffect(() => {
    const pegsCount = cells.reduce((sum, cur) => sum + cur.filter((cell) => cell).length, 0);

    if (pegsCount <= 1) alert('Вы победили!');
  }, [cells]);

  useEffect(() => {
    setCells(copyToMutableArray(initialCells));
  }, [restartTrigger, initialCells]);

  function onStartSwiping(e: React.TouchEvent, i: number, j: number) {
    if (cells[i][j] === false) return;

    setCurCell({ i, j });
    setInitialClient([e.touches[0].clientX, e.touches[0].clientY]);
  }

  function onStopSwiping(e: React.TouchEvent) {
    if (curCell === null) return;

    const difClientX = e.touches[e.touches.length - 1].clientX - initialClient[0];
    const difClientY = e.touches[e.touches.length - 1].clientY - initialClient[1];

    if (Math.abs(difClientX) > Math.abs(difClientY)) {
      if (difClientX > 30) makeTurn(curCell.i, curCell.j + 1);
      else if (difClientX < 30) makeTurn(curCell.i, curCell.j - 1);
    } else {
      if (difClientY > 30) makeTurn(curCell.i + 1, curCell.j);
      else if (difClientY < 30) makeTurn(curCell.i - 1, curCell.j);
    }
  }

  return (
    <div className={styles.PegField} onTouchEnd={onStopSwiping}>
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
                onTouchStart={(e) => onStartSwiping(e, i, j)}
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

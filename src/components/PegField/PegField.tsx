import React, { useEffect, useState } from 'react';
import styles from './PegField.module.scss';
import { useSwipeable } from 'react-swipeable';
import { copyToMutableArray } from 'src/utils';

interface Cell {
  i: number;
  j: number;
}

interface Props {
  controlMode: ControlMode;
  initialCells: InitialCells;
  voidCells: VoidCells;
  restartTrigger?: boolean;
  showEndModal: (message: string) => void;
}

export const PegField = (props: Props) => {
  const [curCell, setCurCell] = useState<null | Cell>(null);
  const { controlMode, initialCells, voidCells, restartTrigger, showEndModal } = props;
  const [cells, setCells] = useState<boolean[][]>(copyToMutableArray(initialCells));

  const { ref } = useSwipeable({
    preventScrollOnSwipe: true,
    onSwipedLeft: () => {
      if (curCell === null || controlMode === 'Touch') return;
      makeTurn(curCell.i, curCell.j - 2);
    },
    onSwipedRight: () => {
      if (curCell === null || controlMode === 'Touch') return;
      makeTurn(curCell.i, curCell.j + 2);
    },
    onSwipedUp: () => {
      if (curCell === null || controlMode === 'Touch') return;
      makeTurn(curCell.i - 2, curCell.j);
    },
    onSwipedDown: () => {
      if (curCell === null || controlMode === 'Touch') return;
      makeTurn(curCell.i + 2, curCell.j);
    },
    onTouchEndOrOnMouseUp: () => {
      if (controlMode !== 'Touch') setCurCell(null);
    },
  });

  function checkCell(i: number, j: number, cell: Cell): boolean {
    if (
      i < 0 ||
      j < 0 ||
      i === cells.length ||
      j === cells.length ||
      cells[i][j] === true ||
      voidCells.indexOf('' + i + j) !== -1
    )
      return false;

    if (i === cell.i) {
      if (j === cell.j + 2) return cells[i][j - 1];
      else if (j === cell.j - 2) return cells[i][j + 1];
      return false;
    } else if (j === cell.j) {
      if (i === cell.i + 2) return cells[i - 1][j];
      else if (i === cell.i - 2) return cells[i + 1][j];
      return false;
    }

    return false;
  }

  function makeTurn(i: number, j: number): boolean {
    if (curCell === null) return false;

    const newCells = [...cells];

    if (checkCell(i, j, curCell)) {
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

      return true;
    }

    return false;
  }

  function onCellClick(i: number, j: number) {
    if (cells[i][j] === true) {
      if (curCell === null || curCell.i !== i || curCell.j !== j) setCurCell({ i, j });
      else setCurCell(null);
    } else if (curCell !== null) {
      if (makeTurn(i, j) === false) setCurCell(null);
      else setCurCell({ i, j });
    }
  }

  function onStartSwiping(i: number, j: number) {
    if (cells[i][j] === false) return;

    setCurCell({ i, j });
  }

  function checkMoves() {
    const pegsCount = cells.reduce((sum, cur) => sum + cur.filter((cell) => cell).length, 0);

    if (pegsCount <= 1) showEndModal('You won!');
    else {
      let outOfMoves = true;

      cellChecking: for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells.length; j++) {
          if (
            cells[i][j] === true &&
            (checkCell(i - 2, j, { i, j }) ||
              checkCell(i + 2, j, { i, j }) ||
              checkCell(i, j - 2, { i, j }) ||
              checkCell(i, j + 2, { i, j }))
          ) {
            outOfMoves = false;
            break cellChecking;
          }
        }
      }

      if (outOfMoves) {
        showEndModal(`Sorry, you're out of moves.`);
      }
    }
  }

  useEffect(
    () => void setTimeout(checkMoves),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cells],
  );

  useEffect(() => {
    setCells(copyToMutableArray(initialCells));
    setCurCell(null);
  }, [restartTrigger, initialCells]);

  return (
    <div className={styles.PegField} ref={ref}>
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
                onTouchStart={
                  controlMode === 'Swipes' ? () => onStartSwiping(i, j) : () => onCellClick(i, j)
                }
                onTouchEnd={(e) => e.preventDefault()}
                onMouseDown={
                  controlMode === 'Swipes' ? () => onStartSwiping(i, j) : () => onCellClick(i, j)
                }
              >
                <span className={styles.peg}></span>
              </div>
            ) : (
              <div
                className={styles.emptyCell}
                key={'' + i + j}
                onTouchStart={controlMode === 'Touch' ? () => onCellClick(i, j) : undefined}
                onMouseDown={controlMode === 'Touch' ? () => onCellClick(i, j) : undefined}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

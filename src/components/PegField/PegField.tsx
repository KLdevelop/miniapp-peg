import React, { useEffect, useState } from 'react';
import styles from './PegField.module.scss';
import { useSwipeable } from 'react-swipeable';
import { copyToMutableArray } from 'src/utils';

interface Cell {
  i: number;
  j: number;
}

type ControlMode = 'touch' | 'swipes';

interface Props {
  initialCells: InitialCells;
  /** When it changes, cells are set to initial. */
  restartTrigger?: boolean;
  showEndModal: (message: string) => void;
}

export const PegField = (props: Props) => {
  const [curCell, setCurCell] = useState<null | Cell>(null);
  const [controlMode, setControlMode] = useState<ControlMode>('touch');
  const { initialCells, restartTrigger, showEndModal } = props;
  const [cells, setCells] = useState<CellState[][]>(copyToMutableArray(initialCells));

  const { ref } = useSwipeable({
    trackMouse: true,
    preventScrollOnSwipe: true,
    onSwipedLeft: () => {
      if (curCell === null || controlMode === 'touch') return;
      makeMove(curCell.i, curCell.j - 2);
    },
    onSwipedRight: () => {
      if (curCell === null || controlMode === 'touch') return;
      makeMove(curCell.i, curCell.j + 2);
    },
    onSwipedUp: () => {
      if (curCell === null || controlMode === 'touch') return;
      makeMove(curCell.i - 2, curCell.j);
    },
    onSwipedDown: () => {
      if (curCell === null || controlMode === 'touch') return;
      makeMove(curCell.i + 2, curCell.j);
    },
    onSwipeStart: () => {
      setControlMode('swipes');
    },
    onSwiped: () => {
      setControlMode('touch');
      setCurCell(null);
    },
  });

  /**
   * Check if you can move the peg into the cell.
   * @param i row index of the cell being checked.
   * @param j column index of the cell being checked.
   * @param cell cell with the peg.
   */
  function checkCell(i: number, j: number, cell: Cell): boolean {
    if (
      i < 0 ||
      j < 0 ||
      i >= cells.length ||
      j >= cells.length ||
      cells[i][j] === 'peg' ||
      cells[i][j] === 'void'
    )
      return false;

    if (i === cell.i) {
      if (j === cell.j + 2) return cells[i][j - 1] === 'peg';
      else if (j === cell.j - 2) return cells[i][j + 1] === 'peg';
      return false;
    } else if (j === cell.j) {
      if (i === cell.i + 2) return cells[i - 1][j] === 'peg';
      else if (i === cell.i - 2) return cells[i + 1][j] === 'peg';
      return false;
    }

    return false;
  }

  /**
   * Move the selected peg to the cell if possible.
   * @param i row index of the cell.
   * @param j column index of the cell.
   * @returns is moved.
   */
  function makeMove(i: number, j: number): boolean {
    if (curCell === null) return false;

    const newCells = [...cells];

    if (checkCell(i, j, curCell)) {
      newCells[curCell.i][curCell.j] = 'empty';

      if (i === curCell.i) {
        if (j === curCell.j + 2) newCells[i][j - 1] = 'empty';
        else if (j === curCell.j - 2) newCells[i][j + 1] = 'empty';
      } else if (j === curCell.j) {
        if (i === curCell.i + 2) newCells[i - 1][j] = 'empty';
        else if (i === curCell.i - 2) newCells[i + 1][j] = 'empty';
      }

      newCells[i][j] = 'peg';

      setCells(newCells);

      return true;
    }

    return false;
  }

  /** Cell click handler. */
  function onCellClick(i: number, j: number) {
    if (cells[i][j] === 'peg') {
      if (curCell === null || curCell.i !== i || curCell.j !== j) setCurCell({ i, j });
      else setCurCell(null);
    } else if (curCell !== null) {
      if (makeMove(i, j) === false) setCurCell(null);
      else setCurCell({ i, j });
    }
  }

  /** Check possible moves and show modal if necessary. */
  function checkMoves() {
    const pegsCount = cells.reduce(
      (sum, cur) => sum + cur.filter((cell) => cell === 'peg').length,
      0,
    );

    if (pegsCount <= 1) {
      const mid = cells.length >> 1;
      if (cells[mid][mid] === 'peg') showEndModal("Wow! You're awesome!");
      else showEndModal('Great! Now you can try to leave a solitary peg in the center.');
    } else {
      let outOfMoves = true;

      for (
        let i = 0, pegsChecked = 0;
        i < cells.length && pegsChecked < pegsCount && outOfMoves;
        i++
      ) {
        for (let j = 0; j < cells.length && pegsChecked < pegsCount && outOfMoves; j++) {
          if (cells[i][j] === 'peg') {
            if (
              checkCell(i - 2, j, { i, j }) ||
              checkCell(i + 2, j, { i, j }) ||
              checkCell(i, j - 2, { i, j }) ||
              checkCell(i, j + 2, { i, j })
            )
              outOfMoves = false;
            pegsChecked++;
          }
        }
      }

      if (outOfMoves) showEndModal(`Sorry, you're out of moves.`);
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
            return cell === 'void' ? (
              <div className={styles.voidCell} key={'' + i + j}></div>
            ) : cell === 'peg' ? (
              <div
                className={
                  curCell !== null && curCell.i === i && curCell.j === j
                    ? styles.activeCell
                    : styles.cellWithPeg
                }
                key={'' + i + j}
                onTouchStart={() => onCellClick(i, j)}
                onTouchEnd={(e) => e.preventDefault()}
                onMouseDown={() => onCellClick(i, j)}
              >
                <span className={styles.peg}></span>
              </div>
            ) : (
              <div
                className={styles.emptyCell}
                key={'' + i + j}
                onTouchStart={() => onCellClick(i, j)}
                onTouchEnd={(e) => e.preventDefault()}
                onMouseDown={() => onCellClick(i, j)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

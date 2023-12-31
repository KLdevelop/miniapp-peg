import React, { useState } from 'react';
import { PegField, LevelsModal, ContentModal } from 'src/components';
import styles from './GamePage.module.scss';

/** Page with game field */
export const GamePage = () => {
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(true);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [endMessage, setEndMessage] = useState('');
  const [currentLevel, setCurrentLevel] = useState<null | Level>(null);
  const [restartTrigger, triggerRestart] = useState(false);

  /** Set all cells to initial. */
  function restartCurrentLevel() {
    setIsEndModalOpen(false);
    triggerRestart(!restartTrigger);
  }

  /**
   * Show modal with some message.
   * @param message
   */
  function showEndModal(message: string) {
    setEndMessage(message);
    setIsEndModalOpen(true);
  }

  return (
    <div className={styles.GamePage}>
      {currentLevel !== null && (
        <>
          <p className={styles.title}>{currentLevel.title}</p>
          <div className={styles.buttonPanel}>
            <button onClick={() => setIsLevelModalOpen(true)}>Choose level</button>
            <button onClick={restartCurrentLevel}>Restart</button>
          </div>
          <PegField {...currentLevel} restartTrigger={restartTrigger} showEndModal={showEndModal} />
          <div className={styles.info}>
            <p>
              You can move a peg orthogonally over an adjacent peg into a cell two positions away.
            </p>
            <p>Goal: empty the entire field except for a solitary peg in the center.</p>
          </div>
        </>
      )}
      <LevelsModal
        isOpen={currentLevel === null || isLevelModalOpen}
        setIsOpenModal={setIsLevelModalOpen}
        setLevel={setCurrentLevel}
      />
      <ContentModal isOpen={isEndModalOpen}>
        <div className={styles.endModal}>
          <p className={styles.message}>{endMessage}</p>
          <button onClick={() => setIsEndModalOpen(false)}>Ok</button>
        </div>
      </ContentModal>
    </div>
  );
};

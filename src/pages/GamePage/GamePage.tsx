import React, { useState } from 'react';
import { PegField, LevelsModal } from 'src/components';
import styles from './GamePage.module.scss';

export const GamePage = () => {
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(true);
  const [currentLevel, setCurrentLevel] = useState<null | Level>(null);
  const [restartTrigger, triggerRestart] = useState(false);

  function restartCurrentLevel() {
    triggerRestart(!restartTrigger);
  }

  return (
    <div className={styles.GamePage}>
      {currentLevel !== null && <p className={styles.title}>{currentLevel.title}</p>}
      {currentLevel !== null && <PegField {...currentLevel} restartTrigger={restartTrigger} />}
      <div className={styles.buttonPanel}>
        <button onClick={() => setIsLevelModalOpen(true)}>Choose level</button>
        <button onClick={restartCurrentLevel}>Restart</button>
      </div>
      <LevelsModal
        isOpen={currentLevel === null || isLevelModalOpen}
        setIsOpenModal={setIsLevelModalOpen}
        setLevel={setCurrentLevel}
      />
    </div>
  );
};

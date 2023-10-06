import React, { useState } from 'react';
import { PegField, LevelsModal } from 'src/components';
import styles from './GamePage.module.scss';

export const GamePage = () => {
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(true);
  const [currentLevel, setCurrentLevel] = useState<null | Level>(null);
  const [restartTrigger, triggerRestart] = useState(false);
  const [controlMode, setControlMode] = useState<ControlMode>('Touch');

  function changeControlMode() {
    if (controlMode === 'Touch') setControlMode('Swipes');
    else setControlMode('Touch');
  }

  function restartCurrentLevel() {
    triggerRestart(!restartTrigger);
  }

  return (
    <div className={styles.GamePage}>
      {currentLevel !== null && (
        <>
          <p className={styles.title}>{currentLevel.title}</p>
          <div className={styles.buttonPanel}>
            <button onClick={() => setIsLevelModalOpen(true)}>Choose level</button>
            <button onClick={restartCurrentLevel}>Restart</button>
            <button className={styles.controlMode} onClick={changeControlMode}>
              {controlMode}
            </button>
          </div>
          <PegField controlMode={controlMode} {...currentLevel} restartTrigger={restartTrigger} />
        </>
      )}
      <LevelsModal
        isOpen={currentLevel === null || isLevelModalOpen}
        setIsOpenModal={setIsLevelModalOpen}
        setLevel={setCurrentLevel}
      />
    </div>
  );
};

import React, { useState } from 'react';
import { PegField, LevelsModal, ContentModal } from 'src/components';
import styles from './GamePage.module.scss';

export const GamePage = () => {
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(true);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [endMessage, setEndMessage] = useState('');
  const [currentLevel, setCurrentLevel] = useState<null | Level>(null);
  const [restartTrigger, triggerRestart] = useState(false);
  const [controlMode, setControlMode] = useState<ControlMode>('Touch');

  function changeControlMode() {
    if (controlMode === 'Touch') setControlMode('Swipes');
    else setControlMode('Touch');
  }

  function restartCurrentLevel() {
    setIsEndModalOpen(false);
    triggerRestart(!restartTrigger);
  }

  function showEndModal(message: string) {
    setTimeout(() => {
      setIsLevelModalOpen(false);
      setEndMessage(message);
      setIsEndModalOpen(true);
    });
  }

  function showLevelModal() {
    setTimeout(() => {
      setIsEndModalOpen(false);
      setIsLevelModalOpen(true);
    });
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
          <PegField
            controlMode={controlMode}
            {...currentLevel}
            restartTrigger={restartTrigger}
            showEndModal={showEndModal}
          />
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
          <div className={styles.buttonPanel}>
            <button onClick={showLevelModal}>Choose level</button>
            <button onClick={restartCurrentLevel}>Restart</button>
          </div>
        </div>
      </ContentModal>
    </div>
  );
};

import React from 'react';
import { ContentModal } from 'src/components';
import { levels } from 'src/data';
import styles from './LevelsModal.module.scss';

interface Props {
  isOpen: boolean;
  setIsOpenModal: (isOpen: boolean) => void;
  setLevel: (lvl: Level) => void;
}

/** Level selection modal */
export const LevelsModal = (props: Props) => {
  const { isOpen, setIsOpenModal, setLevel } = props;

  function openLevel(lvl: Level) {
    setLevel(lvl);
    setIsOpenModal(false);
  }

  return (
    <ContentModal isOpen={isOpen} setIsOpenModal={setIsOpenModal}>
      <div className={styles.LevelsModal}>
        {levels.map((lvl) => (
          <div key={lvl.title} className={styles.level} onClick={() => openLevel(lvl)}>
            <p className={styles.lvlTitle}>{lvl.title}</p>
          </div>
        ))}
      </div>
    </ContentModal>
  );
};

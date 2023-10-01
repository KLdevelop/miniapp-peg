import React from 'react';
import Modal from 'react-modal';
import { levels } from 'src/data';
import styles from './LevelsModal.module.scss';

interface Props {
  isOpen: boolean;
  setIsOpenModal: (isOpen: boolean) => void;
  setLevel: (lvl: Level) => void;
}

export const LevelsModal = (props: Props) => {
  const { isOpen, setIsOpenModal, setLevel } = props;

  function openLevel(lvl: Level) {
    setLevel(lvl);
    setIsOpenModal(false);
  }

  Modal.setAppElement('#app');

  return (
    <Modal
      isOpen={isOpen}
      className={styles.LevelsModal}
      overlayClassName={styles.LevelsModalOverlay}
      onRequestClose={() => setIsOpenModal(false)}
    >
      {levels.map((lvl) => (
        <div key={lvl.title} className={styles.level} onClick={() => openLevel(lvl)}>
          <p className={styles.lvlTitle}>{lvl.title}</p>
        </div>
      ))}
    </Modal>
  );
};

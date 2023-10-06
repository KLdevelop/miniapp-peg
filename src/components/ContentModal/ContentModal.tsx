import React, { ReactNode } from 'react';
import Modal from 'react-modal';
import styles from './ContentModal.module.scss';

interface Props {
  isOpen: boolean;
  setIsOpenModal: (isOpen: boolean) => void;
  children: ReactNode;
}

export const ContentModal = (props: Props) => {
  const { isOpen, setIsOpenModal, children } = props;

  Modal.setAppElement('#app');

  return (
    <Modal
      isOpen={isOpen}
      className={styles.ContentModal}
      overlayClassName={styles.ContentModalOverlay}
      onRequestClose={() => setIsOpenModal(false)}
    >
      {children}
    </Modal>
  );
};

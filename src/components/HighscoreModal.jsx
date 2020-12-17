import React from 'react';
import Modal from 'react-modal';
import '../css/highscore.css';

const FikaModal = ({ modalIsOpen, setModalIsOpen, state, dispatch }) => {
  Modal.setAppElement('#root');

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <Modal
      className='highscore'
      overlayClassName='Overlay'
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel='Highscore Modal'>
      <h4>Highscore:</h4>

      <button onClick={closeModal}>close</button>
    </Modal>
  );
};

export default FikaModal;

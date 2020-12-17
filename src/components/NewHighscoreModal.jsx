import React, { useState } from 'react';
import Modal from 'react-modal';
import { setHighscore, getHighscore } from '../scripts/firebaseActions';
import '../css/modal.css';
import Settings from '../schemas/Settings';

const NewHighscoreModal = ({ modalOpen, setModalOpen, state, dispatch }) => {
  Modal.setAppElement('#root');

  const [name, setName] = useState('');

  const handleSubmit = e => {
    name.length > 0
      ? setHighscore(name, state.winTime, state.difficulty.dbName)
      : setHighscore('Anonymous', state.winTime, state.difficulty.dbName);
    closeModal();
  };

  const handleChange = e => {
    setName(e.target.value);
  };

  function closeModal() {
    getHighscore(Settings.easy.dbName, Settings.easy.type, dispatch);
    getHighscore(Settings.medium.dbName, Settings.medium.type, dispatch);
    getHighscore(Settings.hard.dbName, Settings.hard.type, dispatch);
    setModalOpen(false);
  }

  return (
    <Modal
      className='modal highscore-form'
      overlayClassName='Overlay'
      isOpen={modalOpen}
      onRequestClose={closeModal}
      contentLabel='Highscore Form Modal'>
      <h2>New High Score!</h2>
      <form onSubmit={handleSubmit} id='winner'>
        <input
          type='text'
          name='name'
          placeholder='Enter name...'
          value={name}
          onChange={handleChange}></input>
        <button type='submit' form='winner'>
          SUBMIT
        </button>
      </form>
      <button type='button' onClick={closeModal}>
        IGNORE
      </button>
    </Modal>
  );
};

export default NewHighscoreModal;

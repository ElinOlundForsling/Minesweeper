import React from 'react';
import Modal from 'react-modal';
import '../css/modal.css';

const HighscoreModal = ({ modalIsOpen, setModalIsOpen, highscore }) => {
  const { easyHighscore, mediumHighscore, hardHighscore } = highscore;
  Modal.setAppElement('#root');

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <Modal
      className='modal'
      overlayClassName='Overlay'
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel='Highscore Modal'>
      <table>
        <thead>
          <tr>
            <th colSpan='3'>Easy Highscore</th>
          </tr>
        </thead>
        <tbody>
          {easyHighscore.map((scoree, index) => {
            return (
              <tr key={scoree.id}>
                <td className='index'>#{index + 1}</td>
                <td className='name'>{scoree.name}</td>
                <td className='score'>{scoree.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th colSpan='3'>Medium Highscore</th>
          </tr>
        </thead>
        <tbody>
          {mediumHighscore.map((scoree, index) => {
            return (
              <tr key={scoree.id}>
                <td className='index'>#{index + 1}</td>
                <td className='name'>{scoree.name}</td>
                <td className='score'>{scoree.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th colSpan='3'>Hard Highscore</th>
          </tr>
        </thead>
        <tbody>
          {hardHighscore.map((scoree, index) => {
            return (
              <tr key={scoree.id}>
                <td className='index'>#{index + 1}</td>
                <td className='name'>{scoree.name}</td>
                <td className='score'>{scoree.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={closeModal}>close</button>
    </Modal>
  );
};

export default HighscoreModal;

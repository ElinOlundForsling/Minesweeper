import React, { useEffect, useState } from 'react';
import '../css/header.css';
import Settings from '../schemas/Settings';
import HighscoreModal from './HighscoreModal';
import { getHighscore } from '../scripts/firebaseActions';

const Header = ({ state, dispatch, score }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onClick = e => {
    e.preventDefault();
    const input = e.target.textContent.toLowerCase();
    dispatch({ type: 'SET_DIFFICULTY', payload: Settings[input] });
  };

  useEffect(() => {
    getHighscore(Settings.easy.dbName, Settings.easy.type, dispatch);
    getHighscore(Settings.medium.dbName, Settings.medium.type, dispatch);
    getHighscore(Settings.hard.dbName, Settings.hard.type, dispatch);
  }, []);

  useEffect(() => {
    let currentTime;
    if (state.active) {
      currentTime = setInterval(() => {
        dispatch({ type: 'SET_TIME' });
      }, 1000);
    } else {
      clearInterval(currentTime);
    }
    return () => clearInterval(currentTime);
  });

  return (
    <header className='header'>
      <h1>{state.title}</h1>
      <div className='btns-difficulty'>
        <button
          className='btn-reset'
          onClick={() => dispatch({ type: 'RESET' })}>
          <i className='fas fa-redo'></i>
        </button>
        <button onClick={onClick}>Easy</button>
        <button onClick={onClick}>Medium</button>
        <button onClick={onClick}>Hard</button>
        <button onClick={() => setModalIsOpen(true)}>Highscore</button>
      </div>
      <div className='timer'>
        <p>
          <i className='far fa-clock'></i> TIMER: {state.time}
        </p>
        <p>
          <i className='fas fa-bomb header-mine'></i> MINES:{' '}
          {state.difficulty.mines}
        </p>
      </div>
      <HighscoreModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        highscore={score}
      />
    </header>
  );
};

export default Header;

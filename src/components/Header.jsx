import React, { useEffect, useState } from 'react';
import '../css/header.css';
import Settings from '../schemas/Settings';
import HighscoreModal from './HighscoreModal';

const Header = ({ state, dispatch }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onClick = e => {
    e.preventDefault();
    const input = e.target.textContent.toLowerCase();
    dispatch({ type: 'GET_HIGHSCORE' });
    console.log(state.highscore);
    dispatch({ type: 'SET_DIFFICULTY', payload: Settings[input] });
  };

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
        <p>TIMER: {state.time}</p>
        <p>MINES: {state.difficulty.mines}</p>
      </div>
      <HighscoreModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </header>
  );
};

export default Header;

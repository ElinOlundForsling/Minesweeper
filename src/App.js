import React, { useState } from 'react';
import Board from './components/Board';
import Header from './components/Header';
import './css/App.css';
import Settings from './schemas/Settings';

function App() {
  const [difficulty, setDifficulty] = useState(Settings.easy);
  const [message, setMessage] = useState('Minesweeper');
  const [reset, setReset] = useState(false);
  const [timer, setTimer] = useState(false);
  const [time, setTime] = useState(0);
  const onSetDifficulty = input => {
    setTimer(false);
    setDifficulty(Settings[input]);
  };
  const onReset = () => {
    setReset(!reset);
    setMessage('Minesweeper');
  };
  const endGame = type => {
    switch (type) {
      case 'WON':
        setMessage('You won');
        break;
      case 'LOST':
        setMessage('You lost');
        break;
      default:
        setMessage('Minesweeper');
    }
  };
  return (
    <div className='App'>
      <Header
        onSetDifficulty={onSetDifficulty}
        onReset={onReset}
        message={message}
        timer={timer}
      />
      <Board
        difficulty={difficulty}
        endGame={endGame}
        setReset={reset}
        timer={setTimer}
      />
    </div>
  );
}

export default App;

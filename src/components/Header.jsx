import React, { useState, useEffect } from 'react';
import '../css/header.css';

const Header = ({ onSetDifficulty, onReset, message, timer }) => {
  const onClick = e => {
    e.preventDefault();
    onSetDifficulty(e.target.textContent.toLowerCase());
  };

  const [time, setTime] = useState(0);

  useEffect(() => {
    let currentTime;
    if (timer) {
      currentTime = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    } else {
      clearInterval(currentTime);
      setTime(0);
    }
    return () => clearInterval(currentTime);
  });

  return (
    <header className='header'>
      <h1>{message}</h1>
      <div className='btns-difficulty'>
        <button className='btn-reset' onClick={onReset}>
          <i className='fas fa-redo'></i>
        </button>
        <button onClick={onClick}>Easy</button>
        <button onClick={onClick}>Medium</button>
        <button onClick={onClick}>Hard</button>
      </div>
      <div className='timer'>
        <span>TIMER: {time}</span>
      </div>
    </header>
  );
};

export default Header;

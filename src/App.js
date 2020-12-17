import React, { useState, useReducer } from 'react';
import Board from './components/Board';
import Header from './components/Header';
import './css/App.css';
import { minesweeperReducer, initialProfile } from './scripts/reducer';

function App() {
  const [state, dispatch] = useReducer(minesweeperReducer, initialProfile);

  return (
    <div className='App'>
      <Header state={state.logic} dispatch={dispatch} />
      <Board state={state.logic} dispatch={dispatch} />
    </div>
  );
}

export default App;

import React, { useReducer } from 'react';
import Board from './components/Board';
import Header from './components/Header';
import { minesweeperReducer, initialProfile } from './scripts/reducer';

function App() {
  const [state, dispatch] = useReducer(minesweeperReducer, initialProfile);

  return (
    <div className='App'>
      <Header state={state.logic} dispatch={dispatch} score={state.score} />
      <Board state={state.logic} dispatch={dispatch} score={state.score} />
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import '../css/board.css';
import Cell from './Cell';
import useBoardLogic from './useBoardLogic';
import NewHighscoreModal from './NewHighscoreModal';

const Board = ({ state, dispatch, score }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { onMouseDown, onCellClick } = useBoardLogic(
    state,
    dispatch,
    setModalOpen,
    score,
  );
  const { classN } = state.difficulty;

  return (
    <main className='main'>
      <section className={`board-container ${classN}-board`}>
        <div className='board-wrapper'>
          {state.board.map(rows =>
            rows.map(col => {
              return (
                <div
                  key={col.id}
                  id={col.id}
                  onClick={onCellClick}
                  onMouseDown={onMouseDown}
                  onContextMenu={e => e.preventDefault()}
                  className={`cell ${classN}-cell ${
                    col.revealed ? 'revealed' : 'hidden'
                  }`}>
                  <div id={col.id} className='cell-content'>
                    <Cell
                      id={col.id}
                      revealed={col.revealed}
                      mine={col.mine}
                      flagged={col.flagged}
                      cellNum={col.num}
                    />
                  </div>
                </div>
              );
            }),
          )}
        </div>
      </section>
      <NewHighscoreModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        state={state}
        dispatch={dispatch}
      />
    </main>
  );
};

export default Board;

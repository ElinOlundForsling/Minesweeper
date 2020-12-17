import React from 'react';
import '../css/board.css';
import Cell from './Cell';
import useBoardLogic from './useBoardLogic';

const Board = ({ state, dispatch }) => {
  const { onMouseDown, onCellClick } = useBoardLogic(state, dispatch);
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
    </main>
  );
};

export default Board;

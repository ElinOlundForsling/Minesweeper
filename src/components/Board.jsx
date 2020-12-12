import React, { useState, useEffect, useRef } from 'react';
import '../css/board.css';
import Cell from './Cell';

const Board = ({ difficulty, endGame, setReset, timer }) => {
  const { classN, xSize, ySize, mines } = difficulty;
  const emptyBoard = Array(ySize)
    .fill()
    .map(() => Array(xSize));

  for (let y = 0; y < ySize; y++) {
    for (let x = 0; x < xSize; x++) {
      const id = `c${x}-${y}`;
      emptyBoard[y][x] = {
        x,
        y,
        id,
        flagged: false,
        mine: false,
        num: -1,
        revealed: false,
      };
    }
  }

  const [board, setBoard] = useState(emptyBoard);
  const [firstMove, setFirstMove] = useState(true);
  const [firstCell, setFirstCell] = useState(null);

  const getCell = id => {
    return board.flat().find(cell => cell.id.includes(id));
  };

  const getCellAt = (x, y) => {
    if (x >= 0 && y >= 0 && x < xSize && y < ySize) return board[y][x];
  };

  const getNeighbors = cellId => {
    const { x, y } = getCell(cellId);
    return [
      getCellAt(x - 1, y - 1),
      getCellAt(x, y - 1),
      getCellAt(x + 1, y - 1),

      getCellAt(x - 1, y),
      getCellAt(x + 1, y),

      getCellAt(x - 1, y + 1),
      getCellAt(x, y + 1),
      getCellAt(x + 1, y + 1),
    ].filter(cell => !!cell);
  };

  const updateCell = (id, num) => {
    const newArray = board.map(row => {
      return row.map(col => {
        if (id === col.id) {
          col.revealed = true;
          col.num = num;
          col.flagged = false;
        }
        return col;
      });
    });
    setBoard(newArray);
  };

  const flagCell = id => {
    const newArray = board.map(row => {
      return row.map(col => {
        if (id === col.id) {
          col.flagged = !col.flagged;
        }
        return col;
      });
    });
    setBoard(newArray);
  };

  const getNum = cell => {
    const neighbors = getNeighbors(cell.id);
    const neighborMines = neighbors.filter(c => c.mine);
    return neighborMines.length;
  };

  const getCellsToReveal = (startCellId, visited = []) => {
    const cell = getCell(startCellId);
    if (cell.mine) {
      return [startCellId];
    }
    const neighbors = getNeighbors(cell.id);
    const num = getNum(cell);
    visited.push(startCellId);

    if (num) {
      return [startCellId];
    } else {
      const toReveal = neighbors
        .filter(neighbor => !neighbor.flagged && !visited.includes(neighbor.id))
        .map(neighbor => neighbor.id);

      return [
        startCellId,
        ...toReveal.map(cellId => getCellsToReveal(cellId, visited)),
      ].flat();
    }
  };

  const revealCells = cell => {
    if (!cell.flagged && !cell.mine) {
      const num = getNum(cell);
      const rC = getCellsToReveal(cell.id);
      rC.forEach(cellId => {
        const cell = getCell(cellId);
        updateCell(cellId, getNum(cell));
      });
      updateCell(cell.id, num);
      if (checkWin()) victory();
    } else if (cell.mine) {
      lose();
    }
  };

  const revealMines = () => {
    const mines = board.flat().filter(cell => cell.mine);
    mines.forEach(mine => {
      if (mine.flag) flagCell(mine.id);
      updateCell(mine.id);
    });
  };

  const victory = () => {
    endGame('WON');
    reset();
  };

  const reset = () => {
    setBoard(emptyBoard);
    setFirstMove(true);
    // placeMines();
    timer(false);
  };

  const lose = () => {
    endGame('LOST');
    revealMines();
  };

  const afterFirstClick = cell => {
    setFirstCell(cell);
    endGame();
    setFirstMove(false);
    timer(true);
    placeMines(cell);
  };

  const onCellClick = e => {
    console.log('Value: ', e.target);
    console.log('Id: ', e.target.id);
    e.preventDefault();
    const cell = getCell(e.target.id);
    if (firstMove) {
      afterFirstClick(cell);
    } else {
      revealCells(cell);
    }
  };

  const onMouseDown = e => {
    e.preventDefault();
    const cell = getCell(e.target.id);
    if (e.nativeEvent.which === 3 && !cell.revealed) {
      flagCell(cell.id);
    }
  };

  const checkWin = () => {
    const cells = board.flat();
    const nonMines = cells.filter(c => !c.mine);
    return nonMines.every(c => c.revealed);
  };

  const placeMines = cell => {
    const newBoard = emptyBoard;
    for (let m = 0; m < mines; m++) {
      let randomRow = Math.floor(Math.random() * ySize);
      let randomCol = Math.floor(Math.random() * xSize);
      if (
        !newBoard[randomRow][randomCol].mine &&
        newBoard[randomRow][randomCol].id !== cell.id
      ) {
        newBoard[randomRow][randomCol].mine = true;
      } else {
        m--;
      }
    }
    resettingRef.current = true;
    setBoard(newBoard);
  };

  const resettingRef = useRef(false);
  useEffect(() => {
    if (resettingRef.current) {
      resettingRef.current = false;
      revealCells(firstCell);
    }
  }, [setBoard, board]);

  useEffect(() => {
    reset();
  }, [difficulty, setReset]);

  return (
    <main className='main'>
      <section className={`board-container ${classN}-board`}>
        <div className='board-wrapper'>
          {board.map(rows =>
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

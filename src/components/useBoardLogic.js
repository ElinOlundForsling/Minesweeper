import { useEffect, useRef } from 'react';
import emptyBoard from '../scripts/emptyBoard';

const useBoardLogic = (state, dispatch) => {
  const { xSize, ySize, mines } = state.difficulty;

  const getCell = id => {
    return state.board.flat().find(cell => cell.id.includes(id));
  };

  const getCellAt = (x, y) => {
    if (x >= 0 && y >= 0 && x < xSize && y < ySize) return state.board[y][x];
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
    const newArray = state.board.map(row => {
      return row.map(col => {
        if (id === col.id) {
          col.revealed = true;
          col.num = num;
          col.flagged = false;
        }
        return col;
      });
    });
    dispatch({ type: 'SET_BOARD', payload: newArray });
  };

  const flagCell = id => {
    const newArray = state.board.map(row => {
      return row.map(col => {
        if (id === col.id) {
          col.flagged = !col.flagged;
        }
        return col;
      });
    });
    dispatch({ type: 'SET_BOARD', payload: newArray });
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
    const mines = state.board.flat().filter(cell => cell.mine);
    mines.forEach(mine => {
      if (mine.flag) flagCell(mine.id);
      updateCell(mine.id);
    });
  };

  const victory = () => {
    dispatch({ type: 'WON' });
  };

  const lose = () => {
    dispatch({ type: 'LOST' });
    revealMines();
  };

  const afterFirstClick = cell => {
    if (cell.flagged) return;
    dispatch({ type: 'SET_FIRST_MOVE', payload: false });
    dispatch({ type: 'SET_FIRST_CELL', payload: cell });
    dispatch({ type: 'SET_ACTIVE', payload: true });
    placeMines(cell);
  };

  const onCellClick = e => {
    e.preventDefault();
    if (state.active || state.firstMove) {
      const cell = getCell(e.target.id);
      if (state.firstMove) {
        afterFirstClick(cell);
      } else {
        revealCells(cell);
      }
    }
  };

  const onMouseDown = e => {
    e.preventDefault();
    if (state.active || state.firstMove) {
      const cell = getCell(e.target.id);
      if (e.nativeEvent.which === 3 && !cell.revealed) {
        flagCell(cell.id);
      }
    }
  };

  const checkWin = () => {
    const cells = state.board.flat();
    const nonMines = cells.filter(c => !c.mine);
    return nonMines.every(c => c.revealed);
  };

  const placeMines = cell => {
    const newBoard = emptyBoard(state.difficulty);
    for (let y = 0; y < ySize; y++) {
      for (let x = 0; x < xSize; x++) {
        newBoard[y][x].flagged = state.board[y][x].flagged;
      }
    }
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
    dispatch({ type: 'SET_BOARD', payload: newBoard });
  };

  const resettingRef = useRef(false);
  useEffect(() => {
    if (resettingRef.current) {
      resettingRef.current = false;
      revealCells(state.firstCell);
    }
  }, [placeMines]);

  return { onCellClick, onMouseDown };
};

export default useBoardLogic;

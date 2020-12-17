const emptyBoard = difficulty => {
  const { xSize, ySize } = difficulty;
  const board = Array(ySize)
    .fill()
    .map(() => Array(xSize));

  for (let y = 0; y < ySize; y++) {
    for (let x = 0; x < xSize; x++) {
      const id = `c${x}-${y}`;
      board[y][x] = {
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
  return board;
};

export default emptyBoard;

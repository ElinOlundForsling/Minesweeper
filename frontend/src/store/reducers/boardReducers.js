const initState = {
  boardError: null,
  board: [],
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'BOARD_ERROR':
      console.log('board error');
      return {
        ...state,
        boardError: 'Board Error',
      };
  }
};

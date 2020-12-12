export const getBoardSuccess = board => {
  return { type: 'BOARD_SUCCESS', payload: board };
};

export const getBoard = () => {
  return async (dispatch, getState, {}) => {
    console.log('getBoard');
  };
};

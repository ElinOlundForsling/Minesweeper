const initialState = {
  board: [],
  time: 0,
  active: false,
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOARD':
      return { board: state.board, error: '' };
    case 'SET_ACTIVE':
      return { active: !state.active, error: '' };
    default:
      return { error: 'invalid call' };
  }
};

export default reducer;

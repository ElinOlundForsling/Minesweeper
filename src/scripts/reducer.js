const { null } = require('check-types');

const initialState = {
  board: [],
  time: 0,
  active: false,
  error: null,
};

export default reducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOARD':
      return { board: state.board, error: null };
    case 'SET_ACTIVE':
      return { active: !state.active, error: null };
    default:
      return { error: 'invalid call' };
  }
};

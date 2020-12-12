const initialState = {
  board: [],
  time: 0,
  active: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'set-board':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

import emptyBoard from './emptyBoard';

const logicReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOARD':
      return { ...state, board: action.payload, error: '' };
    case 'SET_ACTIVE':
      return { ...state, active: action.payload, error: '' };
    case 'SET_TIME':
      return { ...state, time: state.time + 1, error: '' };
    case 'SET_FIRST_MOVE':
      return { ...state, firstMove: action.payload, error: '' };
    case 'SET_FIRST_CELL':
      return { ...state, firstCell: action.payload, error: '' };
    case 'RESET_TIME':
      return { ...state, time: 0, error: '' };
    case 'SET_DIFFICULTY':
      return {
        ...state,
        board: emptyBoard(action.payload),
        active: false,
        time: 0,
        firstMove: true,
        firstCell: null,
        difficulty: action.payload,
        error: '',
      };
    case 'RESET':
      return {
        ...state,
        board: emptyBoard(state.difficulty),
        active: false,
        time: 0,
        firstMove: true,
        firstCell: null,
        title: 'Minesweeper',
        error: '',
      };
    case 'WON':
      return {
        ...state,
        board: emptyBoard(state.difficulty),
        active: false,
        winTime: state.time,
        time: 0,
        firstMove: true,
        firstCell: null,
        title: 'YOU WON',
        error: '',
      };
    case 'LOST':
      return {
        ...state,
        active: false,
        time: 0,
        title: 'YOU LOST',
        error: '',
      };
    default:
      return { ...state, error: 'invalid call' };
  }
};

export default logicReducer;

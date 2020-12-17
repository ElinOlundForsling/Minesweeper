const highscoreReducer = (state, action) => {
  switch (action.type) {
    case 'GET_EASY_HIGHSCORE':
      return { ...state, easyHighscore: action.payload, error: '' };
    case 'GET_MEDIUM_HIGHSCORE':
      return { ...state, mediumHighscore: action.payload, error: '' };
    case 'GET_HARD_HIGHSCORE':
      return { ...state, hardHighscore: action.payload, error: '' };
    default:
      return { ...state, error: 'invalid call' };
  }
};

export default highscoreReducer;

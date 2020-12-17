import combineReducers from 'react-combine-reducers';
import emptyBoard from './emptyBoard';
import Settings from '../schemas/Settings';
import logicReducer from './logicReducer';
import highscoreReducer from './highscoreReducer';

const initialLogicState = {
  board: emptyBoard(Settings.easy),
  difficulty: Settings.easy,
  active: false,
  time: 0,
  firstMove: true,
  firstCell: null,
  winTime: 0.0,
  title: 'Minesweeper',
  error: '',
};

const initialHighscoreState = {
  easyHighscore: [],
  mediumHighscore: [],
  hardHighscore: [],
  error: '',
};

const [minesweeperReducer, initialProfile] = combineReducers({
  logic: [logicReducer, initialLogicState],
  score: [highscoreReducer, initialHighscoreState],
});

export { minesweeperReducer, initialProfile };

const Settings = {
  easy: {
    classN: 'easy',
    xSize: 8,
    ySize: 8,
    mines: 10,
    dbName: 'easyHighscore',
    type: 'GET_EASY_HIGHSCORE',
  },
  medium: {
    classN: 'medium',
    xSize: 16,
    ySize: 16,
    mines: 40,
    dbName: 'mediumHighscore',
    type: 'GET_MEDIUM_HIGHSCORE',
  },
  hard: {
    classN: 'hard',
    xSize: 30,
    ySize: 16,
    mines: 99,
    dbName: 'hardHighscore',
    type: 'GET_HARD_HIGHSCORE',
  },
};

export default Settings;

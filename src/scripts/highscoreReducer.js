import firebase from '../config/firebase';
import 'firebase/firestore';

const highscoreReducer = (state, action) => {
  const db = firebase.firestore();
  switch (action.type) {
    case 'GET_HIGHSCORE':
      db.collection('Highscore')
        .orderBy('Score')
        .limit(10)
        .get()
        .then(function (querySnapshot) {
          const highscore = querySnapshot.map(doc => doc.data());
          return { ...state, highscore };
        })
        .catch(function (error) {
          return { ...state, error };
        });
      break;
    default:
      return { ...state, error: 'invalid call' };
  }
};

export default highscoreReducer;

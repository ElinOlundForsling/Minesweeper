import firebase from '../config/firebase';
import 'firebase/firestore';

export const getHighscore = async (dataBase, type, dispatch) => {
  try {
    const db = firebase.firestore();
    const scorees = await db
      .collection(dataBase)
      .orderBy('score')
      .limit(10)
      .get();

    let highscore = await Promise.all(
      scorees.docs.map(doc => {
        let docData = doc.data();
        let docId = doc.id;
        return { ...docData, id: docId };
      }),
    );
    dispatch({ type, payload: highscore });
  } catch (error) {
    console.error(error);
  }
};

export const setHighscore = async (name, score, dataBase) => {
  try {
    const db = firebase.firestore();
    db.collection(dataBase).add({
      name,
      score,
    });
  } catch (error) {
    console.error(error);
  }
};

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDO0ZiiWbAtdshxYikPBVpU5O3LKOZvnNU',
  authDomain: 'minesweeper-4ebc6.firebaseapp.com',
  projectId: 'minesweeper-4ebc6',
  storageBucket: 'minesweeper-4ebc6.appspot.com',
  messagingSenderId: '730423900678',
  appId: '1:730423900678:web:85390548df9c53eee36187',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });
const storage = firebase.storage();

export { storage, firebase as default };

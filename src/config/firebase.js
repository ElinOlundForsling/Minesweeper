import firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: 'AIzaSyDO0ZiiWbAtdshxYikPBVpU5O3LKOZvnNU',
  authDomain: 'minesweeper-4ebc6.firebaseapp.com',
  projectId: 'minesweeper-4ebc6',
  storageBucket: 'minesweeper-4ebc6.appspot.com',
  messagingSenderId: '730423900678',
  appId: '1:730423900678:web:85390548df9c53eee36187',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

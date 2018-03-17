import Firebase from 'firebase';
import '@firebase/firestore';

const config = {
  apiKey: 'AIzaSyBfjK9qLKyjWSVdYcqEp3c4JGf_-MZJURY',
  authDomain: 'hunans-palace-menu.firebaseapp.com',
  databaseURL: 'https://hunans-palace-menu.firebaseio.com',
  projectId: 'hunans-palace-menu',
  storageBucket: 'hunans-palace-menu.appspot.com',
  messagingSenderId: '260143000503'
};

export const firebaseApp = Firebase.initializeApp(config);
export const firestore = firebaseApp.firestore();
export const authentication = firebaseApp.auth();
export default Firebase;

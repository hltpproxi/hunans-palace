import Firebase from 'firebase';
import '@firebase/firestore';

const config = {
  apiKey: 'AIzaSyB8vEp5AYZajpqvZ-SJxU_Y9-xgKlYsnsI',
  authDomain: 'hunans-palace-1435b.firebaseapp.com',
  databaseURL: 'https://hunans-palace-1435b.firebaseio.com',
  projectId: 'hunans-palace-1435b',
  storageBucket: 'hunans-palace-1435b.appspot.com',
  messagingSenderId: '454131544122',
};

export const firebaseApp = Firebase.initializeApp(config);
export const firestore = firebaseApp.firestore();
export const authentication = firebaseApp.auth();
export default Firebase;

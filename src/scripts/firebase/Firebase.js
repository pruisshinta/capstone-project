import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyArmyBM0BSjKEe9_v_9DUjpxv4fb6w7uZM',
  authDomain: 'culture-api-83eae.firebaseapp.com',
  databaseURL: 'https://culture-api-83eae-default-rtdb.firebaseio.com',
  projectId: 'culture-api-83eae',
  storageBucket: 'culture-api-83eae.appspot.com',
  messagingSenderId: '336822166213',
  appId: '1:336822166213:web:e777f47b586261b55646ac',
  measurementId: 'G-Y98YQ776CQ',
};


const app = initializeApp(firebaseConfig);

export default app;

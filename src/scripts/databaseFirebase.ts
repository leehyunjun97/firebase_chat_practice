import { initializeApp } from 'firebase/app';
import { GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseDataConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: 'ggeu-jeok.firebaseapp.com',
  projectId: 'ggeu-jeok',
  storageBucket: 'ggeu-jeok.appspot.com',
  messagingSenderId: '553281665277',
  appId: '1:553281665277:web:b1ca9904fd034d35fa6694',
};

const app = initializeApp(firebaseDataConfig);
export const provider = new GithubAuthProvider();
export const db = getFirestore(app);
export const database = getDatabase(app);

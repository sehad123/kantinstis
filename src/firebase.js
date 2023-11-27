/* eslint-disable prettier/prettier */
// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCD7gAF5klk4e-_eX3qFb7WmDGms9tLWeY',
  authDomain: 'kantin-a3cbc.firebaseapp.com',
  projectId: 'kantin-a3cbc',
  storageBucket: 'kantin-a3cbc.appspot.com',
  messagingSenderId: '503115022882',
  appId: '1:503115022882:web:be98ff1b96732de389c07b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth, db};

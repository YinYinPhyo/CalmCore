// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyANWG2WBpljr-0-5wFeJ2BNZ8UoTRZtcG4",
    authDomain: "calmcore-7fa19.firebaseapp.com",
    projectId: "calmcore-7fa19",
    storageBucket: "calmcore-7fa19.appspot.com",
    messagingSenderId: "411761294904",
    appId: "1:411761294904:web:93b661bdb2e0c1b543f0cd",
    measurementId: "G-P0DQTDEJN6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };

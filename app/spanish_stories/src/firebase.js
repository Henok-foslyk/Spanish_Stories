// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpZl8ThiCmVbs-DlEGOt1Cfv_fzF2xz3Q",
  authDomain: "spanish-speech-app.firebaseapp.com",
  projectId: "spanish-speech-app",
  storageBucket: "spanish-speech-app.firebasestorage.app",
  messagingSenderId: "629991631514",
  appId: "1:629991631514:web:5ee2d851ff1ba2ce100d23",
  measurementId: "G-E9JJGCZDDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
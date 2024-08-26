// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBedCp2aMUh0Yorwu485m0PeMil22uJm9A",
  authDomain: "comment-system-105ea.firebaseapp.com",
  projectId: "comment-system-105ea",
  storageBucket: "comment-system-105ea.appspot.com",
  messagingSenderId: "188295998408",
  appId: "1:188295998408:web:4842a4a49e365b36dbaefd",
  measurementId: "G-GSGXVEF5XZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
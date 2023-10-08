// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyArcbubZyknHmTWn9Gfzcs6jWS_4QdBRGw",
  authDomain: "react-firebase-tutorial-6f8b1.firebaseapp.com",
  projectId: "react-firebase-tutorial-6f8b1",
  storageBucket: "react-firebase-tutorial-6f8b1.appspot.com",
  messagingSenderId: "1099316557902",
  appId: "1:1099316557902:web:89fc2a96afefda3d37eb1f",
  measurementId: "G-HCER7JL0X7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
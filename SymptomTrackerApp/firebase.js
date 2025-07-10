// firebase.js (FINAL CORRECT CODE for Login Persistence)

import { initializeApp } from "firebase/app";
// CHANGE 1: `getAuth` ki jagah, naye functions import karein
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'; 
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZvggu_24ZIxJWUp8qyOh9ma6ctTdV4qs",
  authDomain: "symptomtrackerapp-54bd1.firebaseapp.com",
  projectId: "symptomtrackerapp-54bd1",
  storageBucket: "symptomtrackerapp-54bd1.firebasestorage.app",
  messagingSenderId: "468380904344",
  appId: "1:468380904344:web:5cfd9d94b98d98e73dd9ed",
  measurementId: "G-9G3PZ2GLQ0"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// CHANGE 2: `getAuth(app)` ko is naye, powerful tareeke se replace karein
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Firestore waise ka waisa hi rahega
const db = getFirestore(app);

// CHANGE 3: `auth` aur `db` ko is tarah se export karein
export { auth, db };
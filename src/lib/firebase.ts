import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAl5q6ovwyThhVukomqVwuMKbUZKm93hHQ",
  authDomain: "career-focus-7b1aa.firebaseapp.com",
  projectId: "career-focus-7b1aa",
  storageBucket: "career-focus-7b1aa.firebasestorage.app",
  messagingSenderId: "327252893584",
  appId: "1:327252893584:web:e4d42027397cb5811fdd15",
  measurementId: "G-3JFNSDERGJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

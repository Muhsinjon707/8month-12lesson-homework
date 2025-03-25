import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDITPs8_X4YJ0S_JmgVh0cSu4kFVJ564I4",
  authDomain: "unsplashclone-application.firebaseapp.com",
  projectId: "unsplashclone-application",
  storageBucket: "unsplashclone-application.firebasestorage.app",
  messagingSenderId: "458031145785",
  appId: "1:458031145785:web:5b4d64db3587801d42bee8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth();

// Database
export const db = getFirestore(app);

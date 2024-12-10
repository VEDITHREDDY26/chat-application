




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-application-b9be3.firebaseapp.com",
  projectId: "chat-application-b9be3",
  storageBucket: "chat-application-b9be3.firebasestorage.app",
  messagingSenderId: "946680548262",
  appId: "1:946680548262:web:21cdb9b8b0c6e177b41d67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-application-dbc14.firebaseapp.com",
  projectId: "chat-application-dbc14",
  storageBucket: "chat-application-dbc14.firebasestorage.app",
  messagingSenderId: "652014743980",
  appId: "1:652014743980:web:8409ce4c348f386b7f8a09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-app2-f452d.firebaseapp.com",
  projectId: "chat-app2-f452d",
  storageBucket: "chat-app2-f452d.firebasestorage.app",
  messagingSenderId: "234024676030",
  appId: "1:234024676030:web:a54156abf32a59f428ccef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0Nm-z6BW7r5ZH5SUcSR8Awz2jMp8Viu0",
  authDomain: "property-management-syst-dffa8.firebaseapp.com",
  projectId: "property-management-syst-dffa8",
  storageBucket: "property-management-syst-dffa8.appspot.com",
  messagingSenderId: "502890804610",
  appId: "1:502890804610:web:765b68d148cc6f3b364b9b",
  measurementId: "G-S6XS9CFEXY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

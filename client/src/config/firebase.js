import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

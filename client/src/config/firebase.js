import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDrg4TZrBKRwhh-KmFgOIVgewNyUR6X_iE",
  authDomain: "robotics-hcmus.firebaseapp.com",
  projectId: "robotics-hcmus",
  storageBucket: "robotics-hcmus.appspot.com",
  messagingSenderId: "1035816966694",
  appId: "1:1035816966694:web:4bfe2e325c27ebdcea64e7"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
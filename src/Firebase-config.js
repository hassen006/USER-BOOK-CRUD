// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTQTKkxABELwDIVV3wv-OyszDOZ8-E56s",
  authDomain: "crud-react-firebase-17928.firebaseapp.com",
  projectId: "crud-react-firebase-17928",
  storageBucket: "crud-react-firebase-17928.appspot.com",
  messagingSenderId: "1029328939704",
  appId: "1:1029328939704:web:bef8f32aa4f0eca958e24d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2LVYBzL9HNGTWQnJKzUMjtya27TB65Ww",
  authDomain: "health-connect-bc537.firebaseapp.com",
  projectId: "health-connect-bc537",
  storageBucket: "health-connect-bc537.appspot.com",
  messagingSenderId: "151294612552",
  appId: "1:151294612552:web:c63c38bcdb44266301f47d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
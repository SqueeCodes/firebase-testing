// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi1K5S8xNe6UJ82E6X-S_B2yns5_rOU-Y",
  authDomain: "fir-practice-507b8.firebaseapp.com",
  projectId: "fir-practice-507b8",
  storageBucket: "fir-practice-507b8.appspot.com",
  messagingSenderId: "990380868050",
  appId: "1:990380868050:web:78b2341f79f12bafa3c80b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(); 
export const db = getFirestore(); 

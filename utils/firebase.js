// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import KEY from "../key";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: KEY,
  authDomain: "habittracker-7d312.firebaseapp.com",
  projectId: "habittracker-7d312",
  storageBucket: "habittracker-7d312.appspot.com",
  messagingSenderId: "706579218829",
  appId: "1:706579218829:web:043acdd2a0bfc757f63dc4",
  measurementId: "G-0K9WY5917S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let testValue = 30;
export { app, testValue };

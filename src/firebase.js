// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "chat-app-37c92.firebaseapp.com",
  projectId: "chat-app-37c92",
  storageBucket: "chat-app-37c92.appspot.com",
  messagingSenderId: "1050627445237",
  appId: "1:1050627445237:web:508ecee6eeaa65975790bc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
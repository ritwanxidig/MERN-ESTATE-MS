// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-22b7e.firebaseapp.com",
  projectId: "mern-estate-22b7e",
  storageBucket: "mern-estate-22b7e.appspot.com",
  messagingSenderId: "1064567863428",
  appId: "1:1064567863428:web:ad9e64932657b393ce2ad1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

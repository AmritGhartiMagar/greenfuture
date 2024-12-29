// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvfZIUucrnklJoL1S4qdUSbbH4zjb4W0M",
  authDomain: "greenfuture-f4bf9.firebaseapp.com",
  projectId: "greenfuture-f4bf9",
  storageBucket: "greenfuture-f4bf9.firebasestorage.app",
  messagingSenderId: "1026605309469",
  appId: "1:1026605309469:web:d9b796d945252378f6b0f4",
  measurementId: "G-9Z21QRY1XE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

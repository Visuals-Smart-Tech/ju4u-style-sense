
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeM_Qkgo5z5iwVjj2TzRhgJViDYQL4sVo",
  authDomain: "ju4u-1dc07.firebaseapp.com",
  projectId: "ju4u-1dc07",
  storageBucket: "ju4u-1dc07.appspot.com",
  messagingSenderId: "865324140402",
  appId: "1:865324140402:web:2f93fba96eb19af416ffeb",
  measurementId: "G-W9DCS5WBSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { serverTimestamp };
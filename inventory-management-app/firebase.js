// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn-2NBW28se0XQflpSZpo3eqZ3fld4o5U",
  authDomain: "inventory-management-f35d9.firebaseapp.com",
  projectId: "inventory-management-f35d9",
  storageBucket: "inventory-management-f35d9.appspot.com",
  messagingSenderId: "226682421829",
  appId: "1:226682421829:web:25c1af431dd27e1072592c",
  measurementId: "G-RZ24J6JD0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}
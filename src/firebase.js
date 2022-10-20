// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFgU6fZP69J7q5UWTjSi5MUG0SR-P-TyY",
  authDomain: "taller-react-formulario.firebaseapp.com",
  projectId: "taller-react-formulario",
  storageBucket: "taller-react-formulario.appspot.com",
  messagingSenderId: "110993446055",
  appId: "1:110993446055:web:056a83e609de9368b2f782"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}



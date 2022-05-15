// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcqef8kFj3nz5aIdNwha-OsjPVowK5VHo",
  authDomain: "anime-collections-ac5d1.firebaseapp.com",
  projectId: "anime-collections-ac5d1",
  storageBucket: "anime-collections-ac5d1.appspot.com",
  messagingSenderId: "895628591215",
  appId: "1:895628591215:web:9d30b8a09b67f869690d9a",
  measurementId: "G-8YV8M1JT6W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };

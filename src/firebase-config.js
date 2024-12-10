// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb6zBkrgA1FfuLnVlC4CY2E7hUuxN9pDk",
  authDomain: "gogreen-app-1d826.firebaseapp.com",
  databaseURL: "https://gogreen-app-1d826-default-rtdb.firebaseio.com",
  projectId: "gogreen-app-1d826",
  storageBucket: "gogreen-app-1d826.firebasestorage.app",
  messagingSenderId: "969582644197",
  appId: "1:969582644197:web:62a40edb04144ea72dfd0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
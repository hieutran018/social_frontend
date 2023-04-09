// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjNQUakYLJfH2296ciJRkG6SN2IprQ7Vw",
  authDomain: "ckcsocial-6c1e8.firebaseapp.com",
  projectId: "ckcsocial-6c1e8",
  storageBucket: "ckcsocial-6c1e8.appspot.com",
  messagingSenderId: "461282352329",
  appId: "1:461282352329:web:1a624f8e5c33e6bd8f8118",
  measurementId: "G-GLYEM2FNQE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
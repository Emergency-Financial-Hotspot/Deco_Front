// Import Firebase modules
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithPopup 
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// 🔥 Your Firebase configuration (Keep this secure)
const firebaseConfig = {
  apiKey: "AIzaSyDIqUUh9ZbLSpsxzYpPnJlzFZVXHRTdFsQ",
  authDomain: "deco-167fb.firebaseapp.com",
  projectId: "deco-167fb",
  storageBucket: "deco-167fb.appspot.com",
  messagingSenderId: "61625533157",
  appId: "1:61625533157:web:559715ed174b16395c0a0c",
  measurementId: "G-Y68KR9XFWN",
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

// ✅ Export functions (Including `signInWithPopup`)
export { auth, provider, analytics, createUserWithEmailAndPassword, signInWithPopup };

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOcLRUoZS8UZdnwdNzVud_WLr4x2yjAs0",
  authDomain: "music-concert-booking.firebaseapp.com",
  projectId: "music-concert-booking",
  storageBucket: "music-concert-booking.firebasestorage.app",
  messagingSenderId: "730171165006",
  appId: "1:730171165006:web:b92fc57e934c762e7f761f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

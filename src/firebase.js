import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDShp-WOGdI3_ST8WoTLa6Jm5UqGludJ38",
  authDomain: "globoflexia-tan-barbudo.firebaseapp.com",
  projectId: "globoflexia-tan-barbudo",
  storageBucket: "globoflexia-tan-barbudo.firebasestorage.app",
  messagingSenderId: "372829377933",
  appId: "1:372829377933:web:5f0686db4eb7e74f68d9c4",
  measurementId: "G-8TNL59G05J"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

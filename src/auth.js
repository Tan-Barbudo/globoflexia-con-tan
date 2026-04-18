import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { auth, provider } from './firebase.js';

function getCredentials() {
  const email = document.getElementById('email')?.value || '';
  const password = document.getElementById('password')?.value || '';
  return { email, password };
}

export function initAuth({ onLoggedIn } = {}) {
  window.loginWithGoogle = async function () {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert('Error al iniciar con Google: ' + error.message);
    }
  };

  window.registerUser = async function () {
    const { email, password } = getCredentials();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert('Error al registrarte: ' + error.message);
    }
  };

  window.loginUser = async function () {
    const { email, password } = getCredentials();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert('Error al iniciar sesión: ' + error.message);
    }
  };

  window.logoutUser = async function () {
    try {
      await signOut(auth);
    } catch (error) {
      alert('Error al cerrar sesión: ' + error.message);
    }
  };

  onAuthStateChanged(auth, async (user) => {
    const loginBox = document.getElementById('loginBox');
    const appBox = document.getElementById('appBox');
    const userEmail = document.getElementById('userEmail');

    if (user) {
      if (loginBox) loginBox.style.display = 'none';
      if (appBox) appBox.style.display = 'block';
      if (userEmail) userEmail.textContent = user.email || 'Usuario con Google';
      if (onLoggedIn) await onLoggedIn(user);
      return;
    }

    if (loginBox) loginBox.style.display = 'block';
    if (appBox) appBox.style.display = 'none';
    if (userEmail) userEmail.textContent = '';
  });
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const videos = [
  {
    id: "clase1",
    title: "Clase 1: Materiales básicos",
    description: "Conoce los globos, infladores y herramientas básicas para comenzar.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "clase2",
    title: "Clase 2: Inflado y amarre",
    description: "Aprende a inflar, medir y amarrar correctamente.",
    url: "https://www.youtube.com/embed/ysz5S6PUM-U"
  },
  {
    id: "clase3",
    title: "Clase 3: Perro básico",
    description: "La figura clásica para iniciar en globoflexia.",
    url: "https://www.youtube.com/embed/jNQXAC9IVRw"
  },
  {
    id: "clase4",
    title: "Clase 4: Espada rápida",
    description: "Figura ideal para eventos y cumpleaños.",
    url: "https://www.youtube.com/embed/tgbNymZ7vqY"
  },
  {
    id: "clase5",
    title: "Clase 5: Flor",
    description: "Una figura colorida para regalar y decorar.",
    url: "https://www.youtube.com/embed/oHg5SJYRHA0"
  }
];

let currentVideo = videos[0];
let watchedVideos = JSON.parse(localStorage.getItem("watchedVideos")) || [];

window.loginUser = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Escribe tu correo y contraseña.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert("No se pudo iniciar sesión. Revisa tus datos.");
    console.error(error);
  }
};

window.registerUser = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Escribe tu correo y contraseña.");
    return;
  }

  if (password.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert("No se pudo registrar. Puede que el correo ya exista.");
    console.error(error);
  }
};

window.loginWithGoogle = async function () {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    alert("No se pudo entrar con Google.");
    console.error(error);
  }
};

window.logoutUser = async function () {
  try {
    await signOut(auth);
  } catch (error) {
    alert("No se pudo cerrar sesión.");
    console.error(error);
  }
};

onAuthStateChanged(auth, (user) => {
  const loginBox = document.getElementById("loginBox");
  const appBox = document.getElementById("appBox");
  const userEmail = document.getElementById("userEmail");

  if (user) {
    loginBox.style.display = "none";
    appBox.style.display = "block";
    userEmail.textContent = user.email || "Usuario";
    loadApp();
  } else {
    loginBox.style.display = "block";
    appBox.style.display = "none";
  }
});

function loadApp() {
  renderVideos();
  selectVideo(currentVideo.id);
  updateProgress();

  const savedName = localStorage.getItem("studentName");
  if (savedName && document.getElementById("studentName")) {
    document.getElementById("studentName").value = savedName;
  }
}

window.showTab = function (tabId) {
  const tabs = [
    "tab-videos",
    "tab-docs",
    "tab-notes",
    "tab-info",
    "tab-live"
  ];

  tabs.forEach((id) => {
    const tab = document.getElementById(id);
    if (tab) tab.style.display = "none";
  });

  const selectedTab = document.getElementById(tabId);
  if (selectedTab) selectedTab.style.display = "block";
};

function renderVideos() {
  const videoList = document.getElementById("videoList");
  if (!videoList) return;

  videoList.innerHTML = videos.map(video => {
    const watched = watchedVideos.includes(video.id);

    return `
      <div class="card" style="margin-bottom:15px;">
        <h3>${watched ? "✅" : "🎈"} ${video.title}</h3>
        <p>${video.description}</p>
        <button onclick="selectVideo('${video.id}')">Ver clase</button>
      </div>
    `;
  }).join("");
}

window.selectVideo = function (videoId) {
  const video = videos.find(v => v.id === videoId);
  if (!video) return;

  currentVideo = video;

  document.getElementById("videoFrame").src = video.url;
  document.getElementById("videoTitle").textContent = video.title;
  document.getElementById("videoDescription").textContent = video.description;
};

window.markAsWatched = function () {
  if (!currentVideo) return;

  if (!watchedVideos.includes(currentVideo.id)) {
    watchedVideos.push(currentVideo.id);
    localStorage.setItem("watchedVideos", JSON.stringify(watchedVideos));
  }

  renderVideos();
  updateProgress();
};

function updateProgress() {
  const total = videos.length;
  const watched = watchedVideos.length;
  const percent = total ? Math.round((watched / total) * 100) : 0;

  document.getElementById("progressText").textContent = `${watched} de ${total} vistos`;
  document.getElementById("progressFill").style.width = `${percent}%`;
}

window.saveStudentName = function () {
  const name = document.getElementById("studentName").value.trim();

  if (!name) {
    alert("Escribe tu nombre.");
    return;
  }

  localStorage.setItem("studentName", name);
  alert("Nombre guardado correctamente 🎈");
};

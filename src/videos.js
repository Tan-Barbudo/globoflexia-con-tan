import {
  collection,
  getDocs,
  orderBy,
  query,
  where
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { db } from './firebase.js';

const STORAGE_KEY = 'curso_v2';

const defaultVideos = [
  { id: 1, title: 'Serpiente de Globoflexia 🐍', level: 'Básico', url: 'https://www.youtube.com/embed/IHlMd2KkE5Y', description: 'Una figura fácil y divertida para comenzar a practicar con globos.' },
  { id: 2, title: 'Perro de Globoflexia 🐶', level: 'Básico', url: 'https://www.youtube.com/embed/7Ay4HbAYWbI', description: 'El perrito clásico que no puede faltar en tus primeras figuras de globoflexia.' },
  { id: 3, title: 'Cruz de Globoflexia ✝️', level: 'Básico', url: 'https://www.youtube.com/embed/qQ6zrk8GADk', description: 'Una figura sencilla y especial, ideal para actividades con mensaje.' },
  { id: 4, title: 'Gato de Globoflexia 🐱', level: 'Básico', url: 'https://www.youtube.com/embed/y8EiwTbj3ow', description: 'Un gatito simpático para seguir practicando figuras básicas.' },
  { id: 5, title: 'Corazón de Globoflexia ❤️', level: 'Básico', url: 'https://www.youtube.com/embed/7faPIOkhalo', description: 'Una figura simple y bonita, perfecta para regalar o decorar.' },
  { id: 6, title: 'Flor de Globoflexia 🌸', level: 'Básico', url: 'https://www.youtube.com/embed/jkDQqBiI8lU', description: 'Aprende una flor alegre y colorida, muy útil para eventos infantiles.' },
  { id: 7, title: 'Cangrejo de Globoflexia 🦀', level: 'Intermedio', url: 'https://www.youtube.com/embed/ItfPu3jZ25g', description: 'Un cangrejo divertido para avanzar a figuras con un poco más de detalle.' },
  { id: 8, title: 'Pulpo de Globoflexia 🐙', level: 'Intermedio', url: 'https://www.youtube.com/embed/oQc3BjYo0-o', description: 'Una figura creativa que te ayuda a practicar formas más llamativas.' },
  { id: 9, title: 'Ratón Volador 🐭🪽', level: 'Intermedio', url: 'https://www.youtube.com/embed/W83CIGJfk7o', description: 'Un diseño original y entretenido para sorprender con algo diferente.' },
  { id: 10, title: 'Conejo de Globoflexia 🐰', level: 'Intermedio', url: 'https://www.youtube.com/embed/Z9rCt_X0kTc', description: 'Un conejito tierno que queda muy bien en fiestas y actividades para niños.' },
  { id: 11, title: 'Estrella / Copo de Nieve ⭐❄️', level: 'Intermedio', url: 'https://www.youtube.com/embed/KYHJv1DNMoU', description: 'Una figura decorativa muy versátil para distintas temáticas y celebraciones.' },
  { id: 12, title: 'Flor de Pulsera 🌼', level: 'Intermedio', url: 'https://www.youtube.com/embed/UjuvTMRMJL8', description: 'Una idea bonita y práctica que los niños pueden usar como pulsera.' },
  { id: 13, title: 'Perro con Retazos ♻️🐶', level: 'Intermedio', url: 'https://www.youtube.com/embed/igi1ZJWvbKc', description: 'Una forma creativa de aprovechar restos de globos haciendo una figura divertida.' },
  { id: 14, title: 'Uvas de Globoflexia 🍇', level: 'Intermedio', url: 'https://www.youtube.com/embed/Y0VCbVJNI8M', description: 'Un racimo de uvas llamativo para decorar y seguir subiendo de nivel.' },
  { id: 15, title: 'Dinosaurio de Globoflexia 🦖', level: 'Avanzado', url: 'https://www.youtube.com/embed/iKBwsdc7aEU', description: 'Una figura más elaborada para quienes quieren animarse a un reto mayor.' },
  { id: 16, title: 'Pony de Globoflexia 🐴', level: 'Avanzado', url: 'https://www.youtube.com/embed/_j2SJgQOEB0', description: 'Un pony llamativo y especial para practicar detalles más complejos.' },
  { id: 17, title: 'Oso de Globoflexia 🧸', level: 'Avanzado', url: 'https://www.youtube.com/embed/ujmuGc46E1E', description: 'Un osito tierno y trabajado, ideal para cerrar con una figura más completa.' }
];

let data = {
  studentName: '',
  videos: []
};

let selectedVideoId = null;

function normalizeLevel(level) {
  if (!level) return 'General';
  const normalized = String(level).toLowerCase();
  if (normalized === 'basico') return 'Básico';
  if (normalized === 'intermedio') return 'Intermedio';
  if (normalized === 'avanzado') return 'Avanzado';
  return level;
}

function loadLocalData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);
    data.studentName = parsed.studentName || '';
    const input = document.getElementById('studentName');
    if (input) input.value = data.studentName;

    const watchedMap = parsed.watchedById || {};
    data.videos = data.videos.map(v => ({
      ...v,
      watched: Boolean(watchedMap[v.id])
    }));
  } catch (error) {
    console.warn('No se pudo leer localStorage', error);
  }
}

function saveLocalData() {
  const watchedById = {};
  data.videos.forEach(v => {
    watchedById[v.id] = Boolean(v.watched);
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    studentName: data.studentName,
    watchedById
  }));
}

async function loadVideosFromFirestore() {
  const videosRef = collection(db, 'videos');
  const q = query(videosRef, where('isActive', '==', true), orderBy('order'));
  const snapshot = await getDocs(q);

  const videos = snapshot.docs.map(doc => {
    const payload = doc.data();
    return {
      id: payload.id ?? doc.id,
      title: payload.title || 'Sin título',
      level: normalizeLevel(payload.level),
      url: payload.youtubeEmbedUrl || '',
      description: payload.description || 'Sin descripción disponible.',
      watched: false
    };
  });

  return videos;
}

function renderVideos() {
  const list = document.getElementById('videoList');
  if (!list) return;
  list.innerHTML = '';

  data.videos.forEach(v => {
    const div = document.createElement('div');
    div.className = 'video-item';
    div.innerHTML = `
      <strong>${v.title}</strong>
      <span class="badge">${v.level}</span>
      <p>${v.description}</p>
      <p><strong>Estado:</strong> ${v.watched ? 'Visto' : 'Pendiente'}</p>
      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;">
        <button onclick="selectVideo('${v.id}')">Ver</button>
        <button class="secondary" onclick="toggleWatched('${v.id}')">${v.watched ? 'Poner pendiente' : 'Marcar visto'}</button>
      </div>
    `;
    list.appendChild(div);
  });
}

function selectVideo(id) {
  const v = data.videos.find(x => String(x.id) === String(id));
  if (!v) return;

  selectedVideoId = v.id;

  const frame = document.getElementById('videoFrame');
  const title = document.getElementById('videoTitle');
  const description = document.getElementById('videoDescription');

  if (frame) frame.src = v.url;
  if (title) title.textContent = v.title;
  if (description) description.textContent = v.description;
}

function toggleWatched(id) {
  const video = data.videos.find(v => String(v.id) === String(id));
  if (!video) return;

  video.watched = !video.watched;
  saveLocalData();
  renderVideos();
  updateProgress();
}

function markAsWatched() {
  const video = data.videos.find(v => String(v.id) === String(selectedVideoId));
  if (!video) return;

  video.watched = true;
  saveLocalData();
  renderVideos();
  updateProgress();
}

function saveStudentName() {
  const input = document.getElementById('studentName');
  data.studentName = input ? input.value : '';
  saveLocalData();
}

function updateProgress() {
  const total = data.videos.length;
  const seen = data.videos.filter(v => v.watched).length;
  const percent = total ? (seen / total) * 100 : 0;

  const text = document.getElementById('progressText');
  const fill = document.getElementById('progressFill');

  if (text) text.textContent = `${seen} de ${total} vistos`;
  if (fill) fill.style.width = `${percent}%`;
}

export async function initVideos() {
  try {
    data.videos = await loadVideosFromFirestore();
  } catch (error) {
    console.warn('No se pudieron cargar videos desde Firestore, se usará catálogo local.', error);
    data.videos = defaultVideos.map(v => ({ ...v, watched: false }));
  }

  loadLocalData();
  renderVideos();
  updateProgress();

  if (data.videos.length > 0) {
    selectVideo(data.videos[0].id);
  }
}

window.selectVideo = selectVideo;
window.toggleWatched = toggleWatched;
window.markAsWatched = markAsWatched;
window.saveStudentName = saveStudentName;

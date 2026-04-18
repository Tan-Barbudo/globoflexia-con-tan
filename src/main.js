import { initAuth } from './auth.js';
import { initUI } from './ui.js';
import { initVideos } from './videos.js';

document.addEventListener('DOMContentLoaded', () => {
  initUI();
  initAuth({
    onLoggedIn: async () => {
      await initVideos();
    }
  });
});

import './style.css';
import Navigo from 'navigo';
import { authStore } from './store/authStore';
import { renderLogin } from './pages/login';
import { renderRegister } from './pages/register';
import { renderHome } from './pages/home';
import { renderExplore } from './pages/explore';
import { renderLibrary } from './pages/library';

const router = new Navigo(import.meta.env.BASE_URL || '/');

// Route Definitions
router
  .on({
    '/': () => {
      renderHome(router);
    },
    '/explore': () => {
        renderExplore(router);
    },
    '/library': () => {
        renderLibrary(router);
    },
    '/login': () => {
      if (authStore.isAuthenticated) {
        router.navigate('/');
      } else {
        renderLogin(router);
      }
    },
    '/register': () => {
      if (authStore.isAuthenticated) {
        router.navigate('/');
      } else {
        renderRegister(router);
      }
    }
  });

// Auth Guard / Hooks
router.hooks({
  before: async (done, params) => {
    // Determine if the route is protected (for future)
    // For now, we just ensure we have the latest user state
    if (!authStore.isAuthenticated && localStorage.getItem('accessToken')) {
      // Try to restore session
      await authStore.init();
    }
    done();
  }
});

// Initialize
// Wait for initial auth check if needed, then resolve
(async () => {
  // If we have a token, wait for init to complete to avoid flash of "Guest"
  if (localStorage.getItem('accessToken')) {
    // We can subscribe to wait for loading to finish, or just await init if we exposed it
    // authStore.init() is called in constructor but async. 
    // Let's rely on the store's state or a simple delay/check for this Phase.
    // Ideally authStore.init() should be awaitable or we await a promise.
    // For simplicity in this vanilla app, we'll let the hook handle it or just render.
  }
  router.resolve();
})();

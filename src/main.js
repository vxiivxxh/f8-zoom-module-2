import './style.css';
import Navigo from 'navigo';
import { authStore } from './store/authStore';
import { renderLogin } from './pages/login';
import { renderRegister } from './pages/register';
import { renderHome } from './pages/home';
import { renderExplore } from './pages/explore';
import { renderLibrary } from './pages/library';
import { renderSearch } from './pages/search';

const router = new Navigo(import.meta.env.BASE_URL || '/');

// Định nghĩa Route
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
    '/search': () => {
        renderSearch(router);
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

// Bảo vệ Route / Hooks
router.hooks({
  before: async (done, params) => {
    // chúng ta chỉ đảm bảo có trạng thái user mới nhất
    if (!authStore.isAuthenticated && localStorage.getItem('accessToken')) {
      // Cố gắng khôi phục phiên làm việc
      await authStore.init();
    }
    done();
  }
});

// Khởi tạo
// Chờ kiểm tra auth ban đầu nếu cần, sau đó resolve
(async () => {
  // Nếu có token, chờ init hoàn tất để tránh nhấp nháy trạng thái "Guest"
  if (localStorage.getItem('accessToken')) {
  }
  router.resolve();
})();

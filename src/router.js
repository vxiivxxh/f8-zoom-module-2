import Navigo from "navigo";
import DOMPurify from "dompurify";
import { store } from "./state/store";
import home from "./pages/home";
import explore from "./pages/explore";
import search from "./pages/search";
import album from "./pages/album";
import playlist from "./pages/playlist";
import auth, { authScript } from "./pages/auth";

// Khởi tạo Navigo 
const router = new Navigo("/");

//
const render = (content) => {
  const app = document.querySelector("#app");
  const mainContent = document.querySelector("#main-content");
  
  // Sanitize content để chống XSS
  const cleanContent = DOMPurify.sanitize(content, {
      ADD_TAGS: ['iframe'], // Cho phép iframe nếu cần (embed video)
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] 
  });

  if (mainContent) {
      mainContent.innerHTML = cleanContent;
  } else {
      //nếu chưa có layout render đè toàn bộ
      app.innerHTML = cleanContent;
  }
};

export const initRouter = () => {
    
  router
    .on({
      "/": () => {
        render(home());
      },
      "/explore": () => {
        render(explore());
      },
      "/search": () => {
        render(search());
      },
      "/login": () => {
        render(auth('login'));
        authScript('login');
      },
      "/register": () => {
        // Render trang đăng ký
        render(auth('register'));
        authScript('register');
      },
      "/album/:slug": ({ data }) => {
        // Render chi tiết Album với tham số slug
        render(album(data));
      },
      "/playlist/:slug": ({ data }) => {
        // Render chi tiết Playlist với tham số slug
        render(playlist(data));
      },
      "/logout": () => {
          localStorage.removeItem("access_token");
          router.navigate("/login");
      }
    });

//Kiểm tra đăng nhập (đang comment để test giao diện trước)
  router.hooks({
      before: (done, params) => {
          // const isAuthenticated = !!localStorage.getItem("access_token");
          // if (!isAuthenticated && params.url !== "login" && params.url !== "register") {
          //     router.navigate("/login");
          //     done(false);
          // } else {
              done();
          // }
      }
  });
  router.resolve();
};

export default router;

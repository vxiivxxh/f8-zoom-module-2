
import { Sidebar, setupSidebarEvents } from "../components/Sidebar";
import { Header, setupHeaderEvents } from '../components/Header';
import { Player, setupPlayerEvents } from '../components/Player';
import { playerStore } from '../store/playerStore';
import { authStore } from '../store/authStore';

export const MainLayout = (content, router, options = {}) => {
  const app = document.getElementById("app");
  const paddingClass = options.padding || "px-[113px]";

  const render = () => {
    app.innerHTML = `
        <div class="h-screen w-full bg-yt-base text-yt-text-primary overflow-hidden relative grid grid-cols-[auto_1fr]">
            <div class="aurora-bg"></div>
            
            <!-- Sidebar: Grid item, width determined by class (w-sidebar or override) -->
            ${Sidebar()}
            
            <!-- Main Content Wrapper: Vertical flow -->
            <div class="flex flex-col min-w-0 transition-all relative z-10 h-full overflow-hidden">
                ${Header()}
                
                <main class="flex-1 overflow-y-auto pb-player ${paddingClass} scroll-smooth scrollbar-none flex flex-col gap-8">
                    ${content}
                </main>
            </div>
            
            ${playerStore.state.currentSong ? Player() : ""}
        </div>
    `;

    // Gắn sự kiện
    setupHeaderEvents(router);
    setupSidebarEvents(router);
    if (playerStore.state.currentSong) {
      setupPlayerEvents();
    }

    // Highlight link đang active
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll("nav a");
    links.forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("bg-yt-hover", "text-yt-text-primary");
      }
    });
  };

  render();

  // Subscribe thay đổi state player để re-render player?
  // Re-render toàn bộ layout khi thay đổi player rất tốn kém và làm mất trạng thái cuộn.
  // Cách tốt hơn: Tách biệt render Player hoặc cập nhật DOM an toàn.
  // Hiện tại, hãy coi Player là một mount point riêng biệt hoặc subscribe bên trong nó.
  // NHƯNG MainLayout được gọi bởi các trang.
  // Tối ưu hóa: Chỉ cập nhật container Player nếu nó tồn tại.

  const playerUnsub = playerStore.subscribe((state) => {
    // Logic cập nhật UI Player mà không xóa nội dung chính
    const existingPlayer = document.querySelector(
      ".bg-yt-player.fixed.bottom-0"
    );

    // Case 1: Player needs to be mounted (first time)
    if (state.currentSong && !existingPlayer) {
      const appDiv = document.querySelector("#app > div");
      if (appDiv) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = Player();
        appDiv.appendChild(tempDiv.firstElementChild);
        setupPlayerEvents();
      }
      return;
    }

    // Case 2: Player exists. Update UI efficiently
    if (existingPlayer) {
      // If song changed completely, full re-render might be safest to swap Image/Title
      // Checking title text content is a cheat-way to see if song changed.
      const currentTitleEl = existingPlayer.querySelector("h3");
      const currentTitle = currentTitleEl ? currentTitleEl.textContent : "";
      const newTitle = state.currentSong
        ? state.currentSong.title || state.currentSong.name
        : "";

      if (state.currentSong && currentTitle !== newTitle && newTitle) {
        // Song changed -> Re-render
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = Player();
        existingPlayer.replaceWith(tempDiv.firstElementChild);
        setupPlayerEvents();
      } else {
        // Only state/progress update -> Granular Update
        import("../components/Player").then(({ updatePlayerUI }) => {
          updatePlayerUI(state);
        });
      }
    }
  });

  const authUnsub = authStore.subscribe((state) => {
    // Re-render Header
    const headerContainer = document.querySelector("header");
    if (headerContainer) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = Header();
      const newHeader = tempDiv.firstElementChild;
      headerContainer.replaceWith(newHeader);
      setupHeaderEvents(router);
    }
  });
};

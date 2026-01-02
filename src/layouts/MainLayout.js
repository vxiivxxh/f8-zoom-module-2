
import { Sidebar } from '../components/Sidebar';
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
    if (state.currentSong && !existingPlayer) {
      // Player xuất hiện lần đầu -> Re-render layout để điều chỉnh padding?
      // Hoặc chỉ cần append Player.
      const appDiv = document.querySelector("#app > div");
      if (appDiv) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = Player();
        appDiv.appendChild(tempDiv.firstElementChild);
        setupPlayerEvents();
      }
    } else if (state.currentSong && existingPlayer) {
      // Cập nhật nội dung player hiện có
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = Player();
      existingPlayer.replaceWith(tempDiv.firstElementChild);
      setupPlayerEvents();
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

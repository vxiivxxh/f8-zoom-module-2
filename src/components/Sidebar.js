

// Helper để xác định active class thường được xử lý bởi router,
// nhưng hiện tại chúng ta sẽ hardcode class style tương tự Navigo hoặc để Navigo xử lý 'active' nếu được cấu hình.
// Chúng ta sẽ giữ nguyên cấu trúc hiển thị.

export const Sidebar = () => {
  return `
    <aside class="w-sidebar h-full bg-yt-sidebar text-yt-text-secondary flex flex-col z-sidebar border-r border-gray-800 transition-all duration-300">
      
      <!-- Top: Hamburger & Logo -->
      <div class="flex items-center gap-4 px-4 pl-6 mb-2 h-16 shrink-0">
        <button id="sidebar-toggle" class="p-2 -ml-2 text-yt-text-primary hover:bg-white/10 rounded-full transition-colors flex items-center justify-center">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
        </button>
        <a href="${
          import.meta.env.BASE_URL
        }" class="flex items-center justify-center p-2 logo-container shrink-0" data-navigo>
           <img src="https://music.youtube.com/img/on_platform_logo_dark.svg" alt="YouTube Music" class="h-6">
        </a>
      </div>

      <nav class="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600">
        
        <!-- Primary Navigation -->
        <a href="${
          import.meta.env.BASE_URL
        }" class="flex items-center gap-5 px-4 py-3 rounded-lg hover:bg-yt-hover hover:text-white transition-colors data-navigo" data-navigo>
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span class="font-medium text-sm">Trang chủ</span>
        </a>
        <a href="${
          import.meta.env.BASE_URL
        }explore" class="flex items-center gap-5 px-4 py-3 rounded-lg hover:bg-yt-hover hover:text-white transition-colors data-navigo" data-navigo>
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5 7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/></svg>
          <span class="font-medium text-sm">Khám phá</span>
        </a>
        <a href="${
          import.meta.env.BASE_URL
        }library" class="flex items-center gap-5 px-4 py-3 rounded-lg hover:bg-yt-hover hover:text-white transition-colors data-navigo" data-navigo>
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>
          <span class="font-medium text-sm">Thư viện</span>
        </a>
        <a href="#" class="flex items-center gap-5 px-4 py-3 rounded-lg hover:bg-yt-hover hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
          <span class="font-medium text-sm">Nâng cấp</span>
        </a>

        <!-- Divider -->
        <div class="my-6 mx-4 border-t border-gray-700"></div>

        <!-- New Playlist Button -->
        <div class="px-0 mb-4 mt-2 hide-on-collapse">
             <button class="flex items-center justify-center gap-2 w-full bg-[#212121] hover:bg-[#303030] text-white font-medium rounded-3xl py-2 transition-colors border border-white/10">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                <span class="text-sm">Danh sách phát mới</span>
            </button>
        </div>

        <!-- Auto Playlists -->
        <div class="space-y-1 hide-on-collapse">
             <a href="#" class="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-yt-hover hover:text-white transition-colors group">
                 <!-- Make sure icon aligns nicely -->
                 <div class="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15.4 16.6L12 18l-3.4-1.4 3.4-8.1 3.4 8.1M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
                 </div>
                 <div class="flex-1 min-w-0 flex flex-col">
                    <span class="font-medium text-sm truncate text-white">Bài hát đã thích</span>
                    <div class="flex items-center gap-1 text-xs text-yt-text-secondary">
                        <svg class="w-3 h-3 transform rotate-45" fill="currentColor" viewBox="0 0 24 24"><path d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"/></svg>
                        <span class="truncate">Danh sách tự động</span>
                    </div>
                 </div>
             </a>

             <a href="#" class="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-yt-hover hover:text-white transition-colors group">
                 <div class="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>
                 </div>
                 <div class="flex-1 min-w-0 flex flex-col">
                    <span class="font-medium text-sm truncate text-white">Xem sau</span>
                    <div class="flex items-center gap-1 text-xs text-yt-text-secondary">
                        <span class="truncate">Danh sách tự động</span>
                    </div>
                 </div>
             </a>
        </div>
      </nav>
    </aside>
  `;
};

export const setupSidebarEvents = (router) => {
  const logo = document.querySelector(".logo-container");
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      router.navigate("/");
    });
  }

  // Toggle Button Logic (Existing placeholder or new)
  const toggleBtn = document.getElementById("sidebar-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const sidebar = document.querySelector("aside");
      if (sidebar) {
        // Simple toggle logic if needed, or rely on existing CSS based approaches
        // Usually sidebar toggle might imply collapsing.
        // For now, focusing on Logo as requested.
      }
    });
  }
};

// End of Sidebar component

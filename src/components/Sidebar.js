export const Sidebar = () => {
  return `
    <aside class="fixed top-0 left-0 w-sidebar h-full bg-yt-sidebar text-yt-text-secondary flex flex-col pt-4 z-sidebar border-r border-gray-800">
      <div class="px-6 mb-6 flex items-center gap-1 cursor-pointer" onclick="window.history.pushState({}, '', '${import.meta.env.BASE_URL}'); window.dispatchEvent(new PopStateEvent('popstate'));">
        <div class="flex items-center justify-center p-2">
           <img src="https://music.youtube.com/img/on_platform_logo_dark.svg" alt="YouTube Music" class="h-6">
        </div>
      </div>

      <nav class="flex-1 px-4 space-y-2">
        <a href="${import.meta.env.BASE_URL}" class="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-yt-hover hover:text-yt-text-primary transition-colors data-navigo" data-navigo>
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span class="font-medium text-sm">Trang chủ</span>
        </a>
        <a href="${import.meta.env.BASE_URL}explore" class="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-yt-hover hover:text-yt-text-primary transition-colors data-navigo" data-navigo>
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5 7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/></svg>
          <span class="font-medium text-sm">Khám phá</span>
        </a>
        <a href="${import.meta.env.BASE_URL}library" class="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-yt-hover hover:text-yt-text-primary transition-colors data-navigo" data-navigo>
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>
          <span class="font-medium text-sm">Thư viện</span>
        </a>
        
        <div class="pt-6 border-t border-gray-700 mt-4">
           <!-- Placeholder for playlists or more items -->
           <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-yt-hover hover:text-yt-text-primary transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              <span class="font-medium text-sm">Nâng cấp (Demo)</span>
           </a>
        </div>
      </nav>
    </aside>
  `;
};

// Component Sidebar: Chứa logo và menu điều hướng
export default function Sidebar() {
  return `
    <aside class="w-60 bg-black flex-shrink-0 hidden md:flex flex-col h-full">
       <!-- Logo Section -->
       <div class="h-16 flex items-center px-4 gap-4">
         <!-- Nút Menu (Hamburger/3 gạch) -->
         <button class="p-2 text-white hover:bg-zinc-800 rounded-full" id="sidebar-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="fill: currentColor; display: block"><path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path></svg>
         </button>
         
         <!-- Logo YouTube Music -->
         <a href="/" class="flex items-center gap-1" data-navigo>
            <img src="https://music.youtube.com/img/on_platform_logo_dark.svg" alt="YouTube Music" style="height: 24px;">
         </a>
       </div>
       
       <!-- Navigation Menu -->
       <nav class="flex-1 py-2 px-2">
         <a href="/" class="flex items-center gap-4 px-4 py-3 text-white hover:bg-zinc-800 rounded-lg mb-1 transition-colors group" data-navigo>
            <svg class="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            <span class="text-sm font-medium sidebar-text">Trang chủ</span>
         </a>
         <a href="/explore" class="flex items-center gap-4 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg mb-1 transition-colors group" data-navigo>
             <svg class="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"/></svg>
             <span class="text-sm font-medium sidebar-text">Khám phá</span>
         </a>
         <a href="/library" class="flex items-center gap-4 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg mb-1 transition-colors group" data-navigo>
            <svg class="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5c0 1.38-1.12 2.5-2.5 2.5S10 13.88 10 12.5s1.12-2.5 2.5-2.5c.57 0 1.08.19 1.5.51V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/></svg>
            <span class="text-sm font-medium sidebar-text">Thư viện</span>
         </a>
         <a href="/upgrade" class="flex items-center gap-4 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg mb-1 transition-colors group" data-navigo>
            <svg class="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <span class="text-sm font-medium sidebar-text">Nâng cấp</span>
         </a>
       </nav>
    </aside>
  `;
}


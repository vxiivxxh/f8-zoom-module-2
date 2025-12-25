import { authStore } from '../store/authStore';

export const Header = () => {
  const user = authStore.user;
  const initial = user && user.name ? user.name.charAt(0).toUpperCase() : 'G';

  return `
    <header class="fixed top-0 left-sidebar right-0 h-header bg-yt-base/95 backdrop-blur-sm z-header flex items-center justify-between px-6 border-b border-gray-800">
      
      <!-- Search Bar -->
      <div class="flex items-center flex-1 max-w-xl">
        <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-yt-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
                type="text" 
                placeholder="Tìm kiếm bài hát, album, nghệ sĩ..." 
                class="block w-full p-2.5 pl-10 text-sm text-yt-text-primary bg-stone-900 border border-transparent rounded-lg focus:ring-white focus:border-white placeholder-gray-500"
            >
        </div>
      </div>

      <!-- User Profile -->
      <div class="flex items-center gap-4">
         ${user ? `
            <div class="flex items-center gap-3 cursor-pointer group relative">
                <div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    ${initial}
                </div>
                <!-- Dropdown (Simple implementation) -->
                <div class="absolute right-0 top-10 w-48 bg-yt-player rounded shadow-lg py-1 hidden group-hover:block border border-gray-700">
                     <button id="header-logout-btn" class="block w-full text-left px-4 py-2 text-sm text-yt-text-primary hover:bg-gray-700">Đăng xuất</button>
                </div>
            </div>
         ` : `
            <a href="/login" class="text-sm font-medium text-yt-text-primary px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 transition-colors" data-navigo>Đăng nhập</a>
         `}
      </div>
    </header>
  `;
};

// Bind events after rendering
export const setupHeaderEvents = (router) => {
    const logoutBtn = document.getElementById('header-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await authStore.logout();
            router.navigate('/login');
        });
    }
};

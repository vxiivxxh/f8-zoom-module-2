import { authStore } from '../store/authStore';
import { uiStore } from '../store/uiStore';

export const Header = () => {
  const user = authStore.user;
  const initial = user && user.name ? user.name.charAt(0).toUpperCase() : 'G';

  return `
    <header class="fixed top-0 left-0 right-0 h-header bg-yt-base/95 backdrop-blur-sm z-header flex items-center justify-between px-4 border-b border-gray-800">
      
      <!-- Left: Hamburger & Logo -->
      <div class="flex items-center gap-4">
        <button id="sidebar-toggle" class="p-2 text-yt-text-primary hover:bg-white/10 rounded-full transition-colors flex items-center justify-center">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
        </button>
        <a href="${import.meta.env.BASE_URL}" class="flex items-center justify-center p-2 logo-container" data-navigo>
           <img src="https://music.youtube.com/img/on_platform_logo_dark.svg" alt="YouTube Music" class="h-6">
        </a>
      </div>

      <!-- Center: Search Bar -->
      <div class="flex items-center flex-1 max-w-xl ml-10">
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

      <!-- Right Side Icons -->
      <div class="flex items-center gap-4">
          <!-- Cast Button -->
          <button class="p-2 text-yt-text-primary hover:bg-white/10 rounded-full transition-colors" title="Cast to device">
             <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.92-11-11-11z"/></svg>
          </button>

          <!-- User Profile -->
         ${user ? `
            <div id="profile-trigger" class="flex items-center gap-3 cursor-pointer relative select-none">
                <div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    ${initial}
                </div>
                <!-- Dropdown -->
                <div id="profile-dropdown" class="absolute right-0 top-10 w-48 bg-yt-player rounded shadow-lg py-1 hidden border border-gray-700">
                     <div class="px-4 py-3 border-b border-gray-700">
                        <p class="text-sm text-white font-medium truncate">${user.name}</p>
                        <p class="text-xs text-gray-400 truncate">${user.email}</p>
                     </div>
                     <button id="header-logout-btn" class="block w-full text-left px-4 py-2 text-sm text-yt-text-primary hover:bg-gray-700">Đăng xuất</button>
                </div>
            </div>
         ` : `
            <a href="${import.meta.env.BASE_URL}login" class="text-sm font-medium text-yt-text-primary px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 transition-colors" data-navigo>Đăng nhập</a>
         `}
      </div>
    </header>
  `;
};

// Bind events after rendering
export const setupHeaderEvents = (router) => {
    // Sidebar Toggle
    const toggleBtn = document.getElementById('sidebar-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            uiStore.toggleSidebar();
        });
    }

    const logoutBtn = document.getElementById('header-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
             // Close dropdown just in case
            const dropdown = document.getElementById('profile-dropdown');
            if (dropdown) dropdown.classList.add('hidden');
            
            await authStore.logout();
            router.navigate('/login');
        });
    }

    // Toggle Dropdown
    const trigger = document.getElementById('profile-trigger');
    const dropdown = document.getElementById('profile-dropdown');

    if (trigger && dropdown) {
        // Toggle on click
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('hidden');
        });

        // Close on click outside
        // We need a named function to remove it later if we wanted to be perfectly clean,
        // but for this simple app, a persistent document listener is acceptable/common trade-off
        // provided we check if element exists or we accept it runs always.
        // Actually, since this setupHeaderEvents is called multiple times (re-render),
        // adding document listener repeatedly is BAD. It will stack up.
        
        // Solution: Remove old listener if exists? Hard to reference.
        // Better: Use a global handler or check if listener already attached?
        // Or specific logic.
        
        // Let's use a simpler approach: 
        // We can attach `onclick` property to document.body, but that overrides others.
        // Best for SPA needing cleanup: Attach event listener that checks if trigger/dropdown exists.
        // If they don't exist (because Header removed), it does nothing.
        
        // Even better: MainLayout re-renders Header. 
        // Let's just create the handler and attach it. 
        // To avoid duplicates, we can attach to `app` or remove previous.
        // BUT, since we cannot easily remove anonymous functions or previous references here:
        // Let's check if we already initialized? No state here.
        
        // Alternative: Use a 'once' listener on document that re-attaches? No.
        // Let's rely on the fact that click outside is global.
        
        const closeDropdown = (e) => {
             if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
                 dropdown.classList.add('hidden');
             }
        };
        
        // Remove existing to prevent duplicates if MainLayout calls this often
        // (Note: this only works if function reference is same. It is NOT same here)
        // Correct fix: Store controller or use unique event name if possible. 
        // Or just `trigger.onclick` which handles the open.
        // For close, we need document level.
        
        // WORKAROUND for re-attachment: Use a custom property on document to store the handler?
        if (document._headerClickOutside) {
            document.removeEventListener('click', document._headerClickOutside);
        }
        document._headerClickOutside = closeDropdown;
        document.addEventListener('click', closeDropdown);
    }
};

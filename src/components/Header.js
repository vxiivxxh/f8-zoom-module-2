import { authStore } from '../store/authStore';
import { uiStore } from '../store/uiStore';
import { apiClient } from '../utils/api';

export const Header = () => {
  const user = authStore.user;
  const initial = user && user.name ? user.name.charAt(0).toUpperCase() : 'G';

  return `
    <header class="sticky top-0 h-16 bg-transparent z-header flex items-center justify-between px-8 mb-4">
      <!-- Center: Search Bar -->
      <div class="flex items-center flex-1 max-w-xl">
        <div class="relative w-full group">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-yt-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
                id="search-input"
                type="text" 
                placeholder="Tìm kiếm bài hát, album, nghệ sĩ..." 
                class="block w-full p-2.5 pl-10 text-sm text-yt-text-primary bg-white/10 border border-transparent rounded-lg focus:ring-white focus:border-white placeholder-gray-400 focus:bg-black"
                autocomplete="off"
            >
            <!-- Suggestions Dropdown -->
            <div id="search-suggestions" class="absolute left-0 right-0 top-full mt-2 bg-yt-player rounded-lg shadow-xl border border-gray-700 hidden overflow-hidden z-50"></div>
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

// Gắn sự kiện sau khi render
export const setupHeaderEvents = (router) => {
    // Toggle Sidebar
    const toggleBtn = document.getElementById('sidebar-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            uiStore.toggleSidebar();
        });
    }

    // Search Logic
    const searchInput = document.getElementById('search-input');
    const suggestionsBox = document.getElementById('search-suggestions');
    let debounceTimeout;

    if (searchInput && suggestionsBox) {
        // Handle Input
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            clearTimeout(debounceTimeout);

            if (query.length < 2) {
                suggestionsBox.classList.add('hidden');
                return;
            }

            debounceTimeout = setTimeout(async () => {
                try {
                    const res = await apiClient.getSearchSuggestions(query);
                    // API returns { suggestions: ["..."], ... } or { data: [...] }
                    const rawData = res.data || {};
                    const suggestions = rawData.suggestions || rawData.data || (Array.isArray(rawData) ? rawData : []);

                    if (suggestions.length > 0) {
                        suggestionsBox.innerHTML = suggestions.map(s => `
                            <div class="px-4 py-2 hover:bg-white/10 cursor-pointer flex items-center gap-3 text-white" data-suggestion="${s}">
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                <span class="text-sm font-medium">${s}</span>
                            </div>
                        `).join('');
                        suggestionsBox.classList.remove('hidden');
                    } else {
                        suggestionsBox.classList.add('hidden');
                    }
                } catch (err) {
                    console.error("Suggestion error", err);
                }
            }, 300);
        });

        // Handle Focus (Show suggestions if query exists)
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim().length >= 2 && suggestionsBox.children.length > 0) {
                suggestionsBox.classList.remove('hidden');
            }
        });

        // Handle Enter Key
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const term = searchInput.value.trim();
                if (term) {
                    router.navigate(`/search?q=${encodeURIComponent(term)}`);
                    suggestionsBox.classList.add('hidden');
                    searchInput.blur();
                }
            }
        });

        // Handle Click Suggestion
        suggestionsBox.addEventListener('click', (e) => {
            const item = e.target.closest('[data-suggestion]');
            if (item) {
                const term = item.dataset.suggestion;
                searchInput.value = term; // Update input
                router.navigate(`/search?q=${encodeURIComponent(term)}`);
                suggestionsBox.classList.add('hidden');
            }
        });

        // Close when clicking outside
        const closeSearch = (e) => {
            if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
                suggestionsBox.classList.add('hidden');
            }
        };
        document.addEventListener('click', closeSearch);
    }

    // Logout Logic
    const logoutBtn = document.getElementById('header-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
             // Đóng dropdown đề phòng
            const dropdown = document.getElementById('profile-dropdown');
            if (dropdown) dropdown.classList.add('hidden');
            
            await authStore.logout();
            router.navigate('/login');
        });
    }

    // Toggle Profile Dropdown
    const trigger = document.getElementById('profile-trigger');
    const dropdown = document.getElementById('profile-dropdown');

    if (trigger && dropdown) {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('hidden');
        });
        
        const closeDropdown = (e) => {
             if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
                 dropdown.classList.add('hidden');
             }
        };
        
        // Gỡ bỏ cái cũ để tránh trùng lặp
        if (document._headerClickOutside) {
            document.removeEventListener('click', document._headerClickOutside);
        }
        document._headerClickOutside = closeDropdown;
        document.addEventListener('click', closeDropdown);
    }
};

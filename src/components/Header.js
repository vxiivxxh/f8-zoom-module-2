import { authStore } from '../store/authStore';
import { uiStore } from '../store/uiStore';

export const Header = () => {
  const user = authStore.user;
  const initial = user && user.name ? user.name.charAt(0).toUpperCase() : 'G';

  return `
    <header class="sticky top-0 h-16 bg-transparent z-header flex items-center justify-between px-8 mb-4">
      <!-- Center: Search Bar -->
      <div class="flex items-center flex-1 max-w-xl">
        <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-yt-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
                type="text" 
                placeholder="Tìm kiếm bài hát, album, nghệ sĩ..." 
                class="block w-full p-2.5 pl-10 text-sm text-yt-text-primary bg-white/10 border border-transparent rounded-lg focus:ring-white focus:border-white placeholder-gray-400"
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

// Gắn sự kiện sau khi render
export const setupHeaderEvents = (router) => {
    // Toggle Sidebar
    const toggleBtn = document.getElementById('sidebar-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            uiStore.toggleSidebar();
        });
    }

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

    // Toggle Dropdown
    const trigger = document.getElementById('profile-trigger');
    const dropdown = document.getElementById('profile-dropdown');

    if (trigger && dropdown) {
        // Toggle khi click
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('hidden');
        });

        // Đóng khi click ra ngoài
        // Chúng ta cần một hàm có tên để gỡ bỏ sau này nếu muốn code sạch hoàn toàn,
        // nhưng với app đơn giản này, một document listener liên tục là chấp nhận được
        // miễn là kiểm tra element có tồn tại hay không.
        // Thực tế, vì setupHeaderEvents được gọi nhiều lần (re-render),
        // adding document listener liên tục là KHÔNG TỐT. Nó sẽ chồng chất.
        
        // Giải pháp: Gỡ bỏ listener cũ nếu tồn tại? Khó tham chiếu.
        // Tốt hơn: Dùng giải pháp clean hơn hoặc kiểm tra nếu listener đã gắn.
        
        // Hãy dùng cách đơn giản hơn: 
        // Chúng ta có thể gắn thuộc tính `onclick` cho document.body, nhưng nó ghi đè người khác.
        // Tốt nhất cho SPA cần dọn dẹp: Gắn event listener kiểm tra trigger/dropdown tồn tại.
        // Nếu không tồn tại (vì Header bị xóa), nó không làm gì cả.
        
        // Thậm chí tốt hơn: MainLayout re-render Header. 
        // Hãy tạo handler và gắn nó. 
        // Để tránh trùng lặp, chúng ta có thể gắn vào `app` hoặc gỡ bỏ cái trước.
        
        // WORKAROUND cho việc gắn lại: Dùng thuộc tính tùy chỉnh trên document để lưu handler
        
        const closeDropdown = (e) => {
             if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
                 dropdown.classList.add('hidden');
             }
        };
        
        // Gỡ bỏ cái cũ để tránh trùng lặp nếu MainLayout gọi lại hàm này thường xuyên
        if (document._headerClickOutside) {
            document.removeEventListener('click', document._headerClickOutside);
        }
        document._headerClickOutside = closeDropdown;
        document.addEventListener('click', closeDropdown);
    }
};

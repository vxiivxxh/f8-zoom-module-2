// Component Header: Chứa thanh tìm kiếm và avatar user
import { store } from "../state/store";
import { logout } from "../api/client";

export default function Header() {
  return `
    <header class="h-16 flex items-center justify-between px-4 sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/5">
      <!-- Khu vực tìm kiếm -->
      <div class="flex items-center flex-1 max-w-3xl">
        <div class="flex items-center w-full max-w-xl mx-4 relative group">
           <div class="absolute left-3 text-zinc-400 group-focus-within:text-white pointer-events-none">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
           </div>
           <input 
             type="text" 
             id="search-input"
             placeholder="Tìm bài hát, đĩa nhạc, nghệ sĩ, podcast" 
             class="w-full bg-zinc-800 text-white placeholder-zinc-400 rounded-lg py-2 pl-10 pr-4 outline-none focus:bg-zinc-900 focus:ring-1 focus:ring-white/20 transition-all font-medium"
           />
        </div>
      </div>
      
      <!-- Khu vực User & Auth -->
      <div class="flex items-center gap-2 sm:gap-4" id="header-auth-section">
        <!-- Nội dung sẽ được render bởi JS -->
      </div>
    </header>
  `;
}

export const headerScript = () => {
    const authSection = document.getElementById("header-auth-section");
    const renderAuth = () => {
        if (!authSection) return;
        const { auth } = store.getState();
        if (auth.isAuthenticated && auth.user) {
            const userInitial = auth.user.name ? auth.user.name.charAt(0).toUpperCase() : "U";
            authSection.innerHTML = `
                <button class="text-zinc-400 hover:text-white p-2" title="Cast">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11zm20-7H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
                </button>
                <div class="relative group">
                    <button class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold border border-white/20 hover:border-white transition-colors">
                        ${userInitial}
                    </button>
                    <!-- Dropdown Menu -->
                    <div class="absolute right-0 top-full pt-2 w-48 hidden group-hover:block z-50">
                        <div class="bg-[#282828] rounded-md shadow-xl py-1 border border-white/10">
                            <div class="px-4 py-2 border-b border-white/10">
                                <p class="text-sm text-white font-medium truncate">${auth.user.name}</p>
                                <p class="text-xs text-zinc-400 truncate">${auth.user.email}</p>
                            </div>
                            <a href="#" class="block px-4 py-2 text-sm text-zinc-300 hover:bg-white/10">Kênh của tôi</a>
                            <button id="logout-btn" class="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-white/10">Đăng xuất</button>
                        </div>
                    </div>
                </div>
            `;
            setTimeout(() => {
                 document.getElementById("logout-btn")?.addEventListener("click", () => {
                     logout();
                 });
            }, 0);
        } else {
             authSection.innerHTML = `
                <button class="text-zinc-400 hover:text-white p-2">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                </button>
                <a href="/login" class="px-3 py-1.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors cursor-pointer flex items-center gap-1" data-navigo>
                   <span class="whitespace-nowrap">Đăng nhập</span>
                </a>
             `;
        }
    };
    renderAuth();
    store.subscribe((state) => {
        renderAuth();
    });
};

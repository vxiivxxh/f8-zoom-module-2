import { MainLayout } from '../layouts/MainLayout.js';

export const renderLibrary = (router) => {
  const content = `
    <div class="px-8 py-4">
      <!-- Bộ lọc Danh mục (Chips) -->
      <div class="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        <button class="px-3 py-1.5 bg-white text-black font-medium text-sm rounded-lg whitespace-nowrap">Tất cả</button>
        <button class="px-3 py-1.5 bg-white/10 text-white font-medium text-sm rounded-lg hover:bg-white/20 whitespace-nowrap transition-colors">Danh sách phát</button>
        <button class="px-3 py-1.5 bg-white/10 text-white font-medium text-sm rounded-lg hover:bg-white/20 whitespace-nowrap transition-colors">Bài hát</button>
        <button class="px-3 py-1.5 bg-white/10 text-white font-medium text-sm rounded-lg hover:bg-white/20 whitespace-nowrap transition-colors">Album</button>
        <button class="px-3 py-1.5 bg-white/10 text-white font-medium text-sm rounded-lg hover:bg-white/20 whitespace-nowrap transition-colors">Nghệ sĩ</button>
      </div>

      <!-- Hoạt động gần đây / Lưới Thư viện -->
      <div class="mt-4">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          
          <!-- Bài hát đã thích (Danh sách phát tự động) -->
          <div class="group cursor-pointer">
            <div class="relative aspect-square rounded-md overflow-hidden mb-3 bg-gradient-to-br from-indigo-800 to-purple-800 flex items-center justify-center">
               <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
               <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
               </div>
            </div>
            <h3 class="font-bold text-white text-base truncate">Bài hát đã thích</h3>
            <p class="text-yt-text-secondary text-sm truncate">Tự động tạo • 0 bài hát</p>
          </div>

          <!-- Nút Danh sách phát mới -->
          <div class="group cursor-pointer">
            <div class="relative aspect-square rounded-full border-2 border-dashed border-gray-600 mb-3 flex items-center justify-center hover:border-white transition-colors">
               <svg class="w-10 h-10 text-yt-text-secondary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            </div>
            <h3 class="font-bold text-white text-base truncate text-center">Tạo danh sách phát mới</h3>
          </div>

        </div>
      </div>
    </div>
  `;

  MainLayout(content, router);
};

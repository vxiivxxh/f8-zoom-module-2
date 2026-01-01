import { apiClient } from '../utils/api';
import { escapeHTML } from '../utils/security';
import { MainLayout } from '../layouts/MainLayout';

export const renderNewReleases = async (router) => {
  MainLayout(`
      <div class="flex items-center justify-center h-64">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
  `, router);

  try {
    const response = await apiClient.getNewReleases({ limit: 50 });
    const items = response.items || response.data || [];

    const content = `
       <div class="space-y-8">
         <div class="flex items-center justify-between mb-4">
            <h2 class="text-3xl font-bold">Bản phát hành mới</h2>
         </div>
         
         <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            ${items.length > 0 
                ? items.map(item => renderCard(item)).join('') 
                : '<p class="text-gray-400 col-span-full">Không có dữ liệu mới phát hành.</p>'
            }
         </div>
       </div>
     `;

    MainLayout(content, router);
    
    // Initializing player events
    const main = document.querySelector("main");
    if (main) {
      main.addEventListener("click", (e) => {
        const card = e.target.closest(".song-card");
        if (card) {
          try {
            const songData = JSON.parse(card.dataset.song);
            import("../store/playerStore").then(({ playerStore }) => {
              playerStore.play(songData);
            });
          } catch (err) {
            console.error("Failed to play song", err);
          }
        }
      });
    }

  } catch (error) {
     console.error("New Releases load error", error);
     MainLayout(`
       <div class="text-center py-20 text-red-500">
           <h3 class="text-xl font-bold">Lỗi tải dữ liệu</h3>
           <p>${error.message}</p>
           <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200">Thử lại</button>
       </div>
    `, router);
  }
};

const renderCard = (item) => {
    const rawTitle = item.title || item.name || 'No Title';
    const title = escapeHTML(rawTitle);

    const rawSubtitle = Array.isArray(item.artists) 
        ? item.artists.map(a => typeof a === 'string' ? a : a.name).join(', ') 
        : (item.items && item.items.length > 0 ? item.items[0].name : '');
        
    const subtitle = escapeHTML(rawSubtitle);

    const image = (item.thumbnails && item.thumbnails[0]) || item.thumbnail || item.thumb || item.image || 'https://via.placeholder.com/300';
    
    return `
      <div class="group cursor-pointer song-card" data-song='${JSON.stringify(item).replace(/'/g, "&#39;")}'>
         <div class="relative aspect-square mb-3 rounded overflow-hidden bg-gray-800">
            <img src="${image}" alt="${title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center pl-1 hover:scale-110 transition-transform">
                   <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
               </button>
            </div>
         </div>
         <h3 class="font-medium text-white truncate hover:underline" title="${title}">${title}</h3>
         <p class="text-sm text-yt-text-secondary truncate" title="${subtitle}">${subtitle}</p>
      </div>
    `;
};

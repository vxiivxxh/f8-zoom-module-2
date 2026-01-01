import { apiClient } from '../utils/api';
import { escapeHTML } from '../utils/security';
import { MainLayout } from '../layouts/MainLayout';

export const renderCharts = async (router) => {
  MainLayout(`
      <div class="flex items-center justify-center h-64">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
  `, router);

  try {
    const [videosRes, artistsRes] = await Promise.all([
        apiClient.getChartVideos({ limit: 20 }),
        apiClient.getTopArtists({ limit: 10 })
    ]);

    const videos = videosRes.items || videosRes.data || [];
    const artists = artistsRes.items || artistsRes.data || [];

    const content = `
       <div class="space-y-12">
         <div class="flex items-center justify-between">
            <h2 class="text-3xl font-bold">Bảng xếp hạng</h2>
         </div>
         
         <!-- Top Songs / Video Chart -->
         <section>
             <h3 class="text-2xl font-bold mb-6">Top Music Videos (Global)</h3>
             <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                 ${videos.map((item, index) => renderRankedItem(item, index + 1)).join('')}
             </div>
         </section>

         <!-- Top Artists Chart -->
         <section>
             <h3 class="text-2xl font-bold mb-6">Nghệ sĩ hàng đầu</h3>
             <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                ${artists.map(artist => renderArtistCard(artist)).join('')}
             </div>
         </section>
       </div>
     `;

    MainLayout(content, router);
    
    // Initializing player events
    const main = document.querySelector("main");
    if (main) {
      main.addEventListener("click", (e) => {
        const item = e.target.closest(".chart-item");
        if (item) {
          try {
             // For simplify, we just play if it is playable song data
            const songData = JSON.parse(item.dataset.song);
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
     console.error("Charts load error", error);
     MainLayout(`
       <div class="text-center py-20 text-red-500">
           <h3 class="text-xl font-bold">Lỗi tải dữ liệu</h3>
           <p>${error.message}</p>
           <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200">Thử lại</button>
       </div>
    `, router);
  }
};

const renderRankedItem = (item, rank) => {
    const rawTitle = item.title || item.name || 'No Title';
    const title = escapeHTML(rawTitle);
    
    // artist
    const rawSubtitle = Array.isArray(item.artists) 
        ? item.artists.map(a => typeof a === 'string' ? a : a.name).join(', ') 
        : '';
    const subtitle = escapeHTML(rawSubtitle);

    const image = (item.thumbnails && item.thumbnails[0]) || item.thumbnail || item.thumb || item.image || 'https://via.placeholder.com/120';

    return `
    <div class="chart-item flex items-center p-3 hover:bg-white/10 rounded-md cursor-pointer transition-colors group" data-song='${JSON.stringify(item).replace(/'/g, "&#39;")}'>
        <div class="w-8 text-center text-xl font-bold text-gray-400 mr-4 font-mono">${rank}</div>
        <div class="relative w-16 h-16 flex-shrink-0 mr-4">
            <img src="${image}" alt="${title}" class="w-full h-full object-cover rounded">
             <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
        </div>
        <div class="flex-1 min-w-0">
            <h4 class="text-white font-medium truncate" title="${title}">${title}</h4>
            <p class="text-gray-400 text-sm truncate" title="${subtitle}">${subtitle}</p>
        </div>
        <div class="hidden md:block text-gray-400 text-sm ml-4">
           ${item.views ? Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(item.views) + ' views' : ''}
        </div>
    </div>
    `;
};

const renderArtistCard = (artist) => {
  const rawName = artist.name || "Unknown Artist";
  const name = escapeHTML(rawName);
  const image =
    (artist.thumbnails && artist.thumbnails[0]) ||
    artist.thumbnail ||
    artist.image ||
    "https://via.placeholder.com/300";

  return `
      <div class="group cursor-pointer flex flex-col items-center text-center">
         <div class="relative w-full aspect-square mb-3 rounded-full overflow-hidden bg-gray-800">
            <img src="${image}" alt="${name}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
         </div>
         <h3 class="font-medium text-white hover:underline" title="${name}">${name}</h3>
         <p class="text-sm text-yt-text-secondary">Chart Artist</p>
      </div>
    `;
};

import { apiClient } from '../utils/api';
import { MainLayout } from '../layouts/MainLayout';
import { authStore } from '../store/authStore';

export const renderHome = async (router) => {
  // Show Loading State utilizing the Layout
  MainLayout(`
      <div class="flex items-center justify-center h-64">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
  `, router);

  try {
    // Parallel data fetching
    const [albumsRes, hitsRes, quickPicksRes] = await Promise.all([
       apiClient.get('/home/albums-for-you'),
       apiClient.get('/home/todays-hits'),
       apiClient.get('/quick-picks')
    ]);

    // Parse data safely
    const albums = albumsRes.data?.data || albumsRes.data || [];
    const hits = hitsRes.data?.data || hitsRes.data || [];
    const quickPicks = quickPicksRes.data?.data || quickPicksRes.data || [];

    // User personalization
    const user = authStore.user;
    const greeting = user ? `Xin chào, ${user.name}` : 'Xin chào';

    const content = `
      <div class="space-y-10">
        <!-- Section: Welcome / Quick actions -->
        <div>
           <h1 class="text-3xl font-bold mb-2">${greeting}</h1>
           ${!user ? '<p class="text-yt-text-secondary">Đăng nhập để xem lịch sử nghe nhạc và đề xuất riêng cho bạn.</p>' : ''}
        </div>

        <!-- Section 0: Quick Picks (Mock or Real) -->
        <section>
          <div class="flex items-center justify-between mb-4">
             <div>
                <span class="text-yt-text-secondary uppercase tracking-widest text-xs font-bold">Bắt đầu nhanh</span>
                <h2 class="text-2xl font-bold">Tuyển tập nhanh</h2>
             </div>
             <!-- <button class="text-sm font-medium text-yt-text-secondary hover:text-white uppercase tracking-wider">Phát tất cả</button> -->
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
             ${Array.isArray(quickPicks) && quickPicks.length > 0 
                ? quickPicks.slice(0, 5).map(item => renderCard(item)).join('')
                : '<p class="col-span-full text-yt-text-secondary">Chưa có tuyển tập nhanh nào.</p>'
             }
          </div>
        </section>

        <!-- Section 1: Albums for you -->
        <section>
          <div class="flex items-center justify-between mb-4">
             <h2 class="text-2xl font-bold">Gợi ý Album</h2>
             <button class="text-sm font-medium text-yt-text-secondary hover:text-white uppercase tracking-wider">Xem thêm</button>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
             ${Array.isArray(albums) ? albums.slice(0, 6).map(album => renderCard(album)).join('') : ''}
          </div>
        </section>

        <!-- Section 2: Today's Hits -->
        <section>
          <div class="flex items-center justify-between mb-4">
             <h2 class="text-2xl font-bold">Hit Hôm Nay</h2>
             <button class="text-sm font-medium text-yt-text-secondary hover:text-white uppercase tracking-wider">Xem thêm</button>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
             ${Array.isArray(hits) ? hits.slice(0, 6).map(hit => renderCard(hit)).join('') : ''}
          </div>
        </section>
      </div>
    `;

     MainLayout(content, router);

     // Event Delegation for Song Cards
     const main = document.querySelector('main');
     if (main) {
         main.addEventListener('click', (e) => {
             const card = e.target.closest('.song-card');
             if (card) {
                 try {
                     const songData = JSON.parse(card.dataset.song);
                     import('../store/playerStore').then(({ playerStore }) => {
                         playerStore.play(songData);
                     });
                 } catch (err) {
                     console.error('Failed to play song', err);
                 }
             }
         });
     }

  } catch (error) {
    console.error("Home load error", error);
    MainLayout(`
       <div class="text-center py-20 text-red-500">
           <h3 class="text-xl font-bold">Đã có lỗi xảy ra</h3>
           <p>${error.message}</p>
           <button class="mt-4 px-4 py-2 bg-white text-black rounded-full" onclick="location.reload()">Thử lại</button>
       </div>
    `, router);
  }
};

// Helper: Card Component
const renderCard = (item) => {
    // Handle different API structures. Assuming item has title, description, thumbnail
    const title = item.title || item.name || 'Không có tiêu đề';
    
    // Robust artist handling (string or array)
    let subtitle = '';
    if (Array.isArray(item.artists)) {
        subtitle = item.artists.map(a => typeof a === 'string' ? a : a.name).join(', ');
    } else if (typeof item.artists === 'string') {
        subtitle = item.artists;
    } else {
        subtitle = item.description || '';
    }

    // Thumbnail handling
    let image = 'https://via.placeholder.com/300';
    if (item.thumbnail) {
        if (typeof item.thumbnail === 'string') image = item.thumbnail;
        else if (Array.isArray(item.thumbnail) && item.thumbnail.length > 0) image = item.thumbnail[0].url || item.thumbnail[0];
        else if (item.thumbnail.url) image = item.thumbnail.url;
    } else if (item.thumbnails) { 
        // Some endpoints return 'thumbnails' array
         if (Array.isArray(item.thumbnails) && item.thumbnails.length > 0) image = item.thumbnails[0].url || item.thumbnails[0];
    } else if (item.image) {
        image = item.image;
    }
    
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
         <h3 class="font-medium text-white truncate group-hover:underline" title="${title}">${title}</h3>
         <p class="text-sm text-yt-text-secondary truncate" title="${subtitle}">${subtitle}</p>
      </div>
    `;
};

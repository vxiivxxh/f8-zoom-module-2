import { apiClient } from '../utils/api';
import { escapeHTML } from '../utils/security';
import { MainLayout } from '../layouts/MainLayout';
import { authStore } from '../store/authStore';

export const renderHome = async (router) => {
  // Hiển thị trạng thái Loading sử dụng Layout
  MainLayout(`
      <div class="flex items-center justify-center h-64">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
  `, router);

  try {
    // Fetch dữ liệu song song
    const [albumsRes, hitsRes, quickPicksRes, moodsRes] = await Promise.all([
       apiClient.get('/home/albums-for-you'),
       apiClient.get('/home/todays-hits'),
       apiClient.get('/quick-picks'),
       apiClient.get('/moods')
    ]);

    // API trả về mảng trực tiếp cho các endpoint này
    const albums = Array.isArray(albumsRes) ? albumsRes : (albumsRes.data || []);
    const hits = Array.isArray(hitsRes) ? hitsRes : (hitsRes.data || []);
    const quickPicks = Array.isArray(quickPicksRes) ? quickPicksRes : (quickPicksRes.data || []);
    // Sửa lỗi: Truy cập trực tiếp .items từ object phản hồi
    const moods = (moodsRes && moodsRes.items) ? moodsRes.items : (Array.isArray(moodsRes) ? moodsRes : []);
    
    // Cá nhân hóa người dùng
    const user = authStore.user;
    const greeting = user ? `Xin chào, ${user.name}` : 'Xin chào';

    const content = `
      <div class="space-y-10">
        <!-- Section: Welcome / Quick actions -->
        <div class="mb-6">
           <h1 class="text-3xl font-bold mb-2">${greeting}</h1>
           ${!user ? '<p class="text-yt-text-secondary">Đăng nhập để xem lịch sử nghe nhạc và đề xuất riêng cho bạn.</p>' : ''}
        </div>

        <!-- Section: Moods / Categories -->
        ${moods.length > 0 ? `
        <div class="flex overflow-x-auto gap-3 pb-2 scrollbar-none -mx-8 px-8 mb-8 bg-transparent py-2 transition-all">
            ${moods.map(mood => `
                <a href="${import.meta.env.BASE_URL}explore?category=${mood.slug}" class="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors whitespace-nowrap border border-white/5" data-navigo>
                    ${mood.name}
                </a>
            `).join('')}
        </div>
        ` : ''}

        <!-- Section: Quick Picks -->
        ${quickPicks.length > 0 ? renderSection('Gợi ý nhanh', quickPicks, 'quick-picks', 'Bắt đầu nhanh') : ''}

        <!-- Section 1: Albums for you -->
        ${renderSection('Gợi ý Album', albums, 'albums')}

        <!-- Section 2: Today's Hits -->
        ${renderSection('Hit Hôm Nay', hits, 'hits')}
      </div>
    `;

     MainLayout(content, router);

     // Event Delegation cho Song Cards & Nút cuộn
     const main = document.querySelector('main');
     if (main) {
         // Xử lý click vào Card
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

         // Xử lý nút cuộn
         const scrollBtns = main.querySelectorAll('[data-scroll]');
         scrollBtns.forEach(btn => {
             btn.addEventListener('click', (e) => {
                 const direction = e.currentTarget.dataset.scroll; // 'left' hoặc 'right'
                 const targetId = e.currentTarget.dataset.target;
                 const container = document.getElementById(targetId);
                 
                 if (container) {
                     const scrollAmount = container.clientWidth * 0.75;
                     if (direction === 'left') {
                         container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                     } else {
                         container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                     }
                 }
             });
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

// Helper: Render Section với Slider
const renderSection = (title, items, id, subtitle = '') => {
    // Giới hạn 6 item mỗi section vì hiệu năng và UX (User yêu cầu 3-5, 6 đảm bảo đầy hàng + 1 trên màn hình thường hoặc đủ để trông có dữ liệu)
    const displayItems = items.slice(0, 12); // Tăng slice để hỗ trợ responsive logic

    return `
    <section>
        <div class="flex items-end justify-between mb-4">
            <div>
                ${subtitle ? `<p class="text-sm font-medium text-yt-text-secondary uppercase tracking-wider mb-1">${subtitle}</p>` : ''}
                <h2 class="text-2xl font-bold leading-tight">${title}</h2>
            </div>
            <div class="flex items-center gap-2">
                <button class="w-8 h-8 rounded-full border border-gray-700 hover:border-white flex items-center justify-center transition-colors text-white disabled:opacity-50" 
                    data-scroll="left" data-target="${id}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button class="w-8 h-8 rounded-full border border-gray-700 hover:border-white flex items-center justify-center transition-colors text-white disabled:opacity-50" 
                    data-scroll="right" data-target="${id}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
        </div>
        <div id="${id}" class="flex overflow-x-auto scroll-smooth gap-6 scrollbar-none pb-4 snap-x">
            ${displayItems.map((item, index) => {
                // Logic hiển thị responsive:
                // Mobile (<640px): Hiển thị 3 items (Indices 0, 1, 2)
                // sm (>=640px): Hiển thị 4 items (Index 3)
                // md (>=768px): Hiển thị 5 items (Index 4)
                // lg (>=1024px): Hiển thị 6 items (Index 5)
                let responsiveClass = '';
                if (index > 2) responsiveClass = 'hidden sm:block';
                if (index > 3) responsiveClass = 'hidden md:block';
                if (index > 4) responsiveClass = 'hidden lg:block';
                
                // Bọc card trong div responsive
                return `<div class="${responsiveClass}">${renderCard(item)}</div>`;
            }).join('')}
        </div>
    </section>
    `;
};

// Helper: Component Card
const renderCard = (item) => {
    const rawTitle = item.title || item.name || 'Không có tiêu đề';
    const title = escapeHTML(rawTitle);

    const rawSubtitle = Array.isArray(item.artists) 
        ? item.artists.map(a => typeof a === 'string' ? a : a.name).join(', ') 
        : (item.description || '');
    const subtitle = escapeHTML(rawSubtitle);
        
    const image = (item.thumbnails && item.thumbnails[0]) || item.thumbnail || item.image || 'https://via.placeholder.com/300';
    
    return `
      <div class="flex-shrink-0 w-48 group cursor-pointer song-card snap-start" data-song='${JSON.stringify(item).replace(/'/g, "&#39;")}'>
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

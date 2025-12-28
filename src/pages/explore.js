import { apiClient } from '../utils/api';
import { escapeHTML } from '../utils/security';
import { MainLayout } from '../layouts/MainLayout';

export const renderExplore = async (router) => {
  MainLayout(`
      <div class="flex items-center justify-center h-64">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
  `, router);

  try {
     const [newReleasesRes, chartVideosRes, topArtistsRes] = await Promise.all([
       apiClient.get("/explore/new-releases"),
       apiClient.getChartVideos(),
       apiClient.getTopArtists(),
     ]);

     // API trả về { items: [...] }
     const newReleases = newReleasesRes.items || newReleasesRes.data || [];
     const chartVideos = chartVideosRes.items || chartVideosRes.data || [];
     const topArtists = topArtistsRes.items || topArtistsRes.data || [];

     // Mock chips cho Tâm trạng vì API có thể chưa bao gồm trực tiếp
     const chips = [
       "Mới phát hành",
       "Bảng xếp hạng",
       "Tâm trạng",
       "Pop",
       "Rock",
       "Hiphop v.v.",
     ];

     const content = `
       <div class="space-y-8">
         <!-- Chips Navigation -->
         <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            ${chips
              .map(
                (chip, idx) => `
               <button 
                  class="category-chip px-4 py-2 bg-yt-hover rounded-lg text-sm font-medium whitespace-nowrap hover:bg-white/20 transition-colors ${
                    idx === 0 ? "bg-white text-black hover:bg-gray-200" : ""
                  }"
                  data-category="${chip}"
               >
                  ${chip}
               </button>
            `
              )
              .join("")}
         </div>

         <!-- Section: Mới phát hành -->
         <section>
            <h2 class="text-2xl font-bold mb-4">Mới phát hành</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               ${newReleases
                 .slice(0, 10)
                 .map((item) => renderCard(item))
                 .join("")}
            </div>
         </section>

         <!-- Section: Top Music Videos -->
         <section>
            <h2 class="text-2xl font-bold mb-4">Bảng xếp hạng Music Videos</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               ${chartVideos
                 .slice(0, 5)
                 .map((item, index) => renderCard(item, index + 1))
                 .join("")}
            </div>
         </section>

         <!-- Section: Top Artists -->
         <section>
            <h2 class="text-2xl font-bold mb-4">Nghệ sĩ hàng đầu</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               ${topArtists
                 .slice(0, 5)
                 .map((artist) => renderArtistCard(artist))
                 .join("")}
            </div>
         </section>
       </div>
     `;
     
     MainLayout(content, router);

     // Ủy quyền sự kiện cho Song Cards
     const main = document.querySelector('main');
     if (main) {
         // Click vào Song Card
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

             // Click vào Category Chip
             const chip = e.target.closest('.category-chip');
             if (chip) {
                 const category = chip.dataset.category;
                 
                 // Cập nhật trạng thái active
                 document.querySelectorAll('.category-chip').forEach(btn => {
                     btn.classList.remove('bg-white', 'text-black', 'hover:bg-gray-200');
                     btn.classList.add('bg-yt-hover', 'text-white');
                 });
                 chip.classList.remove('bg-yt-hover', 'text-white');
                 chip.classList.add('bg-white', 'text-black', 'hover:bg-gray-200');

                 // Logic lọc (Mô phỏng phía client vì hỗ trợ API hạn chế cho các chips cụ thể này)
                 const sectionTitle = document.querySelector('h2');
                 if (sectionTitle) {
                    if (category === 'Mới phát hành') {
                        sectionTitle.textContent = 'Mới phát hành';
                        // Giữ nguyên thứ tự ban đầu
                    } else {
                        sectionTitle.textContent = `${category} (Demo)`;
                    }
                 }
             }
         });
     }

  } catch (error) {
     console.error("Explore load error", error);
     MainLayout(`
       <div class="text-center py-20 text-red-500">
           <h3 class="text-xl font-bold">Lỗi tải dữ liệu</h3>
           <p>${error.message}</p>
       </div>
    `, router);
  }
};

// Card đơn giản được sử dụng lại (Nên là một component chia sẻ trong app thực tế)
const renderCard = (item) => {
    const rawTitle = item.title || item.name || 'No Title';
    const title = escapeHTML(rawTitle);

    const rawSubtitle = Array.isArray(item.artists) 
        ? item.artists.map(a => typeof a === 'string' ? a : a.name).join(', ') 
        : '';
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
         <p class="text-sm text-yt-text-secondary">Nghệ sĩ</p>
      </div>
    `;
};

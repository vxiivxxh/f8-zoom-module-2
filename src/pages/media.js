import { apiClient } from '../utils/api';
import { MainLayout } from '../layouts/MainLayout';
import { escapeHTML } from '../utils/security';

export const renderMedia = async (router, params) => {
    const id = params?.id;
    // Determine type by checking URL or just generic handling. 
    // We can guess it's a song or video. 
    // For now, let's try calling song API, if it fails, try video, or simpler reuse for both routes.
    // However, `renderMedia` is called by router. We can check current route.
    const isVideo = window.location.pathname.startsWith('/video');
    
    if (!id) {
        MainLayout('<div class="text-center text-red-500 mt-20">Media not found</div>', router);
        return;
    }

    MainLayout(`
      <div class="flex items-center justify-center h-64">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    `, router);

    try {
        let res;
        if (isVideo) {
            res = await apiClient.getVideoDetails(id);
        } else {
            res = await apiClient.getSongDetails(id);
        }
        
        const item = res.data || res;
        const title = escapeHTML(item.title || item.name || 'Unknown Title');
        const artists = Array.isArray(item.artists) ? item.artists.map(a => a.name).join(', ') : 'Unknown Artist';
        const image = (item.thumbnails && item.thumbnails[0]) || item.thumbnail || 'https://via.placeholder.com/500';

        const content = `
            <div class="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 py-10">
                <div class="w-full md:w-[400px]">
                     <div class="aspect-square rounded-lg overflow-hidden shadow-2xl mb-6 relative group">
                        <img src="${image}" alt="${title}" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer play-btn">
                             <button class="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center pl-1 hover:scale-105 transition-transform">
                                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                             </button>
                        </div>
                     </div>
                </div>
                
                <div class="flex-1">
                     <div class="uppercase text-sm font-bold text-yt-text-secondary mb-2">${isVideo ? 'Video' : 'Bài hát'}</div>
                     <h1 class="text-3xl md:text-5xl font-bold mb-4">${title}</h1>
                     <p class="text-xl text-yt-text-secondary mb-8">${artists}</p>
                     
                     <div class="mb-8">
                        <h3 class="font-bold text-lg mb-2">Lyrics / Mô tả</h3>
                        <p class="text-yt-text-secondary whitespace-pre-line">
                            ${item.lyrics || item.description || 'Chưa có lời bài hát hoặc mô tả.'}
                        </p>
                     </div>
                     
                     <!-- Recommendations could go here -->
                </div>
            </div>
        `;

        MainLayout(content, router);
        
        // Listeners
        const playBtn = document.querySelector('.play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                 import('../store/playerStore').then(({ playerStore }) => {
                     playerStore.play(item);
                 });
            });
        }

    } catch (error) {
        console.error('Media load error:', error);
        MainLayout(`
            <div class="text-center py-20 text-red-500">
                <h3 class="text-xl font-bold">Lỗi tải nội dung</h3>
                <p>${error.message}</p>
            </div>
        `, router);
    }
};

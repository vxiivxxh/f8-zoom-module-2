import { apiClient } from '../utils/api';
import { MainLayout } from '../layouts/MainLayout';
import { escapeHTML } from '../utils/security';
import { renderTrackList } from '../components/TrackList';

export const renderPlaylist = async (router, params) => {
    const slug = params?.slug;
    if (!slug) {
        MainLayout('<div class="text-center text-red-500 mt-20">Playlist not found</div>', router);
        return;
    }

    MainLayout(`
      <div class="flex items-center justify-center h-64">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    `, router);

    try {
      const res = await apiClient.getPlaylistDetails(slug);
      const playlist = res.data || res; // Handle structure variation

      const title = escapeHTML(playlist.title || playlist.name || "Playlist");
      const description = escapeHTML(
        playlist.description || playlist.sortDescription || ""
      );
      const image =
        (playlist.thumbnails && playlist.thumbnails[0]) ||
        playlist.thumbnail ||
        "https://via.placeholder.com/300";

      // Fix: API returns structure { song: { items: [...] } } or just { songs: [...] } or { items: [...] }
      let tracks = [];
      if (playlist.song && Array.isArray(playlist.song.items)) {
        tracks = playlist.song.items;
      } else if (Array.isArray(playlist.songs)) {
        tracks = playlist.songs;
      } else if (Array.isArray(playlist.items)) {
        tracks = playlist.items;
      }

      const content = `
            <div class="flex flex-col md:flex-row gap-8">
                <!-- Header / Cover -->
                <div class="flex-shrink-0 w-full md:w-80 flex flex-col items-center md:items-start text-center md:text-left">
                     <div class="w-64 h-64 md:w-full md:h-auto aspect-square rounded-lg overflow-hidden shadow-2xl mb-6">
                        <img src="${image}" alt="${title}" class="w-full h-full object-cover">
                     </div>
                     <h1 class="text-2xl md:text-3xl font-bold mb-2">${title}</h1>
                     <p class="text-yt-text-secondary mb-4 line-clamp-3">${description}</p>
                     
                     <div class="flex gap-3">
                        <button class="px-8 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors">
                            Phát tất cả
                        </button>
                        <button class="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white/10 text-white">
                           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                        </button>
                        <button class="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white/10 text-white">
                           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                        </button>
                     </div>
                </div>

                <!-- Track List -->
                <div class="flex-1">
                    ${renderTrackList(tracks)}
                </div>
            </div>
        `;

      MainLayout(content, router);

      // Add Listeners
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
            } catch (err) {}
          }
        });
      }
    } catch (error) {
        console.error('Playlist load error:', error);
        MainLayout(`
            <div class="text-center py-20 text-red-500">
                <h3 class="text-xl font-bold">Lỗi tải Playlist</h3>
                <p>${error.message}</p>
            </div>
        `, router);
    }
};

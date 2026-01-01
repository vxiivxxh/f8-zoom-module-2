import { apiClient } from '../utils/api';
import { MainLayout } from '../layouts/MainLayout';
import { escapeHTML } from '../utils/security';

export const renderSearch = async (router) => {
    // Lấy query param
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');

    if (!query) {
        MainLayout(`
            <div class="flex flex-col items-center justify-center h-full text-center">
                <h2 class="text-2xl font-bold mb-4">Tìm kiếm nội dung</h2>
                <p class="text-yt-text-secondary">Nhập tên bài hát, nghệ sĩ hoặc album để bắt đầu.</p>
            </div>
        `, router);
        return;
    }

    MainLayout(`
        <div class="flex items-center justify-center h-64">
            <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
    `, router);

    try {
        const res = await apiClient.search(query);
        const data = res.data || {};

        const songs = data.songs || [];
        const albums = data.albums || [];
        const videos = data.videos || [];
        const playlists = data.playlists || [];
        const artists = data.artists || [];

        const hasResults = songs.length > 0 || albums.length > 0 || videos.length > 0 || playlists.length > 0 || artists.length > 0;

        if (!hasResults) {
             MainLayout(`
                <div class="flex flex-col items-center justify-center h-64 text-center">
                    <h2 class="text-xl font-bold mb-2">Không tìm thấy kết quả cho "${escapeHTML(query)}"</h2>
                    <p class="text-yt-text-secondary">Vui lòng thử từ khóa khác.</p>
                </div>
            `, router);
            return;
        }

        const content = `
            <div class="space-y-10 pb-10">
                <h1 class="text-3xl font-bold">Kết quả tìm kiếm cho "${escapeHTML(query)}"</h1>

                ${/* Top Result (Songs) */
                  songs.length > 0 ? `
                    <section>
                        <h2 class="text-2xl font-bold mb-4">Bài hát</h2>
                        <div class="flex flex-col gap-2">
                            ${songs.slice(0, 5).map(song => renderSongRow(song)).join('')}
                        </div>
                    </section>
                  ` : ''
                }

                 ${/* Artists */
                  artists.length > 0 ? `
                    <section>
                        <h2 class="text-2xl font-bold mb-4">Nghệ sĩ</h2>
                        <div class="flex overflow-x-auto gap-6 pb-4 scrollbar-styled">
                            ${artists.map(artist => renderArtistCard(artist)).join('')}
                        </div>
                    </section>
                  ` : ''
                }

                ${/* Albums */
                  albums.length > 0 ? `
                    <section>
                        <h2 class="text-2xl font-bold mb-4">Album</h2>
                        <div class="flex overflow-x-auto gap-6 pb-4 scrollbar-styled">
                            ${albums.map(album => renderCard(album)).join('')}
                        </div>
                    </section>
                  ` : ''
                }

                ${/* Videos */
                  videos.length > 0 ? `
                    <section>
                        <h2 class="text-2xl font-bold mb-4">Video</h2>
                        <div class="flex overflow-x-auto gap-6 pb-4 scrollbar-styled">
                           ${videos.map(video => renderCard(video)).join('')}
                        </div>
                    </section>
                  ` : ''
                }
                 ${/* Playlists */
                  playlists.length > 0 ? `
                    <section>
                        <h2 class="text-2xl font-bold mb-4">Playlists</h2>
                         <div class="flex overflow-x-auto gap-6 pb-4 scrollbar-styled">
                           ${playlists.map(pl => renderCard(pl)).join('')}
                        </div>
                    </section>
                  ` : ''
                }
            </div>
        `;

        MainLayout(content, router);
        
        // Setup events
        setupSearchEvents();

    } catch (error) {
        console.error("Search error", error);
        MainLayout(`
            <div class="text-center py-20 text-red-500">
                <h3 class="text-xl font-bold">Lỗi tìm kiếm</h3>
                <p>${error.message}</p>
            </div>
        `, router);
    }
};

const setupSearchEvents = () => {
    const main = document.querySelector('main');
    if(!main) return;

    main.addEventListener('click', (e) => {
        const card = e.target.closest('.song-card') || e.target.closest('.song-row');
        if(card) {
             try {
                const songData = JSON.parse(card.dataset.song);
                import('../store/playerStore').then(({ playerStore }) => {
                    playerStore.play(songData);
                });
            } catch (err) {
                console.error("Failed to play song", err);
            }
        }
    });
};

const renderSongRow = (song) => {
    const title = escapeHTML(song.title || song.name);
    const artist = escapeHTML(Array.isArray(song.artists) ? song.artists.map(a => a.name).join(', ') : 'Unknown');
    const image = (song.thumbnails && song.thumbnails[0]) || song.thumbnail || 'https://via.placeholder.com/60';

    return `
        <div class="song-row flex items-center p-2 rounded hover:bg-white/10 cursor-pointer group" data-song='${JSON.stringify(song).replace(/'/g, "&#39;")}'>
            <div class="relative w-12 h-12 mr-4 flex-shrink-0">
                <img src="${image}" class="w-full h-full object-cover rounded" alt="${title}" loading="lazy">
                 <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
            </div>
            <div class="flex-1 min-w-0">
                <h4 class="text-white font-medium truncate">${title}</h4>
                <p class="text-sm text-yt-text-secondary truncate">${artist}</p>
            </div>
            <div class="text-sm text-yt-text-secondary px-4">
               ${song.duration || ''}
            </div>
        </div>
    `;
};

const renderCard = (item) => {
    const rawTitle = item.title || item.name || 'No Title';
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

const renderArtistCard = (artist) => {
  const rawName = artist.name || "Unknown Artist";
  const name = escapeHTML(rawName);
  const image =
    (artist.thumbnails && artist.thumbnails[0]) ||
    artist.thumbnail ||
    artist.image ||
    "https://via.placeholder.com/300";

  return `
      <div class="flex-shrink-0 w-40 group cursor-pointer flex flex-col items-center text-center">
         <div class="relative w-full aspect-square mb-3 rounded-full overflow-hidden bg-gray-800">
            <img src="${image}" alt="${name}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
         </div>
         <h3 class="font-medium text-white hover:underline" title="${name}">${name}</h3>
         <p class="text-sm text-yt-text-secondary">Nghệ sĩ</p>
      </div>
    `;
};

import { escapeHTML } from '../utils/security';

export const renderTrackList = (tracks) => {
    if (!tracks || tracks.length === 0) return '<div class="text-yt-text-secondary">Chưa có bài hát nào.</div>';

    return `
        <div class="space-y-1">
            ${tracks.map((track, index) => {
                 const rawTitle = track.title || track.name || 'No Title';
                 const title = escapeHTML(rawTitle);
                 
                 const rawArtists = Array.isArray(track.artists)
                    ? track.artists.map(a => typeof a === 'string' ? a : a.name).join(', ')
                    : (track.artists || '');
                 const artists = escapeHTML(rawArtists);
                 
                 const image = (track.thumbnails && track.thumbnails[0]) || track.thumbnail || 'https://via.placeholder.com/40';
                 const duration = track.duration || '--:--';

                 return `
                    <div class="group flex items-center gap-4 p-2 rounded-md hover:bg-white/10 cursor-pointer song-card" 
                         data-song='${JSON.stringify(track).replace(/'/g, "&#39;")}'>
                        <div class="w-8 text-center text-yt-text-secondary group-hover:hidden">${index + 1}</div>
                        <div class="w-8 hidden group-hover:flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                        
                        <div class="w-10 h-10 flex-shrink-0">
                            <img src="${image}" alt="${title}" class="w-full h-full object-cover rounded">
                        </div>
                        
                        <div class="flex-1 min-w-0">
                            <div class="text-white font-medium truncate">${title}</div>
                            <div class="text-yt-text-secondary text-sm truncate">${artists}</div>
                        </div>
                        
                        <div class="text-yt-text-secondary text-sm hidden sm:block">${duration}</div>
                    </div>
                 `;
            }).join('')}
        </div>
    `;
};

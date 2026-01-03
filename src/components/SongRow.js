import { Icons } from "./Icons";
import { escapeHTML } from "../utils/security";

export const SongRow = (song) => {
  const title = escapeHTML(song.title || song.name);
  const artist = escapeHTML(
    Array.isArray(song.artists)
      ? song.artists.map((a) => a.name).join(", ")
      : song.artist || "Unknown"
  );
  const image =
    (song.thumbnails && song.thumbnails[0]) ||
    song.thumbnail ||
    "https://via.placeholder.com/60";

  // Định dạng thời lượng
  const formatTime = (seconds) => {
    if (!seconds) return "";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  return `
        <div class="song-row flex items-center p-2 rounded hover:bg-white/10 cursor-pointer group border-b border-transparent hover:border-white/5" 
             data-type="song"
             data-song='${JSON.stringify(song).replace(/'/g, "&#39;")}'>
             
            <!-- Play Icon / Index -->
            <div class="w-8 text-center mr-4 text-gray-400 group-hover:text-white relative">
                 <span class="text-sm opacity-100 group-hover:opacity-0 transition-opacity">
                    <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>
                 </span>
                 <button class="song-row-play absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    ${Icons.Play}
                 </button>
            </div>

            <div class="relative w-10 h-10 mr-4 flex-shrink-0">
                <img src="${image}" class="w-full h-full object-cover rounded" alt="${title}" loading="lazy">
            </div>
            
            <div class="flex-1 min-w-0 pr-4">
                <h4 class="text-white font-medium truncate">${title}</h4>
                <p class="text-sm text-yt-text-secondary truncate">${artist}</p>
            </div>

             <div class="text-sm text-yt-text-secondary hidden md:block w-1/4 truncate pr-4">
               ${escapeHTML(song.album?.title || "")}
            </div>
            
            <div class="text-sm text-yt-text-secondary w-12 text-right">
               ${formatTime(song.duration)}
            </div>
            
            <button class="ml-4 p-2 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
            </button>
        </div>
    `;
};

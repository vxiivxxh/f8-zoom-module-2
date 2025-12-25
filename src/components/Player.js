import { playerStore } from '../store/playerStore';

export const Player = () => {
  const { currentSong, isPlaying, volume } = playerStore.state;
  
  if (!currentSong) return ''; // Or render empty state

  const title = currentSong.title || currentSong.name || 'Unknown Title';
  const artist = currentSong.artists ? currentSong.artists.map(a => a.name).join(', ') : 'Unknown Artist';
  const image = currentSong.thumbnail || currentSong.image || 'https://via.placeholder.com/60';

  return `
    <div class="fixed bottom-0 left-0 right-0 h-player bg-yt-player border-t border-gray-800 flex items-center justify-between px-4 z-player">
      
      <!-- Left: Song Info -->
      <div class="flex items-center w-1/4 min-w-[180px]">
        <img src="${image}" alt="${title}" class="w-12 h-12 rounded bg-gray-700 object-cover mr-4">
        <div class="overflow-hidden">
           <h3 class="text-white font-medium truncate text-sm">${title}</h3>
           <p class="text-yt-text-secondary truncate text-xs">${artist}</p>
        </div>
        <button class="ml-4 text-yt-text-secondary hover:text-white hidden md:block">
           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        </button>
      </div>

      <!-- Center: Controls -->
      <div class="flex flex-col items-center flex-1 max-w-2xl px-4">
         <div class="flex items-center gap-6 mb-1">
            <button id="player-prev" class="text-yt-text-secondary hover:text-white">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
            </button>
            <button id="player-play" class="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                ${isPlaying 
                   ? '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>' // Pause
                   : '<svg class="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>' // Play
                }
            </button>
            <button id="player-next" class="text-yt-text-secondary hover:text-white">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
            </button>
         </div>
         <div class="w-full flex items-center gap-3 text-xs text-yt-text-secondary font-mono">
            <span>0:00</span>
            <div class="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer relative group">
                <div class="absolute h-full bg-red-600 rounded-full group-hover:bg-red-500" style="width: 0%"></div>
            </div>
            <span>3:45</span>
         </div>
      </div>

      <!-- Right: Volume/Extra -->
      <div class="flex items-center justify-end w-1/4 min-w-[180px] gap-3">
         <button class="text-yt-text-secondary hover:text-white">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
         </button>
         <input type="range" min="0" max="100" value="${volume}" class="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white">
      </div>

    </div>
  `;
};

// Bind events
export const setupPlayerEvents = () => {
    const playBtn = document.getElementById('player-play');
    const nextBtn = document.getElementById('player-next');
    const prevBtn = document.getElementById('player-prev');

    if (playBtn) playBtn.onclick = () => playerStore.togglePlay();
    if (nextBtn) nextBtn.onclick = () => playerStore.next();
    if (prevBtn) prevBtn.onclick = () => playerStore.prev();
};

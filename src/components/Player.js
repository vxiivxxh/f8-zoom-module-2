import { playerStore } from '../store/playerStore';

export const Player = () => {
  const { currentSong, isPlaying, volume, currentTime, duration } =
    playerStore.state;

  if (!currentSong) return "";

  const title = currentSong.title || currentSong.name || "Unknown Title";
  const artist = currentSong.artists
    ? currentSong.artists.map((a) => a.name).join(", ")
    : "Unknown Artist";
  const image =
    (currentSong.thumbnails && currentSong.thumbnails[0]) ||
    currentSong.thumbnail ||
    currentSong.image ||
    "https://via.placeholder.com/60";

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

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
            <button id="player-play" class="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform relative" data-playing="${isPlaying}">
                <svg class="pause-icon w-6 h-6 absolute" fill="currentColor" viewBox="0 0 24 24" style="display: ${
                  isPlaying ? "block" : "none"
                }"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                <svg class="play-icon w-6 h-6 ml-1 absolute" fill="currentColor" viewBox="0 0 24 24" style="display: ${
                  isPlaying ? "none" : "block"
                }"><path d="M8 5v14l11-7z"/></svg>
            </button>
            <button id="player-next" class="text-yt-text-secondary hover:text-white">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
            </button>
         </div>
         <div class="w-full flex items-center gap-3 text-xs text-yt-text-secondary font-mono">
            <span class="time-current">${formatTime(currentTime)}</span>
            <div id="player-progress-bar" class="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer relative group">
                <div class="absolute h-full bg-red-600 rounded-full group-hover:bg-red-500" style="width: ${progressPercent}%"></div>
            </div>
            <span class="time-duration">${formatTime(duration)}</span>
         </div>
      </div>

      <!-- Right: Volume/Extra -->
      <div class="flex items-center justify-end w-1/4 min-w-[180px] gap-3">
         <button id="player-toggle-video" class="text-yt-text-secondary hover:text-white" title="Toggle Video">
             <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"/></svg>
         </button>
         <button id="player-mute" class="text-yt-text-secondary hover:text-white">
            ${
              playerStore.state.isMuted || playerStore.state.volume == 0
                ? '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>'
                : '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>'
            }
         </button>
         <input id="player-volume" type="range" min="0" max="100" value="${
           playerStore.state.isMuted ? 0 : volume
         }" class="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white">
      </div>

    </div>
  `;
};

// Formatting Helper
const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
};

// Bind events & Subscribe
export const setupPlayerEvents = () => {
  const playBtn = document.getElementById("player-play");
  const nextBtn = document.getElementById("player-next");
  const prevBtn = document.getElementById("player-prev");
  const videoBtn = document.getElementById("player-toggle-video");
  const volumeSlider = document.getElementById("player-volume");
  const progressBar = document.getElementById("player-progress-bar");
  const muteBtn = document.getElementById("player-mute");

  // Use event delegation on the player wrapper for more reliable event handling
  // This prevents handlers from being lost when button innerHTML is replaced
  const playerWrapper = document.querySelector(".fixed.bottom-0");

  if (playerWrapper) {
    playerWrapper.addEventListener("click", (e) => {
      // Play/Pause button
      const playBtn = e.target.closest("#player-play");
      if (playBtn) {
        e.preventDefault();
        e.stopPropagation();
        playerStore.togglePlay();
        return;
      }

      // Next button
      const nextBtn = e.target.closest("#player-next");
      if (nextBtn) {
        e.preventDefault();
        e.stopPropagation();
        playerStore.next();
        return;
      }

      // Previous button
      const prevBtn = e.target.closest("#player-prev");
      if (prevBtn) {
        e.preventDefault();
        e.stopPropagation();
        playerStore.prev();
        return;
      }

      // Mute button
      const muteButton = e.target.closest("#player-mute");
      if (muteButton) {
        e.preventDefault();
        e.stopPropagation();
        playerStore.toggleMute();
        return;
      }

      // Video toggle button
      const videoBtn = e.target.closest("#player-toggle-video");
      if (videoBtn) {
        e.preventDefault();
        e.stopPropagation();
        const container = document.getElementById("yt-player-container");
        if (container) {
          container.classList.toggle("hidden-video");
          videoBtn.classList.toggle("text-white");
          videoBtn.classList.toggle("text-yt-text-secondary");
        }
        return;
      }

      // Progress bar
      const progressClick = e.target.closest("#player-progress-bar");
      if (progressClick && !e.target.closest("input")) {
        const rect = progressClick.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percent = clickX / width;
        const targetTime = playerStore.state.duration * percent;
        playerStore.seek(targetTime);
        return;
      }
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener("input", (e) => {
      playerStore.setVolume(e.target.value);
    });
  }
};

// Internal update function called by listener
export const updatePlayerUI = (state) => {
  // 1. Update Progress & Time
  const currentEl = document.querySelector(".time-current");
  const durationEl = document.querySelector(".time-duration");
  const progressFill = document.querySelector("#player-progress-bar > div");

  if (currentEl) currentEl.textContent = formatTime(state.currentTime);
  if (durationEl) durationEl.textContent = formatTime(state.duration);

  if (progressFill) {
    const percent =
      state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;
    progressFill.style.width = `${percent}%`;
  }

  // 2. Play/Pause Icon - Toggle visibility without innerHTML
  const playBtn = document.getElementById("player-play");
  if (playBtn) {
    const pauseIcon = playBtn.querySelector(".pause-icon");
    const playIcon = playBtn.querySelector(".play-icon");

    if (pauseIcon && playIcon) {
      if (state.isPlaying) {
        pauseIcon.style.display = "block";
        playIcon.style.display = "none";
      } else {
        pauseIcon.style.display = "none";
        playIcon.style.display = "block";
      }
    }

    // Update data attribute for state tracking
    playBtn.setAttribute("data-playing", state.isPlaying);
  }

  // 3. Volume / Mute
  const muteBtn = document.getElementById("player-mute");
  if (muteBtn) {
    const icon =
      state.isMuted || state.volume == 0
        ? '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>'
        : '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
    if (muteBtn.innerHTML.trim() !== icon) muteBtn.innerHTML = icon;
  }

  const volInput = document.getElementById("player-volume");
  if (volInput) {
    // Only update if not being dragged? Hard to detect.
    // For now update to sync if mute toggled elsewhere
    const targetVal = state.isMuted ? 0 : state.volume;
    if (volInput.value != targetVal) volInput.value = targetVal;
  }
};

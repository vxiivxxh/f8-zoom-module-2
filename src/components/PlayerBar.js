// Component PlayerBar: Thanh điều khiển nhạc cố định dưới màn hình
export default function PlayerBar() {
  return `
    <div id="player-bar" class="h-20 bg-[#212121] border-t border-white/5 flex items-center px-4 justify-between fixed bottom-0 left-0 right-0 z-50">
       <!-- Thông tin bài hát (Trái) -->
       <div class="flex items-center gap-4 w-1/3">
          <div class="w-10 h-10 bg-zinc-700 rounded-sm"></div> <!-- Ảnh bìa giữ chỗ -->
          <div class="flex flex-col">
             <span class="text-sm font-medium text-white">Chưa phát bài nào</span>
             <span class="text-xs text-zinc-400"></span>
          </div>
       </div>

       <!-- Điều khiển Play/Pause/Tiến lực (Giữa) -->
       <div class="flex flex-col items-center gap-1 flex-1 max-w-2xl">
          <div class="flex items-center gap-6 text-zinc-100">
             <button class="hover:text-zinc-400"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M14.5 12L6 6v12l8.5-6.5z"/></svg></button> <!-- Fake Play Icons -->
             <button class="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
             </button>
             <button class="hover:text-zinc-400"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6l-8.5 6z"/></svg></button>
          </div>
          <div class="w-full flex items-center gap-2 group">
             <span class="text-xs text-zinc-400">0:00</span>
             <div class="flex-1 h-1 bg-zinc-600 rounded-full relative">
                <div class="h-full bg-white w-0 rounded-full group-hover:bg-red-500"></div>
             </div>
             <span class="text-xs text-zinc-400">0:00</span>
          </div>
       </div>

       <!-- Volume & Options (Phải) -->
       <div class="w-1/3 flex justify-end gap-3 text-zinc-400">
           <!-- Volume/Option Icons -->
           <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
       </div>
    </div>
  `;
}

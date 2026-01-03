
import { apiClient } from '../utils/api';
import { MainLayout } from '../layouts/MainLayout';
import { escapeHTML } from '../utils/security';
import { Icons } from '../components/Icons';

/**
 * Shared Detail Page Renderer
 * @param {Object} router - Instance router Navigo
 * @param {string} type - 'album' | 'playlist'
 * @param {string} id - ID mục hoặc Slug
 */
const renderDetail = async (router, type, id) => {
    // 1. Trạng thái Đang tải với padding tùy chỉnh
    MainLayout(`
        <div class="flex items-center justify-center h-full">
            <div class="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
    `, router, { padding: 'px-8 py-8' });

    try {
      let res;
      if (type === "album") {
        res = await apiClient.getAlbumDetail(id);
      } else {
        res = await apiClient.getPlaylistDetail(id);
      }

      console.log(`[Detail Page] Raw response for ${type} ${id}:`, res);

      const data = res.data || res; // Dự phòng nếu dữ liệu ở root
      // Kiểm tra data.id đảm bảo chúng ta thực sự có một mục, không chỉ là một object trạng thái
      if (!data || (!data.id && !data.title)) {
        console.error("Invalid data received:", data);
        throw new Error("Not found or invalid data");
      }

      // Log gỡ lỗi
      console.log(`[Detail Page] Extracted data:`, data);

      // 3. Trích xuất dữ liệu cho UI
      const isAlbum = type === "album";
      const title = escapeHTML(data.title || data.name || "Untitled");
      const description = escapeHTML(
        data.description || data.sortDescription || ""
      );
      const image =
        (data.thumbnails && data.thumbnails[0]) ||
        data.thumbnail ||
        data.image ||
        "https://via.placeholder.com/300";

      // Xây dựng Metadata
      let artistNames = "Unknown Artist";
      if (Array.isArray(data.artists) && data.artists.length > 0) {
        artistNames = data.artists.map((a) => a.name).join(", ");
      } else if (data.artistsNames) {
        artistNames = data.artistsNames;
      } else if (
        data.tracks &&
        data.tracks.length > 0 &&
        data.tracks[0].artists &&
        data.tracks[0].artists.length > 0
      ) {
        // Suy ra từ bài hát đầu tiên nếu nghệ sĩ album bị thiếu
        artistNames = data.tracks[0].artists.map((a) => a.name).join(", ");
      }

      // Trích xuất năm từ releaseDate (xử lý định dạng ISO, dấu gạch chéo hoặc chỉ năm)
      let year = "2024"; // Dự phòng mặc định
      if (data.releaseDate) {
        // Nếu là ngày ISO (2020-11-23T17:00:00.000Z) hoặc YYYY-MM-DD, lấy 4 ký tự đầu tiên
        if (data.releaseDate.includes("-") || data.releaseDate.includes("T")) {
          year = data.releaseDate.substring(0, 4);
        } else if (data.releaseDate.includes("/")) {
          // Nếu là định dạng DD/MM/YYYY hoặc MM/DD/YYYY
          year = data.releaseDate.split("/").pop();
        } else {
          // Nếu đã chỉ là một năm
          year = data.releaseDate;
        }
      }

      // Danh sách bài hát
      const songs = data.tracks || data.songs || data.song?.items || [];

      const songCount =
        data.songCount || (data.song ? data.song.total : songs.length);

      // Định dạng thời lượng (giây -> dễ đọc)
      const totalDuration =
        data.duration || (data.song ? data.song.totalDuration : 0);
      const hours = Math.floor(totalDuration / 3600);
      const minutes = Math.floor((totalDuration % 3600) / 60);
      const durationStr =
        hours > 0 ? `${hours} giờ ${minutes} phút` : `${minutes} phút`;

      const metadata = [
        "YouTube Music",
        year,
        `${songCount} bài hát`,
        durationStr,
      ]
        .filter(Boolean)
        .join(" • ");

      // 4. Render Nội dung
      const content = `
            <div class="flex flex-col lg:flex-row gap-8 relative items-start">
                
                <!-- Cột trái: Thông tin dính (Sticky) -->
                <div class="w-full lg:w-[360px] flex-shrink-0 lg:sticky lg:top-0 flex flex-col items-center lg:items-center text-center">
                    
                    <!-- Ảnh bìa -->
                    <div class="w-[260px] lg:w-[320px] aspect-square rounded shadow-2xl overflow-hidden mb-6 mx-auto">
                        <img src="${image}" alt="${title}" class="w-full h-full object-cover left-column-cover-img">
                    </div>

                    <!-- Thông tin -->
                    <div class="space-y-4 max-w-full">
                        <h1 class="text-3xl lg:text-4xl font-black text-white leading-tight">${title}</h1>
                        
                        <div class="text-yt-text-secondary text-sm font-medium">
                            <h2 class="text-white text-lg font-bold mb-1">${escapeHTML(
                              artistNames
                            )}</h2>
                            <p>${metadata}</p>
                        </div>

                        ${
                          description
                            ? `<p class="text-xs text-yt-text-secondary line-clamp-3" title="${description}">${description}</p>`
                            : ""
                        }

                        <!-- Thanh hành động -->
                        <div class="flex items-center justify-center gap-4 mt-6">
                             <!-- Nút Tải xuống -->
                             <button class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" title="Tải xuống">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
                             </button>

                             <!-- Nút Phát -->
                             <button class="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-lg play-all-btn">
                                ${Icons.Play}
                             </button>

                             <!-- Nút Menu -->
                             <button class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" title="Thêm">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                             </button>
                        </div>
                    </div>
                </div>

                <!-- Cột phải: Danh sách bài hát -->
                <div class="flex-1 min-w-0 w-full">
                    <div class="flex flex-col">
                        ${songs
                          .map((song, index) => renderSongRow(song, index))
                          .join("")}
                    </div>
                </div>

            </div>
        `;

      MainLayout(content, router, { padding: "px-8 py-8" });

      // 5. Thiết lập Sự kiện
      setupDetailEvents({ songs, context: data });
    } catch (error) {
        console.error("Detail load error", error);
        MainLayout(`
            <div class="text-center py-20 text-red-500">
                <h3 class="text-xl font-bold">Không thể tải dữ liệu</h3>
                <p>${error.message}</p>
                 <button onclick="window.history.back()" class="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200">Quay lại</button>
            </div>
        `, router, { padding: 'px-8 py-8' });
    }
};

const renderSongRow = (song, index) => {
    const title = escapeHTML(song.title || song.name);
    const artist = escapeHTML(Array.isArray(song.artists) ? song.artists.map(a => a.name).join(', ') : (song.artistsNames || 'Unknown'));
    const image = (song.thumbnails && song.thumbnails[0]) || song.thumbnail;
    const duration = formatDuration(song.duration);

    return `
        <div class="group flex items-center gap-4 p-2 rounded-md hover:bg-white/10 cursor-pointer transition-colors border-b border-transparent hover:border-white/5 song-row" 
             data-index="${index}">
             
            <!-- Chỉ mục / Biểu tượng Phát -->
            <div class="w-8 text-center text-sm text-yt-text-secondary group-hover:hidden font-medium">
                ${index + 1}
            </div>
             <div class="w-8 text-center text-white hidden group-hover:flex items-center justify-center">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>

            <!-- Hình ảnh -->
            <div class="w-12 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-800">
                <img src="${
                  image || "https://via.placeholder.com/48"
                }" alt="${title}" class="w-full h-full object-cover">
            </div>

            <!-- Thông tin -->
            <div class="flex-1 min-w-0 flex flex-col justify-center">
                <h4 class="text-white font-medium truncate text-[15px]">${title}</h4>
                <p class="text-yt-text-secondary text-sm truncate hover:underline hover:text-white cursor-pointer">${artist}</p>
            </div>

            <!-- Tên Album (Ẩn trên màn hình nhỏ) -->
             <div class="hidden md:block w-1/4 px-2 text-sm text-yt-text-secondary truncate">
                ${escapeHTML(song.album?.title || "")}
            </div>

            <!-- Thời lượng -->
            <div class="text-sm text-yt-text-secondary w-12 text-right font-variant-numeric">
                ${duration}
            </div>
        </div>
    `;
};

const setupDetailEvents = ({ songs, context }) => {
    const main = document.querySelector('main');
    if (!main) return;

    main.addEventListener("click", (e) => {
      // Phát Hàng
      const row = e.target.closest(".song-row");
      if (row) {
        const index = parseInt(row.dataset.index, 10);
        import("../store/playerStore").then(({ playerStore }) => {
          playerStore.setQueue(songs, index);
        });
        return;
      }

      // Nút Phát tất cả
      const playAllBtn = e.target.closest(".play-all-btn");
      if (playAllBtn && songs.length > 0) {
        import("../store/playerStore").then(({ playerStore }) => {
          playerStore.setQueue(songs, 0);
        });
      }
    });

    // Đăng ký cập nhật Player để đồng bộ bìa
    import("../store/playerStore").then(({ playerStore }) => {
      const coverImg = document.querySelector(".left-column-cover-img");

      playerStore.subscribe((state) => {
        // Kiểm tra xem chúng ta có còn ở trang chi tiết không (phần tử tồn tại)
        if (!document.body.contains(coverImg)) return;

        const currentSong = state.currentSong;
        if (currentSong && coverImg) {
          // Xác định hình ảnh để hiển thị
          const newImage =
            (currentSong.thumbnails && currentSong.thumbnails[0]) ||
            currentSong.thumbnail ||
            currentSong.image ||
            currentSong.thumb;

          if (newImage && coverImg.src !== newImage) {
            coverImg.src = newImage;
          }
        }
      });
    });
};

const formatDuration = (seconds) => {
    if(!seconds) return '0:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
};

export const renderAlbumDetail = (router, params) => {
    const id = params?.id;
    if(id) renderDetail(router, 'album', id);
};

export const renderPlaylistDetail = (router, params) => {
    const id = params?.id;
    if(id) renderDetail(router, 'playlist', id);
};

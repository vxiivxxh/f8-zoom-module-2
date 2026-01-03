import { escapeHTML } from '../utils/security';
import { Icons } from './Icons';

/**
 * Factory Card được chia sẻ
 * @param {Object} item - Mục dữ liệu (bài hát, album, danh sách phát, video, nghệ sĩ)
 * @param {Object} options - Ghi đè thuộc tính { type, showType }
 * @returns {string} Chuỗi HTML
 */
export const Card = (item, options = {}) => {
  // 1. Xác định loại
  const type = item.type || options.type || "song";

  // 2. Xác định ID và Slug
  const id = item.encodeId || item.id || item._id;
  const slug = item.slug || "";

  // 3. Tiêu đề & Phụ đề
  const rawTitle = item.title || item.name || "Không có tiêu đề";
  const title = escapeHTML(rawTitle);

  let rawSubtitle = "";
  if (type === "artist") {
    rawSubtitle = "Nghệ sĩ";
  } else if (Array.isArray(item.artists)) {
    rawSubtitle = item.artists
      .map((a) => (typeof a === "string" ? a : a.name))
      .join(", ");
  } else if (item.artists && typeof item.artists === "string") {
    rawSubtitle = item.artist;
  } else if (item.description) {
    rawSubtitle = item.description;
  }
  const subtitle = escapeHTML(rawSubtitle);

  // 4. Hình ảnh
  const image =
    (item.thumbnails && item.thumbnails[0]) ||
    item.thumbnail ||
    item.thumb ||
    item.image ||
    "https://via.placeholder.com/300?text=No+Image";

  // 5. Các lớp dựa trên loại
  const isArtist = type === "artist";
  const isVideo = type === "video";

  // Chiều rộng container
  const widthClass = isVideo ? "w-80" : "w-48";

  // Tỷ lệ khung hình ảnh
  const aspectClass = isVideo
    ? "aspect-video rounded-lg"
    : isArtist
    ? "aspect-square rounded-full"
    : "aspect-square rounded-md";

  // Xếp hạng (cho Bảng xếp hạng)
  const rank = item.rank || options.rank;

  // Thời lượng (cho Video)
  const formatDuration = (seconds) => {
    if (!seconds) return "";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0)
      return `${h}:${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };
  const duration = isVideo ? formatDuration(item.duration) : "";

  // Lượt xem (cho Video)
  const formatViews = (num) => {
    if (!num) return "";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  // serialize cho thuộc tính dữ liệu
  const jsonItem = JSON.stringify(item).replace(/'/g, "&#39;");

  return `
      <div class="group cursor-pointer flex-shrink-0 ${widthClass} snap-start card-item"
           data-type="${type}"
           data-id="${id}"
           data-slug="${slug}"
           data-item='${jsonItem}'>
         
         <div class="relative ${aspectClass} mb-3 overflow-hidden bg-gray-800 shadow-lg group-hover:shadow-xl transition-shadow">
            <img src="${image}" alt="${title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
            
            <!-- Rank Badge -->
            ${
              rank
                ? `
            <div class="absolute top-2 left-2 z-10 w-8 h-8 rounded bg-black/60 backdrop-blur-sm flex items-center justify-center font-bold text-white border border-white/10">
                ${rank}
            </div>
            `
                : ""
            }

            <!-- Overlay Play Button -->
            ${
              !isArtist
                ? `
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button class="play-btn w-12 h-12 bg-white text-black rounded-full flex items-center justify-center pl-1 hover:scale-110 transition-transform shadow-lg" title="Play">
                  ${Icons.Play}
               </button>
            </div>
            `
                : ""
            }

            <!-- Duration Badge -->
            ${
              duration
                ? `
            <div class="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-xs font-medium rounded">
                ${duration}
            </div>
            `
                : ""
            }
         </div>

         <div class="${isArtist ? "text-center" : ""}">
            <h3 class="font-bold text-white truncate hover:underline text-[15px]" title="${title}">${title}</h3>
            ${
              subtitle
                ? `<p class="text-sm text-yt-text-secondary truncate mt-1" title="${subtitle}">${subtitle}</p>`
                : ""
            }
            ${
              isVideo
                ? `
            <div class="text-xs text-yt-text-secondary mt-0.5 flex items-center gap-1">
                 <span>Video</span>
                 ${
                   item.views
                     ? `<span>• ${formatViews(item.views)} views</span>`
                     : ""
                 }
            </div>
            `
                : ""
            }
         </div>
      </div>
    `;
};

import { Icons } from "./Icons";
import { escapeHTML } from "../utils/security";

// Generate a random-ish dark color based on string
const getGradientColor = (str) => {
  const colors = [
    "#532638",
    "#1e3264",
    "#1e5a5a",
    "#64321e",
    "#5a1e32",
    "#3e2848",
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export const TopResultCard = (item) => {
  const startColor = getGradientColor(item.title);
  const thumbnail =
    (item.thumbnails && item.thumbnails[0]) ||
    item.thumbnail ||
    "https://via.placeholder.com/300";
  const typeLabel =
    item.type === "album"
      ? "Album"
      : item.type === "video"
      ? "Video"
      : item.type === "song"
      ? "Bài hát"
      : item.type === "artist"
      ? "Nghệ sĩ"
      : "Kết quả";
  const subtitle = Array.isArray(item.artists)
    ? item.artists.map((a) => a.name).join(", ")
    : item.subtitle || item.artist || "";

  // Serialize data for click handler
  const jsonItem = JSON.stringify(item).replace(/'/g, "&#39;");

  return `
        <div class="card-item group relative p-6 rounded-xl overflow-hidden cursor-pointer h-full min-h-[250px] flex flex-col justify-center gap-4 transition-transform hover:scale-[1.01]"
             style="background: linear-gradient(135deg, ${startColor} 0%, #121212 100%);"
             data-type="${item.type}"
             data-id="${item.id}"
             data-item='${jsonItem}'>
            
             <div class="relative w-24 h-24 rounded-full shadow-lg overflow-hidden">
                <img src="${thumbnail}" class="w-full h-full object-cover">
             </div>

             <div class="z-10">
                <h3 class="text-3xl font-bold text-white mb-1 line-clamp-2">${escapeHTML(
                  item.title
                )}</h3>
                <div class="text-white/80 text-sm flex items-center gap-2">
                    <span class="capitalize">${typeLabel}</span>
                    ${
                      subtitle
                        ? `<span>•</span><span>${escapeHTML(subtitle)}</span>`
                        : ""
                    }
                </div>
             </div>

             <!-- Play Button (Only for audio types) -->
             ${
               item.type === "song" ||
               item.type === "video" ||
               item.type === "album"
                 ? `
                 <div class="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    <button class="play-btn w-12 h-12 bg-white text-black rounded-full flex items-center justify-center pl-1 hover:scale-110 transition-transform shadow-xl">
                        ${Icons.Play}
                    </button>
                 </div>
             `
                 : ""
             }
        </div>
    `;
};

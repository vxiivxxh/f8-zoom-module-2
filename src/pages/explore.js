import { apiClient } from '../utils/api';
import { escapeHTML } from '../utils/security';
import { MainLayout } from '../layouts/MainLayout';
import { Icons } from "../components/Icons";
import { MoodGrid } from "../components/Moods";

export const renderExplore = async (router) => {
  MainLayout(
    `
      <div class="flex items-center justify-center h-64">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
  `,
    router
  );

  try {
    const results = await Promise.all([
      apiClient.getExploreAlbums(),
      apiClient.getExploreMeta(),
      apiClient.getExploreVideos(),
    ]);

    const albumsRes = results[0];
    const metaRes = results[1];
    const videosRes = results[2];

    const albums = albumsRes?.items || albumsRes?.data || [];
    const moods = metaRes?.categories || metaRes?.data || [];
    const videos = videosRes?.items || videosRes?.data || [];

    const content = `
       <div class="space-y-12">
         ${renderTopNavigation()}
         
         ${renderCarouselSection({
           title: "Khám phá Albums mới",
           id: "explore-albums-carousel",
           items: albums.slice(0, 10),
           type: "album",
           hasMore: true,
         })}

         ${renderGridSection({
           title: "Tâm trạng và thể loại",
           items: moods.slice(0, 12),
         })}

         ${renderCarouselSection({
           title: "Video âm nhạc mới",
           id: "explore-videos-carousel",
           items: videos.slice(0, 10),
           type: "video",
         })}
       </div>
    `;

    MainLayout(content, router);

    // 1. Event Delegation for Song Cards
    const main = document.querySelector("main");
    if (main) {
      main.addEventListener("click", (e) => {
        // Toggle Play
        const card = e.target.closest(".song-card");
        if (card) {
          try {
            const songData = JSON.parse(card.dataset.song);
            import("../store/playerStore").then(({ playerStore }) => {
              playerStore.play(songData);
            });
          } catch (err) {
            console.error("Failed to play song", err);
          }
        }

        // Handle Scroll Buttons
        const scrollBtn = e.target.closest("[data-scroll]");
        if (scrollBtn) {
          const direction = scrollBtn.dataset.scroll;
          const targetId = scrollBtn.dataset.target;
          const container = document.getElementById(targetId);
          if (container) {
            const scrollAmount = container.clientWidth * 0.75;
            if (direction === "left") {
              container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            } else {
              container.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
          }
        }
      });
    }
  } catch (error) {
    console.error("Explore load error", error);
    MainLayout(
      `
       <div class="text-center py-20 text-red-500">
           <h3 class="text-xl font-bold">Lỗi tải dữ liệu</h3>
           <p>${error.message}</p>
       </div>
    `,
      router
    );
  }
};

// Updated renderCard to support 'album' vs 'video' variants
const renderCard = (item, type = "album") => {
  const rawTitle = item.title || item.name || "No Title";
  const title = escapeHTML(rawTitle);

  const rawSubtitle = Array.isArray(item.artists)
    ? item.artists.map((a) => (typeof a === "string" ? a : a.name)).join(", ")
    : "";
  const subtitle = escapeHTML(rawSubtitle);

  const image =
    (item.thumbnails && item.thumbnails[0]) ||
    item.thumbnail ||
    item.thumb ||
    item.image ||
    "https://via.placeholder.com/300";

  // Layout specifics based on type
  const isVideo = type === "video";
  const widthClass = isVideo ? "w-80" : "w-48";
  const aspectClass = isVideo ? "aspect-video" : "aspect-square";

  return `
      <div class="group cursor-pointer song-card snap-start flex-shrink-0 ${widthClass}" data-song='${JSON.stringify(
    item
  ).replace(/'/g, "&#39;")}'>
         <div class="relative ${aspectClass} mb-3 rounded overflow-hidden bg-gray-800">
            <img src="${image}" alt="${title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center pl-1 hover:scale-110 transition-transform">
                   ${Icons.Play}
               </button>
            </div>
         </div>
         <h3 class="font-medium text-white truncate hover:underline" title="${title}">${title}</h3>
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
      <div class="group cursor-pointer flex flex-col items-center text-center">
         <div class="relative w-full aspect-square mb-3 rounded-full overflow-hidden bg-gray-800">
            <img src="${image}" alt="${name}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
         </div>
         <h3 class="font-medium text-white hover:underline" title="${name}">${name}</h3>
         <p class="text-sm text-yt-text-secondary">Nghệ sĩ</p>
      </div>
    `;
};

// --- Helper Functions ---

const renderTopNavigation = () => {
  return `
         <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="/new_releases" class="flex items-center p-4 bg-yt-hover rounded-lg hover:bg-gray-700 transition-colors group" data-navigo>
                <div class="mr-4 text-gray-400 group-hover:text-white transition-colors">
                    ${Icons.NewReleases}
                </div>
                <span class="text-lg font-bold">Bản phát hành mới</span>
            </a>
            <a href="/charts" class="flex items-center p-4 bg-yt-hover rounded-lg hover:bg-gray-700 transition-colors group" data-navigo>
                <div class="mr-4 text-gray-400 group-hover:text-white transition-colors">
                    ${Icons.Charts}
                </div>
                <span class="text-lg font-bold">Bảng xếp hạng</span>
            </a>
            <a href="/moods_and_genres" class="flex items-center p-4 bg-yt-hover rounded-lg hover:bg-gray-700 transition-colors group" data-navigo>
                <div class="mr-4 text-gray-400 group-hover:text-white transition-colors">
                    ${Icons.Moods}
                </div>
                <span class="text-lg font-bold">Tâm trạng và thể loại</span>
            </a>
         </div>
    `;
};

const renderCarouselSection = ({
  title,
  id,
  items,
  type = "album",
  hasMore = false,
}) => {
  if (!items || items.length === 0) return "";

  return `
         <section class="relative group/section">
            <div class="flex items-end justify-between mb-4">
               <div class="flex items-center gap-4">
                   <h2 class="text-2xl font-bold">${title}</h2>
               </div>
               <div class="flex items-center gap-2">
                   ${
                     hasMore
                       ? `<button class="text-xs font-bold uppercase tracking-wider border border-gray-700 hover:border-white px-3 py-1 rounded-full transition-colors mr-2">More</button>`
                       : ""
                   }
                   <button class="w-8 h-8 rounded-full border border-gray-700 hover:border-white flex items-center justify-center transition-colors hover:bg-white/10" data-scroll="left" data-target="${id}">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                   </button>
                   <button class="w-8 h-8 rounded-full border border-gray-700 hover:border-white flex items-center justify-center transition-colors hover:bg-white/10" data-scroll="right" data-target="${id}">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                   </button>
               </div>
            </div>
            
            <div id="${id}" class="flex overflow-x-auto scroll-smooth gap-6 pb-4 snap-x scrollbar-styled">
               ${items.map((item) => renderCard(item, type)).join("")}
            </div>
         </section>
    `;
};

const renderGridSection = ({ title, items }) => {
  if (!items || items.length === 0) return "";

  return `
         <section>
             <h2 class="text-2xl font-bold mb-4">${title}</h2>
             ${MoodGrid(items)}
         </section>
    `;
};

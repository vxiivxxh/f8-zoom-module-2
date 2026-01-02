import { apiClient } from "../utils/api";
import { MainLayout } from "../layouts/MainLayout";
import { Card } from "../components/Card";
import { Icons } from "../components/Icons";

export const renderNewReleases = async (router) => {
  MainLayout(
    `
      <div class="flex items-center justify-center h-64">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
  `,
    router
  );

  try {
    // Fetch data for both sections
    const results = await Promise.all([
      apiClient.getExploreAlbums(), // Reusing explore albums for "New Releases"
      apiClient.getExploreVideos(),
    ]);

    const albumsRes = results[0];
    const videosRes = results[1];

    const albums = albumsRes?.items || albumsRes?.data || [];
    const videos = videosRes?.items || videosRes?.data || [];

    const content = `
       <div class="space-y-12">
         <div class="mb-4">
            <h1 class="text-3xl font-bold">Bản phát hành mới</h1>
         </div>

         ${renderCarouselSection({
           title: "Bản phát hành mới",
           id: "new-releases-albums-carousel",
           items: albums,
           type: "album",
           hasMore: false,
         })}

         ${renderCarouselSection({
           title: "Video âm nhạc mới",
           id: "new-releases-videos-carousel",
           items: videos,
           type: "video",
         })}
       </div>
     `;

    MainLayout(content, router);

    // Event Delegation
    const main = document.querySelector("main");
    if (main) {
      main.addEventListener("click", (e) => {
        // Priority: Play Button -> Play Song
        const playBtn = e.target.closest(".play-btn");
        const card = e.target.closest(".card-item");

        if (card) {
          const type = card.dataset.type;
          const id = card.dataset.id;
          const itemData = JSON.parse(card.dataset.item || "{}");

          if (type === "song") {
            // Play action
            import("../store/playerStore").then(({ playerStore }) => {
              playerStore.play(itemData);
            });
          } else if (type === "video") {
            router.navigate(`video/${id}`);
          } else {
            // Navigate action for Containers (Album, Playlist, Artist)
            if (type === "album") router.navigate(`album/${id}`);
            else if (type === "playlist") router.navigate(`playlist/${id}`);
            else if (type === "artist") router.navigate(`artist/${id}`);
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
    console.error("New Releases load error", error);
    MainLayout(
      `
       <div class="text-center py-20 text-red-500">
           <h3 class="text-xl font-bold">Lỗi tải dữ liệu</h3>
           <p>${error.message}</p>
           <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200">Thử lại</button>
       </div>
    `,
      router
    );
  }
};

// --- Helper Functions (Duplicated from explore.js for now) ---

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
               ${items.map((item) => Card(item, { type })).join("")}
            </div>
         </section>
    `;
};

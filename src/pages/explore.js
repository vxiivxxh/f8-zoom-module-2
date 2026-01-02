import { apiClient } from '../utils/api';
import { escapeHTML } from '../utils/security';
import { MainLayout } from '../layouts/MainLayout';
import { Icons } from "../components/Icons";
import { MoodGrid } from "../components/Moods";
import { Card } from "../components/Card";

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

    // 1. Event Delegation for Cards
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

          // Only Play if explicitly a Song or Video (with play button)
          if (type === "song") {
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
            else if (type === "mood") router.navigate(`mood/${slug}`);
            else if (type === "category") router.navigate(`category/${slug}`);
            else if (type === "line") router.navigate(`line/${slug}`);
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

        // Handle Mood Card Clicks (from MoodGrid)
        const moodCard = e.target.closest(".mood-card");
        if (moodCard) {
          e.preventDefault();
          const type = moodCard.dataset.type; // 'category' or 'line' usually
          const slug = moodCard.dataset.slug;

          if (type === "category") {
            router.navigate(`category/${slug}`);
          } else if (type === "line") {
            router.navigate(`line/${slug}`);
          } else if (type === "mood") {
            // Fallback if type is mood (e.g. from homepage if it used this component, but it doesn't anymore)
            router.navigate(`mood/${slug}`);
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

// --- Helper Functions ---

// Render sections that appear at the top of the page
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
               ${items.map((item) => Card(item, { type })).join("")}
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

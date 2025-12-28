import { apiClient } from '../utils/api';
import { escapeHTML } from '../utils/security';
import { MainLayout } from '../layouts/MainLayout';

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
    const [newReleasesRes, albumsRes, videosRes, metaRes] = await Promise.all([
      apiClient.get("/explore/new-releases"),
      apiClient.getExploreAlbums(),
      apiClient.getExploreVideos(),
      apiClient.getExploreMeta(),
    ]);

    const newReleases = newReleasesRes.items || newReleasesRes.data || [];
    const albums = albumsRes.items || albumsRes.data || [];
    const videos = videosRes.items || videosRes.data || [];
    const meta = metaRes.items || metaRes.data || [];

    // Map moods to chip structure, ensure we have a label
    // Map meta to chip structure
    const moodChips = meta.map((m) => ({
      label: m.title || m.name || "Unknown",
      slug: m.slug || "",
    }));

    // Fallback if no meta
    if (moodChips.length === 0) {
      ["Tâm trạng", "Thể loại", "Buồn", "Vui", "Sôi động", "Thư giãn"].forEach(
        (c) => moodChips.push({ label: c, slug: "" })
      );
    } else {
      // Prepend specific views
      moodChips.unshift({ label: "Mới phát hành", slug: "new-releases" });
    }

    const content = `
       <div class="space-y-8">
         <!-- Chips Navigation -->
         <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            ${moodChips
              .map(
                (chip, idx) => `
               <button 
                  class="category-chip px-4 py-2 bg-yt-hover rounded-lg text-sm font-medium whitespace-nowrap hover:bg-white/20 transition-colors ${
                    idx === 0 ? "bg-white text-black hover:bg-gray-200" : ""
                  }"
                  data-category="${chip.label}"
                  data-slug="${chip.slug}"
               >
                  ${chip.label}
               </button>
            `
              )
              .join("")}
         </div>

         <!-- Section: Mới phát hành -->
         <section>
            <h2 class="text-2xl font-bold mb-4">Mới phát hành</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               ${newReleases
                 .slice(0, 10)
                 .map((item) => renderCard(item))
                 .join("")}
            </div>
         </section>

         <!-- Section: Album mới nhất -->
         <section>
            <h2 class="text-2xl font-bold mb-4">Album mới nhất</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               ${albums
                 .slice(0, 10)
                 .map((item) => renderCard(item))
                 .join("")}
            </div>
         </section>

         <!-- Section: Video mới nhất -->
         <section>
            <h2 class="text-2xl font-bold mb-4">Video mới nhất</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               ${videos
                 .slice(0, 5) // Videos might take more space or play inline, keep limit 5
                 .map((item) => renderCard(item)) // Videos use same card for now
                 .join("")}
            </div>
         </section>
       </div>
     `;

    MainLayout(content, router);

    // Ủy quyền sự kiện cho Song Cards
    const main = document.querySelector("main");
    if (main) {
      // Click vào Song Card
      main.addEventListener("click", (e) => {
        const card = e.target.closest(".song-card");
        if (card) {
          const isPlayBtn = e.target.closest(".play-button");
          if (isPlayBtn) {
            try {
              const songData = JSON.parse(card.dataset.song);
              import("../store/playerStore").then(({ playerStore }) => {
                playerStore.play(songData);
              });
            } catch (err) {
              console.error("Failed to play song", err);
            }
          } else {
            // Navigate
            const type = card.dataset.type;
            const slug = card.dataset.slug;
            const id = card.dataset.id;

            if (type === "playlist") {
              router.navigate(`/playlist/${slug || id}`);
            } else if (type === "album") {
              router.navigate(`/album/${slug || id}`);
            } else if (type === "song") {
              router.navigate(`/song/${id}`);
            } else if (type === "video") {
              router.navigate(`/video/${id}`);
            }
          }
        }

        // Click vào Category Chip
        const chip = e.target.closest(".category-chip");
        if (chip) {
          const category = chip.dataset.category;

          // Cập nhật trạng thái active
          document.querySelectorAll(".category-chip").forEach((btn) => {
            btn.classList.remove("bg-white", "text-black", "hover:bg-gray-200");
            btn.classList.add("bg-yt-hover", "text-white");
          });
          chip.classList.remove("bg-yt-hover", "text-white");
          chip.classList.add("bg-white", "text-black", "hover:bg-gray-200");

          // Logic lọc (Mô phỏng phía client vì hỗ trợ API hạn chế cho các chips cụ thể này)
          const sectionTitle = document.querySelector("h2");
          if (sectionTitle) {
            if (category === "Mới phát hành") {
              sectionTitle.textContent = "Mới phát hành";
              // Giữ nguyên thứ tự ban đầu
            } else {
              sectionTitle.textContent = `${category} (Demo)`;
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

// Card đơn giản được sử dụng lại (Nên là một component chia sẻ trong app thực tế)
const renderCard = (item) => {
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

  const id = item.encodeId || item.id;
  const type = item.type || "song";
  const slug = item.slug || item.encodeId || "";

  return `
      <div class="group cursor-pointer song-card" 
           data-song='${JSON.stringify(item).replace(/'/g, "&#39;")}'
           data-type="${type}"
           data-slug="${slug}"
           data-id="${id}"
      >
         <div class="relative aspect-square mb-3 rounded overflow-hidden bg-gray-800">
            <img src="${image}" alt="${title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button class="play-button w-12 h-12 bg-white text-black rounded-full flex items-center justify-center pl-1 hover:scale-110 transition-transform">
                    <svg class="w-6 h-6 pointer-events-none" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
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

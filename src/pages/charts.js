import { apiClient } from '../utils/api';
import { escapeHTML } from '../utils/security';
import { MainLayout } from '../layouts/MainLayout';
import { Icons } from "../components/Icons";

let state = {
  country: { code: "VN", name: "Vietnam" }, // Default
  subscribers: {},
  artistPage: 0,
  artists: [],
  countries: [],
  videos: [],
};

const ARTISTS_PER_PAGE = 8; // 4 per column * 2 columns

export const renderCharts = async (router) => {
  // Skeleton / Loading State
  MainLayout(
    `
      <div class="flex items-center justify-center h-64">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
  `,
    router
  );

  try {
    // Initial Fetch: Countries
    if (state.countries.length === 0) {
      const countryRes = await apiClient.getChartCountries();
      state.countries =
        countryRes.countries || countryRes.items || countryRes.data || [];

      // Optional: Attempt to detect user location or default to VN/US if list allows
      // For now stick to state.country default (VN) or update if needed
      if (
        state.countries.length > 0 &&
        !state.countries.find((c) => c.code === state.country.code)
      ) {
        state.country = state.countries[0];
      }
    }

    await loadChartData();
    renderContent(router);
  } catch (error) {
    console.error("Charts load error", error);
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

const loadChartData = async () => {
  try {
    const [videosRes, artistsRes] = await Promise.all([
      apiClient.getChartVideos({ country: state.country.code, limit: 20 }),
      apiClient.getTopArtists({ country: state.country.code, limit: 100 }),
    ]);

    state.videos = videosRes.items || videosRes.data || [];
    state.artists = artistsRes.items || artistsRes.data || [];
  } catch (e) {
    console.error("Error loading specific chart data", e);
    throw e;
  }
};

const renderContent = (router) => {
  const mainContent = `
       <div class="space-y-12 pb-20">
         <!-- Header & Country Selector -->
         <div class="flex flex-col items-start gap-4">
            <div>
                 <h2 class="text-3xl font-bold mb-2">Bảng xếp hạng</h2>
                 <p class="text-gray-400 text-sm mb-4">Xu hướng tại ${escapeHTML(
                   state.country.name
                 )}</p>
            </div>
            <!-- Country Selector moved here -->
            ${renderCountrySelector()}
         </div>
         
         <!-- Top Songs / Video Chart (Horizontal Carousel) -->
         <section>
             <div class="flex items-center justify-between mb-6">
                 <h3 class="text-2xl font-bold">BXH Video</h3>
                 <div class="flex gap-2">
                     <button class="w-8 h-8 rounded-full border border-gray-700 hover:border-white flex items-center justify-center transition-colors hover:bg-white/10" id="vid-prev">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                     </button>
                     <button class="w-8 h-8 rounded-full border border-gray-700 hover:border-white flex items-center justify-center transition-colors hover:bg-white/10" id="vid-next">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                     </button>
                 </div>
             </div>
             
             <div id="video-charts-carousel" class="flex overflow-x-auto scroll-smooth gap-4 pb-4 snap-x scrollbar-none">
                 ${state.videos
                   .map((item, index) => renderVideoCard(item, index + 1))
                   .join("")}
             </div>
         </section>

         <!-- Top Artists Chart (Dual Column Vertical List) -->
         <section>
             <div class="flex items-center justify-between mb-6">
                 <h3 class="text-2xl font-bold">Nghệ sĩ hàng đầu</h3>
                 <div class="flex gap-2">
                     <button class="w-8 h-8 rounded-full border border-gray-700 hover:border-white flex items-center justify-center transition-colors hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed" id="artist-prev" ${
                       state.artistPage === 0 ? "disabled" : ""
                     }>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                     </button>
                     <button class="w-8 h-8 rounded-full border border-gray-700 hover:border-white flex items-center justify-center transition-colors hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed" id="artist-next" ${
                       (state.artistPage + 1) * ARTISTS_PER_PAGE >=
                       state.artists.length
                         ? "disabled"
                         : ""
                     }>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                     </button>
                 </div>
             </div>
             
             <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-2">
                ${renderArtistList()}
             </div>
         </section>
       </div>
     `;

  MainLayout(mainContent, router);
  attachEventListeners(router);
};

const renderCountrySelector = () => {
  return `
        <div class="relative group min-w-[200px] z-20">
            <select id="country-select" class="appearance-none bg-yt-hover text-white px-4 py-2 pr-8 rounded font-medium cursor-pointer focus:outline-none w-full border border-gray-700 hover:border-gray-500 transition-colors">
                ${state.countries
                  .map(
                    (c) => `
                    <option value="${c.code}" ${
                      c.code === state.country.code ? "selected" : ""
                    } class="bg-yt-base text-white">${escapeHTML(
                      c.name
                    )}</option>
                `
                  )
                  .join("")}
            </select>
            <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
            </div>
        </div>
    `;
};

const renderVideoCard = (item, rank) => {
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
    "https://via.placeholder.com/320x180";

  return `
    <div class="group relative flex-shrink-0 w-80 snap-start cursor-pointer song-card" data-song='${JSON.stringify(
      item
    ).replace(/'/g, "&#39;")}' >
         <!-- Rank Badge -->
        <div class="absolute top-2 left-2 z-10 w-8 h-8 rounded bg-black/60 backdrop-blur-sm flex items-center justify-center font-bold text-white border border-white/10">
            ${rank}
        </div>

        <div class="relative aspect-video rounded-lg overflow-hidden mb-3 group-hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)] transition-shadow">
            <img src="${image}" alt="${title}" class="w-full h-full object-cover">
            
            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <button class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    ${Icons.Play}
                 </button>
            </div>
        </div>

        <h3 class="font-medium text-white truncate pr-2" title="${title}">${title}</h3>
        <p class="text-sm text-gray-400 truncate" title="${subtitle}">${subtitle}</p>
    </div>
    `;
};

const renderArtistList = () => {
  // Pagination logic
  const start = state.artistPage * ARTISTS_PER_PAGE;
  const end = start + ARTISTS_PER_PAGE;
  const currentItems = state.artists.slice(start, end);

  // Split into 2 columns
  const mid = Math.ceil(currentItems.length / 2);
  const leftCol = currentItems.slice(0, mid);
  const rightCol = currentItems.slice(mid);

  // Helper to render a column
  const renderCol = (items, offset) => `
        <div class="flex flex-col gap-2">
            ${items
              .map((artist, idx) =>
                renderArtistRowItem(artist, start + offset + idx + 1)
              )
              .join("")}
        </div>
    `;

  return `
        ${renderCol(leftCol, 0)}
        ${renderCol(rightCol, leftCol.length)}
    `;
};

const renderArtistRowItem = (artist, indexRank) => {
  // API returns 'rank' explicitly, otherwise fallback to index + 1
  const rank = artist.rank || indexRank;
  const rawName = artist.name || "Unknown";
  const name = escapeHTML(rawName);

  // API returns 'totalViews', using that as secondary text
  // User requested "Subscribers" but data is 'totalViews' for this chart type usually
  let secondaryText = "N/A";
  if (artist.totalViews) {
    secondaryText =
      new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(artist.totalViews) + " views";
  } else if (artist.subscribers) {
    secondaryText = artist.subscribers; // Fallback if property changes
  }

  // Trend Logic
  // API returns 'trend': 'up' | 'down' | 'same' (implied or other)
  // Or we can use 'delta' to determine
  let trendIcon = '<span class="text-gray-500 text-xs">●</span>'; // Default

  if (artist.trend === "up") {
    trendIcon = '<span class="text-green-500 text-xs text-[10px]">▲</span>';
  } else if (artist.trend === "down") {
    trendIcon = '<span class="text-red-500 text-xs text-[10px]">▼</span>';
  } else if (artist.delta > 0) {
    trendIcon = '<span class="text-green-500 text-xs text-[10px]">▲</span>';
  } else if (artist.delta < 0) {
    trendIcon = '<span class="text-red-500 text-xs text-[10px]">▼</span>';
  }

  return `
    <div class="flex items-center p-3 rounded-lg hover:bg-white/10 cursor-pointer group transition-colors select-none artist-row" data-artist='${JSON.stringify(
      artist
    ).replace(/'/g, "&#39;")}' >
        <!-- Rank -->
        <div class="w-12 flex flex-col items-center justify-center flex-shrink-0 mr-2">
            <span class="text-lg font-bold text-gray-300 font-mono">${rank}</span>
            <div class="mt-1 flex items-center justify-center h-4">${trendIcon}</div>
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
            <h4 class="text-white font-medium text-base truncate" title="${name}">${name}</h4>
            <p class="text-gray-400 text-sm truncate">${secondaryText}</p>
        </div>
        
        <!-- Arrow Interact (Visible on hover) -->
        <div class="opacity-0 group-hover:opacity-100 transition-opacity px-2">
             <svg class="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </div>
    </div>
    `;
};

const attachEventListeners = (router) => {
  const main = document.querySelector("main");
  if (!main) return;

  // Country Select
  const select = document.getElementById("country-select");
  if (select) {
    select.addEventListener("change", async (e) => {
      const code = e.target.value;
      const name = e.target.options[e.target.selectedIndex].text;
      state.country = { code, name };
      // Reset to first page when changing country
      state.artistPage = 0;

      // Re-render only content area or reload data
      MainLayout(
        `
                <div class="flex items-center justify-center h-64">
                    <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            `,
        router
      );

      await loadChartData();
      renderContent(router);
    });
  }

  // Video Carousel Scroll
  const vidContainer = document.getElementById("video-charts-carousel");
  const btnVidPrev = document.getElementById("vid-prev");
  const btnVidNext = document.getElementById("vid-next");

  if (vidContainer && btnVidPrev && btnVidNext) {
    btnVidPrev.addEventListener("click", () => {
      vidContainer.scrollBy({
        left: -vidContainer.clientWidth / 2,
        behavior: "smooth",
      });
    });
    btnVidNext.addEventListener("click", () => {
      vidContainer.scrollBy({
        left: vidContainer.clientWidth / 2,
        behavior: "smooth",
      });
    });
  }

  // Artist Pagination
  const btnArtPrev = document.getElementById("artist-prev");
  const btnArtNext = document.getElementById("artist-next");

  if (btnArtPrev && btnArtNext) {
    btnArtPrev.addEventListener("click", () => {
      if (state.artistPage > 0) {
        state.artistPage--;
        renderContent(router);
      }
    });
    btnArtNext.addEventListener("click", () => {
      if ((state.artistPage + 1) * ARTISTS_PER_PAGE < state.artists.length) {
        state.artistPage++;
        renderContent(router);
      }
    });
  }

  // Event Delegation
  main.addEventListener("click", (e) => {
    // Play Video
    const songCard = e.target.closest(".song-card");
    if (songCard) {
      const songData = JSON.parse(songCard.dataset.song);
      import("../store/playerStore").then(({ playerStore }) => {
        playerStore.play(songData);
      });
      return;
    }

    // Navigate Artist
    const artistRow = e.target.closest(".artist-row");
    if (artistRow) {
      console.log("Navigate to artist: ", JSON.parse(artistRow.dataset.artist));
      // router.navigate or similar if available
    }
  });
};

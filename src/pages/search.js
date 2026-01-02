import { apiClient } from '../utils/api';
import { MainLayout } from '../layouts/MainLayout';
import { escapeHTML } from '../utils/security';
import { Card } from "../components/Card";
import { Icons } from "../components/Icons";

// State for search page
let currentFilter = "all"; // all, song, video, album, artist, playlist
let searchResults = [];

export const renderSearch = async (router, queryOverride) => {
  // Lấy query param
  const params = new URLSearchParams(window.location.search);
  const query = queryOverride || params.get("q");

  // Reset filter when new search
  // Note: In a real app we might want to sync filter with URL param too
  currentFilter = "all";

  if (!query) {
    MainLayout(
      `
            <div class="flex flex-col items-center justify-center h-full text-center">
                <div class="mb-6 opacity-50">
                    <svg class="w-24 h-24 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                </div>
                <h2 class="text-2xl font-bold mb-4">Tìm kiếm nội dung</h2>
                <p class="text-yt-text-secondary">Nhập tên bài hát, nghệ sĩ hoặc album để bắt đầu.</p>
            </div>
        `,
      router
    );
    return;
  }

  MainLayout(
    `
        <div class="flex items-center justify-center h-64">
            <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
    `,
    router
  );

  try {
    const res = await apiClient.search(query, { limit: 50 });
    // Handle both new { results: [] } and old { songs: [], ... } formats just in case
    const data = res || {};

    if (data.results) {
      searchResults = data.results;
    } else {
      // Fallback for old API structure if it still exists or changes
      searchResults = [
        ...(data.songs || []).map((i) => ({ ...i, type: "song" })),
        ...(data.albums || []).map((i) => ({ ...i, type: "album" })),
        ...(data.videos || []).map((i) => ({ ...i, type: "video" })),
        ...(data.playlists || []).map((i) => ({ ...i, type: "playlist" })),
        ...(data.artists || []).map((i) => ({ ...i, type: "artist" })),
      ];
    }

    renderSearchResults(router, query);
    setupSearchEvents(router);
  } catch (error) {
    console.error("Search error", error);
    MainLayout(
      `
            <div class="text-center py-20 text-red-500">
                <h3 class="text-xl font-bold">Lỗi tìm kiếm</h3>
                <p>${error.message}</p>
                <button class="mt-4 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors" onclick="location.reload()">Thử lại</button>
            </div>
        `,
      router
    );
  }
};

const renderSearchResults = (router, query) => {
  // 1. Group Data
  const songs = searchResults.filter((item) => item.type === "song");
  const videos = searchResults.filter((item) => item.type === "video");
  const albums = searchResults.filter((item) => item.type === "album");
  const artists = searchResults.filter((item) => item.type === "artist");
  const playlists = searchResults.filter((item) => item.type === "playlist");

  const topResult = searchResults.length > 0 ? searchResults[0] : null;

  // 2. Filter logic for View
  // If currentFilter is 'all', show sections.
  // If 'song', show only song list, etc.
  let content = "";
  const hasResults = searchResults.length > 0;

  if (!hasResults) {
    content = `
            <div class="flex flex-col items-center justify-center h-64 text-center">
                <h2 class="text-xl font-bold mb-2">Không tìm thấy kết quả cho "${escapeHTML(
                  query
                )}"</h2>
                <p class="text-yt-text-secondary">Vui lòng thử từ khóa khác.</p>
            </div>
        `;
  } else {
    // Filter Bar
    const filters = [
      { id: "all", label: "Tất cả" },
      { id: "song", label: "Bài hát" },
      { id: "video", label: "Video" },
      { id: "album", label: "Album" },
      { id: "artist", label: "Nghệ sĩ" },
      { id: "playlist", label: "Danh sách phát" },
    ];

    const filterBar = `
            <div class="flex items-center gap-3 mb-4 overflow-x-auto scrollbar-none z-40 py-2">
                ${filters
                  .map(
                    (f) => `
                    <button class="category-pill ${
                      currentFilter === f.id ? "active" : ""
                    }" data-filter="${f.id}">
                        ${f.label}
                    </button>
                `
                  )
                  .join("")}
            </div>
        `;

    let resultsHTML = "";

    if (currentFilter === "all") {
      // Top Result
      if (topResult) {
        resultsHTML += `
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
                        <div class="lg:col-span-4 flex flex-col gap-4">
                             <h2 class="text-2xl font-bold">Kết quả hàng đầu</h2>
                             ${renderTopResultCard(topResult)}
                        </div>
                        <div class="lg:col-span-8 flex flex-col gap-2">
                             <h2 class="text-2xl font-bold">Bài hát</h2>
                             <div class="flex flex-col">
                                ${songs
                                  .slice(0, 4)
                                  .map((song) => renderSongRow(song))
                                  .join("")}
                             </div>
                        </div>
                    </div>
                `;
      }

      // Other Sections
      if (artists.length > 0)
        resultsHTML += renderSection(
          "Nghệ sĩ",
          artists,
          "search-artists",
          "artist"
        );
      if (albums.length > 0)
        resultsHTML += renderSection("Album", albums, "search-albums", "album");
      if (videos.length > 0)
        resultsHTML += renderSection("Video", videos, "search-videos", "video");
      if (playlists.length > 0)
        resultsHTML += renderSection(
          "Playlists",
          playlists,
          "search-playlists",
          "playlist"
        );
    } else {
      // Filtered View
      const filteredItems = searchResults.filter(
        (item) => item.type === currentFilter
      );

      if (filteredItems.length === 0) {
        resultsHTML = `
                    <div class="text-center py-20">
                        <p class="text-yt-text-secondary">Không tìm thấy ${filters
                          .find((f) => f.id === currentFilter)
                          ?.label.toLowerCase()} nào.</p>
                    </div>
                 `;
      } else {
        if (currentFilter === "song") {
          resultsHTML = `
                        <div class="flex flex-col gap-2">
                            ${filteredItems
                              .map((song) => renderSongRow(song))
                              .join("")}
                        </div>
                     `;
        } else {
          resultsHTML = `
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            ${filteredItems.map((item) => Card(item)).join("")}
                        </div>
                     `;
        }
      }
    }

    content = `
            <div class="pb-20">
                ${filterBar}
                <div id="search-results-container">
                    ${resultsHTML}
                </div>
            </div>
        `;
  }

  MainLayout(content, router);

  // Re-attach events for filter buttons since we re-rendered
  setupSearchEvents(router, query);
};

const renderTopResultCard = (item) => {
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

const renderSection = (title, items, id, type) => {
  return `
      <section class="mb-10">
          <div class="flex items-end justify-between mb-4">
              <h2 class="text-2xl font-bold leading-tight">${title}</h2>
              ${
                items.length > 5
                  ? `
                 <div class="flex items-center gap-2">
                    <button class="w-8 h-8 rounded-full border border-gray-700 hover:border-white flex items-center justify-center transition-colors text-white" 
                        data-scroll="left" data-target="${id}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button class="w-8 h-8 rounded-full border border-gray-700 hover:border-white flex items-center justify-center transition-colors text-white" 
                        data-scroll="right" data-target="${id}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                 </div>
              `
                  : ""
              }
          </div>
          <div id="${id}" class="flex overflow-x-auto gap-6 pb-4 scrollbar-styled scroll-smooth snap-x">
              ${items.map((item) => Card(item, { type })).join("")}
          </div>
      </section>
    `;
};

const renderSongRow = (song) => {
  const title = escapeHTML(song.title || song.name);
  const artist = escapeHTML(
    Array.isArray(song.artists)
      ? song.artists.map((a) => a.name).join(", ")
      : song.artist || "Unknown"
  );
  const image =
    (song.thumbnails && song.thumbnails[0]) ||
    song.thumbnail ||
    "https://via.placeholder.com/60";

  // Format duration
  const formatTime = (seconds) => {
    if (!seconds) return "";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  return `
        <div class="song-row flex items-center p-2 rounded hover:bg-white/10 cursor-pointer group border-b border-transparent hover:border-white/5" 
             data-type="song"
             data-song='${JSON.stringify(song).replace(/'/g, "&#39;")}'>
             
            <!-- Play Icon / Index -->
            <div class="w-8 text-center mr-4 text-gray-400 group-hover:text-white relative">
                 <span class="text-sm opacity-100 group-hover:opacity-0 transition-opacity">
                    <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>
                 </span>
                 <button class="song-row-play absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    ${Icons.Play}
                 </button>
            </div>

            <div class="relative w-10 h-10 mr-4 flex-shrink-0">
                <img src="${image}" class="w-full h-full object-cover rounded" alt="${title}" loading="lazy">
            </div>
            
            <div class="flex-1 min-w-0 pr-4">
                <h4 class="text-white font-medium truncate">${title}</h4>
                <p class="text-sm text-yt-text-secondary truncate">${artist}</p>
            </div>

             <div class="text-sm text-yt-text-secondary hidden md:block w-1/4 truncate pr-4">
               ${escapeHTML(song.album?.title || "")}
            </div>
            
            <div class="text-sm text-yt-text-secondary w-12 text-right">
               ${formatTime(song.duration)}
            </div>
            
            <button class="ml-4 p-2 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
            </button>
        </div>
    `;
};

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

export const setupSearchEvents = (router, query) => {
  const main = document.querySelector("main");
  if (!main) return;

  // Filter Pills Click
  const pills = main.querySelectorAll(".category-pill");
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const filter = pill.dataset.filter;
      if (currentFilter !== filter) {
        currentFilter = filter;
        renderSearchResults(router, query); // Re-render content only
      }
    });
  });

  // Scroll Buttons
  const scrollBtns = main.querySelectorAll("[data-scroll]");
  scrollBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const direction = e.currentTarget.dataset.scroll;
      const targetId = e.currentTarget.dataset.target;
      const container = document.getElementById(targetId);

      if (container) {
        const scrollAmount = container.clientWidth * 0.75;
        if (direction === "left") {
          container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    });
  });

  // Since we replace content, we rely on event delegation on 'main' for dynamic items
  // But we need to be careful not to duplicate listeners if setupSearchEvents is called multiple times.
  // Actually, MainLayout replaces innerHTML of #app or main content area, so previous listeners on elements inside might be lost,
  // but listeners on 'main' (if MainLayout preserves it) depends on implementation.
  // Let's assume MainLayout replaces the content inside a container, but 'main' might be the container?
  // Checking MainLayout.js ... it replaces existing content.

  // To avoid duplicate global listeners on 'main' if it persists, we should probably attach to the new content container.
  // Assuming MainLayout replaces `document.querySelector('#app').innerHTML` or similar.
  // Let's attach safely.

  // NOTE: In current architecture, it seems we attach to 'main' which is inside Layout.
  // We can just add a single click listener to the results container.

  const resultsContainer = document.getElementById("search-results-container");
  if (resultsContainer) {
    resultsContainer.addEventListener("click", (e) => {
      // Handle Song Rows
      const songRow = e.target.closest(".song-row");
      if (songRow) {
        // Check if play button or row click
        // If clicked on album link or something else, handle it?

        // For now, whole row plays song
        try {
          const songData = JSON.parse(songRow.dataset.song);
          import("../store/playerStore").then(({ playerStore }) => {
            playerStore.play(songData);
          });
        } catch (err) {
          console.error("Failed to play song", err);
        }
        return;
      }

      // Handle Cards
      const card = e.target.closest(".card-item");
      if (card) {
        const type = card.dataset.type;
        const id = card.dataset.id;
        const itemData = JSON.parse(card.dataset.item || "{}");

        // Play Button Click
        const playBtn = e.target.closest(".play-btn");
        if (playBtn) {
          e.stopPropagation(); // prevent navigation
          if (type === "song" || type === "video" || type === "album") {
            import("../store/playerStore").then(({ playerStore }) => {
              playerStore.play(itemData);
            });
          }
          return;
        }

        // Navigation
        if (type === "album") router.navigate(`album/${id}`);
        else if (type === "playlist") router.navigate(`playlist/${id}`);
        else if (type === "artist") router.navigate(`artist/${id}`);
        else if (type === "song" || type === "video") {
          // Click on card body for song/video plays it
          import("../store/playerStore").then(({ playerStore }) => {
            playerStore.play(itemData);
          });
        }
      }
    });
  }
};

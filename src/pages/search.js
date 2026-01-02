import { apiClient } from '../utils/api';
import { MainLayout } from '../layouts/MainLayout';
import { escapeHTML } from '../utils/security';
import { Card } from "../components/Card";
import { Icons } from "../components/Icons";
import { TopResultCard } from "../components/TopResultCard";
import { Section } from "../components/Section";
import { SongRow } from "../components/SongRow";

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
                             ${TopResultCard(topResult)}
                        </div>
                        <div class="lg:col-span-8 flex flex-col gap-2">
                             <h2 class="text-2xl font-bold">Bài hát</h2>
                             <div class="flex flex-col">
                                ${songs
                                  .slice(0, 4)
                                  .map((song) => SongRow(song))
                                  .join("")}
                             </div>
                        </div>
                    </div>
                `;
      }

      // Other Sections
      if (artists.length > 0)
        resultsHTML += Section("Nghệ sĩ", artists, "search-artists", "artist");
      if (albums.length > 0)
        resultsHTML += Section("Album", albums, "search-albums", "album");
      if (videos.length > 0)
        resultsHTML += Section("Video", videos, "search-videos", "video");
      if (playlists.length > 0)
        resultsHTML += Section(
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
                              .map((song) => SongRow(song))
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

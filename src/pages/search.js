import { apiClient } from '../utils/api';
import { MainLayout } from '../layouts/MainLayout';
import { escapeHTML } from '../utils/security';
import { Card } from "../components/Card";

export const renderSearch = async (router) => {
  // Lấy query param
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");

  if (!query) {
    MainLayout(
      `
            <div class="flex flex-col items-center justify-center h-full text-center">
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
    const res = await apiClient.search(query);
    const data = res.data || {};

    const songs = data.songs || [];
    const albums = data.albums || [];
    const videos = data.videos || [];
    const playlists = data.playlists || [];
    const artists = data.artists || [];

    const hasResults =
      songs.length > 0 ||
      albums.length > 0 ||
      videos.length > 0 ||
      playlists.length > 0 ||
      artists.length > 0;

    if (!hasResults) {
      MainLayout(
        `
                <div class="flex flex-col items-center justify-center h-64 text-center">
                    <h2 class="text-xl font-bold mb-2">Không tìm thấy kết quả cho "${escapeHTML(
                      query
                    )}"</h2>
                    <p class="text-yt-text-secondary">Vui lòng thử từ khóa khác.</p>
                </div>
            `,
        router
      );
      return;
    }

    const content = `
            <div class="space-y-10 pb-10">
                <h1 class="text-3xl font-bold">Kết quả tìm kiếm cho "${escapeHTML(
                  query
                )}"</h1>

                ${
                  /* Top Result (Songs) */
                  songs.length > 0
                    ? `
                    <section>
                        <h2 class="text-2xl font-bold mb-4">Bài hát</h2>
                        <div class="flex flex-col gap-2">
                            ${songs
                              .slice(0, 5)
                              .map((song) => renderSongRow(song))
                              .join("")}
                        </div>
                    </section>
                  `
                    : ""
                }

                 ${
                   /* Artists */
                   artists.length > 0
                     ? `
                    <section>
                        <h2 class="text-2xl font-bold mb-4">Nghệ sĩ</h2>
                        <div class="flex overflow-x-auto gap-6 pb-4 scrollbar-styled">
                            ${artists
                              .map((artist) => Card(artist, { type: "artist" }))
                              .join("")}
                        </div>
                    </section>
                  `
                     : ""
                 }

                ${
                  /* Albums */
                  albums.length > 0
                    ? `
                    <section>
                        <h2 class="text-2xl font-bold mb-4">Album</h2>
                        <div class="flex overflow-x-auto gap-6 pb-4 scrollbar-styled">
                            ${albums
                              .map((album) => Card(album, { type: "album" }))
                              .join("")}
                        </div>
                    </section>
                  `
                    : ""
                }

                ${
                  /* Videos */
                  videos.length > 0
                    ? `
                    <section>
                        <h2 class="text-2xl font-bold mb-4">Video</h2>
                        <div class="flex overflow-x-auto gap-6 pb-4 scrollbar-styled">
                           ${videos
                             .map((video) => Card(video, { type: "video" }))
                             .join("")}
                        </div>
                    </section>
                  `
                    : ""
                }
                 ${
                   /* Playlists */
                   playlists.length > 0
                     ? `
                    <section>
                        <h2 class="text-2xl font-bold mb-4">Playlists</h2>
                         <div class="flex overflow-x-auto gap-6 pb-4 scrollbar-styled">
                           ${playlists
                             .map((pl) => Card(pl, { type: "playlist" }))
                             .join("")}
                        </div>
                    </section>
                  `
                     : ""
                 }
            </div>
        `;

    MainLayout(content, router);

    // Setup events
    setupSearchEvents(router);
  } catch (error) {
    console.error("Search error", error);
    MainLayout(
      `
            <div class="text-center py-20 text-red-500">
                <h3 class="text-xl font-bold">Lỗi tìm kiếm</h3>
                <p>${error.message}</p>
            </div>
        `,
      router
    );
  }
};

const setupSearchEvents = (router) => {
  const main = document.querySelector("main");
  if (!main) return;

  main.addEventListener("click", (e) => {
    // Handle Song Rows
    const songRow = e.target.closest(".song-row");
    if (songRow) {
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
    const playBtn = e.target.closest(".play-btn");
    const card = e.target.closest(".card-item");

    if (card) {
      const type = card.dataset.type;
      const id = card.dataset.id;
      const itemData = JSON.parse(card.dataset.item || "{}");

      if (type === "song") {
        import("../store/playerStore").then(({ playerStore }) => {
          playerStore.play(itemData);
        });
      } else if (type === "video") {
        import("../store/playerStore").then(({ playerStore }) => {
          playerStore.play(itemData);
        });
      } else {
        if (type === "album") router.navigate(`album/${id}`);
        else if (type === "playlist") router.navigate(`playlist/${id}`);
        else if (type === "artist") router.navigate(`artist/${id}`);
      }
    }
  });
};

const renderSongRow = (song) => {
  const title = escapeHTML(song.title || song.name);
  const artist = escapeHTML(
    Array.isArray(song.artists)
      ? song.artists.map((a) => a.name).join(", ")
      : "Unknown"
  );
  const image =
    (song.thumbnails && song.thumbnails[0]) ||
    song.thumbnail ||
    "https://via.placeholder.com/60";

  return `
        <div class="song-row flex items-center p-2 rounded hover:bg-white/10 cursor-pointer group" data-song='${JSON.stringify(
          song
        ).replace(/'/g, "&#39;")}'>
            <div class="relative w-12 h-12 mr-4 flex-shrink-0">
                <img src="${image}" class="w-full h-full object-cover rounded" alt="${title}" loading="lazy">
                 <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
            </div>
            <div class="flex-1 min-w-0">
                <h4 class="text-white font-medium truncate">${title}</h4>
                <p class="text-sm text-yt-text-secondary truncate">${artist}</p>
            </div>
            <div class="text-sm text-yt-text-secondary px-4">
               ${song.duration || ""}
            </div>
        </div>
    `;
};

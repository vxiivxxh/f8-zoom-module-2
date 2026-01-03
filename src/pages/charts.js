import { apiClient } from '../utils/api';
import { escapeHTML } from '../utils/security';
import { MainLayout } from '../layouts/MainLayout';
import { Icons } from "../components/Icons";
import { Card } from "../components/Card";

let state = {
  country: { code: "VN", name: "Vietnam" }, // Mặc định
  subscribers: {},
  artistPage: 0,
  artists: [],
  countries: [],
  videos: [],
};

const ARTISTS_PER_PAGE = 8; // 4 mỗi cột * 2 cột

export const renderCharts = async (router) => {
  // Skeleton / Trạng thái đang tải
  MainLayout(
    `
      <div class="flex items-center justify-center h-64">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
  `,
    router
  );

  try {
    // Tìm nạp ban đầu: Quốc gia
    if (state.countries.length === 0) {
      const countryRes = await apiClient.getChartCountries();
      state.countries =
        countryRes.countries || countryRes.items || countryRes.data || [];

      // Tùy chọn: Cố gắng phát hiện vị trí người dùng hoặc mặc định là VN/US nếu danh sách cho phép
      // Hiện tại giữ mặc định state.country (VN) hoặc cập nhật nếu cần
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
         <!-- Tiêu đề & Bộ chọn Quốc gia -->
         <div class="flex flex-col items-start gap-4">
            <div>
                 <h2 class="text-3xl font-bold mb-2">Bảng xếp hạng</h2>
                 <p class="text-gray-400 text-sm mb-4">Xu hướng tại ${escapeHTML(
                   state.country.name
                 )}</p>
            </div>
            <!-- Bộ chọn Quốc gia đã được chuyển đến đây -->
            ${renderCountrySelector()}
         </div>
         
         <!-- Bài hát hàng đầu / Bảng xếp hạng Video (Carousel Ngang) -->
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
                   .map((item, index) =>
                     Card({ ...item, rank: index + 1 }, { type: "video" })
                   )
                   .join("")}
             </div>
         </section>

         <!-- Bảng xếp hạng Nghệ sĩ hàng đầu (Danh sách dọc 2 cột) -->
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

const renderArtistList = () => {
  // Logic phân trang
  const start = state.artistPage * ARTISTS_PER_PAGE;
  const end = start + ARTISTS_PER_PAGE;
  const currentItems = state.artists.slice(start, end);

  // Chia thành 2 cột
  const mid = Math.ceil(currentItems.length / 2);
  const leftCol = currentItems.slice(0, mid);
  const rightCol = currentItems.slice(mid);

  // Helper để render một cột
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
  // API trả về 'rank' một cách rõ ràng, nếu không thì dùng index + 1 làm dự phòng
  const rank = artist.rank || indexRank;
  const rawName = artist.name || "Unknown";
  const name = escapeHTML(rawName);

  // API trả về 'totalViews', sử dụng nó làm văn bản phụ
  // Người dùng yêu cầu "Subscribers" nhưng dữ liệu thường là 'totalViews' cho loại biểu đồ này
  let secondaryText = "N/A";
  if (artist.totalViews) {
    secondaryText =
      new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(artist.totalViews) + " views";
  } else if (artist.subscribers) {
    secondaryText = artist.subscribers; // Dự phòng nếu thuộc tính thay đổi
  }

  // Logic Xu hướng
  // API trả về 'trend': 'up' | 'down' | 'same' (ngụ ý hoặc khác)
  // Hoặc chúng ta có thể sử dụng 'delta' để xác định
  let trendIcon = '<span class="text-gray-500 text-xs">●</span>'; // Mặc định

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
        <!-- Xếp hạng -->
        <div class="w-12 flex flex-col items-center justify-center flex-shrink-0 mr-2">
            <span class="text-lg font-bold text-gray-300 font-mono">${rank}</span>
            <div class="mt-1 flex items-center justify-center h-4">${trendIcon}</div>
        </div>

        <!-- Thông tin -->
        <div class="flex-1 min-w-0">
            <h4 class="text-white font-medium text-base truncate" title="${name}">${name}</h4>
            <p class="text-gray-400 text-sm truncate">${secondaryText}</p>
        </div>
        
        <!-- Mũi tên tương tác (Hiện khi hover) -->
        <div class="opacity-0 group-hover:opacity-100 transition-opacity px-2">
             <svg class="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </div>
    </div>
    `;
};

const attachEventListeners = (router) => {
  const main = document.querySelector("main");
  if (!main) return;

  // Chọn Quốc gia
  const select = document.getElementById("country-select");
  if (select) {
    select.addEventListener("change", async (e) => {
      const code = e.target.value;
      const name = e.target.options[e.target.selectedIndex].text;
      state.country = { code, name };
      // Đặt lại về trang đầu tiên khi đổi quốc gia
      state.artistPage = 0;

      // Chỉ render lại vùng nội dung hoặc tải lại dữ liệu
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

  // Cuộn Carousel Video
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

  // Phân trang Nghệ sĩ
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

  // Ủy quyền sự kiện
  main.addEventListener("click", (e) => {
    // Điều hướng Video
    const videoCard = e.target.closest(".card-item[data-type='video']");
    if (videoCard) {
      e.preventDefault();
      const id = videoCard.dataset.id;
      router.navigate(`/video/${id}`);
      return;
    }

    // Phát bài hát (nếu có logic loại thẻ nào khác ở đây, chủ yếu chỉ là nghệ sĩ và video trên trang này)
    const songCard = e.target.closest(".song-card");
    if (songCard) {
      const songData = JSON.parse(songCard.dataset.song);
      import("../store/playerStore").then(({ playerStore }) => {
        playerStore.play(songData);
      });
      return;
    }

    // Điều hướng Nghệ sĩ
    const artistRow = e.target.closest(".artist-row");
    if (artistRow) {
      console.log("Navigate to artist: ", JSON.parse(artistRow.dataset.artist));
      // router.navigate hoặc tương tự nếu có sẵn
    }
  });
};

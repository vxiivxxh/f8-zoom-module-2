import { apiClient } from "../utils/api";
import { MainLayout } from "../layouts/MainLayout";
import { Section } from "../components/Section";

export const renderLineDetail = async (router, match) => {
  const slug = match?.data?.slug;
  if (!slug) return;

  MainLayout(
    `
    <div class="flex items-center justify-center h-64">
        <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  `,
    router
  );

  try {
    // Tìm nạp song song cho Thông tin Dòng nhạc và các loại nội dung của nó
    // Lưu ý: Đặc tả API tách biệt chúng. Chúng ta có thể muốn hiển thị chúng trong các phần.
    const [lineRes, songsRes, playlistsRes, albumsRes, videosRes] =
      await Promise.all([
        apiClient.getLineDetail(slug),
        apiClient.getLineSongs(slug, { limit: 12 }),
        apiClient.getLinePlaylists(slug, { limit: 12 }),
        apiClient.getLineAlbums(slug, { limit: 12 }),
        apiClient.getLineVideos(slug, { limit: 12 }),
      ]);

    const line = lineRes.data || lineRes;
    const title = line.name || line.title || "Line Detail";
    const description = line.description || "";

    const songs = songsRes.data || songsRes.items || [];
    const playlists = playlistsRes.data || playlistsRes.items || [];
    const albums = albumsRes.data || albumsRes.items || [];
    const videos = videosRes.data || videosRes.items || [];

    const content = `
      <div class="space-y-12 pb-10">
        <!-- Tiêu đề -->
        <div class="flex flex-col gap-2 mb-6">
            <h1 class="text-4xl font-bold">${title}</h1>
            ${description ? `<p class="text-gray-400">${description}</p>` : ""}
        </div>
        
        <!-- Các phần -->
        ${
          songs.length > 0
            ? Section("Bài hát nổi bật", songs, "line-songs", "song")
            : ""
        }
        
        ${
          playlists.length > 0
            ? Section("Similiar Playlists", playlists, "line-playlists", "playlist")
            : ""
        }

        ${
          albums.length > 0
            ? Section("Albums", albums, "line-albums", "album")
            : ""
        }

        ${
          videos.length > 0
            ? Section("Videos", videos, "line-videos", "video")
            : ""
        }
        
        ${
          songs.length === 0 &&
          playlists.length === 0 &&
          albums.length === 0 &&
          videos.length === 0
            ? '<p class="text-gray-400">Chưa có nội dung cho dòng nhạc này.</p>'
            : ""
        }
      </div>
    `;

    MainLayout(content, router);
  } catch (error) {
    console.error("Line detail error", error);
    MainLayout(
      `
      <div class="text-center py-20 text-red-500">
        <h3 class="text-xl font-bold">Lỗi tải dữ liệu</h3>
        <p>${error.message}</p>
        <button onclick="window.history.back()" class="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200">Quay lại</button>
      </div>
    `,
      router
    );
  }
};

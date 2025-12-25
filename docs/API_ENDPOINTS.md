# API Endpoints
Base URL: `https://youtube-music.f8team.dev`

## Authentication
- `POST /auth/login` - Đăng nhập
- `POST /auth/register` - Đăng ký
- `GET /auth/me` - Lấy thông tin cá nhân (Yêu cầu Token)
- `DELETE /auth/logout` - Đăng xuất (Yêu cầu Token)
- `POST /auth/refresh-token` - Refresh Token
- `PATCH /auth/me` - Cập nhật thông tin cá nhân (Yêu cầu Token)
- `PATCH /auth/change-password` - Đổi mật khẩu (Yêu cầu Token)

## Moods & Genres (Thể loại & Dòng nhạc)
- `GET /categories` - Lấy danh sách tâm trạng/thể loại
- `GET /categories/:slug` - Chi tiết tâm trạng; Query: `subLimit`, `playlistLimit`, `subSort`, `playlistSort`
- `GET /lines` - Lấy danh sách dòng nhạc; Query: `limit`
- `GET /lines/:slug` - Chi tiết dòng nhạc
- `GET /lines/:slug/songs` - Bài hát theo dòng nhạc; Query: `limit`, `sort`
- `GET /lines/:slug/playlists` - Playlist theo dòng nhạc; Query: `limit`, `sort`
- `GET /lines/:slug/albums` - Album theo dòng nhạc; Query: `limit`, `sort`
- `GET /lines/:slug/videos` - Video theo dòng nhạc; Query: `limit`, `sort`

## Explore (Khám phá)
- `GET /explore/albums` - Album mới nhất; Query: `limit`
- `GET /explore/videos` - Video mới nhất; Query: `limit`
- `GET /explore/meta` - Danh sách tổng hợp tâm trạng & thể loại
- `GET /explore/new-releases` - Bản phát hành mới; Query: `limit`, `sort`

## Charts (Bảng xếp hạng)
- `GET /charts/videos` - BXH Video; Query: `country`, `period`, `limit`, `sort`
- `GET /charts/top-artists` - BXH Nghệ sĩ; Query: `country`, `period`, `limit`
- `GET /charts/countries` - Danh sách quốc gia hỗ trợ

## Home Categories (Danh mục trang chủ)
- `GET /moods` - Lấy danh sách danh mục trang chủ; Query: `limit`, `sort`
- `GET /moods/:slug` - Chi tiết danh mục
- `GET /quick-picks` - Quick Pick (Gợi ý nhanh); Query: `mood`, `country`, `limit`

## Home (Trang chủ)
- `GET /home/albums-for-you` - Gợi ý Album; Query: `country`, `limit`
- `GET /home/todays-hits` - Hits hôm nay; Query: `country`, `limit`
- `GET /playlists/by-country` - Playlist theo quốc gia; Query: `country`, `limit`
- `GET /home/personalized` - Gợi ý theo lịch sử (Yêu cầu Token); Query: `limit`

## User Events
- `POST /events/play` - Ghi lại lịch sử nghe (Yêu cầu Token); Body: `songId`|`albumId`|`playlistId`, `playedAt`

## Content Details (Chi tiết nội dung)
- `GET /playlists/details/:slug` - Chi tiết Playlist; Query: `limit`
- `GET /albums/details/:slug` - Chi tiết Album; Query: `limit`, `sort`
- `GET /videos/details/:id` - Chi tiết Video; Query: `limit`
- `GET /songs/details/:id` - Chi tiết Bài hát; Query: `limit`

## Search (Tìm kiếm)
- `GET /search/suggestions` - Gợi ý tìm kiếm; Query: `q`
- `GET /search` - Kết quả tìm kiếm; Query: `q`, `limit`, `page`

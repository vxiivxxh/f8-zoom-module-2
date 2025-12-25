# Project TODO List

## Phase 1: Setup & Configuration
- [x] Khởi tạo dự án Vite (Vanilla JS).
- [x] Cài đặt Tailwind CSS.
- [x] Cài đặt thư viện Navigo (Routing).
- [x] Thiết lập cấu trúc thư mục (components, pages, utils, api).
- [x] Cấu hình biến môi trường (API Base URL).

## Phase 2: Authentication
- [x] Tạo trang/Form Đăng nhập & Đăng ký.
- [x] Xử lý API Login (`POST /auth/login`) & Register (`POST /auth/register`).
- [x] Implement Token management (Lưu/Xóa localStorage).
- [x] Xử lý API Logout (`DELETE /auth/logout`).
- [x] Xử lý lấy thông tin User (`GET /auth/me`).

## Phase 3: Core UI & Navigation
- [x] Xây dựng Layout chính (Sidebar, Content Area, Player Bar placeholder).
- [x] Implement Routing cơ bản với Navigo (`/`, `/explore`, `/search`, ...).
- [x] Implement Sidebar navigation & Responsive logic.
- [x] Xây dựng Trang chủ (`/`) với UI cơ bản.
- [x] Fetch & Clean Data cho Trang chủ (`albums-for-you`, `todays-hits`, `by-country`).
- [x] Implement Quick Picks (`GET /quick-picks`) cho suggest nhanh.

## Phase 4: Explore & Search Features
- [x] Xây dựng Trang Explore (`/explore`).
- [x] Fetch & Clean Data Explore (`new-releases`, `albums`, `videos`, `moods`).
- [ ] Implement Bảng xếp hạng/Charts (`GET /charts/videos`, `/charts/top-artists`).
- [ ] Implement Thanh Tìm kiếm (Search Bar) debounce.
- [ ] Xử lý Gợi ý tìm kiếm (`GET /search/suggestions`).
- [ ] Xây dựng Trang Kết quả Tìm kiếm (`/search`) hiển thị kết quả tổng hợp.

## Phase 5: Content Details
- [ ] Xây dựng trang chi tiết Playlist (`/playlists/details/:slug`).
- [ ] Xây dựng trang chi tiết Album (`/albums/details/:slug`).
- [ ] Xử lý hiển thị danh sách bài hát/video trong Playlist/Album.
- [ ] Xử lý hiển thị Metadata bài hát (Cover, Title, Artist).

## Phase 6: Player System
- [x] Xây dựng Component Player Bar hoàn chỉnh.
- [x] Tích hợp logic phát video (YouTube Iframe/Custom Player).
- [x] Đồng bộ thông tin bài hát đang phát lên Player Bar.
- [x] Xử lý sự kiện "Play" từ lists (Home, Explore, Details).
- [ ] Ghi log lịch sử nghe nhạc (`POST /events/play`).

## Phase 7: Polish & Optimization
- [ ] Review & Fix UI Responsive (Mobile/Desktop).
- [ ] Refactor Code & Tối ưu hóa fetch API/State management.
- [ ] Kiểm tra lỗi & Hoàn thiện luồng người dùng.

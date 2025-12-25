Yêu cầu: Clone Frontend của music.youtube.com

1. Mục Tiêu

Xây dựng một ứng dụng web mô phỏng giao diện và chức năng cốt lõi của music.youtube.com.

Công nghệ: Vanilla JavaScript, Vite, Tailwind CSS, npm, navigo.

API: Sử dụng https://youtube-music.f8team.dev/api với các endpoints được mô tả tại https://youtube-music.f8team.dev.

2. Yêu Cầu Kỹ Thuật

Cấu hình dự án: Khởi tạo dự án bằng Vite (sử dụng template Vanilla JS) và cài đặt Tailwind CSS để xây dựng giao diện.

Quản lý State: Sử dụng Vanilla JS để quản lý trạng thái ứng dụng (ví dụ: trạng thái đăng nhập, bài hát đang phát, hàng đợi phát) mà không dùng các thư viện quản lý state phức tạp (Redux, Vuex, v.v.).

Fetch API: Sử dụng fetch API hoặc thư viện axios (nếu cần) để gọi API và xử lý bất đồng bộ (async/await).

Định tuyến (Routing): Triển khai cơ chế định tuyến Single Page Application (SPA) sử dụng thư viện Navigo để quản lý các đường dẫn (routes) như /, /explore, /album/:slug, /search và chuyển đổi giữa các giao diện trang mà không cần tải lại toàn bộ trang.

3. Các tính năng chính

3.1. Hệ thống xác thực (Authentication)

Đăng nhập/Đăng ký: Xây dựng form và xử lý gọi API: POST /auth/login và POST /auth/register.

Quản lý Token: Lưu trữ access_token trong Local Storage.

Thông tin Người dùng: Sau khi đăng nhập, sử dụng GET /auth/me để lấy và hiển thị thông tin người dùng cơ bản.

Đăng xuất: Xử lý gọi API DELETE /auth/logout và xóa token khỏi Local Storage.

3.2. Trang Chủ (Home - /)

Tái tạo giao diện trang chủ cơ bản, hiển thị các khối nội dung theo chiều ngang, sử dụng các API sau:

Gợi ý Album: GET /home/albums-for-you (Hiển thị dưới dạng danh sách cuộn ngang)

Danh sách Today's Hits: GET /home/todays-hits (Hiển thị dưới dạng danh sách cuộn ngang)

Danh sách theo Quốc gia: GET /playlists/by-country (Ví dụ: country=VN)

Gợi ý Cá nhân hóa (Nếu đã đăng nhập): GET /home/personalized

3.3. Khám Phá (Explore - /explore)

Hiển thị Album/Video mới nhất: GET /explore/albums và GET /explore/videos.

Bản phát hành mới: GET /explore/new-releases.

Danh sách Tâm trạng/Thể loại: GET /explore/meta hoặc GET /categories và GET /lines (Hiển thị các khối/thẻ để người dùng nhấp vào).

3.4. Chi Tiết Nội Dung

Chi tiết Playlist: Khi nhấp vào một Playlist, chuyển đến trang chi tiết và gọi GET /playlists/details/:slug để lấy danh sách bài hát.

Chi tiết Album: Tương tự, gọi GET /albums/details/:slug để lấy danh sách bài hát/video.

Chi tiết Bài hát/Video: Sử dụng GET /songs/details/:id hoặc GET /videos/details/:id để lấy metadata đầy đủ.

3.5. Tìm Kiếm (Search - /search)

Thanh Tìm kiếm (Search Bar): Cố định ở đầu trang.

Gợi ý Tìm kiếm: Triển khai chức năng gọi GET /search/suggestions khi người dùng nhập từ khóa (debounce input).

Trang Kết quả: Khi tìm kiếm, chuyển đến trang kết quả và gọi GET /search. Hiển thị kết quả tìm kiếm (Bài hát, Album, Playlist, Video).

3.6. Trình Phát Nhạc (Player Bar - Cố định)

Xây dựng thanh điều khiển cố định ở cuối màn hình:

Khi nhấp vào một bài hát trong bất kỳ danh sách nào, thông tin bài hát đó (tên, nghệ sĩ, ảnh) phải hiển thị trên Player Bar.

Tích hợp YouTube Player: Sử dụng ID video từ API để nhúng/phát video YouTube (hoặc giả lập việc phát).

Ghi lại lịch sử: Khi một bài hát bắt đầu phát (hoặc sau một khoảng thời gian ngắn), gọi POST /events/play (yêu cầu đăng nhập).

4. Yêu Cầu Giao Diện (UI/UX)

Thiết kế Tailwind: Sử dụng Tailwind CSS để tạo bố cục và phong cách, đảm bảo giao diện tương đồng với YouTube Music (màu tối, phông chữ, bố cục 3 cột: Sidebar - Content - Player Bar).

Responsive Design: Giao diện phải hoạt động tốt trên cả desktop và mobile (ẩn sidebar, điều chỉnh bố cục Player Bar).

Sử dụng Component: Chia nhỏ giao diện thành các thành phần (ví dụ: SongItem.js, HorizontalList.js, PlayerBar.js) để quản lý DOM hiệu quả hơn.
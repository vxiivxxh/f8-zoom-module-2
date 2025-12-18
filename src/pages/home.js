import client from "../api/client";

export default function home() {
  return `
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-4">Trang Chủ</h1>
      <div id="home-content">Đang tải...</div>
    </div>
  `;
}

// Hàm chạy sau khi nội dung đã render (dùng để gọi API, gán sự kiện)
export const homeScript = async () => {
    try {
        console.log("Đang tải dữ liệu trang chủ...");
        // Ví dụ gọi API để kiểm tra kết nối
        // const response = await client.get("/home/albums-for-you"); 
        // console.log(response.data);
        const content = document.getElementById("home-content");
        if(content) content.innerText = "Chào mừng đến với YouTube Music Clone (Giao diện mới)";
    } catch (error) {
        console.error(error);
    }
};

import "./style.css";
import { initRouter } from "./router";
import { store } from "./state/store";
import { checkAuth } from "./api/client";
import Sidebar from "./components/sidebar";
import Header, { headerScript } from "./components/header";
import PlayerBar from "./components/PlayerBar";

document.querySelector("#app").innerHTML = `
  <div class="flex h-screen bg-black text-white font-roboto overflow-hidden">
    <!-- Sidebar: Thanh điều hướng bên trái -->
    ${Sidebar()}

    <!-- Main Section: Khu vực nội dung chính -->
    <main class="flex-1 flex flex-col relative min-w-0 bg-[#030303]">
        <!-- Top Bar: Thanh tìm kiếm và User -->
        ${Header()}

        <!-- Scrollable Content: Nơi các trang (Page) sẽ được render vào đây -->
        <div id="main-content" class="flex-1 overflow-y-auto w-full custom-scrollbar pb-24">
            <!-- Pages render here -->
        </div>
        
        <!-- Player: Thanh phát nhạc cố định dưới cùng -->
        ${PlayerBar()}
    </main>
  </div>
`;
initRouter();

(async () => {
    const user = await checkAuth();
    if (user) {
        store.setState({
            auth: {
                isAuthenticated: true,
                user: user
            }
        });
    }
})();

const setupSearch = () => {
    const searchInput = document.getElementById("search-input");
    if(searchInput) {
        searchInput.addEventListener("keydown", (e) => {
            if(e.key === "Enter") {
                const query = e.target.value.trim();
                if(query) {
                    console.log("Đang tìm kiếm:", query);
                }
            }
        });
    }
};

const setupSidebar = () => {
    const toggleBtn = document.getElementById("sidebar-toggle");
    const sidebar = document.querySelector("aside");
    const sidebarTexts = document.querySelectorAll(".sidebar-text");
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", () => {
            if (sidebar.classList.contains("w-60")) {
                sidebar.classList.remove("w-60");
                sidebar.classList.add("w-20");
                sidebar.classList.add("items-center"); 
                sidebarTexts.forEach(text => text.classList.add("hidden"));
            } else {
                sidebar.classList.remove("w-20");
                sidebar.classList.remove("items-center");
                sidebar.classList.add("w-60");
                sidebarTexts.forEach(text => text.classList.remove("hidden"));
            }
        });
    }
};
setupSearch();
setupSidebar();
headerScript();

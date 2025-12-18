import client from "../api/client";
import { store } from "../state/store";
import router from "../router";

export default function AuthPage(type) {
  const isLogin = type === "login";
  const title = isLogin ? "Đăng nhập" : "Đăng ký";
  const btnText = isLogin ? "Đăng nhập" : "Tạo tài khoản";
  const switchText = isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?";
  const switchLinkText = isLogin ? "Đăng ký" : "Đăng nhập";
  const switchUrl = isLogin ? "/register" : "/login";

  return `
    <div class="flex items-center justify-center min-h-[calc(100vh-64px-80px)]"> <!-- Trừ Header và Player -->
       <div class="bg-[#1f1f1f] p-8 rounded-xl shadow-lg w-full max-w-md border border-white/5">
         
         <div class="flex justify-center mb-6">
            <img src="https://music.youtube.com/img/on_platform_logo_dark.svg" alt="YouTube Music" class="h-8">
         </div>

         <h1 class="text-2xl font-bold text-white mb-6 text-center">${title}</h1>
         
         <form id="auth-form" class="flex flex-col gap-4">
           ${!isLogin ? `
             <div class="flex flex-col gap-1">
               <label class="text-xs font-medium text-zinc-400">Tên hiển thị</label>
               <input type="text" id="name-input" name="name" placeholder="Ví dụ: Vu Thanh A" class="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors" required />
             </div>
           ` : ''}

           <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-zinc-400">Email</label>
              <input type="email" name="email" placeholder="name@example.com" class="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors" required />
           </div>

           <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-zinc-400">Mật khẩu</label>
              <input type="password" name="password" placeholder="••••••••" class="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors" required />
           </div>

           ${!isLogin ? `
             <div class="flex flex-col gap-1">
               <label class="text-xs font-medium text-zinc-400">Nhập lại mật khẩu</label>
               <input type="password" name="confirmPassword" placeholder="••••••••" class="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors" required />
             </div>
           ` : ''}

           <div id="error-message" class="text-red-500 text-sm hidden bg-red-500/10 p-3 rounded border border-red-500/20"></div>
           <div id="success-message" class="text-green-500 text-sm hidden bg-green-500/10 p-3 rounded border border-green-500/20"></div>

           <button type="submit" class="mt-2 bg-white text-black font-bold py-3 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              ${btnText}
           </button>
         </form>

         <div class="mt-6 text-center text-sm text-zinc-400">
            ${switchText} 
            <a href="${switchUrl}" class="text-white hover:underline font-medium" data-navigo>${switchLinkText}</a>
         </div>
       </div>
    </div>
  `;
}

// Logic xử lý Form
export const authScript = (type) => {
    const form = document.getElementById("auth-form");
    const errorMsg = document.getElementById("error-message");
    const successMsg = document.getElementById("success-message");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            errorMsg.classList.add("hidden");
            if(successMsg) successMsg.classList.add("hidden");
            errorMsg.innerText = "";
            // Lấy dữ liệu form
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const btn = form.querySelector("button");
            // Validate 
            if (!data.email || !data.password) {
                errorMsg.innerText = "Vui lòng nhập đầy đủ thông tin";
                errorMsg.classList.remove("hidden");
                return;
            }
            // Validate Password Confirmation
            if (type !== 'login' && data.password !== data.confirmPassword) {
                 errorMsg.innerText = "Mật khẩu nhập lại không khớp.";
                 errorMsg.classList.remove("hidden");
                 return;
            }
            // Regex Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                errorMsg.innerText = "Email không hợp lệ. Vui lòng kiểm tra lại.";
                errorMsg.classList.remove("hidden");
                return;
            }
            // Regex Validate Password 
            if (data.password.length < 8) {
                errorMsg.innerText = "Mật khẩu phải có ít nhất 8 ký tự.";
                errorMsg.classList.remove("hidden");
                return;
            }
            try {
                btn.disabled = true;
                btn.innerText = "Đang xử lý...";
                let response;
                if (type === 'login') {
                    // Gọi API Login
                    response = await client.post("/auth/login", {
                        email: data.email,
                        password: data.password
                    });
                    // Lưu Token
                    const responseData = response.data.data || response.data;
                    const { access_token, refresh_token, user } = responseData; 
                    localStorage.setItem("access_token", access_token);
                    localStorage.setItem("refresh_token", refresh_token);
                    store.setState({
                        auth: {
                            isAuthenticated: true,
                            user: user
                        }
                    });
                    // Chuyển hướng về trang chủ
                    router.navigate("/");
                } else {
                    const nameInput = document.getElementById("name-input");
                    const nameValue = nameInput ? nameInput.value : data.name;
                    response = await client.post("/auth/register", {
                        email: data.email,
                        password: data.password,
                        name: nameValue,
                        confirmPassword: data.confirmPassword
                    });
                    // Auto Login 
                    const responseData = response.data.data || response.data;
                    const { access_token, refresh_token, user } = responseData; 

                    localStorage.setItem("access_token", access_token);
                    localStorage.setItem("refresh_token", refresh_token);
                    store.setState({
                        auth: {
                            isAuthenticated: true,
                            user: user
                        }
                    });
                    if (successMsg) {
                        successMsg.innerText = "Đăng ký thành công! Đang vào trang chủ...";
                        successMsg.classList.remove("hidden");
                    }
                    setTimeout(() => {
                        router.navigate("/");
                    }, 500);
                }
            } catch (error) {
                console.error("Auth Error:", error);
                let message = "Có lỗi xảy ra, vui lòng thử lại.";
                if (error.response) {
                    console.log("Full Error Response:", error.response.data); 
                    if (error.response.data) {
                        if (error.response.data.errors) {
                             const details = Object.values(error.response.data.errors).join(", ");
                             message = details || error.response.data.message;
                        } 
                        else {
                            message = error.response.data.message || error.response.data.error || JSON.stringify(error.response.data);
                        }
                    } else {
                        message = `Lỗi Server (${error.response.status}): ${error.response.statusText}`;
                    }
                } else if (error.request) {
                    message = "Không thể kết nối đến máy chủ. Vui lòng kiểm tra đường truyền.";
                } else {

                    message = error.message;
                }
                errorMsg.innerText = message;
                errorMsg.classList.remove("hidden");
            } finally {
                btn.disabled = false;
                btn.innerText = type === 'login' ? "Đăng nhập" : "Tạo tài khoản";
            }
        });
    }
};

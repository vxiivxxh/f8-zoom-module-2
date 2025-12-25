import { authStore } from '../store/authStore.js';
import { validateName, validateEmail, validatePassword } from '../utils/validators.js';

export const renderRegister = (router) => {
  const app = document.getElementById('app');
  
  const content = `
    <div class="flex items-center justify-center min-h-screen bg-yt-black font-sans">
      <div class="w-full max-w-md p-8 rounded-lg bg-yt-player shadow-2xl">
        <div class="flex justify-center mb-8">
          <img src="https://music.youtube.com/img/on_platform_logo_dark.svg" alt="YouTube Music" class="h-8">
        </div>
        
        <h2 class="text-2xl font-bold text-center text-yt-text-primary mb-2">Tạo tài khoản</h2>
        <p class="text-center text-yt-text-secondary mb-8">Tham gia YouTube Music Clone</p>

        <form id="register-form" class="space-y-4">
          <div id="error-message" class="hidden p-3 text-sm text-red-500 bg-red-900/20 rounded border border-red-500/50"></div>
          
          <div>
            <label for="name" class="block text-sm font-medium text-yt-text-secondary mb-1">Họ và tên</label>
            <input 
              type="text" 
              id="name" 
              required
              class="w-full px-4 py-2 bg-yt-black border border-gray-700 rounded focus:outline-none focus:border-yt-text-primary text-yt-text-primary placeholder-gray-600 transition-colors"
              placeholder="Tên của bạn"
            >
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-yt-text-secondary mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              required
              class="w-full px-4 py-2 bg-yt-black border border-gray-700 rounded focus:outline-none focus:border-yt-text-primary text-yt-text-primary placeholder-gray-600 transition-colors"
              placeholder="name@example.com"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-yt-text-secondary mb-1">Mật khẩu</label>
            <input 
              type="password" 
              id="password" 
              required
              minlength="6"
              class="w-full px-4 py-2 bg-yt-black border border-gray-700 rounded focus:outline-none focus:border-yt-text-primary text-yt-text-primary placeholder-gray-600 transition-colors"
              placeholder="• • • • • •"
            >
          </div>

          <div>
            <label for="confirm-password" class="block text-sm font-medium text-yt-text-secondary mb-1">Xác nhận mật khẩu</label>
            <input 
              type="password" 
              id="confirm-password" 
              required
              minlength="6"
              class="w-full px-4 py-2 bg-yt-black border border-gray-700 rounded focus:outline-none focus:border-yt-text-primary text-yt-text-primary placeholder-gray-600 transition-colors"
              placeholder="• • • • • •"
            >
          </div>

          <button 
            type="submit" 
            class="w-full py-2.5 px-4 mt-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-yt-black"
          >
            Đăng Ký
          </button>
        </form>

        <div class="mt-6 text-center text-sm text-yt-text-secondary">
          Đã có tài khoản? 
          <a href="${import.meta.env.BASE_URL}login" class="text-blue-400 hover:text-blue-300 transition-colors" data-navigo>Đăng nhập</a>
        </div>
      </div>
    </div>
  `;

  app.innerHTML = content;

  const form = document.getElementById('register-form');
  const errorDiv = document.getElementById('error-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Basic validation
    let isValid = true;
    let errorMessage = '';

    if (!validateName(name)) {
        errorMessage = 'Tên phải có ít nhất 2 ký tự.';
        isValid = false;
    } else if (!validateEmail(email)) {
        errorMessage = 'Email không hợp lệ.';
        isValid = false;
    } else if (!validatePassword(password)) {
        errorMessage = 'Mật khẩu phải có ít nhất 6 ký tự.';
        isValid = false;
    } else if (password !== confirmPassword) {
        errorMessage = 'Mật khẩu không khớp.';
        isValid = false;
    }

    if (!isValid) {
      errorDiv.textContent = errorMessage;
      errorDiv.classList.remove('hidden');
      return;
    }

    // Clear previous errors
    errorDiv.classList.add('hidden');
    errorDiv.textContent = '';
    
    // Disable button
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang đăng ký & đăng nhập...';

    // Note: register args depend on authStore implementation. 
    // We updated authStore to match: register(name, email, password, confirmPassword)
    const result = await authStore.register(name, email, password, confirmPassword);

    if (result.success) {
      // Auto login after register or redirect to login? 
      // User requirements didn't specify, but UX usually prefers auto-login or redirect to login.
      // Let's redirect to login for clarity as authStore.register doesn't auto-set token usually unless API returns it.
      // Actually checking authStore.js I wrote earlier: it DOES NOT set token on register. So redirect to login.
      router.navigate('/');
    } else {
      errorDiv.textContent = result.error || 'Đăng ký thất bại.';
      errorDiv.classList.remove('hidden');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
};

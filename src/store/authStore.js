import { apiClient } from '../utils/api.js';

class AuthStore {
  constructor() {
    this.state = {
      user: null,
      isAuthenticated: false,
      isLoading: true,
    };
    this.listeners = [];
    this.init();
  }

  // Publisher: Đăng ký nhận thay đổi trạng thái
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Thông báo cho tất cả trình lắng nghe
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Khởi tạo: Kiểm tra token hiện có
  async init() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        await this.fetchCurrentUser();
      } catch (error) {
        console.error('Session hết hạn hoặc không hợp lệ:', error);
        this.logout();
      }
    } else {
      this.setState({ isLoading: false });
    }
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  async login(email, password) {
    this.setState({ isLoading: true });
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      
      // API trả về access_token (kiểu snake_case)
      const { access_token, refresh_token } = response.data || response;
      const accessToken = access_token;
      const refreshToken = refresh_token;
      
      if (!accessToken) {
          throw new Error('No access token received');
      }
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      await this.fetchCurrentUser();
      return { success: true };
    } catch (error) {
      this.setState({ isLoading: false });
      return { success: false, error: error.message };
    }
  }

  async register(name, email, password, confirmPassword) {
    this.setState({ isLoading: true });
    try {
      const response = await apiClient.post('/auth/register', { 
        name, 
        email, 
        password,
        confirmPassword 
      });
      
      // Tự động đăng nhập: API trả về các token và người dùng
      const { access_token, refresh_token, user } = response.data || response;
      const accessToken = access_token;
      const refreshToken = refresh_token;

      if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          
          // Cập nhật trạng thái người dùng trực tiếp nếu có, hoặc tìm nạp lại
          if (user) {
              this.setState({ 
                user: user, 
                isAuthenticated: true, 
                isLoading: false 
              });
          } else {
              await this.fetchCurrentUser();
          }
      } else {
          // Nếu không có token, chỉ dừng tải 
          this.setState({ isLoading: false });
      }

      return { success: true };
    } catch (error) {
      this.setState({ isLoading: false });
      return { success: false, error: error.message };
    }
  }

  async logout() {
    // Tùy chọn: Gọi API đăng xuất nếu có
    // await apiClient.post('/auth/logout'); 
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.setState({ 
      user: null, 
      isAuthenticated: false, 
      isLoading: false 
    });
  }

  async fetchCurrentUser() {
    try {
      const response = await apiClient.get('/auth/me');
      const userData = response.data || response;
      this.setState({ 
        user: userData, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      throw error;
    }
  }
  
  get isAuthenticated() {
    return this.state.isAuthenticated;
  }
  
  get user() {
    return this.state.user;
  }
}

export const authStore = new AuthStore();

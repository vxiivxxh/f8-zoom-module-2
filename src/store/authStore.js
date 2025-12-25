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

  // Publisher: Subscribe to state changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Initialize: Check for existing token
  async init() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        await this.fetchCurrentUser();
      } catch (error) {
        console.error('Session expired or invalid:', error);
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
      
      // API returns access_token (snake_case)
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
      
      // Auto-login: API returns tokens and user
      const { access_token, refresh_token, user } = response.data || response;
      const accessToken = access_token;
      const refreshToken = refresh_token;

      if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          
          // Set user state directly if returned, or fetch it
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
          // If no token, just stop loading (shouldn't happen with current API)
          this.setState({ isLoading: false });
      }

      return { success: true };
    } catch (error) {
      this.setState({ isLoading: false });
      return { success: false, error: error.message };
    }
  }

  async logout() {
    // Optional: Call logout API if exists
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
      this.setState({ 
        user: response.data, 
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

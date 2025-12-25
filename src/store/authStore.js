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
      
      // Assuming response contains { access_token: '...' } - adjust based on actual API
      const { accessToken, refreshToken } = response.data || response;
      
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
      await apiClient.post('/auth/register', { 
        name, 
        email, 
        password,
        confirmPassword 
      });
      // Auto-login or redirect to login page depending on requirements
      // Implementation Plan says redirect to Login or Home. 
      // Let's assume registration just creates account for now.
      this.setState({ isLoading: false });
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

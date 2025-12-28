const API_BASE_URL = 'https://youtube-music.f8team.dev/api';

export const apiClient = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Headers mặc định
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Thêm Authorization header nếu có token
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Lỗi API');
      }

      return data;
    } catch (error) {
      console.error('Yêu cầu API thất bại:', error);
      throw error;
    }
  },

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  },

  post(endpoint, body, options = {}) {
    return this.request(endpoint, { 
      ...options, 
      method: 'POST',
      body: JSON.stringify(body)
    });
  },

  put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body)
    });
  },

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  },

  getChartVideos(options = {}) {
    return this.get('/charts/videos', options);
  },

  getTopArtists(options = {}) {
    return this.get('/charts/top-artists', options);
  },

  getMoods(options = {}) {
    return this.get('/moods', options);
  },

  getPlaylistsByCountry(country, options = {}) {
    return this.get(`/playlists/by-country?country=${country}`, options);
  },

  getPersonalized(options = {}) {
    return this.get('/home/personalized', options);
  }
};

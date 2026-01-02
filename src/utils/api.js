const API_BASE_URL = 'https://youtube-music.f8team.dev/api';

export const apiClient = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    // Headers mặc định
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Thêm Authorization header nếu có token
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Lỗi API");
      }

      return data;
    } catch (error) {
      console.error("Yêu cầu API thất bại:", error);
      throw error;
    }
  },

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "GET" });
  },

  post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  },

  getChartVideos(params = {}, options = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.get(`/charts/videos?${qs}`, options);
  },

  getTopArtists(params = {}, options = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.get(`/charts/top-artists?${qs}`, options);
  },

  getMoods(options = {}) {
    return this.get("/moods", options);
  },

  getPlaylistsByCountry(country, options = {}) {
    return this.get(`/playlists/by-country?country=${country}`, options);
  },

  getPersonalized(options = {}) {
    return this.get("/home/personalized", options);
  },

  getExploreAlbums(options = {}) {
    return this.get("/explore/albums", options);
  },

  getExploreVideos(options = {}) {
    return this.get("/explore/videos", options);
  },

  getExploreMeta(options = {}) {
    return this.get("/explore/meta", options);
  },

  getNewReleases(options = {}) {
    return this.get("/explore/new-releases", options);
  },

  getChartCountries(options = {}) {
    return this.get("/charts/countries", options);
  },

  getSearchSuggestions(query, options = {}) {
    return this.get(
      `/search/suggestions?q=${encodeURIComponent(query)}`,
      options
    );
  },

  search(query, params = {}, options = {}) {
    // params có thể chứa limit, page
    const qs = new URLSearchParams({ q: query, ...params }).toString();
    return this.get(`/search?${qs}`, options);
  },

  getPlaylistDetail(slug, options = {}) {
    return this.get(`/playlists/details/${slug}`, options);
  },

  getAlbumDetail(slug, options = {}) {
    return this.get(`/albums/details/${slug}`, options);
  },

  getSongDetail(id, options = {}) {
    return this.get(`/songs/details/${id}`, options);
  },

  getVideoDetail(id, options = {}) {
    return this.get(`/videos/details/${id}`, options);
  },
  getCategories(options = {}) {
    return this.get("/categories", options);
  },

  getLines(params = {}, options = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.get(`/lines?${qs}`, options);
  },

  getMoodDetail(slug, params = {}, options = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.get(`/moods/${slug}?${qs}`, options);
  },

  getCategoryDetail(slug, params = {}, options = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.get(`/categories/${slug}?${qs}`, options);
  },

  getLineDetail(slug, options = {}) {
    return this.get(`/lines/${slug}`, options);
  },

  getLineSongs(slug, params = {}, options = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.get(`/lines/${slug}/songs?${qs}`, options);
  },

  getLinePlaylists(slug, params = {}, options = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.get(`/lines/${slug}/playlists?${qs}`, options);
  },

  getLineAlbums(slug, params = {}, options = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.get(`/lines/${slug}/albums?${qs}`, options);
  },

  getLineVideos(slug, params = {}, options = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.get(`/lines/${slug}/videos?${qs}`, options);
  },
};

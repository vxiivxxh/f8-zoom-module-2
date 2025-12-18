import axios from "axios";

// Lấy BASE_URL từ biến môi trường hoặc dùng giá trị mặc định
const BASE_URL = import.meta.env.VITE_BASE_URL || "https://youtube-music.f8team.dev/api";
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});
// Tự động đính kèm Access Token vào header
instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
let refreshPromise = null;
const forceLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
};
const getNewToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return false;
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });
    if (!response.ok) {
        throw new Error("Unauthorized");
    }
    return response.json();
  } catch {
    return false;
  }
};
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      if (!refreshPromise) {
        refreshPromise = getNewToken();
      }
      const newToken = await refreshPromise;
      if (newToken) {
        localStorage.setItem("access_token", newToken.access_token);
        localStorage.setItem("refresh_token", newToken.refresh_token);
        error.config.headers.Authorization = `Bearer ${newToken.access_token}`;
        return instance(error.config);
      } else {
        forceLogout();
      }
    }
    return Promise.reject(error);
  }
)
export const checkAuth = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return false;
    try {
        const response = await instance.get("/auth/me");
        if (response.data && response.data.data) {
             return response.data.data; 
        }
        return false;
    } catch (error) {
        console.error("Check Auth Failed:", error);
        return false;
    }
};
export const logout = async () => {
    try {
        await instance.post("/auth/logout");
    } catch (error) {
    } finally {
        forceLogout();
    }
};
export default instance;

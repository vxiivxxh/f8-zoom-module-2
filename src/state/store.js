const state = {
  auth: {
    user: null,
    isAuthenticated: false,
  },
  player: {
    currentSong: null,
    isPlaying: false,
    queue: [],
    history: [],
  },
};

// Danh sách các listener (người nghe) sẽ được gọi khi state thay đổi
const listeners = [];

export const store = {
  // Lấy trạng thái hiện tại của ứng dụng
  getState() {
    return state;
  },
  
  // Cập nhật trạng thái mới và thông báo cho tất cả listeners
  setState(newState) {
    Object.assign(state, newState); // Gộp state mới vào state cũ
    listeners.forEach((listener) => listener(state)); // Gọi tất cả các hàm đã đăng ký
  },
  
  // Đăng ký nhận thông báo khi state thay đổi (Observer Pattern)
  subscribe(listener) {
    listeners.push(listener);
    // Trả về hàm hủy đăng ký (unsubscribe) để tránh rò rỉ bộ nhớ
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  },
};

class PlayerStore {
  constructor() {
    this.state = {
      isPlaying: false,
      currentSong: null,
      queue: [],
      currentIndex: -1,
      volume: localStorage.getItem('yt_volume') ? parseInt(localStorage.getItem('yt_volume')) : 100,
      currentTime: 0,
      duration: 0,
    };
    this.listeners = [];
     this.player = null; // Instance YouTube Player
    this.initPlayer();
  }

  initPlayer() {
     // Tải YouTube IFrame API
     const tag = document.createElement('script');
     tag.src = "https://www.youtube.com/iframe_api";
     const firstScriptTag = document.getElementsByTagName('script')[0];
     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

     window.onYouTubeIframeAPIReady = () => {
        this.player = new window.YT.Player('yt-player-container', {
           height: '180',
           width: '320',
           playerVars: {
              'autoplay': 1,
              'controls': 0,
              'disablekb': 1,
              'fs': 0,
              'iv_load_policy': 3,
              'modestbranding': 1,
              'playsinline': 1,
              'rel': 0,
           },
           events: {
              'onReady': (event) => {
                  this.setVolume(this.state.volume);
                  if (this.state.currentSong) {
                      this.play(this.state.currentSong);
                  }
              },
              'onStateChange': (event) => {
                  if (event.data === window.YT.PlayerState.PLAYING) {
                      this.setState({ isPlaying: true });
                      this.startProgressLoop();
                  } else if (event.data === window.YT.PlayerState.PAUSED) {
                      this.setState({ isPlaying: false });
                      this.stopProgressLoop();
                  } else if (event.data === window.YT.PlayerState.ENDED) {
                      this.next();
                  }
              }
           }
        });
     };
     
     // Tạo container ẩn cho player nếu chưa tồn tại
     if (!document.getElementById('yt-player-container')) {
         const div = document.createElement('div');
         div.id = 'yt-player-container';
         // Mặc định ẩn, quản lý bằng CSS
         div.className = 'yt-video-container hidden-video';
         document.body.appendChild(div);
     }
  }

  startProgressLoop() {
      this.stopProgressLoop();
      this.progressInterval = setInterval(() => {
          if (this.player && this.player.getCurrentTime) {
              const currentTime = this.player.getCurrentTime();
              const duration = this.player.getDuration();
              this.setState({ currentTime, duration });
          }
      }, 1000);
  }

  stopProgressLoop() {
      if (this.progressInterval) clearInterval(this.progressInterval);
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  // Hành động
  play(song) {
    // Nếu đang chơi cùng một bài, chỉ cần resume
    if (this.state.currentSong && this.state.currentSong.id === song.id) {
       if (this.player && typeof this.player.playVideo === 'function') {
           this.player.playVideo();
       }
      this.setState({ isPlaying: true });
      return;
    }

    // Bài hát mới
    this.setState({
      currentSong: song,
      isPlaying: true,
      currentTime: 0,
      duration: song.duration || 0,
    });
    
    if (this.player && typeof this.player.loadVideoById === 'function') {
        // Giả sử 'link' hoặc 'encodeId' có thể dùng để tìm Video ID.
        // YouTube Music clones thường map encodeId sang Video ID qua API khác hoặc dùng ID trực tiếp nếu có.
        // Với bài tập này, giả sử `encodeId` LÀ video ID hoặc chúng ta có prop `videoId`.
        // Nhìn vào API thông thường, nó có thể là `encodeId`.
        const videoId = song.id; 
        this.player.loadVideoById(videoId);
    }

    // Logic hàng đợi
    if (this.state.queue.length === 0) {
        this.state.queue = [song];
        this.state.currentIndex = 0;
    } else {
        const index = this.state.queue.findIndex(s => s.id === song.id);
        if (index === -1) {
             this.state.queue.push(song);
             this.setState({ currentIndex: this.state.queue.length - 1});
        } else {
             this.setState({ currentIndex: index });
        }
    }
  }

  togglePlay() {
    if (this.state.isPlaying) {
        if (this.player) this.player.pauseVideo();
    } else {
        if (this.player) this.player.playVideo();
    }
    // Cập nhật state xảy ra trong onStateChange, nhưng cập nhật lạc quan cũng ổn
    this.setState({ isPlaying: !this.state.isPlaying });
  }

  next() {
      if (this.state.queue.length === 0) return;
      const nextIndex = (this.state.currentIndex + 1) % this.state.queue.length;
      this.play(this.state.queue[nextIndex]);
  }

  prev() {
      if (this.state.queue.length === 0) return;
      const prevIndex = (this.state.currentIndex - 1 + this.state.queue.length) % this.state.queue.length;
      this.play(this.state.queue[prevIndex]);
  }

  setVolume(volume) {
    this.setState({ volume });
    localStorage.setItem('yt_volume', volume);
    if (this.player && typeof this.player.setVolume === 'function') {
        this.player.setVolume(volume);
    }
  }
  
  seek(time) {
      if (this.player && typeof this.player.seekTo === 'function') {
          this.player.seekTo(time, true);
          this.setState({ currentTime: time });
      }
  }
}

export const playerStore = new PlayerStore();

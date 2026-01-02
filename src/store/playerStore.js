class PlayerStore {
  constructor() {
    this.state = {
      isPlaying: false,
      currentSong: null,
      queue: [],
      currentIndex: -1,
      volume: localStorage.getItem("yt_volume")
        ? parseInt(localStorage.getItem("yt_volume"))
        : 100,
      isMuted: false,
      currentTime: 0,
      duration: 0,
    };
    this.listeners = [];
    this.player = null; // Instance YouTube Player
    this.audio = new Audio(); // HTML5 Audio Player
    this.mode = "NONE"; // 'YOUTUBE' | 'AUDIO' | 'NONE'

    this.initPlayer();
    this.initAudio();
  }

  initAudio() {
    // Bind Audio Events
    this.audio.addEventListener("ended", () => {
      this.next();
    });

    this.audio.addEventListener("timeupdate", () => {
      if (this.mode === "AUDIO") {
        this.setState({
          currentTime: this.audio.currentTime,
          duration: this.audio.duration || this.state.duration,
        });
      }
    });

    this.audio.addEventListener("loadedmetadata", () => {
      if (this.mode === "AUDIO") {
        this.setState({ duration: this.audio.duration });
      }
    });

    this.audio.addEventListener("play", () =>
      this.setState({ isPlaying: true })
    );
    this.audio.addEventListener("pause", () =>
      this.setState({ isPlaying: false })
    );

    // Initialize volume
    this.audio.volume = this.state.volume / 100;
  }

  initPlayer() {
    // Tải YouTube IFrame API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];

    // Avoid duplicate script injection
    if (
      !document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      )
    ) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      this.player = new window.YT.Player("yt-player-container", {
        height: "180",
        width: "320",
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            this.setVolume(this.state.volume);
            // Only double-check if we need to resume a YT video (edge case on reload)
          },
          onStateChange: (event) => {
            if (this.mode !== "YOUTUBE") return;

            if (event.data === window.YT.PlayerState.PLAYING) {
              this.setState({ isPlaying: true });
              this.startProgressLoop();
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              this.setState({ isPlaying: false });
              this.stopProgressLoop();
            } else if (event.data === window.YT.PlayerState.ENDED) {
              this.next();
            }
          },
        },
      });
    };

    // Tạo container ẩn cho player nếu chưa tồn tại
    if (!document.getElementById("yt-player-container")) {
      const div = document.createElement("div");
      div.id = "yt-player-container";
      // Mặc định ẩn, quản lý bằng CSS
      div.className = "yt-video-container hidden-video";
      document.body.appendChild(div);
    }
  }

  startProgressLoop() {
    this.stopProgressLoop();
    this.progressInterval = setInterval(() => {
      if (
        this.mode === "YOUTUBE" &&
        this.player &&
        this.player.getCurrentTime
      ) {
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
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  // Hành động
  play(song) {
    // Nếu đang chơi cùng một bài, chỉ cần resume
    if (this.state.currentSong && this.state.currentSong.id === song.id) {
      this.togglePlay();
      return;
    }

    // Reset previous playback
    this.stopAll();

    // Bài hát mới
    this.setState({
      currentSong: song,
      isPlaying: true, // Will be confirmed by events
      currentTime: 0,
      duration: song.duration || 0,
    });

    // Choose Player
    if (song.audioUrl) {
      this.mode = "AUDIO";
      this.audio.src = song.audioUrl;
      this.audio.play().catch((e) => console.error("Audio Play Error:", e));
    } else {
      this.mode = "YOUTUBE";
      if (this.player && typeof this.player.loadVideoById === "function") {
        this.player.loadVideoById(song.id);
      } else {
        // Queue it up or retry?
        // API might not be ready. Simple retry:
        setTimeout(() => {
          if (this.state.currentSong.id === song.id && this.player) {
            this.player.loadVideoById(song.id);
          }
        }, 1000);
      }
    }

    // Logic hàng đợi
    if (this.state.queue.length === 0) {
      this.state.queue = [song];
      this.state.currentIndex = 0;
    } else {
      const index = this.state.queue.findIndex((s) => s.id === song.id);
      if (index === -1) {
        this.state.queue.push(song);
        this.setState({ currentIndex: this.state.queue.length - 1 });
      } else {
        this.setState({ currentIndex: index });
      }
    }
  }

  stopAll() {
    // Pause YouTube
    if (this.player && typeof this.player.pauseVideo === "function") {
      this.player.pauseVideo();
    }
    this.stopProgressLoop();

    // Pause Audio
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  setQueue(songs, startIndex = 0) {
    this.state.queue = songs;
    this.state.currentIndex = startIndex;
    const song = songs[startIndex];
    if (song) {
      // Force play new song, even if same ID (context changed)
      // But play() checks ID. We need to bypass or prep.
      // Actually, play() check handles resume. If we want to restart, we should stop first?
      // Let's rely on play() logic. If same song, it resumes.
      // If user wants to restart, they can seek.
      // But setQueue usually implies starting fresh context.
      // Let's effectively "stop" current if it matches to force reload?
      if (this.state.currentSong && this.state.currentSong.id === song.id) {
        this.seek(0);
        if (!this.state.isPlaying) this.togglePlay();
      } else {
        this.play(song);
      }
    }
  }

  togglePlay() {
    if (this.state.isPlaying) {
      // PAUSE
      if (this.mode === "YOUTUBE" && this.player) this.player.pauseVideo();
      if (this.mode === "AUDIO" && this.audio) this.audio.pause();
    } else {
      // PLAY
      if (this.mode === "YOUTUBE" && this.player) this.player.playVideo();
      if (this.mode === "AUDIO" && this.audio) this.audio.play();
    }
    // Optimistic update
    this.setState({ isPlaying: !this.state.isPlaying });
  }

  next() {
    if (this.state.queue.length === 0) return;
    const nextIndex = (this.state.currentIndex + 1) % this.state.queue.length;
    this.play(this.state.queue[nextIndex]);
  }

  prev() {
    if (this.state.queue.length === 0) return;
    const prevIndex =
      (this.state.currentIndex - 1 + this.state.queue.length) %
      this.state.queue.length;
    this.play(this.state.queue[prevIndex]);
  }

  toggleMute() {
    const isMuted = !this.state.isMuted;
    this.setState({ isMuted });

    // YouTube
    if (this.player && typeof this.player.mute === "function") {
      if (isMuted) this.player.mute();
      else this.player.unMute();
    }

    // Audio
    if (this.audio) {
      this.audio.muted = isMuted;
    }
  }

  setVolume(volume) {
    this.setState({ volume, isMuted: parseInt(volume) === 0 });
    localStorage.setItem("yt_volume", volume);

    // YouTube
    if (this.player && typeof this.player.setVolume === "function") {
      this.player.setVolume(volume);
    }

    // Audio (0.0 - 1.0)
    if (this.audio) {
      this.audio.volume = volume / 100;
      this.audio.muted = parseInt(volume) === 0;
    }
  }

  seek(time) {
    if (
      this.mode === "YOUTUBE" &&
      this.player &&
      typeof this.player.seekTo === "function"
    ) {
      this.player.seekTo(time, true);
    }
    if (this.mode === "AUDIO" && this.audio) {
      this.audio.currentTime = time;
    }
    this.setState({ currentTime: time });
  }
}

export const playerStore = new PlayerStore();

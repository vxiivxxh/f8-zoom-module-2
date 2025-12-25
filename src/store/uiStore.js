class UIStore {
  constructor() {
    this.state = {
      isSidebarCollapsed: localStorage.getItem('sidebarCollapsed') === 'true',
    };
    this.listeners = [];
    this.init();
  }

  init() {
    this.applyState();
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

  toggleSidebar() {
    this.state.isSidebarCollapsed = !this.state.isSidebarCollapsed;
    localStorage.setItem('sidebarCollapsed', this.state.isSidebarCollapsed);
    this.applyState();
    this.notify();
  }

  applyState() {
    if (this.state.isSidebarCollapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
  }

  get isSidebarCollapsed() {
    return this.state.isSidebarCollapsed;
  }
}

export const uiStore = new UIStore();

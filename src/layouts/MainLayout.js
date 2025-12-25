
import { Sidebar } from '../components/Sidebar';
import { Header, setupHeaderEvents } from '../components/Header';
import { Player, setupPlayerEvents } from '../components/Player';
import { playerStore } from '../store/playerStore';
import { authStore } from '../store/authStore';

export const MainLayout = (content, router) => {
  const app = document.getElementById('app');
  
  const render = () => {
    app.innerHTML = `
        <div class="flex h-screen w-full bg-yt-base text-yt-text-primary overflow-hidden relative">
            <div class="aurora-bg"></div>
            ${Sidebar()}
            
            <div class="flex flex-col flex-1 pl-sidebar transition-all relative z-10">
                ${Header()}
                
                <main class="flex-1 overflow-y-auto pb-player px-8 scroll-smooth">
                    ${content}
                </main>
            </div>
            
            ${playerStore.state.currentSong ? Player() : ''}
        </div>
    `;

    // Attach events
    setupHeaderEvents(router);
    if (playerStore.state.currentSong) {
        setupPlayerEvents();
    }
    
    // Highlight active link
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('bg-yt-hover', 'text-yt-text-primary');
        }
    });
  };

  render();

  // Subscribe to player state changes to re-render player only?
  // Re-rendering entire layout on player change is expensive and kills scroll state.
  // Better approach: Separate Player rendering or update DOM safely.
  // For now, let's just make the Player a separate mount point or subscribe inside it.
  // BUT MainLayout is called by pages. 
  // Optimization: Only update the Player container if it exists.
  
  const playerUnsub = playerStore.subscribe((state) => {
      // Logic to update Player UI without clearing main content
      const existingPlayer = document.querySelector('.bg-yt-player.fixed.bottom-0');
      if (state.currentSong && !existingPlayer) {
          // Player appeared for first time -> Re-render layout to adjust padding? 
          // Or just append Player.
           const appDiv = document.querySelector('#app > div');
           if(appDiv) {
               const tempDiv = document.createElement('div');
               tempDiv.innerHTML = Player();
               appDiv.appendChild(tempDiv.firstElementChild);
               setupPlayerEvents();
           }
      } else if (state.currentSong && existingPlayer) {
          // Update existing player content
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = Player();
          existingPlayer.replaceWith(tempDiv.firstElementChild);
          setupPlayerEvents();
      }
  });

  const authUnsub = authStore.subscribe((state) => {
      // Re-render Header
      const headerContainer = document.querySelector('header');
      if (headerContainer) {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = Header();
          const newHeader = tempDiv.firstElementChild;
          headerContainer.replaceWith(newHeader);
          setupHeaderEvents(router);
      }
  });
};

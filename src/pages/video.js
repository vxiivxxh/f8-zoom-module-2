import { apiClient } from '../utils/api';
import { MainLayout } from '../layouts/MainLayout';
import { escapeHTML } from '../utils/security';
import { Card } from '../components/Card';

export const renderVideo = async (router, match) => {
    const id = match?.data?.id;
    if (!id) return;

    // 1. Loading State
    MainLayout(`
        <div class="flex items-center justify-center h-full">
            <div class="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
    `, router);

    try {
        const data = await apiClient.getVideoDetail(id);
        
        // Data Fallback
        const video = data.data || data;
        if (!video || !video.videoId) {
            throw new Error('Invalid video data');
        }

        const related = video.related || [];
        const title = escapeHTML(video.title || 'Unknown Video');
        const description = escapeHTML(video.description || '');
        const artistName = Array.isArray(video.artists) 
            ? video.artists.map(a => a.name).join(', ') 
            : (video.artist || 'Unknown Artist');

        // 2. Render Content
        const content = `
            <div class="flex flex-col lg:flex-row gap-6 p-6 h-full overflow-hidden">
                <!-- Left: Player & Info -->
                <div class="flex-1 flex flex-col min-w-0 overflow-y-auto scrollbar-none pb-20">
                    <div class="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl mb-4">
                        <iframe 
                            class="absolute inset-0 w-full h-full"
                            src="https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0" 
                            title="${title}"
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>

                    <div class="space-y-2">
                        <h1 class="text-2xl font-bold text-white line-clamp-2">${title}</h1>
                        <div class="text-yt-text-secondary text-sm font-medium flex items-center gap-2">
                            <span>${escapeHTML(artistName)}</span>
                             ${video.views ? `<span>• ${formatViews(video.views)} views</span>` : ''}
                             ${video.uploadDate ? `<span>• ${video.uploadDate}</span>` : ''}
                        </div>
                         ${description ? `
                            <div class="mt-4 p-4 bg-white/5 rounded-lg text-sm text-yt-text-secondary whitespace-pre-line">
                                ${description}
                            </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Right: Related Videos -->
                <div class="w-full lg:w-[400px] flex-shrink-0 flex flex-col h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-4">
                    <h3 class="text-lg font-bold mb-4 sticky top-0 bg-yt-base/95 backdrop-blur z-10 py-2">Related Videos</h3>
                    <div class="overflow-y-auto scrollbar-styled flex-1 pb-20">
                        <div class="flex flex-col gap-4">
                            ${related.length > 0 
                                ? related.map(item => Card(item, { type: 'video' })).join('')
                                : '<div class="text-yt-text-secondary text-sm">No related videos found.</div>'
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;

        MainLayout(content, router, { padding: 'p-0' });

        // 3. Setup Events
        setupVideoEvents(router);

    } catch (error) {
        console.error("Video load error", error);
        MainLayout(`
            <div class="text-center py-20 text-red-500">
                <h3 class="text-xl font-bold">Unable to load video</h3>
                <p>${error.message}</p>
                <button onclick="window.history.back()" class="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors">Go Back</button>
            </div>
        `, router);
    }
};

const setupVideoEvents = (router) => {
    const main = document.querySelector('main');
    if (!main) return;

    main.addEventListener('click', (e) => {
        const card = e.target.closest('.card-item');
        if (card) {
            const type = card.dataset.type;
            const id = card.dataset.id;
            
            if (type === 'video') {
                e.preventDefault();
                router.navigate(`/video/${id}`);
            }
        }
    });
};

const formatViews = (num) => {
    if (!num) return '';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
};

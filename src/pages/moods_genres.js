import { apiClient } from '../utils/api';
import { escapeHTML } from '../utils/security';
import { MainLayout } from '../layouts/MainLayout';

export const renderMoodsGenres = async (router) => {
  MainLayout(`
      <div class="flex items-center justify-center h-64">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
  `, router);

  try {
    const response = await apiClient.getExploreMeta();
    // Meta returns { categories: [...] }
    const moods = response?.categories || response?.data || [];

    const content = `
       <div class="space-y-8">
         <div class="flex items-center justify-between mb-4">
            <h2 class="text-3xl font-bold">Tâm trạng và thể loại</h2>
         </div>
         
         <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            ${moods.length > 0 
                ? moods.map(mood => renderMoodCard(mood)).join('') 
                : '<p class="text-gray-400 col-span-full">Không có dữ liệu tâm trạng.</p>'
            }
         </div>
       </div>
     `;

    MainLayout(content, router);

  } catch (error) {
     console.error("Moods & Genres load error", error);
     MainLayout(`
       <div class="text-center py-20 text-red-500">
           <h3 class="text-xl font-bold">Lỗi tải dữ liệu</h3>
           <p>${error.message}</p>
           <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200">Thử lại</button>
       </div>
    `, router);
  }
};

const renderMoodCard = (item) => {
    const rawTitle = item.title || item.name || 'Mood';
    const title = escapeHTML(rawTitle);
    
    // Random gradient logic or color logic from item if available
    // item.color might be hex like #FFDAC1. If so we can use style directly or map to tailwind classes if we had a mapping.
    // For now stick to random gradients or simple style with inline color if exists
    
    let styleAttr = '';
    let bgClass = 'bg-gray-800'; // fallback
    
    if (item.color) {
         styleAttr = `style="background-color: ${item.color}; border-left: 6px solid border-black/20"`;
         bgClass = ''; // remove fallback
    } else {
        const gradients = [
            'from-purple-600 to-blue-600',
            'from-red-500 to-orange-500',
            'from-green-500 to-teal-500',
            'from-pink-500 to-rose-500',
            'from-yellow-400 to-orange-500',
            'from-indigo-500 to-purple-600'
        ];
        const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
        bgClass = `bg-gradient-to-br ${randomGradient}`;
    }

    
    return `
      <div class="group cursor-pointer relative h-48 rounded-lg overflow-hidden ${bgClass} hover:scale-105 transition-transform duration-300 shadow-lg" ${styleAttr}>
         <div class="absolute inset-0 p-6 flex flex-col justify-between">
            <h3 class="text-2xl font-bold text-white shadow-sm break-words">${title}</h3>
            ${item.description ? `<p class="text-sm text-white/90 line-clamp-2">${escapeHTML(item.description)}</p>` : ''}
         </div>
         <a href="/explore?category=${item.slug || ''}" class="absolute inset-0" data-navigo></a>
      </div>
    `;
};

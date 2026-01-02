import { escapeHTML } from '../utils/security';
import { Icons } from './Icons';

/**
 * Shared Card Factory
 * @param {Object} item - The data item (song, album, playlist, video, artist)
 * @param {Object} options - Override properties { type, showType }
 * @returns {string} HTML string
 */
export const Card = (item, options = {}) => {
    // 1. Determine Type
    // API item usually has .type. If not, fallback to options.type, then 'song'
    const type = item.type || options.type || 'song';
    
    // 2. Determine ID and Slug
    // Some items use encodeId (from ZingMP3 origin) or _id / id
    const id = item.encodeId || item.id || item._id;
    // Prefer slug if available for nice URLs, but ID is reliable for routing logic
    const slug = item.slug || '';

    // 3. Title & Subtitle
    const rawTitle = item.title || item.name || 'Untitled';
    const title = escapeHTML(rawTitle);

    let rawSubtitle = '';
    if (type === 'artist') {
        rawSubtitle = 'Nghệ sĩ';
    } else if (Array.isArray(item.artists)) {
        rawSubtitle = item.artists.map(a => typeof a === 'string' ? a : a.name).join(', ');
    } else if (item.artists && typeof item.artists === 'string') {
        rawSubtitle = item.artist;
    } else if (item.description) {
        rawSubtitle = item.description;
    }
    const subtitle = escapeHTML(rawSubtitle);

    // 4. Image
    const image = (item.thumbnails && item.thumbnails[0]) 
               || item.thumbnail 
               || item.thumb 
               || item.image 
               || 'https://via.placeholder.com/300?text=No+Image';

    // 5. Classes based on type
    const isArtist = type === 'artist';
    const isVideo = type === 'video';

    // Container width
    // Video is wider, Artist/Album/Playlist are usually square
    const widthClass = isVideo ? 'w-80' : 'w-48';
    
    // Image Aspect Ratio
    const aspectClass = isVideo ? 'aspect-video rounded-lg' : (isArtist ? 'aspect-square rounded-full' : 'aspect-square rounded-md');

    // serialize for data attribute
    const jsonItem = JSON.stringify(item).replace(/'/g, "&#39;");

    return `
      <div class="group cursor-pointer flex-shrink-0 ${widthClass} snap-start card-item"
           data-type="${type}"
           data-id="${id}"
           data-slug="${slug}"
           data-item='${jsonItem}'>
         
         <div class="relative ${aspectClass} mb-3 overflow-hidden bg-gray-800 shadow-lg group-hover:shadow-xl transition-shadow">
            <img src="${image}" alt="${title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
            
            <!-- Overlay Play Button -->
            <!-- Artists usually don't have play buttons overlaid in listings, but let's keep consistent or hide it -->
            ${!isArtist ? `
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button class="play-btn w-12 h-12 bg-white text-black rounded-full flex items-center justify-center pl-1 hover:scale-110 transition-transform shadow-lg" title="Play">
                  ${Icons.Play}
               </button>
            </div>
            ` : ''}
         </div>

         <div class="${isArtist ? 'text-center' : ''}">
            <h3 class="font-bold text-white truncate hover:underline text-[15px]" title="${title}">${title}</h3>
            ${subtitle ? `<p class="text-sm text-yt-text-secondary truncate mt-1" title="${subtitle}">${subtitle}</p>` : ''}
         </div>
      </div>
    `;
};

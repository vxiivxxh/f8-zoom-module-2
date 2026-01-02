
/**
 * Map of genre keywords to accent colors
 */
const GENRE_COLORS = {
  'Rock': '#FF0000', // Red
  'Pop': '#2BA640', // Green
  'R&B': '#C40F62', // Pink/Purple
  'Hip-Hop': '#DA6F03', // Orange
  'Jazz': '#546E7A', // Blue Gray
  'Electronic': '#0091EA', // Light Blue
  'Indie': '#7E57C2', // Deep Purple
  'Classical': '#8D6E63', // Brown
  'Country': '#FF8F00', // Amber
  'K-Pop': '#EC407A', // Pink
};

/**
 * Fallback colors for unmatched genres
 */
const FALLBACK_COLORS = [
    '#C62828', // Red
    '#AD1457', // Pink
    '#6A1B9A', // Purple
    '#4527A0', // Deep Purple
    '#283593', // Indigo
    '#1565C0', // Blue
    '#0277BD', // Light Blue
    '#00838F', // Cyan
    '#00695C', // Teal
    '#2E7D32', // Green
    '#9E9D24', // Lime
    '#F9A825', // Yellow
    '#EF6C00', // Orange
    '#D84315', // Deep Orange
];

const getAccentColor = (title) => {
    // Check for keyword matches
    for (const [key, color] of Object.entries(GENRE_COLORS)) {
        if (title.toLowerCase().includes(key.toLowerCase())) {
            return color;
        }
    }
    
    // Fallback: Deterministic hash
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
        hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
};

export const MoodCard = (item, type = "category") => {
  const title = item.title || item.name || "Mood";
  const accentColor = item.color || getAccentColor(title);

  // Fixed height (~56-64px -> h-16 is 64px, h-14 is 56px)
  // Dark gray bg: bg-[#212121] or bg-gray-800
  // Accent bar: w-1.5

  return `
    <div class="group relative flex items-center h-12 w-[180px] bg-[#292929] hover:bg-[#3e3e3e] active:bg-[#222222] rounded-xl overflow-hidden transition-colors outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-white mood-card"
       data-type="${type}"
       data-slug="${item.slug || ""}"
       data-navigo>
        
        <!-- Accent Bar on Left -->
        <div class="h-full w-1.5 shrink-0" style="background-color: ${accentColor}"></div>
        
        <!-- Label -->
        <div class="flex-1 px-4 flex items-center h-full">
            <span class="text-white font-medium text-[15px] truncate select-none">
                ${title}
            </span>
        </div>
    </div>
    `;
};

export const MoodGrid = (items, type = "category") => {
  if (!items || items.length === 0) return "";

  // Grid with fixed 180px columns
  return `
     <div class="grid gap-4" style="grid-template-columns: repeat(auto-fill, 180px);">
        ${items.map((item) => MoodCard(item, type)).join("")}
     </div>
    `;
};

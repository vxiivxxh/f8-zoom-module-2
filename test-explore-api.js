import { apiClient } from './src/utils/api.js';

// Polyfill for fetch in Node.js environment if needed, or assume running in browser context via vite
// Since we are running in node, we might need a fetch polyfill or just use node-fetch if available.
// However, the project seems to use standard fetch.
// Let's try to run this script using node, but first we need to see how api.js implements apiClient.

// Wait, I can't import relative to root easily without package.json "type": "module" which is true.
// But apiClient likely uses browser specific features or relative URLs.
// Let's just create a standalone script that mimics the API call using fetch.

const API_BASE = 'https://youtube-music.f8team.dev/api';

async function testExplore() {
  try {
    const response = await fetch(`${API_BASE}/explore/new-releases`);
    const data = await response.json();
    
    // Inspect the first item
    const items = data.items || data.data || [];
    if (items.length > 0) {
      console.log('First Item Structure:', JSON.stringify(items[0], null, 2));
      
      // Specifically check image fields
      const item = items[0];
      const image = (item.thumbnails && item.thumbnails[0]) || item.thumbnail || item.image;
      console.log('Extracted Image URL:', image);
    } else {
      console.log('No items returned');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

testExplore();

import { request, logResult, context, COLORS } from '../utils/client.js';

export async function runHomeTests() {
    console.log(`\n${COLORS.CYAN}--- Home Module Tests ---${COLORS.RESET}`);

    // Albums
    const albumsRes = await request('/home/albums-for-you');
    logResult('Home - Albums', albumsRes);
    if (albumsRes.ok) {
        // AppService.js lines 33-36: returns res.data directly
        // So structure is { data: [...] }
        const items = albumsRes.data || [];
        
        if (Array.isArray(items) && items.length > 0) {
             console.log('  Debug Album Item Keys:', Object.keys(items[0]));
             context.albumId = items[0].encodeId || items[0].id;
        } else if (items.data && Array.isArray(items.data) && items.data.length > 0) {
             console.log('  Debug Album Item Keys (nested):', Object.keys(items.data[0]));
             context.albumId = items.data[0].encodeId || items.data[0].id;
        } else {
            console.log(COLORS.YELLOW + "  Warn: No items found in Home Albums." + COLORS.RESET);
        }
    }

    // Hits
    const hitsRes = await request('/home/todays-hits');
    logResult('Home - Today Hits', hitsRes);

    // Quick Picks
    const quickPicksRes = await request('/quick-picks');
    logResult('Home - Quick Picks', quickPicksRes);

    // Personalized
    if (context.token) {
        const personalRes = await request('/home/personalized');
        logResult('Home - Personalized (Auth)', personalRes);
    } else {
        console.log(`${COLORS.YELLOW}SKIP${COLORS.RESET} Home - Personalized (No Token)`);
    }

    // Playlists by Country
    const countryRes = await request('/playlists/by-country?country=VN');
    logResult('Home - Playlists (VN)', countryRes);
    if (countryRes.ok) {
         // Try to capture playlist ID if search fails
         const items = countryRes.data || [];
         const list = Array.isArray(items) ? items : (items.data || []);
         
         if (list.length > 0 && !context.playlistId) {
             context.playlistId = list[0].encodeId || list[0].id;
             // console.log('Captured Playlist ID from Home:', context.playlistId);
         }
    }
}

import { request, logResult, context, COLORS } from '../utils/client.js';

export async function runSearchTests() {
    console.log(`\n${COLORS.CYAN}--- Search Module Tests ---${COLORS.RESET}`);

    // Suggestions
    const suggRes = await request('/search/suggestions?q=son');
    logResult('Search - Suggestions ("son")', suggRes);
    
    if (suggRes.ok) {
         // console.log('Suggestions Data:', JSON.stringify(suggRes.data).substring(0, 200));
         const items = suggRes.data?.data?.items || suggRes.data?.items || [];
         if (items.length > 0) {
              console.log('  Debug Suggestion Keys:', Object.keys(items[0]));
              // Try capture here if not already captured
              const song = items.find(i => i.type === 'song' || i.title); // Suggestions might not have type, assuming title?
              // Actually suggestions usually don't have full IDs or types sometimes. Let's see structure.
         }
    }

    // Query
    const searchRes = await request('/search?q=hit'); // Changed query to 'hit' for broader results
        // AppService.js line 215: returns res.data
        // Endpoints doc says: GET /search returns results
        // Usually search result has 'items' or 'data.items'
        
        // Debug data structure
        // console.log('Search Data:', JSON.stringify(searchRes.data).substring(0, 200));

        const data = searchRes.data || {};
        const items = data.items || data.data?.items || [];
        
        console.log(`  Debug Search: Found ${items.length} items.`);
        if (items.length > 0) console.log('  Debug Search Item Keys:', Object.keys(items[0]));

        if (items && items.length > 0) {
            const song = items.find(i => i.type === 'song');
            if (song) {
                context.songId = song.encodeId || song.id;
            } else {
                 console.log(COLORS.YELLOW + "  Warn: No song found in Search results." + COLORS.RESET);
            }
            
            const playlist = items.find(i => i.type === 'playlist');
            if (playlist) {
                context.playlistId = playlist.encodeId;
            } else {
                 console.log(COLORS.YELLOW + "  Warn: No playlist found in Search results." + COLORS.RESET);
            }
        } else {
             console.log(COLORS.YELLOW + "  Warn: No items found in Search response." + COLORS.RESET);
        }
    }
}

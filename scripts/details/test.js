import { request, logResult, context, COLORS } from '../utils/client.js';

export async function runDetailsTests() {
    console.log(`\n${COLORS.CYAN}--- Content Details Tests ---${COLORS.RESET}`);

    // Pre-requisites: We need valid IDs/Slugs. 
    // We depend on previous tests (Home/Explore/Search) to populate context.
    
    // 1. Song Details
    if (context.songId) {
        const songRes = await request(`/songs/details/${context.songId}`);
        logResult(`Details - Song (${context.songId})`, songRes);
    } else {
        console.log(`${COLORS.YELLOW}SKIP${COLORS.RESET} Details - Song (No Song ID captured)`);
    }

    // 2. Album Details
    if (context.albumId) {
        const albumRes = await request(`/albums/details/${context.albumId}`);
        logResult(`Details - Album (${context.albumId})`, albumRes);
    } else {
        console.log(`${COLORS.YELLOW}SKIP${COLORS.RESET} Details - Album (No Album ID captured)`);
    }

    // 3. Playlist Details
    if (context.playlistId) {
        const playlistRes = await request(`/playlists/details/${context.playlistId}`);
        logResult(`Details - Playlist (${context.playlistId})`, playlistRes);
    } else {
        console.log(`${COLORS.YELLOW}SKIP${COLORS.RESET} Details - Playlist (No Playlist ID captured)`);
    }
}

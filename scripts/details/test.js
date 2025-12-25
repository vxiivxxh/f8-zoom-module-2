import { request, logResult, context, COLORS } from '../utils/client.js';

export async function runDetailsTests() {
    console.log(`\n${COLORS.CYAN}--- Content Details Tests ---${COLORS.RESET}`);

    if (context.songId) {
        const res = await request(`/songs/details/${context.songId}`);
        logResult(`Details - Song (${context.songId})`, res);
    } else {
        console.log(`${COLORS.YELLOW}SKIP${COLORS.RESET} Details - Song (No Song ID captured)`);
    }

    if (context.albumId) {
        const res = await request(`/albums/details/${context.albumId}`);
        logResult(`Details - Album (${context.albumId})`, res);
    } else {
        console.log(`${COLORS.YELLOW}SKIP${COLORS.RESET} Details - Album (No Album ID captured)`);
    }

    if (context.playlistId) {
        const res = await request(`/playlists/details/${context.playlistId}`);
        logResult(`Details - Playlist (${context.playlistId})`, res);
    } else {
        console.log(`${COLORS.YELLOW}SKIP${COLORS.RESET} Details - Playlist (No Playlist ID captured provided by Search)`);
    }
}

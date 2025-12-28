import { request, logResult, COLORS } from '../utils/client.js';

export async function runExploreTests() {
    console.log(`\n${COLORS.CYAN}--- Explore Module Tests ---${COLORS.RESET}`);

    // 1. New Releases
    const releaseRes = await request('/explore/new-releases');
    logResult('Explore - New Releases', releaseRes);

    // 2. Charts - Videos
    const chartVideosRes = await request('/charts/videos');
    logResult('Explore - Charts Videos', chartVideosRes);

    // 3. Charts - Top Artists
    const topArtistsRes = await request('/charts/top-artists');
    logResult('Explore - Top Artists', topArtistsRes);

    // 4. Moods / Home Categories (Potential Chips)
    const moodsRes = await request('/moods');
    logResult('Explore - Moods (for Chips)', moodsRes);
    if (moodsRes.ok && moodsRes.data.items) {
        console.log(`   > Found ${moodsRes.data.items.length} moods`);
        // Log first mood title for verification
        if (moodsRes.data.items.length > 0) {
            console.log(`   > Sample Mood: ${moodsRes.data.items[0].title}`);
        }
    }

    // 5. Explore Meta (Alternative for Categories)
    const metaRes = await request('/explore/meta');
    logResult('Explore - Meta', metaRes);
}

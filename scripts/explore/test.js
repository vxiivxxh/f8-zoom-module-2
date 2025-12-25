import { request, logResult, COLORS } from '../utils/client.js';

export async function runExploreTests() {
    console.log(`\n${COLORS.CYAN}--- Explore Module Tests ---${COLORS.RESET}`);

    // New Releases
    const releaseRes = await request('/explore/new-releases');
    logResult('Explore - New Releases', releaseRes);

    // Meta / Categories
    // Use /moods? or /categories? Based on API_ENDPOINTS.md
    const catsRes = await request('/categories');
    logResult('Explore - Categories', catsRes);

    // Moods (Home Categories moved to Explore concept in UI mostly)
    const moodsRes = await request('/moods');
    logResult('Explore - Moods', moodsRes);
}

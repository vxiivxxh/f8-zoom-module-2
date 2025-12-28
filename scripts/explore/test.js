import { request, logResult, COLORS } from '../utils/client.js';

export async function runExploreTests() {
  console.log(`\n${COLORS.CYAN}--- Explore Module Tests ---${COLORS.RESET}`);

  // 1. New Releases
  const releaseRes = await request("/explore/new-releases");
  logResult("Explore - New Releases", releaseRes);

  // 2. Explore Albums
  const albumsRes = await request("/explore/albums");
  logResult("Explore - Albums", albumsRes);

  // 3. Explore Videos
  const videosRes = await request("/explore/videos");
  logResult("Explore - Videos", videosRes);

  // 4. Explore Meta
  const metaRes = await request("/explore/meta");
  logResult("Explore - Meta", metaRes);
}

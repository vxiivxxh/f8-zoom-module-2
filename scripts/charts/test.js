import { request, logResult, COLORS } from '../utils/client.js';

export async function runChartsTests() {
    console.log(`\n${COLORS.CYAN}--- Charts Module Tests ---${COLORS.RESET}`);
    // Based on API_ENDPOINTS.md
    
    // Countries
    const ctrRes = await request('/charts/countries');
    logResult('Charts - Countries', ctrRes);
    
    // Top Artists
    const artistRes = await request('/charts/top-artists'); // Might need query params defaults
    logResult('Charts - Top Artists', artistRes);
}

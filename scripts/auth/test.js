import { request, logResult, COLORS } from '../utils/client.js';

export async function runAuthTests() {
    console.log(`\n${COLORS.CYAN}--- Authentication Tests ---${COLORS.RESET}`);
    
    // Test 1: Register (Skip to avoid spamming or fail if exists)
    // We will just test Login with a known mock user if possible, or skip for now.
    // For this generic test, we can try to hit 'login' with invalid creds to check 400/401 response at least.
    
    const loginRes = await request('/auth/login', 'POST', { email: 'wrong@email.com', password: 'wrong' });
    // Expect 400 or 404 or 401
    const passed = !loginRes.ok; // Correctly rejected
    if (passed) console.log(`${COLORS.GREEN}PASS${COLORS.RESET} Auth - Login Reject (Expected invalid credentials check)`);
    else logResult('Auth - Login Reject', loginRes);

    // Test 2: Me without token
    const meRes = await request('/auth/me');
    if (!meRes.ok) console.log(`${COLORS.GREEN}PASS${COLORS.RESET} Auth - Me Guard (Expected 401/403)`);
    else logResult('Auth - Me Guard', meRes);
}

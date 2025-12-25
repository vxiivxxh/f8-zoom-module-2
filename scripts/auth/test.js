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

    // Test 3: Register Success
    const randomId = Math.floor(Math.random() * 10000);
    const testUser = {
        name: `Test User ${randomId}`,
        email: `test${randomId}@example.com`,
        password: 'password123',
        confirmPassword: 'password123'
    };
    
    console.log(`\nTesting Register with ${testUser.email}...`);
    const regRes = await request('/auth/register', 'POST', testUser);
    
    if (regRes.ok) {
         console.log(`${COLORS.GREEN}PASS${COLORS.RESET} Auth - Register Success`);
         // Check if token is returned
         if (regRes.data && (regRes.data.access_token || regRes.data.accessToken)) {
             console.log("Register returned token:", Object.keys(regRes.data));
         } else {
             console.log("Register did NOT return token. Data keys:", Object.keys(regRes.data || {}));
         }
    } else {
         logResult('Auth - Register Fail', regRes);
    }

    // Test 4: Login Success
    console.log(`\nTesting Login with ${testUser.email}...`);
    const validLoginRes = await request('/auth/login', 'POST', { 
        email: testUser.email, 
        password: testUser.password 
    });
    
    if (validLoginRes.ok) {
         console.log(`${COLORS.GREEN}PASS${COLORS.RESET} Auth - Login Success`);
         // Verify Token structure if possible
         if (validLoginRes.data && validLoginRes.data.access_token) {
             console.log(`${COLORS.GREEN}PASS${COLORS.RESET} Auth - Token Received`);
             
             // Optional: Test /me with token if your client supports setting header
             // But our simple client request() helper in test-api.js doesn't seem to support setting auth headers easily
             // unless we modify it or pass headers.
             // Let's check utils/client.js to see if it handles tokens.
         } else {
             console.log(`${COLORS.YELLOW}WARN${COLORS.RESET} Auth - No accessToken in response`);
             console.log(validLoginRes.data);
         }
    } else {
         logResult('Auth - Login Fail', validLoginRes);
    }
}

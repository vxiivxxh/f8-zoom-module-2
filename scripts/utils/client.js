const API_BASE_URL = 'https://youtube-music.f8team.dev/api';

// ANSI Colors
export const COLORS = {
    RED: '\x1b[31m',
    GREEN: '\x1b[32m',
    YELLOW: '\x1b[33m',
    RESET: '\x1b[0m',
    CYAN: '\x1b[36m',
    GRAY: '\x1b[90m'
};

// Shared state for capturing IDs across tests
export const context = {
    songId: null,
    albumId: null,
    playlistId: null,
    token: null
};

export async function request(endpoint, method = 'GET', body = null, headers = {}) {
  const start = performance.now();
  try {
    const config = { 
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    };
    
    if (context.token) {
        config.headers['Authorization'] = `Bearer ${context.token}`;
    }

    if (body) {
        config.body = JSON.stringify(body);
    }

    const res = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const end = performance.now();
    const duration = Math.round(end - start);
    
    let data;
    const text = await res.text();
    try {
        data = JSON.parse(text);
    } catch (e) {
        data = text;
    }

    return { 
        status: res.status, 
        ok: res.ok, 
        duration, 
        data 
    };
  } catch (error) {
    const end = performance.now();
    return { 
        status: 'ERR', 
        ok: false, 
        duration: Math.round(end - start), 
        error: error.message 
    };
  }
}

export function logResult(name, res) {
    if (res.ok) {
        console.log(`${COLORS.GREEN}PASS${COLORS.RESET} ${name.padEnd(40)} (${res.duration}ms)`);
    } else {
        console.log(`${COLORS.RED}FAIL${COLORS.RESET} ${name.padEnd(40)} (${res.duration}ms) - ${res.status}`);
        if (res.error) console.log(`  Error: ${res.error}`);
    }
}

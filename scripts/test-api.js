// Native fetch is available in Node.js 18+

// However, modern Node has fetch. Let's try native fetch first.

const API_BASE_URL = 'https://youtube-music.f8team.dev/api';

// ANSI Colors
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';
const CYAN = '\x1b[36m';

async function request(endpoint, method = 'GET') {
  const start = performance.now();
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, { method });
    const end = performance.now();
    const duration = Math.round(end - start);
    
    // Try parse JSON
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

async function runTests() {
  console.log(`${CYAN}Starting API Verification for ${API_BASE_URL}${RESET}\n`);
  
  const results = [];
  let capturedSongId = null;
  let capturedAlbumId = null;

  // Test definitions
  const tests = [
      { name: 'Home - Albums', endpoint: '/home/albums-for-you', method: 'GET' },
      { name: 'Home - Hits', endpoint: '/home/todays-hits', method: 'GET' },
      { name: 'Explore - New Releases', endpoint: '/explore/new-releases', method: 'GET' },
      { name: 'Search - Suggestions', endpoint: '/search/suggestions?q=son', method: 'GET' },
      { name: 'Search - Query', endpoint: '/search?q=a', method: 'GET' },
      { name: 'Categories', endpoint: '/categories', method: 'GET' },
      
      // We will add dynamic tests during execution
  ];

  for (const test of tests) {
      process.stdout.write(`Testing ${test.name.padEnd(30)} ... `);
      
      const res = await request(test.endpoint, test.method);
      
      if (res.ok) {
          console.log(`${GREEN}PASS${RESET} (${res.duration}ms)`);
          
          // Debugging Structure if capture fails
          // console.log("Structure:", JSON.stringify(res.data).substring(0, 200));

          // Logic to capture IDs
          if (test.endpoint.includes('/search?q')) {
              // API returns { results: [...] }
              const items = res.data?.results || res.data?.items;
              if (items) {
                   const song = items.find(i => i.type === 'song');
                   if (song) capturedSongId = song.id;
              } else {
                   // Log deep structure to help debug next run if it still fails
                   // console.log("Search response items not found", res.data); 
              }
          }
           if (test.endpoint.includes('/home/albums-for-you')) {
              // Likely returns array directly or inside data
              const items = Array.isArray(res.data) ? res.data : (res.data?.data || []);
              if (items && items[0]) {
                   capturedAlbumId = items[0].id;
              }
          }

      } else {
          console.log(`${RED}FAIL${RESET} (${res.duration}ms) - ${res.status}`);
          if (res.error) console.log(`  Error: ${res.error}`);
          else console.log(`  Response: ${JSON.stringify(res.data).substring(0, 100)}`);
      }
      results.push({ ...test, result: res });
      
      // Rate limit safety
      await new Promise(r => setTimeout(r, 200));
  }

  // Dependent Tests
  console.log(`\n${CYAN}Running Dependent Tests...${RESET}`);

  if (capturedSongId) {
       process.stdout.write(`Testing Details - Song (${capturedSongId}) ... `);
       const res = await request(`/songs/details/${capturedSongId}`);
       if (res.ok) console.log(`${GREEN}PASS${RESET} (${res.duration}ms)`);
       else console.log(`${RED}FAIL${RESET} (${res.duration}ms)`);
  } else {
       console.log(`${YELLOW}SKIPPED${RESET} Details - Song (No Song ID captured)`);
  }

  if (capturedAlbumId) {
       process.stdout.write(`Testing Details - Album (${capturedAlbumId}) ... `);
       const res = await request(`/albums/details/${capturedAlbumId}`);
       if (res.ok) console.log(`${GREEN}PASS${RESET} (${res.duration}ms)`);
       else console.log(`${RED}FAIL${RESET} (${res.duration}ms)`);
  } else {
       console.log(`${YELLOW}SKIPPED${RESET} Details - Album (No Album ID captured)`);
  }

  console.log(`\nDone.`);
}

runTests();

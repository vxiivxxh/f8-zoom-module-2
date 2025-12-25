import { runAuthTests } from './auth/test.js';
import { runHomeTests } from './home/test.js';
import { runExploreTests } from './explore/test.js';
import { runSearchTests } from './search/test.js';
import { runDetailsTests } from './details/test.js';
import { runChartsTests } from './charts/test.js';

async function main() {
    console.log('Starting API Verification Suite...\n');
    
    try {
        await runAuthTests();
        await runHomeTests();
        await runExploreTests();
        await runChartsTests();
        await runSearchTests();
        await runDetailsTests(); // Runs last to use captured IDs
    } catch (err) {
        console.error('Test Suite Failed:', err);
    }
    
    console.log('\nVerification Complete.');
}

main();

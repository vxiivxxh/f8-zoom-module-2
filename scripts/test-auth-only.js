import { runAuthTests } from './auth/test.js';

async function main() {
    console.log('Starting Auth Tests Only...');
    try {
        await runAuthTests();
    } catch (err) {
        console.error(err);
    }
    console.log('Done.');
}

main();


const axios = require('axios');

async function main() {
    try {
        console.log('Logging in...');
        const loginRes = await axios.post('http://127.0.0.1:4000/api/auth/login', {
            email: 'admin@haldirams.com',
            password: 'admin'
        });
        const token = loginRes.data.token;
        console.log('Login successful. Token obtained.');

        console.log('Fetching sweets...');
        const sweetsRes = await axios.get('http://127.0.0.1:4000/api/sweets', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(`Successfully fetched ${sweetsRes.data.length} sweets.`);
        console.log('First sweet:', sweetsRes.data[0]);
    } catch (e) {
        console.error('Error:', e.response ? e.response.data : e.message);
    }
}

main();

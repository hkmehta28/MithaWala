
const allSweets = [
  // Sugar Free
  { name: 'Jelly Bean', category: 'Sugar Free', price: 20.00, quantity: 100 },
  { name: 'Anjeer Barfi', category: 'Sugar Free', price: 22.00, quantity: 50 },
  { name: 'Date Rolls', category: 'Sugar Free', price: 20.00, quantity: 60 },
  { name: 'Sugar Free Ladoo', category: 'Sugar Free', price: 18.00, quantity: 40 },
  
  // Packed Sweets
  { name: 'Besan Ladoo', category: 'Packed Sweets', price: 10.00, quantity: 100 },
  { name: 'Moti Choor Ladoo', category: 'Packed Sweets', price: 10.00, quantity: 100 },
  { name: 'Atta Ladoo', category: 'Packed Sweets', price: 12.00, quantity: 80 },
  { name: 'Dry Fruit Box', category: 'Packed Sweets', price: 40.00, quantity: 20 },
  { name: 'Pista Barfi', category: 'Packed Sweets', price: 18.00, quantity: 50 },
  { name: 'Chocolate Barfi', category: 'Packed Sweets', price: 18.00, quantity: 50 },
  { name: 'Kesar Peda', category: 'Packed Sweets', price: 14.00, quantity: 60 },
  { name: 'Coconut Barfi', category: 'Packed Sweets', price: 16.00, quantity: 45 },
  { name: 'Milk Cake', category: 'Packed Sweets', price: 18.00, quantity: 40 },
  { name: 'Kaju Barfi', category: 'Packed Sweets', price: 20.00, quantity: 45 },

  // Special
  { name: 'Rasmalai', category: 'Special', price: 12.00, quantity: 30 },
  { name: 'Baklava', category: 'Special', price: 30.00, quantity: 30 },
  { name: 'Turkish Delight', category: 'Special', price: 25.00, quantity: 40 },
  { name: 'Saffron Sandesh', category: 'Special', price: 15.00, quantity: 40 },
  { name: 'Malai Ghevar', category: 'Special', price: 25.00, quantity: 20 },
  { name: 'Rajbhog', category: 'Special', price: 22.00, quantity: 30 }
];

async function forceSeed() {
  const PORT = 4000;
  console.log(`Force Seeding ${allSweets.length} sweets to port ${PORT}...`);
  const baseUrl = `http://127.0.0.1:${PORT}/api`;

  try {
    // 1. Try to login (or register if needed)
    let token;
    
    // Attempt Registration (ignore if exists)
    try {
        await fetch(`${baseUrl}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'force@seed.com', password: 'password123', name: 'Force Admin', role: 'ADMIN' })
        });
    } catch(e) {}

    // Login
    const loginRes = await fetch(`${baseUrl}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'force@seed.com', password: 'password123' })
    });

    if (loginRes.ok) {
        const data = await loginRes.json();
        token = data.token;
    } else {
        // Fallback to other admin
        const res2 = await fetch(`${baseUrl}/users/login`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ email: 'admin@sweetshop.com', password: 'password123' })
        });
        if (res2.ok) {
            token = (await res2.json()).token;
        } else {
            throw new Error('Cannot login as admin');
        }
    }

    // 2. Add All Sweets
    let addedCount = 0;
    for (const sweet of allSweets) {
        const res = await fetch(`${baseUrl}/sweets`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(sweet)
        });
        if (res.ok) addedCount++;
        else console.log(`Skipped ${sweet.name}: ${await res.text()}`); // Might already exist
    }
    console.log(`Successfully synced ${addedCount} new sweets.`);

  } catch (error) {
    console.error('Force Seed Failed:', error);
  }
}

forceSeed();

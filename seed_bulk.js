
const sweets = [
  { name: 'Anjeer Barfi', category: 'Sugar Free', price: 22.00, quantity: 50 },
  { name: 'Date Rolls', category: 'Sugar Free', price: 20.00, quantity: 60 },
  { name: 'Sugar Free Ladoo', category: 'Sugar Free', price: 18.00, quantity: 40 },
  { name: 'Besan Ladoo', category: 'Packed Sweets', price: 10.00, quantity: 100 },
  { name: 'Moti Choor Ladoo', category: 'Packed Sweets', price: 10.00, quantity: 100 },
  { name: 'Atta Ladoo', category: 'Packed Sweets', price: 12.00, quantity: 80 },
  { name: 'Dry Fruit Box', category: 'Packed Sweets', price: 40.00, quantity: 20 },
  { name: 'Baklava', category: 'Special', price: 30.00, quantity: 30 },
  { name: 'Turkish Delight', category: 'Special', price: 25.00, quantity: 40 },
  { name: 'Saffron Sandesh', category: 'Special', price: 15.00, quantity: 40 },
  { name: 'Malai Sandwich', category: 'Special', price: 16.00, quantity: 35 }
];

async function seedBulk() {
  console.log('Seeding bulk sweets to PORT 4000...');
  const PORT = 4000; // Found in server.ts
  const baseUrl = `http://127.0.0.1:${PORT}/api`;

  try {
    // 1. Login
    try {
        await fetch(`${baseUrl}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'bulk@seed.com',
                password: 'password123',
                name: 'Bulk Seeder',
                role: 'ADMIN'
            })
        });
    } catch (e) {}

    const loginRes = await fetch(`${baseUrl}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: 'bulk@seed.com',
            password: 'password123'
        })
    });

    if (!loginRes.ok) throw new Error(`Login failed: ${await loginRes.text()}`);
    const { token } = await loginRes.json();

    // 2. Add Sweets
    for (const sweet of sweets) {
        const res = await fetch(`${baseUrl}/sweets`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(sweet)
        });
        
        if (res.ok) console.log(`Added ${sweet.name}`);
        else console.log(`Failed to add ${sweet.name}: ${await res.text()}`);
    }
    console.log('Bulk seed complete.');
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}

seedBulk();


const sweets = [
  { name: 'Barfi', category: 'Sugar Free', price: 15.00, quantity: 50 },
  { name: 'Milk Cake', category: 'Packed Sweets', price: 18.00, quantity: 40 },
  { name: 'Kaju Barfi', category: 'Packed Sweets', price: 20.00, quantity: 45 },
  { name: 'Rasmalai', category: 'Special', price: 12.00, quantity: 30 }
];

async function seed() {
  console.log('Seeding specific sweets...');
  try {
    // 1. Register Admin (if needed)
    try {
        await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@sweetshop.com', // Using a distinct email just in case
                password: 'password123',
                name: 'Owner',
                role: 'ADMIN'
            })
        });
    } catch (e) { }

    // 2. Login
    const loginRes = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: 'admin@sweetshop.com',
            password: 'password123'
        })
    });

    if (!loginRes.ok) {
        // Fallback to previous seeder email if new one fails/already exists but login fails (unlikely)
        throw new Error('Login failed');
    }
    const loginData = await loginRes.json();
    const token = loginData.token;

    // 3. Add Sweets
    for (const sweet of sweets) {
        const res = await fetch('http://localhost:3000/api/sweets', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(sweet)
        });
        
        if (res.ok) console.log(`Added \${sweet.name}`);
        else console.log(`Failed to add \${sweet.name}: \${await res.text()}`);
    }
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}

seed();

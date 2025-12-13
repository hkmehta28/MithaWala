
const sweets = [
  { name: 'Kaju Katli', category: 'Packed Sweets', price: 12.00, quantity: 50 },
  { name: 'Rasgualla', category: 'Tin Sweets', price: 8.00, quantity: 40 },
  { name: 'Gulab Jamun', category: 'Tin Sweets', price: 8.50, quantity: 40 },
  { name: 'Soan Papdi', category: 'Festive Treats', price: 6.00, quantity: 30 },
  { name: 'Mysore Pak', category: 'Signature Collection', price: 9.00, quantity: 20 },
  { name: 'Besan Ladoo', category: 'Packed Sweets', price: 5.00, quantity: 60 }
];

async function seed() {
  console.log('Seeding sweets...');
  try {
    // 1. Register Admin (Might fail if exists, that's fine)
    try {
        await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'seed@admin.com',
                password: 'password123',
                name: 'Seeder',
                role: 'ADMIN'
            })
        });
    } catch (e) {
        // Ignore registration error
    }

    // 2. Login
    const loginRes = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: 'seed@admin.com',
            password: 'password123'
        })
    });

    if (!loginRes.ok) throw new Error('Login failed');
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
        
        if (res.ok) console.log(`Added ${sweet.name}`);
        else console.log(`Failed to add ${sweet.name}: ${await res.text()}`);
    }
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}

seed();

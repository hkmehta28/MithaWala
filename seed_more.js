
const moreSweets = [
  { name: 'Pista Barfi', category: 'Packed Sweets', price: 18.00, quantity: 50 },
  { name: 'Chocolate Barfi', category: 'Packed Sweets', price: 18.00, quantity: 50 },
  { name: 'Kesar Peda', category: 'Packed Sweets', price: 14.00, quantity: 60 },
  { name: 'Malai Ghevar', category: 'Special', price: 25.00, quantity: 20 },
  { name: 'Coconut Barfi', category: 'Packed Sweets', price: 16.00, quantity: 45 },
  { name: 'Rajbhog', category: 'Special', price: 22.00, quantity: 30 }
];

async function seedMore() {
  const PORT = 4000;
  console.log(`Seeding MORE sweets to 127.0.0.1:${PORT}...`);
  const baseUrl = `http://127.0.0.1:${PORT}/api`;

  try {
    // 1. Login (Reuse admin)
    const loginRes = await fetch(`${baseUrl}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: 'bulk@seed.com', // Assuming this user was created in bulk seed
            password: 'password123'
        })
    });
    
    // If bulk user doesn't exist, try the other one
    let token;
    if (loginRes.ok) {
        const data = await loginRes.json();
        token = data.token;
    } else {
         const loginRes2 = await fetch(`${baseUrl}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@sweetshop.com',
                password: 'password123'
            })
        });
        if (loginRes2.ok) {
             const data2 = await loginRes2.json();
             token = data2.token;
        } else {
            console.error('Could not login to seed.');
            return;
        }
    }

    // 2. Add Sweets
    for (const sweet of moreSweets) {
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
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}

seedMore();

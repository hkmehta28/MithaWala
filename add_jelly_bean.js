
async function addJellyBean() {
  console.log('Adding Jelly Bean to Sugar Free...');
  try {
    // 1. Login
    const loginRes = await fetch('http://127.0.0.1:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: 'admin@sweetshop.com',
            password: 'password123'
        })
    });

    let token;
    if (loginRes.ok) {
        const data = await loginRes.json();
        token = data.token;
    } else {
        throw new Error('Login failed. Please ensure admin user exists (run previous seeds or register manually).');
    }

    // 2. Add Jelly Bean
    const sweet = { name: 'Jelly Bean', category: 'Sugar Free', price: 20.00, quantity: 100 };
    
    const res = await fetch('http://127.0.0.1:3000/api/sweets', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(sweet)
    });
    
    if (res.ok) console.log('Successfully added Jelly Bean to Sugar Free category.');
    else console.log(`Failed to add Jelly Bean: ${await res.text()}`);

  } catch (error) {
    console.error('Operation failed:', error);
  }
}

addJellyBean();

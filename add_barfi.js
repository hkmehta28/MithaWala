
async function addBarfi() {
  console.log('Adding Barfi to Sugar Free...');
  try {
    // 1. Login
    // Try to login with the seed admin credentials we likely created or exist
    const loginRes = await fetch('http://localhost:3000/api/users/login', {
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
        // Try registering if login failed (maybe user doesn't exist)
        console.log('Login failed, trying to register admin...');
        const regRes = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@sweetshop.com',
                password: 'password123',
                name: 'Owner',
                role: 'ADMIN'
            })
        });
        
        if (regRes.ok) {
             // Login again
             const loginRes2 = await fetch('http://localhost:3000/api/users/login', {
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
            }
        }
    }

    if (!token) {
        throw new Error('Could not authenticate to add sweet.');
    }

    // 2. Add Barfi
    const sweet = { name: 'Barfi', category: 'Sugar Free', price: 15.00, quantity: 50 };
    
    const res = await fetch('http://localhost:3000/api/sweets', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(sweet)
    });
    
    if (res.ok) console.log('Successfully added Barfi to Sugar Free category.');
    else console.log(`Failed to add Barfi: ${await res.text()}`);

  } catch (error) {
    console.error('Operation failed:', error);
  }
}

addBarfi();

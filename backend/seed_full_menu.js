
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sweets = [
  { name: 'Anjeer Barfi', category: 'Sugar Free', price: 22.00, quantity: 50 },
  { name: 'Date Rolls', category: 'Sugar Free', price: 20.00, quantity: 60 },
  { name: 'Jelly Bean', category: 'Sugar Free', price: 20.00, quantity: 100 },
  { name: 'Besan Ladoo', category: 'Packed Sweets', price: 10.00, quantity: 100 },
  { name: 'Milk Cake', category: 'Packed Sweets', price: 18.00, quantity: 40 },
  { name: 'Kaju Barfi', category: 'Packed Sweets', price: 20.00, quantity: 45 },
  { name: 'Rasmalai', category: 'Special', price: 12.00, quantity: 30 },
  { name: 'Baklava', category: 'Special', price: 30.00, quantity: 30 },
  { name: 'Turkish Delight', category: 'Special', price: 25.00, quantity: 40 },
  { name: 'Saffron Sandesh', category: 'Special', price: 15.00, quantity: 40 },
  { name: 'Pista Barfi', category: 'Packed Sweets', price: 18.00, quantity: 50 },
  { name: 'Chocolate Barfi', category: 'Packed Sweets', price: 18.00, quantity: 50 },
  { name: 'Kesar Peda', category: 'Packed Sweets', price: 14.00, quantity: 60 },
  { name: 'Malai Ghevar', category: 'Special', price: 25.00, quantity: 20 },
  { name: 'Coconut Barfi', category: 'Packed Sweets', price: 16.00, quantity: 45 },
  { name: 'Rajbhog', category: 'Special', price: 22.00, quantity: 30 }
];

async function main() {
  console.log('Seeding full menu...');
  
  // First, clear existing sweets to avoid duplication if running multiple times (optional, but cleaner)
  // await prisma.sweet.deleteMany({}); 
  // actually, let's use upsert or just create. Upsert requires unique where.
  // We'll just loop and create if not exists, or just create.
  // To avoid duplicates, let's checking if exists.

  for (const s of sweets) {
    const exists = await prisma.sweet.findFirst({
        where: { name: s.name }
    });
    
    if (!exists) {
        await prisma.sweet.create({
            data: s
        });
        console.log(`Created: ${s.name}`);
    } else {
        console.log(`Skipped (already exists): ${s.name}`);
    }
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

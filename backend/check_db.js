
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const count = await prisma.sweet.count();
    console.log(`Total sweets in DB: ${count}`);
    const users = await prisma.user.count();
    console.log(`Total users in DB: ${users}`);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();

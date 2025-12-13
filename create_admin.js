
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@haldirams.com';
  const password = 'admin';
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = await prisma.user.upsert({
      where: { email },
      update: { password: hashedPassword, role: 'ADMIN', name: 'Haldiram Admin' },
      create: {
        email,
        password: hashedPassword,
        name: 'Haldiram Admin',
        role: 'ADMIN',
      },
    });
    console.log('Admin user ready:', admin);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@mithawla.com';
  const password = 'admin';
  const name = 'Admin User';

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email: email },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
      name: name
    },
    create: {
      email: email,
      password: hashedPassword,
      name: name,
      role: 'ADMIN',
    },
  });

  console.log('Admin user created/updated:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

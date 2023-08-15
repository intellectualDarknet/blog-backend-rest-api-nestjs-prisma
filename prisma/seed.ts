import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'

// initialize the Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10
async function main() {
  // create two dummy users
  const passwordLexus = await bcrypt.hash('4057321', roundsOfHashing);
  const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);

  const catalog1 = await prisma.catalog.upsert({
    where: { author: 'lexus1337' },
    update: {},
    create: {
      author: 'lexus1337',
      naming: 'Books of shadows'
    },
  });

  const catalog2 = await prisma.catalog.upsert({
    where: { author: 'A R B' },
    update: {},
    create: {
      author: 'A R B',
      naming: 'Green Book'
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'ladyblaumeux24@gmail.com'},
    update: {},
    create: {
      name: 'lexus',
      email: 'ladyblaumeux24@gmail.com',
      password: passwordLexus,
      role: 'Admin'
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: 'ladyblaumeux25@gmail.com'},
    update: {},
    create: {
      name: 'lexus',
      email: 'ladyblaumeux25@gmail.com',
      password: passwordAlex,
      role: 'User'
    },
  });


  console.log({ user1, user2, catalog1, catalog2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect();
  });

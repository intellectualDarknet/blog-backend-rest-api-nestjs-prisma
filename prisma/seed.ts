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
    where: { author: 'lexus192' },
    update: {},
    create: {
      author: 'lexus192',
      naming: 'Green Book'
    },
  });

  const catalog3 = await prisma.catalog.upsert({
    where: { author: 'Conan doile' },
    update: {},
    create: {
      author: 'Conan doile',
      naming: 'Magic book'
    },
  });

  const catalog4 = await prisma.catalog.upsert({
    where: { author: 'Conan Coil' },
    update: {},
    create: {
      author: 'Conan Coil',
      naming: 'White Book'
    },
  });

  const catalog5 = await prisma.catalog.upsert({
    where: { author: 'Conan Roile' },
    update: {},
    create: {
      author: 'Conan Roile',
      naming: 'Black Book'
    },
  });

  const catalog6 = await prisma.catalog.upsert({
    where: { author: 'Conan Foe' },
    update: {},
    create: {
      author: 'Conan Foe',
      naming: 'Red Book'
    },
  });

  
  const catalog7 = await prisma.catalog.upsert({
    where: { author: 'Aliaksei Dzemidovich' },
    update: {},
    create: {
      author: 'Aliaksei Dzemidovich',
      naming: 'Blue Book'
    },
  });

  const catalog8 = await prisma.catalog.upsert({
    where: { author: 'Blackberry' },
    update: {},
    create: {
      author: 'Blackberry',
      naming: 'Willow Stories'
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


  console.log({ user1, user2, catalog1, catalog2, catalog3, catalog4, catalog5, catalog6, catalog7, catalog8 });
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

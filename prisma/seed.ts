import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'

// initialize the Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10
async function main() {
  // create two dummy users
  const passwordLexus = await bcrypt.hash('4057321', roundsOfHashing);
  const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);

  // const catalog5 = await prisma.catalog.upsert({
  //   where: { author: 'Conan Roile' },
  //   update: {},
  //   create: {
  //     author: 'Conan Roile',
  //     naming: 'Black Book'
  //   },
  // });

  // const catalog6 = await prisma.catalog.upsert({
  //   where: { author: 'Conan Foe' },
  //   update: {},
  //   create: {
  //     author: 'Conan Foe',
  //     naming: 'Red Book'
  //   },
  // });

  
  // const catalog7 = await prisma.catalog.upsert({
  //   where: { author: 'Aliaksei Dzemidovich' },
  //   update: {},
  //   create: {
  //     author: 'Aliaksei Dzemidovich',
  //     naming: 'Blue Book'
  //   },
  // });

  // const catalog8 = await prisma.catalog.upsert({
  //   where: { author: 'Blackberry' },
  //   update: {},
  //   create: {
  //     author: 'Blackberry',
  //     naming: 'Willow Stories'
  //   },
  // });

  const user1 = await prisma.user.upsert({
    where: { email: 'ladyblaumeux25@gmail.com'},
    update: {},
    create: {
      name: 'lexus',
      email: 'ladyblaumeux25@gmail.com',
      password: passwordAlex,
      role: 'User',
      catalogs: {
        createMany:{
          data: [
            {
              author: 'Conan Klain',
              naming: 'Cooking book'
            },
            {
              author: 'Conan Roile',
              naming: 'Cooking book 2'
            },
            {
              author: 'Elvis Klain',
              naming: 'Geisha memoire'
            },
            {
              author: 'Elvis Tremor',
              naming: 'Cup of the flames'
            },
          ]
        }
      }
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'ladyblaumeux24@gmail.com'},
    update: {},
    create: {
      name: 'lexus',
      email: 'ladyblaumeux24@gmail.com',
      password: passwordLexus,
      role: 'Admin',
      catalogs: {
        createMany: {
          data: [
            {
              author: 'Rita face',
              naming: 'God is everywhere'
            },
            {
              author: 'Rita race',
              naming: 'Underworld'
            },
            {
              author: 'Rita trace',
              naming: 'upperworld'
            },
            {
              author: 'Rita pace',
              naming: 'unexpected journey'
            },
          ]

        }
      }
    },
  });


  console.log({ user1, user2});
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

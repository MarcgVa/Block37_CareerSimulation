const { prisma } = require("../common/common");
const { faker } = require("@faker-js/faker");

async function seed() {
  console.log("Seeding the database.");
  try {
    // Add 5 instructors.

    await Promise.all(
      [...Array(5)].map(() =>
        prisma.item.create({
          data: {
            name: faker.book.title(),
            review: {
              create: [
                {
                  title: faker.lorem.lines(1),
                  rating: faker.number.int({ min: 1, max: 5 }),
                  authorId: "0873c376-327b-4443-b5ec-f086d262d154",
                },
                {
                  title: faker.lorem.lines(1),
                  rating: faker.number.int({ min: 1, max: 5 }),
                  authorId: "450b7c7b-cb6d-4545-8e9b-503635e27baa",
                },
                {
                  title: faker.lorem.lines(1),
                  rating: faker.number.int({ min: 1, max: 5 }),
                  authorId: "0873c376-327b-4443-b5ec-f086d262d154",
                },
                {
                  title: faker.lorem.lines(1),
                  rating: faker.number.int({ min: 1, max: 5 }),
                  authorId: "450b7c7b-cb6d-4545-8e9b-503635e27baa",
                },
              ],
            },
          },
        })
      )
    );

    console.log("Database is seeded.");
  } catch (err) {
    console.error(err);
  }
}

// Seed the database if we are running this file directly.
if (require.main === module) {
  seed();
}

module.exports = seed;

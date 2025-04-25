const { prisma, bcrypt } = require("../common/common");

async function seed() {
  console.log("Seeding the database.");
  try {
    // clear the db
    await prisma.review.deleteMany({});
    await prisma.item.deleteMany({});
    await prisma.user.deleteMany({});

    // create user accounts
    await prisma.user.createMany({
      data: [
        { email: "silverhawk924@example.com", password: (await bcrypt.hash("sh_pw", (await bcrypt.genSalt(10)))) },
        { email: "nebula.tracer77@example.com", password: (await bcrypt.hash("nt_pw", (await bcrypt.genSalt(10)))) },
        { email: "stellar.crane42@example.com", password: (await bcrypt.hash("sc_pw", (await bcrypt.genSalt(10)))) },
        { email: "velocity.stride75@example.com", password: (await bcrypt.hash("vs_pw", (await bcrypt.genSalt(10)))) },
      ],
    });

    // create items
    await prisma.item.createMany({
      data: [
        { name: "GlowFlex" },
        { name: "BrewMate" },
        { name: "ZenMist" },
        { name: "SwiftCharge" },
        { name: "EcoSip" },
        { name: "SonicBreeze" },
        { name: "SnapPrint" },
        { name: "GripX" },
        { name: "AquaPure" },
        { name: "ChillPad" },
      ],
    });

    // create reviews
    await prisma.review.createMany({
      data: [
        {
          title:
            "GlowFlex is a sleek, adjustable LED desk lamp with touch controls and multiple brightness levels. It’s energy-efficient and reduces eye strain—perfect for work!",
          rating: 5,
          authorId: (
            await prisma.user.findFirst({
              where: {
                email: "silverhawk924@example.com",
              },
              select: {
                id: true,
              },
            })
          )?.id,
          itemId: (
            await prisma.item.findFirst({
              where: {
                name: "GlowFlex",
              },
              select: {
                id: true,
              },
            })
          )?.id,
        },
        {
          title:
            "BrewMate is a decent coffee brewer with adjustable settings and fast brewing. While it delivers solid flavor, cleanup is a bit tricky, and durability could be better. A good pick, but not perfect.",
          rating: 5,
          authorId: (
            await prisma.user.findFirst({
              where: {
                email: "silverhawk924@example.com",
              },
              select: {
                id: true,
              },
            })
          )?.id,
          itemId: (
            await prisma.item.findFirst({
              where: {
                name: "BrewMate",
              },
              select: {
                id: true,
              },
            })
          )?.id,
        },
        {
          title:
            "ZenMist is a refreshing aromatherapy diffuser that transforms any space into a tranquil retreat. Its sleek design and customizable mist levels make it great for relaxation, though water refills could be more convenient.",
          rating: 4,
          authorId: (
            await prisma.user.findFirst({
              where: {
                email: "silverhawk924@example.com",
              },
              select: {
                id: true,
              },
            })
          )?.id,
          itemId: (
            await prisma.item.findFirst({
              where: {
                name: "ZenMist",
              },
              select: {
                id: true,
              },
            })
          )?.id,
        },
        {
          title:
            "ZenMist has a stylish design, but its mist output is inconsistent, and the scent diffusion feels weak. The water tank needs frequent refills, making it less convenient than expected. A decent idea, but lacks reliability.",
          rating: 2,
          authorId: (
            await prisma.user.findFirst({
              where: {
                email: "nebula.tracer77@example.com",
              },
              select: {
                id: true,
              },
            })
          )?.id,
          itemId: (
            await prisma.item.findFirst({
              where: {
                name: "ZenMist",
              },
              select: {
                id: true,
              },
            })
          )?.id,
        },
        {
          title:
            "SwiftCharge is a compact and reliable fast charger that delivers quick power boosts for your devices. Its sleek design and efficient charging make it great for travel, though the cable length could be improved.",
          rating: 4,
          authorId: (
            await prisma.user.findFirst({
              where: {
                email: "nebula.tracer77@example.com",
              },
              select: {
                id: true,
              },
            })
          )?.id,
          itemId: (
            await prisma.item.findFirst({
              where: {
                name: "SwiftCharge",
              },
              select: {
                id: true,
              },
            })
          )?.id,
        },
        {
          title:
            "ZenMist is a fantastic aromatherapy diffuser that transforms any space into a soothing retreat. Its sleek design, adjustable mist settings, and long-lasting fragrance make it perfect for relaxation. A must-have!",
          rating: 5,
          authorId: (
            await prisma.user.findFirst({
              where: {
                email: "stellar.crane42@example.com",
              },
              select: {
                id: true,
              },
            })
          )?.id,
          itemId: (
            await prisma.item.findFirst({
              where: {
                name: "ZenMist",
              },
              select: {
                id: true,
              },
            })
          )?.id,
        },
      ],
    });

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

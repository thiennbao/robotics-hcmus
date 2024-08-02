import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { username: "ROOT" },
    update: {},
    create: {
      username: "ROOT",
      role: "ROOT",
      password: "$2b$12$hZvt3N9JZC3OzFMkN.Me5.2wRfXITPIiNnRI56ntKT6Eltmzj3t9q",
    },
  });
  await prisma.contact.createMany({
    data: [
      { key: "Email", title: "", address: "" },
      { key: "Facebook", title: "", address: "" },
      { key: "Hotline", title: "", address: "" },
      { key: "Location", title: "", address: "" },
      // Add more key if need
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

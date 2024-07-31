# Init prisma
npx prisma db push --skip-generate

# Seeding
node prisma/seed.mjs

# Start the server
node server.js
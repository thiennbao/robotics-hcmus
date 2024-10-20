# Robotics & IoT - HCMUS

> This app is made with 🩵 by Robotics & IoT HCMUS

## How to run

🍓 Clone this repository

```sh
git clone https://github.com/thiennbao/robotics-hcmus.git
```

🍊 Go into the repository, create a file named `.env`

```xml
# Next app
BASE_URL=<domain_url>
POSTGRES_PRISMA_URL=<prisma_url>
JWT_KEY=<jwt_key>

# Firebase storage
FIREBASE_API_KEY=<firebase_config>
FIREBASE_AUTH_DOMAIN=<firebase_config>
FIREBASE_PROJECT_ID=<firebase_config>
FIREBASE_STORAGE_BUCKET=<firebase_config>
FIREBASE_MESSAGING_SENDER_ID=<firebase_config>
FIREBASE_APP_ID=<firebase_config>
```

- `domain_url`: the url of domain for hosting this app, should use `http://localhost:3000` for local.
- `prisma_url`: postgres connect string.
- `jwt_key`: can be any string, the more complex, the better.
- `firebase_config`: see https://firebase.google.com/docs/web/setup for more information.

🍋 Install dependencies

```sh
npm install
```

🥑 Initialize prisma and seed data

```sh
npx prisma db push
```

```sh
node prisma/seed.mjs
```

🍇 Start the app

```sh
npm run dev
```

🍑 All done, your app is running at

```sh
http://localhost:3000
```

## Run with Docker

🐳 To run this app with docker, see https://hub.docker.com/r/thiennbao/robotics-hcmus for more construction.

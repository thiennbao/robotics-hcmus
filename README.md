# Robotics & IoT - HCMUS

> This app is made with ❤️ by Robotics & IoT HCMUS

## How to run

To clone and run this application, you'll need `Git` and `Node.js` (which comes with `npm`) .

1. Clone this repository

```sh
git clone https://github.com/thiennbao/robotics-hcmus.git
```

2. Go into the repository, create a `.env` file with the format provided in the `.env.example` file and fill in your environment variables

3. Install dependencies

```sh
npm install
```

4. Initialize prisma

```sh
npx prisma db push
```

5. Seed data

```sh
node prisma/seed.mjs
```

6. Start the app

```sh
npm run dev
```

7. All done, your app is running at

```sh
http://localhost:3000
```

## Deploy with Docker

To deploy this app with docker,

1. Create a `.env.production` file with the format provided in the `.env.production.example` file and fill in your environment variables

2. Compose Docker container

```sh
docker compose up -d
```

3. All done, your app is running at

```sh
http://localhost:3000
```

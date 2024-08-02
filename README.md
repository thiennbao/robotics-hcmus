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

## Build Docker

To build Docker image, run
```sh
docker build -t [image_name]:[tag] --build-arg="DATABASE_URL=[postgres_url]" . 
```
Postgres URL is formed as follows:
```sh
postgres://[user]:[password]@[host]:[port]/[database]?[param=value&...]
```
For example, the URL using for current image in Dockerhub is:
```sh
postgres://robotics:i<3hcmus@database:5432/db?sslmode=disable
```

## Production

To compose Docker container for production, go to [`Dockerhub`](https://hub.docker.com/r/thiennbao/robotics-hcmus) for more instruction

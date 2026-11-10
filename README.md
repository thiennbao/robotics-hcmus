# Robotics & IoT - HCMUS

> This app is made with 🩵 by Robotics & IoT HCMUS

## How to run

🍓 Clone this repository

```sh
git clone https://github.com/thiennbao/robotics-hcmus.git
```

🍊 Go into the repository and install dependencies

```sh
npm install
```

🍋 Create a file named `.env`

```xml
# Next app
BASE_URL=<domain_url>
POSTGRES_PRISMA_URL=<prisma_url>
JWT_KEY=<jwt_key>

# Cloudinary storage
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
```

- `domain_url`: the url of domain for hosting this app, should use `http://localhost:3000` for local.
- `prisma_url`: postgres connect string.
- `jwt_key`: can be any string, the more complex, the better.
- `cloud_name`, `api_key`, `api_secret`: Cloudinary credentials for media storage.

🥑 Initialize prisma and seed data

```sh
npm run prisma:push
```

```sh
npm run prisma:seed
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

🐳 To run this app with docker, see https://hub.docker.com/r/thiennbao/robotics-hcmus for more instruction.

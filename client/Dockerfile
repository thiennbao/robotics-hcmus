FROM node:20-alpine AS build

WORKDIR /client

COPY package.json .

RUN npm install

COPY . .

ARG SERVER_URL

ENV REACT_APP_SERVER_URL $SERVER_URL

ARG FIREBASE_STORAGE

ENV REACT_APP_FIREBASE_STORAGE $FIREBASE_STORAGE

RUN npm run build

FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /client/build /usr/share/nginx/html
FROM node:14 AS gateway
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

#Install build essentials for redis
RUN apk add musl-dev gcc make g++ zlib-dev linux-headers

#Redis Installation script
RUN sh /demo-app/install-redis.sh

FROM node:10-alpine
WORKDIR /app
COPY --from=gateway /app ./
CMD ["sh", "-c", "redis-server > /dev/null 2>&1 & node server.js"]
EXPOSE 3000
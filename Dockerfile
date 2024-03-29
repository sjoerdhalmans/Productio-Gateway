FROM node:14 AS gateway
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:10-alpine
WORKDIR /app
COPY --from=gateway /app ./
CMD ["npm", "run", "start:prod"]
EXPOSE 3000
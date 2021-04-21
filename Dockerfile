FROM node:14 AS hr
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:10-alpine
WORKDIR /app
COPY --from=hr /app ./
CMD ["npm", "run", "start:prod"]
EXPOSE 3302
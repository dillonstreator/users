FROM node:10

WORKDIR /app

COPY . .

ENTRYPOINT [ "npm", "start" ]

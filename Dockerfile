FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# RUN npm install -g npm@10.8.1

COPY . .

EXPOSE 3000

CMD npm run dev

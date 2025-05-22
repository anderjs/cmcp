# 1. Build stage
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY sequelize.config.js ./
COPY .sequelizerc ./
RUN npm install

COPY . .
RUN npm run build

# 2. Run stage
FROM node:20-alpine

WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --omit=dev

# Copiar archivos necesarios desde la etapa de build
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/sequelize.config.js ./sequelize.config.js
COPY --from=builder /usr/src/app/.sequelizerc ./.sequelizerc

# Asegurar rutas necesarias para sequelize-cli
COPY --from=builder /usr/src/app/src/database/migrations ./src/database/migrations
COPY --from=builder /usr/src/app/src/database/seeders ./src/database/seeders
COPY --from=builder /usr/src/app/src/models ./src/models

EXPOSE 3000

CMD npm run migrate && npm run seeds && node dist/main

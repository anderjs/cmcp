# cmcp-client/Dockerfile

FROM node:20-slim

WORKDIR /usr/src/app

RUN apt update && \
    apt install -y curl iputils-ping ca-certificates && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# Usamos host 0.0.0.0 para que Vite se exponga correctamente
CMD ["npm", "run", "dev", "--", "--host"]

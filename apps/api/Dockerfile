# Stage 1 : build
FROM node:22-alpine AS builder

WORKDIR /app

COPY ../../package*.json .

COPY . .

RUN npm install -g nx
RUN npm install
RUN nx build api

# Stage 2 : run
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/api ./dist
COPY --from=builder /app/package*.json ./

RUN npm ci --omit=dev

CMD ["node", "dist/main.js"]

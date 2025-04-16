# Stage 1: build
FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install -g nx
RUN npm install
RUN nx build front --configuration=production

# Stage 2: nginx
FROM nginx:alpine

COPY --from=builder /app/dist/apps/front/browser /usr/share/nginx/html


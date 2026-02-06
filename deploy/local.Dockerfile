# --------------------------------------------------
# Stage 1: Build
# --------------------------------------------------
  FROM node:22-alpine AS builder

  WORKDIR /app
  
  # Install deps first (better caching)
  COPY package*.json ./
  RUN npm ci
  
  # Copy source
  COPY . .
  
  # Build client + server (SSR)
  RUN npm run build
  
  # --------------------------------------------------
  # Stage 2: Runtime
  # --------------------------------------------------
  FROM node:22-alpine
  
  ARG ENV=beta
  ENV NODE_ENV=production
  ENV APP_ENV=${ENV}
  
  WORKDIR /app
  
  # Copy runtime essentials only
  COPY --from=builder /app/dist ./dist
  COPY --from=builder /app/server.js ./server.js
  COPY --from=builder /app/package*.json ./
  COPY --from=builder /app/node_modules ./node_modules
  
  # If you use .env files
  # COPY .env.${ENV} .env
  
  EXPOSE 3000
  
  CMD ["node", "server.js"]
  
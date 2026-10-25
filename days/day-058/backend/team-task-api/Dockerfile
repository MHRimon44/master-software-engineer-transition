
# Stage 1: Build the NestJS application
FROM node:22-bookworm-slim AS builder

WORKDIR /app

# Install all dependencies, including TypeScript build tools
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and compile
COPY . .
RUN npm run build


# Stage 2: Create a smaller production runtime
FROM node:22-bookworm-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production

# Install production dependencies only
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy only compiled output from builder
COPY --from=builder /app/dist ./dist

# Run using the built-in non-root Node user
USER node

EXPOSE 3000

CMD ["node", "dist/main.js"]

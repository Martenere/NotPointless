# Stage 1: Build the application

FROM node:21-bookworm-slim AS builder

  

WORKDIR /app

  

COPY package*.json ./

  

RUN npm ci

  

COPY . .

  

RUN npm run build

  

# Stage 2: Install production dependencies

FROM node:21-bookworm-slim AS dependencies

  

WORKDIR /app

  

COPY package*.json ./

  

RUN npm ci --production

  

# Stage 3: Create the distroless image

FROM gcr.io/distroless/nodejs20-debian11:debug

  

WORKDIR /app

  

# Copy the build from the builder stage

COPY --from=builder /app/dist ./dist

  

# Copy production node_modules from the dependencies stage

COPY --from=dependencies /app/node_modules ./node_modules

  

COPY server.mjs ./

  

EXPOSE 3000

CMD ["/app/server.mjs"]

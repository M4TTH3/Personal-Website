FROM node:20-alpine AS base

RUN npm install -g npm@latest

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

# IMPORTANT! Build from Host Network
# ARG DATABASE_URL
# ENV DATABASE_URL=$DATABASE_URL

# ARG NEXT_PUBLIC_SOCKET_URL
# ENV NEXT_PUBLIC_SOCKET_URL=$NEXT_PUBLIC_SOCKET_URL

RUN npm run build

# Websocket server
FROM base AS chess-builder

# Update and install necessary tools
RUN apk add --no-cache \
    g++ \
    make \
    libx11-dev

# Set the working directory
WORKDIR /app

COPY websockets/chess/* ./
RUN make

FROM base AS socket-builder

WORKDIR /app

COPY websockets/package.json websockets/package-lock.json ./
RUN npm ci --only=production

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Get the websockets folder
COPY websockets/server.mjs ./websockets/
COPY websockets/sockets ./websockets/sockets
RUN rm -rf ./websockets/chess

COPY --from=chess-builder /app/chess ./websockets/
COPY --from=socket-builder /app/node_modules ./websockets/node_modules/

RUN chmod +x ./websockets/chess

# Main Next.js files
COPY --from=builder /app/public ./public
COPY entrypoint.sh .

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next
RUN chmod +x entrypoint.sh

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
EXPOSE 3001

ENV PORT=3000
ENV WSPORT=3001

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
ENTRYPOINT [ "./entrypoint.sh" ]

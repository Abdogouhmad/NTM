# Base image
FROM public.ecr.aws/library/node:lts-slim AS base

WORKDIR /app

# Copy necessary files for dependency installation
COPY package*.json ./

# Install dependencies
RUN echo "---------> Installing packages ... <-------" && \
    npm install --production

# Expose the port the app runs on
EXPOSE 3000

# Builder stage
FROM base AS builder

WORKDIR /app

# Copy all files and build the project
COPY . .
RUN npm run build

# Production stage
FROM public.ecr.aws/library/node:lts-slim AS production

WORKDIR /app

# ENV NODE_ENV=production

# Create non-root user and set permissions
RUN addgroup --gid 1001 nodejs \
  && adduser --system --uid 1001 --ingroup nodejs nextjs
USER nextjs

# Copy built files from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Start the application
CMD ["npm", "start"]

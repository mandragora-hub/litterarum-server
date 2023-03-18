FROM node:16.16.0 as base

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install deps
RUN npm i
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Build dist
RUN npm run build

# Start production image build
FROM gcr.io/distroless/nodejs:16

# Copy node modules and build directory
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=base /usr/src/app/dist ./dist

# Copy static files
# COPY src/public dist/src/public

# Expose port 3000

# Express best practices
ENV NODE_ENV production

EXPOSE 3000
CMD ["dist/server.js"]
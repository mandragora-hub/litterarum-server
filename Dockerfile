FROM node:20.11.1 as base

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Disable Husky: https://typicode.github.io/husky/how-to.html#ci-server-and-docker 
ENV HUSKY 0

# Install deps
RUN npm ci
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Build dist
RUN npm run build

# Start production image build
FROM gcr.io/distroless/nodejs20-debian11

# Copy node modules and build directory
COPY --from=base /app/node_modules /app/node_modules
COPY --from=base /app/dist /app/dist

WORKDIR /app

# Express best practices
ENV NODE_ENV production

EXPOSE 3000
CMD ["dist/src/server.js"]
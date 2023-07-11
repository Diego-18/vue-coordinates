FROM node:18

WORKDIR /app

RUN npm install esbuild-linux-64

# Copy only the files needed to install the dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci --quiet --only=develop

# Copy the rest of the files
COPY . .

# Build application
# RUN npm run build

# Expose port
EXPOSE 3000
ENV PORT 3000

CMD ["npm", "run", "dev"]

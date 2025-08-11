FROM node:18-alpine

WORKDIR /app

# Copy package files first
COPY package.json ./

# Install dependencies
RUN npm install --production=false

# Copy source code
COPY . .

# Make sure next is installed properly
RUN npx next --version || npm install next@15.4.6

# Expose port
EXPOSE 3000

# Start development server
CMD ["npx", "next", "dev"] 
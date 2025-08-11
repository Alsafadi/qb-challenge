FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies (add registry info to install heroui)
RUN pnpm config set registry https://registry.npmjs.org/
RUN pnpm install 

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["pnpm", "dev"] 
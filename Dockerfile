# 1. Base image
FROM node:18-alpine

# 2. Create app directory
WORKDIR /app

# 3. Install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy app files
COPY . .

# 5. Copy environment file
COPY .env .env

# 6. Generate Prisma client
RUN npx prisma generate

# 7. Build app
RUN npm run build

# 8. Expose the Next.js port
EXPOSE 3180

# 9. Start app
CMD ["npm", "start"]

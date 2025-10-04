# Step 1: Base image
FROM node:18

# Step 2: Set working directory inside container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Step 4: Copy the rest of the code
COPY . .

# Step 5: Expose the port your app runs on
EXPOSE 8080

# Step 6: Start the app
CMD ["node", "server.js"]

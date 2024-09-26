# Use the official Node.js image as a base
FROM node:18
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json /app/package.json
RUN npm install

# Copy the rest of the application code
COPY . /app

# Expose the port the app runs on
EXPOSE 5000

# Start the app
CMD ["node", "index.js"]

FROM node:11

WORKDIR /app

COPY package*.json ./

RUN npm install
# For production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
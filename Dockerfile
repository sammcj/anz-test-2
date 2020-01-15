FROM node:12

WORKDIR '/usr/app'
COPY package*.json ./

RUN npm install --only=production

COPY ./ ./

EXPOSE 8000
ENTRYPOINT ["npm", "start"]
#
# ---- Base Node ----
FROM node:12 as base

WORKDIR '/usr/app'
RUN npm set progress=false && npm config set depth 0

#
# ---- Install and Test ----
FROM base as test

COPY package*.json ./
# Install all modules including dev dependancies
RUN npm install
COPY . ./
RUN npm run lint && npm run test

#
# ---- Release ----
FROM base AS release

COPY package*.json ./
# copy production node_modules
RUN npm install --only=production
# copy app sources
COPY . ./

EXPOSE 8000
ENTRYPOINT ["npm", "start"]
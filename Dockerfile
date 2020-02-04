#
# ---- Base Node ----
FROM node:12 as base

WORKDIR '/usr/app'

COPY package*.json index.js server.js git-rev ./
RUN npm set progress=false && npm config set depth 0

#
# ---- Test ----
FROM base as test

COPY . ./

# Install all modules including dev dependancies
RUN npm install
RUN npm run lint && npm run test

#
# ---- Release ----
FROM base AS release

# copy production node_modules
RUN npm install --only=production

EXPOSE 8000
ENTRYPOINT ["npm", "start"]

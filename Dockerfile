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
# ---- Build ----
FROM base AS build
WORKDIR '/usr/app'

# install production node_modules
RUN npm install --only=production

#
# ---- Release ----
FROM gcr.io/distroless/nodejs
COPY --from=build /usr/app /

EXPOSE 8000
CMD ["index.js"]

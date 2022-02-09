# Common build stage


FROM node:16-slim as common-build-stage

RUN apt-get update
RUN apt-get install -y openssl

# COPY . ./app

WORKDIR /app

# COPY . ./app
COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8000

# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

# CMD ["npm", "run", "dev"]
CMD ./scripts/start.sh

# # Production build stage
# FROM common-build-stage as production-build-stage

# ENV NODE_ENV production

# CMD ./scripts/start.sh

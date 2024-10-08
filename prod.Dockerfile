FROM node:20-alpine

LABEL maintainer="Hassan Attar <h.a.develops@gmail.com>"

WORKDIR /home/node/app

COPY package*.json ./

# Define build argument for NODE_ENV
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN npm ci
# Copy the rest of the application code
COPY . .

RUN npm run build

RUN mkdir -p ./build/tmp && \
    chown -R node:node ./build/tmp

RUN mkdir -p ./build/static && \
        chown -R node:node ./build/static && \
        chmod -R 770 ./build/static

CMD ["npm", "run", "start"]

EXPOSE 8000
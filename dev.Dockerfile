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

USER node

CMD ["npm", "run", "dev"]

EXPOSE 8000
FROM node:lts-alpine

LABEL maintainer="Hassan Attar <h.a.develops@gmail.com>"

WORKDIR /app

COPY package*.json ./

# Define build argument for NODE_ENV
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN if [ "$NODE_ENV" = "development" ]; then \
      npm install; \
    else \
      npm install --omit=dev; \
    fi

# Copy the rest of the application code
COPY . .
RUN chmod +x /app/entrypoint.sh

# Build the application
RUN if [ "$NODE_ENV" = "production" ]; then \
      npm run build; \
    fi

USER node

ENTRYPOINT ["/app/entrypoint.sh"]

EXPOSE 8000
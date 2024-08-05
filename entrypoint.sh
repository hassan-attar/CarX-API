#!/bin/sh

if [ "$NODE_ENV" = "test" ]; then
  npm run test
elif [ "$NODE_ENV" = "development" ]; then
  npm run dev
elif [ "$NODE_ENV" = "production" ]; then
  npm start
else
  echo "Error: Unsupported NODE_ENV value. Please set NODE_ENV to 'test', 'development', or 'production'."
  exit 1
fi
#!/bin/bash
# Ensure the permissions are correct before starting Nginx
chown -R nginx:nginx /usr/share/nginx/static
chmod -R 750 /usr/share/nginx/static

# Execute the provided command
exec "$@"